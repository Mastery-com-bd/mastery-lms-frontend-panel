import BookPage from "@/components/public/books/book-page";
import { getAllBooks } from "@/service/books";

export type TSearchParams = Promise<{
  [key: string]: string | string[] | number | undefined;
}>;

const AllBookPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const result = await getAllBooks(query);
  const books = result?.data?.products?.data || [];
  const meta = result?.data?.products?.meta;

  return (
    <div>
      <BookPage books={books} meta={meta} />
    </div>
  );
};

export default AllBookPage;
