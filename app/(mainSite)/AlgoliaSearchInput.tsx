"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import { searchAlgoliaRecords } from "@/lib/algolia/algoliaCRUD";
import { Command, CommandGroup, CommandList } from "@/components/ui/command";
import Link from "next/link";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";

interface Record {
  description: string;
  page: string;
}

interface AlgoliaSearchInputProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlgoliaSearchInput: React.FC<AlgoliaSearchInputProps> = ({
  setDialogOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchAlgoliaRecords(searchQuery);
      setSearchResults(results);
      setLoading(false);
    } catch (error) {
      console.error("Error searching records:", error);
    }
  };

  return (
    <DialogContent className="mt-5 p-5 sm:max-w-[425px]">
      <Command className="mt-5 ">
        <div className="flex">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="mr-2"
          />

          <DialogFooter>
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              {loading ? <LoadingSpinner /> : "Search"}
            </Button>
          </DialogFooter>
        </div>

        <CommandList>
          {searchResults.length > 0 ? (
            <CommandGroup heading="Results">
              {searchResults.map((result: any) => (
                <Link
                  onClick={() => setDialogOpen(false)}
                  href={`/${result.page}`}
                  key={result.objectID}
                >
                  <p className="my-2 rounded-md bg-white p-4 text-slate-700 shadow-md">
                    {result.page}
                  </p>
                </Link>
              ))}
            </CommandGroup>
          ) : (
            <p className="mt-4 text-gray-500">No result</p>
          )}
        </CommandList>
      </Command>
    </DialogContent>
  );
};

export default AlgoliaSearchInput;
