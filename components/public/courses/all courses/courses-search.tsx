
"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface QueryType {
  query: string;
  filter: {
    subject: string;
    category: string;
    language: string;
    sort: string;
  };
}

const CoursesSearch = ({ setQuery }: { setQuery: (query: QueryType) => void }) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    subject: "",
    category: "",
    language: "",
    sort: "newest",
  });

  // Debounce search and filters logging
  useEffect(() => {
    const handler = setTimeout(() => {
      if (search || Object.values(filters).some(v => v !== "" && v !== "newest")) {
        setQuery({
          query: search,
          filter: filters,
        });
        console.log("🔍 Search Updated:", {
          query: search,
          filters: filters,
          timestamp: new Date().toLocaleTimeString()
        });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [search, filters,]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative w-full py-20 px-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000"
          alt="Classroom Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col gap-6">
          {/* Main Search Input */}
          <div className="bg-white p-2 shadow-2xl flex items-center group transition-all focus-within:ring-4 focus-within:ring-white/20">
            <div className="pl-6 pr-4">
              <Search className="w-6 h-6 text-gray-400 group-focus-within:text-[#CC0000] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search your favorite course"
              className="flex-1 h-14 bg-transparent border-none outline-none text-xl placeholder:text-gray-300 text-gray-700 font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="bg-[#fff1f1] hover:bg-[#ffe4e4] text-[#CC0000] font-black h-14 px-12 text-lg transition-all active:scale-95 shadow-sm">
              Enter
            </Button>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-center gap-3">
            {[
              { key: "subject", label: "Subject", options: ["Math", "Science", "Arts", "Business"] },
              // { key: "category", label: "Category", options: ["Design", "Development", "Marketing"] },
              { key: "language", label: "Language", options: ["ENGLISH", "BENGALI", "SPANISH"] },
              // { key: "availability", label: "Availability", options: ["All", "Available", "Upcoming"] },
              // { key: "learningType", label: "Learning Type", options: ["Online", "Offline", "Hybrid"] },
            ].map((filter) => (
              <Select
                key={filter.key}
                onValueChange={(value) => handleFilterChange(filter.key, value)}
              >
                <SelectTrigger className="w-full h-14 bg-white border-none text-gray-700 font-bold px-6 shadow-xl focus:ring-2 focus:ring-[#CC0000]/20 transition-all hover:bg-gray-50 rounded-none">
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent className="bg-white border-none shadow-2xl rounded-none">
                  {filter.options.map((opt) => (
                    <SelectItem 
                      key={opt} 
                      value={opt.toUpperCase()}
                      className="py-3 px-4 font-medium focus:bg-[#fff1f1] focus:text-[#CC0000] cursor-pointer"
                    >
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesSearch;