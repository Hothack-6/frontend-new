// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query users {
    users {
      _id
      email
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_USERS);
  console.log("data", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
  );
}
