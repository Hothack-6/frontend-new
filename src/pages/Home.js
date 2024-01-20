import { useQuery, gql } from "@apollo/client";
import ConcertCard from "../components/ConcertCard";

const GET_CONCERTS = gql`
  query concerts {
    concerts {
      _id
      name
      artist
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
      <h1>Book your concert</h1>
      <p>Show Results for: Brisbane</p>
      <section>
        {data.concerts.map((concertData, key) => (
          <ConcertCard key={key} concertData={concertData} />
        ))}
      </section>
    </article>
  );
}
