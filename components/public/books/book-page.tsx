import BookCardV4 from "./book-cardV4";

const BookPage = () => {
  return (
    <div>
        <h2 className=" w-full text-primary text-5xl font-bold text-center pt-10">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-285 mx-auto py-20">
        {Array.from({ length: 12 }, (_, i) => (
          <BookCardV4
            key={i}
            image={`/books/${i + 1}.jpg`}
            title={`Book ${i + 1}`}
            price={i * 10 + 10}
            originalPrice={i * 10 + 20}
          />
        ))}
      </div>
    </div>
  );
};

export default BookPage;
