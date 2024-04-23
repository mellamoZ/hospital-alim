"use client";
import { Suspense } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Link from "next/link";
import { general_news as GeneralNews } from "@prisma/client";
import AddNews from "./AddNews";
import DeleteNews from "./DeleteNews";

export default function NewsTable({ news }: { news: GeneralNews[] }) {
  return (
    <div className="rounded-lg border p-2 shadow-sm">
      <div className="flex justify-end gap-3 py-3">
        <AddNews />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="flex">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback={<div>Loading...</div>}>
            {news.map((a_news) => (
              <TableRow key={a_news.general_news_id}>
                <TableCell className="font-medium">
                  {a_news.general_news_id}
                </TableCell>
                <TableCell>
                  <Link
                    className="inline-block rounded-md bg-blue-400 px-4 py-2 text-white hover:bg-blue-600"
                    target="blank"
                    href={`${a_news.fb_url}`}
                  >
                    View
                  </Link>
                </TableCell>

                <TableCell className=" sm:table-cell">
                  {a_news.date.toLocaleString()}
                </TableCell>

                <TableCell>
                  <DeleteNews id={a_news.general_news_id} />
                </TableCell>
              </TableRow>
            ))}
          </Suspense>
        </TableBody>
      </Table>
    </div>
  );
}
