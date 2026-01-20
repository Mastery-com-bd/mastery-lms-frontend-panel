import React from "react";
import BookCard from "./book-card";
import BookCardV2 from "./book-cardV2";
import BookCardV4 from "./book-cardV4";

const BookPage = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 space-y-10">
      <div className="grid grid-cols-3 gap-4">
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
      <h2 className="text-2xl font-bold">Version 2</h2>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 12 }, (_, i) => (
          <BookCardV2
            key={i}
            image={`/books/${i + 1}.jpg`}
            title={`Book ${i + 1}`}
            price={i * 10 + 10}
            originalPrice={i * 10 + 20}
          />
        ))}
      </div>
      <h2 className="text-2xl font-bold">Version 3</h2>
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
