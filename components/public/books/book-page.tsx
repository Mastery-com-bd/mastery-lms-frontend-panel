import { TBooks } from "@/type/books.types";
import BookCardV4 from "./book-cardV4";
import { TMeta } from "@/type/meta.types";

type TBookPageProps = { books: TBooks[]; meta: TMeta };

const BookPage = ({ books, meta }: TBookPageProps) => {
  return (
    <div>
      <h2 className=" w-full text-primary text-5xl font-bold text-center pt-10">
        All Products
      </h2>
      <div className="grid grid-cols-3 gap-4 max-w-285 mx-auto py-20">
        {books.map((book) => (
          <BookCardV4 key={book?.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookPage;
