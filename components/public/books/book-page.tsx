"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BookCardV4 from "./book-cardV4";
import { getAllProducts } from "@/lib/data-layer/public";
import PaginatioComponent from "@/components/shared/pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Loader2 } from "lucide-react";

const BookPage = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 12,
    total: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [status, setStatus] = useState("PUBLISHED");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getAllProducts({
          page,
          limit: meta.limit,
          sortBy,
          sortOrder,
          searchTerm: debouncedSearch,
          productStatus: status === "ALL" ? undefined : status,
        });

        if (response.success) {
          setProducts(response.data);
          setMeta((prev) => ({
            ...prev,
            page: response.meta.page,
            total: response.meta.total,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, debouncedSearch, sortBy, sortOrder, status, meta.limit]);

  const totalPage = Math.ceil(meta.total / meta.limit);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#1a1a1a]">
          Our Book Collection
        </h1>
        <p className="text-gray-500">
          Find the best resources for your learning journey.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search books..."
            className="pl-12 h-12 rounded-xl border-gray-200 focus:ring-[#CC0000] focus:border-[#CC0000] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full md:w-[180px] h-12 rounded-xl border-gray-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Products</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={`${sortBy}-${sortOrder}`}
            onValueChange={(value) => {
              const [field, order] = value.split("-");
              setSortBy(field);
              setSortOrder(order);
            }}
          >
            <SelectTrigger className="w-full md:w-[180px] h-12 rounded-xl border-gray-200">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">Newest First</SelectItem>
              <SelectItem value="createdAt-asc">Oldest First</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A-Z</SelectItem>
              <SelectItem value="name-desc">Name: Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
          <Loader2 className="w-12 h-12 text-[#CC0000] animate-spin" />
          <p className="text-gray-500 font-medium">Fetching books...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <BookCardV4
              key={product.id}
              image={product.productImage}
              title={product.name}
              price={product.price}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-xl font-medium">
            No books found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setStatus("PUBLISHED");
              setSortBy("createdAt");
              setSortOrder("desc");
            }}
            className="mt-4 text-[#CC0000] font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPage > 1 && (
        <PaginatioComponent
          pagination={{
            productCount: meta.total,
            totalPage: totalPage,
            page: meta.page,
            per_page: meta.limit,
            hasNext: meta.page < totalPage,
          }}
        />
      )}
    </div>
  );
};

export default BookPage;
