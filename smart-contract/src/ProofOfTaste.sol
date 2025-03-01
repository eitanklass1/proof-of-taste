// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

library Submission {
    struct Post {
        address creator;
        string contentUrl;
        uint256 votes;
        uint256 timestamp;
        bool active;
        bool rewardClaimed;
    }
}

contract ProofOfTaste {
    using Submission for Submission.Post;

    address public admin;
    mapping(address => bool) public operators;

    mapping(uint256 => Submission.Post) public posts;
    mapping(address => mapping(uint256 => bool)) public hasVoted;
    mapping(uint256 => uint256[]) public dailyPosts;

    uint256 public constant SUBMISSION_FEE = 0.01 ether;
    uint256 public constant VOTE_FEE = 0.001 ether;
    uint256 public constant DAY_IN_SECONDS = 86400;
    uint256 public constant TOP_POSTS_COUNT = 5;
    uint256[] private RANK_WEIGHTS = [40, 30, 15, 10, 5]; // Percentages for top 5 ranks

    uint256 public currentDay;
    uint256 public dailyPool;
    uint256 public postCount;

    uint256 public constant BLOCKS_PER_DAY = 7200; // ~12 seconds per block on Arbitrum
    uint256 public currentBlock;

    function getCurrentDay() public view returns (uint256) {
        return block.number / BLOCKS_PER_DAY;
    }

    /**
     * Modifiers
     */
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier onlyOperator() {
        require(operators[msg.sender], "Only operator");
        _;
    }

    /**
     * Events
     */
    event PostSubmitted(
        uint256 indexed postId,
        address indexed creator,
        string contentUrl
    );
    event VoteCast(uint256 indexed postId, address indexed voter);
    event RewardsDistributed(
        uint256 indexed day,
        uint256[] topPosts,
        uint256 reward
    );

    /**
     * Methods
     */
    constructor() {
        currentDay = getCurrentDay();
        admin = msg.sender;
        operators[msg.sender] = true;
    }

    function removeOperator(address operator) external onlyAdmin {
        require(operator != admin, "Cannot remove admin");
        operators[operator] = false;
    }

    function checkAndDistributeRewards() internal {
        uint256 today = getCurrentDay();
        if (today > currentDay && dailyPosts[currentDay].length > 0) {
            _distributeRewards();
        }
    }

    function submitPost(string memory _contentUrl) external payable {
        checkAndDistributeRewards();
        require(msg.value >= SUBMISSION_FEE, "Incorrect submission fee");

        postCount++;
        posts[postCount] = Submission.Post({
            creator: msg.sender,
            contentUrl: _contentUrl,
            votes: 1,
            timestamp: block.timestamp,
            active: true,
            rewardClaimed: false
        });

        uint256 today = getCurrentDay();
        dailyPosts[today].push(postCount);
        dailyPool += msg.value;

        hasVoted[msg.sender][postCount] = true;
        emit PostSubmitted(postCount, msg.sender, _contentUrl);
    }

    function vote(uint256 _postId) external payable {
        checkAndDistributeRewards();
        require(msg.value >= VOTE_FEE, "Incorrect vote fee");
        require(_postId > 0 && _postId <= postCount, "Invalid post ID");
        require(!hasVoted[msg.sender][_postId], "Already voted");
        require(posts[_postId].active, "Post is not active");

        posts[_postId].votes++;
        hasVoted[msg.sender][_postId] = true;
        dailyPool += msg.value;

        emit VoteCast(_postId, msg.sender);
    }

    // Replace the existing getTopPosts function with this optimized quicksort version
    function getTopPosts(uint256 day) public view returns (uint256[] memory) {
        uint256[] memory postIds = dailyPosts[day];
        uint256 length = postIds.length;

        if (length == 0) return new uint256[](0);

        quickSort(postIds, 0, int(length - 1));

        uint256 resultLength = length < TOP_POSTS_COUNT
            ? length
            : TOP_POSTS_COUNT;
        uint256[] memory result = new uint256[](resultLength);
        for (uint256 i = 0; i < resultLength; i++) {
            result[i] = postIds[i];
        }
        return result;
    }

    // Add these helper functions for sorting
    function quickSort(
        uint256[] memory arr,
        int left,
        int right
    ) internal view {
        int i = left;
        int j = right;
        if (i >= j) return;
        uint256 pivotVotes = posts[arr[uint(left + (right - left) / 2)]].votes;
        uint256 pivotId = arr[uint(left + (right - left) / 2)];
        while (i <= j) {
            while (
                posts[arr[uint(i)]].votes > pivotVotes ||
                (posts[arr[uint(i)]].votes == pivotVotes &&
                    arr[uint(i)] < pivotId)
            ) i++;
            while (
                posts[arr[uint(j)]].votes < pivotVotes ||
                (posts[arr[uint(j)]].votes == pivotVotes &&
                    arr[uint(j)] > pivotId)
            ) j--;
            if (i <= j) {
                (arr[uint(i)], arr[uint(j)]) = (arr[uint(j)], arr[uint(i)]);
                i++;
                j--;
            }
        }
        if (left < j) quickSort(arr, left, j);
        if (i < right) quickSort(arr, i, right);
    }

    // Replace the distributeRewards function with this weighted version
    function distributeRewards() external onlyOperator {
        _distributeRewards();
    }

    function _distributeRewards() internal {
        uint256 today = getCurrentDay();
        require(today > currentDay, "Too early to distribute rewards");
        require(dailyPosts[currentDay].length > 0, "No posts for the day");

        uint256[] memory topPostIds = getTopPosts(currentDay);
        uint256 totalPool = dailyPool;

        // Clear state first
        dailyPool = 0;
        currentDay = today;

        // Distribute rewards directly
        for (uint256 i = 0; i < topPostIds.length && i < TOP_POSTS_COUNT; i++) {
            uint256 postId = topPostIds[i];
            Submission.Post storage post = posts[postId];
            require(!post.rewardClaimed, "Rewards already claimed");

            uint256 weightedReward = (totalPool * RANK_WEIGHTS[i]) / 100;
            post.rewardClaimed = true;

            // Transfer reward immediately
            (bool success, ) = payable(post.creator).call{
                value: weightedReward
            }("");
            require(success, "Transfer failed");
        }

        emit RewardsDistributed(currentDay, topPostIds, totalPool);
    }
}
