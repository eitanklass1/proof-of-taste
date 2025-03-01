/**
 * v0 by Vercel.
 * @see https://v0.dev/t/oGutXzRVBuj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { Trophy, Award, Medal } from "lucide-react"; // Import icons

function Leaderboard() {
  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mt-6">
      <div className="bg-gray-100 dark:bg-gray-700 p-4 text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold text-center">Leaderboard</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm">Top 5 players receive payouts</p>
      </div>
      
      <div className="p-4">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-700">
            <TableRow>
              <TableHead className="w-[80px] font-bold">Rank</TableHead>
              <TableHead className="font-bold">Address</TableHead>
              <TableHead className="text-right font-bold">Payout</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
              <TableCell className="font-medium flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                1
              </TableCell>
              <TableCell className="font-medium text-sm">0x7Ac5...4F9E</TableCell>
              <TableCell className="text-right font-bold text-green-600 dark:text-green-400">1.5 ETH</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50 dark:bg-gray-800/50 border-l-4 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
              <TableCell className="font-medium flex items-center gap-2">
                <Award className="h-5 w-5 text-gray-400" />
                2
              </TableCell>
              <TableCell className="font-medium text-sm">0xB4F2...9A3D</TableCell>
              <TableCell className="text-right font-bold text-green-600 dark:text-green-400">0.75 ETH</TableCell>
            </TableRow>
            <TableRow className="bg-amber-50/50 dark:bg-amber-900/10 border-l-4 border-amber-200 hover:bg-amber-100/50 dark:hover:bg-amber-900/20 transition-colors">
              <TableCell className="font-medium flex items-center gap-2">
                <Medal className="h-5 w-5 text-amber-300" />
                3
              </TableCell>
              <TableCell className="font-medium text-sm">0x3E17...6C5B</TableCell>
              <TableCell className="text-right font-bold text-green-600 dark:text-green-400">0.5 ETH</TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <TableCell className="font-medium">4</TableCell>
              <TableCell className="font-medium text-sm">0x8D7F...2A1C</TableCell>
              <TableCell className="text-right font-bold text-green-600 dark:text-green-400">0.25 ETH</TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <TableCell className="font-medium">5</TableCell>
              <TableCell className="font-medium text-sm">0xF5E8...7B4D</TableCell>
              <TableCell className="text-right font-bold text-green-600 dark:text-green-400">0.1 ETH</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center italic">
          Payouts distributed at the end of each period
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;