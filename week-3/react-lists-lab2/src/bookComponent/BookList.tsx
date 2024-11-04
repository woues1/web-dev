
import { books } from "./books";
import Book from "./Book";

interface BookType {
  id: number;
  img: string;
  title: string;
  author: string;
}

function BookList(): JSX.Element {
  return (
    <>
      <h1>Amazon Best Sellers</h1>
      <section className="booklist">
        {books.map((book: BookType) => {
          return <Book key={book.id} book={book} />;
        })}
      </section>
    </>
  );
}

export default BookList;
