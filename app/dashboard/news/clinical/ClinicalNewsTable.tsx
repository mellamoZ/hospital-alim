"use client";
import { useState, Suspense } from "react";
import { Input } from "@/components/ui/input";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Link from "next/link";
import { clinical_news as ClinicalNews } from "@prisma/client";
import AddClinicalNews from "./AddClinicalNews";
import DeleteClinicalNews from "./DeleteClinicalNews";

export default function ClinicalNewsTable({
  clinicalNews,
}: {
  clinicalNews: ClinicalNews[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtredClinicalNews = clinicalNews.filter((news) =>
    news.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
  );
  return (
    <div className="rounded-lg border p-2 shadow-sm">
      <div className="flex justify-end gap-3 py-3">
        <Input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2"
        />

        <AddClinicalNews />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="min-w-[150px]">Title</TableHead>
            <TableHead className="hidden md:table-cell">Body</TableHead>
            <TableHead className="hidden sm:table-cell">Date</TableHead>
            <TableHead className="hidden sm:table-cell">Image</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback={<div>Loading...</div>}>
            {filtredClinicalNews.map((news) => (
              <TableRow key={news.clinical_news_id}>
                <TableCell className="font-medium">
                  {news.clinical_news_id}
                </TableCell>
                <TableCell>{news.title}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {news.body}
                </TableCell>
                <TableCell className=" sm:table-cell">
                  {news.date.toLocaleString()}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {news.image ? (
                    <Link
                      className="inline-block rounded-md bg-blue-400 px-4 py-2 text-white hover:bg-blue-600"
                      target="_blank"
                      href={news.image}
                    >
                      View
                    </Link>
                  ) : (
                    <span className="text-gray-500">No image</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DeleteClinicalNews id={news.clinical_news_id} />
                </TableCell>
              </TableRow>
            ))}
          </Suspense>
        </TableBody>
      </Table>
    </div>
  );
}
