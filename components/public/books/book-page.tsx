import BookCard from "./book-card";

const BookPage = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 12 }, (_, i) => (
          <BookCard
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
