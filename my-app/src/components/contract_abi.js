const contract_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"postId","type":"uint256"},{"indexed":true,"internalType":"address","name":"creator","type":"address"},{"indexed":false,"internalType":"string","name":"contentUrl","type":"string"}],"name":"PostSubmitted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"day","type":"uint256"},{"components":[{"internalType":"address","name":"creator","type":"address"},{"internalType":"string","name":"contentUrl","type":"string"},{"internalType":"uint256","name":"votes","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"},{"internalType":"bool","name":"rewardClaimed","type":"bool"}],"indexed":false,"internalType":"struct Submission.Post[]","name":"topPosts","type":"tuple[]"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardsDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"postId","type":"uint256"},{"indexed":true,"internalType":"address","name":"voter","type":"address"}],"name":"VoteCast","type":"event"},{"inputs":[],"name":"BLOCKS_PER_DAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DAY_IN_SECONDS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SUBMISSION_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TOP_POSTS_COUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"VOTE_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dailyPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"dailyPosts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"distributeRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCurrentDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"day","type":"uint256"}],"name":"getTopPosts","outputs":[{"components":[{"internalType":"address","name":"creator","type":"address"},{"internalType":"string","name":"contentUrl","type":"string"},{"internalType":"uint256","name":"votes","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"},{"internalType":"bool","name":"rewardClaimed","type":"bool"}],"internalType":"struct Submission.Post[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"hasVoted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"operators","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"postCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"posts","outputs":[{"internalType":"address","name":"creator","type":"address"},{"internalType":"string","name":"contentUrl","type":"string"},{"internalType":"uint256","name":"votes","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"},{"internalType":"bool","name":"rewardClaimed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"removeOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_contentUrl","type":"string"}],"name":"submitPost","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postId","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"payable","type":"function"}];

export default contract_abi;