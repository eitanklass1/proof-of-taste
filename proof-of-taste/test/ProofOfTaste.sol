// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {ProofOfTaste as PoT} from "../src/ProofOfTaste.sol";

contract ProofOfTasteTest is Test {
    PoT public counter;

    function setUp() public {
        counter = new PoT();
    }

    function test_SubmitPost() public {
        counter.submitPost{value: 0.01 ether}("https://example.com");
        assertEq(counter.postCount(), 1);
        (
            address creator,
            string memory contentUrl,
            uint256 votes,
            ,
            ,

        ) = counter.posts(1);
        assertEq(creator, address(this));
        assertEq(contentUrl, "https://example.com");
        assertEq(votes, 1);
    }

    function test_Vote() public {
        counter.submitPost{value: 0.01 ether}("https://example.com");

        // Simulate a different user voting
        address voter1 = address(0x1);
        vm.deal(voter1, 1 ether); // Assign 1 ether to voter1

        vm.prank(voter1);
        counter.vote{value: 0.001 ether}(1);

        (, , uint256 votes, , , ) = counter.posts(1);
        assertEq(votes, 2);
    }

    function test_CurrentDayLessThanFivePosts() public {
        for (uint256 i = 0; i < 4; i++) {
            counter.submitPost{value: 0.01 ether}(
                string(abi.encodePacked("https://example.com/", i))
            );
        }
        uint256[] memory topPosts = counter.getTopPosts(
            counter.getCurrentDay()
        );
        assertEq(topPosts.length, 4);
    }

    function test_VotingTies() public {
        counter.submitPost{value: 0.01 ether}("https://example.com/1");
        counter.submitPost{value: 0.01 ether}("https://example.com/2");

        // Simulate different users voting
        address voter1 = address(0x1);
        address voter2 = address(0x2);
        vm.deal(voter1, 1 ether); // Assign 1 ether to voter1
        vm.deal(voter2, 1 ether); // Assign 1 ether to voter2

        vm.prank(voter1);
        counter.vote{value: 0.001 ether}(1);

        vm.prank(voter2);
        counter.vote{value: 0.001 ether}(2);

        uint256[] memory topPosts = counter.getTopPosts(
            counter.getCurrentDay()
        );
        assertEq(topPosts.length, 2);
        assertEq(topPosts[0], 1);
        assertEq(topPosts[1], 2);
    }
}
