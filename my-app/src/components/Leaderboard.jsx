/**
 * v0 by Vercel.
 * @see https://v0.dev/t/oGutXzRVBuj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table"

function Leaderboard() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <p className="text-gray-500 dark:text-gray-400">Top players of the game</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Rank</TableHead>
            <TableHead>Username</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell className="font-medium">John</TableCell>
            <TableCell className="text-right">12,345</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">2</TableCell>
            <TableCell className="font-medium">Adam</TableCell>
            <TableCell className="text-right">11,987</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">3</TableCell>
            <TableCell className="font-medium">Marcus</TableCell>
            <TableCell className="text-right">10,654</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">4</TableCell>
            <TableCell className="font-medium">Paul</TableCell>
            <TableCell className="text-right">9,876</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">5</TableCell>
            <TableCell className="font-medium">Andrew</TableCell>
            <TableCell className="text-right">8,765</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default Leaderboard;