import Tour from "./Tour";

interface Tour {
  id: string;
  name: string;
  info: string;
  image: string;
  price: string;
}

interface TourListProps {
  tours: Tour[];
}

const TourList = ({ tours }: TourListProps): JSX.Element => {
  return (
    <section>
      <div className="title">
        <h2>our tours</h2>
        <div className="underline"></div>
      </div>
      <div>
        {tours.map((tour) => (
          <Tour key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
};

export default TourList;
