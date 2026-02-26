import { TBooks } from "@/type/books.types";
import BookCardV4 from "./book-cardV4";
import { TMeta } from "@/type/meta.types";

type TBookPageProps = { books: TBooks[]; meta: TMeta };

const BookPage = ({ books, meta }: TBookPageProps) => {
  return (
    <div>
      <h2 className=" w-full text-primary text-5xl font-bold text-center pt-10">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-285 mx-auto py-20">
        {Array.from({ length: 12 }, (_, i) => (
          <BookCardV4
            key={i}
            book={{
              id: String(i + 1),
              name: `Book ${i + 1}`,
              slug: `book-${i + 1}`,
              description: "",
              price: i * 10 + 10,
              sku: `SKU-${i + 1}`,
              stock: 10,
              productStatus: "PUBLISHED",
              productImage: `/books/${i + 1}.jpg`,
              productCategoryId: "",
              productCategory: { id: "", name: "" },
              createdAt: new Date().toISOString(),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BookPage;
