import { useQuery, gql } from "@apollo/client";
import "./ConcertProfile.css"
import ConcertCard from "../components/ConcertCard";

const GET_CONCERTS = gql`
  query concerts {
    concerts {
      _id
      name
      artist
      base_image
      start
      price
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_CONCERTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No data</p>;

  return (
    <article>
      <div className="listDisplay">
      <h1 className="title2">Book your concert</h1>
      <p>Show Results for: Brisbane</p>
      </div>
      <section className="concertList">
        {data.concerts.map((concertData, key) => (
          <ConcertCard key={key} concertData={concertData} />
        ))}
      </section>
    </article>
  );
}
