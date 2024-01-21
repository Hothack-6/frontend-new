import React, { useState } from "react";
import "./ConcertProfile.css";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const GET_CONCERTS_BY_ID = gql`
  query concertsByID($_id: ID!) {
    concertByID(_id: $_id) {
      _id
      name
      start
      price
      available_tickets
      base_image
      description
      end
    }
  }
`;

// const PurchaseTickets = gql`
// mutation purchaseTickets($ticketInfo: CreateTicketInput) {
//   purchaseTicket(ticketInfo: $ticketInfo) {
//     _id
//   }
// }`

const ConcertProfile = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  // const [purchaseTickets, mutationReturn] = useMutation(PurchaseTickets);
  const [ticketCount, setTicketCount] = useState(1);
  const navigate = useNavigate();
  // Concert ID from URL
  const { concert_id } = useParams();

  // Load concefrt by id
  const { loading, error, data } = useQuery(GET_CONCERTS_BY_ID, {
    variables: {
      _id: concert_id,
    },
  });



  if (loading ) return <p>Loading...</p>;
  if (error ) return <p>Error : {error.message }</p>;
  if (!data) return <p>No data</p>;

  // Function to handle ticket count change
  const handleTicketCountChange = (increment) => {
    setTicketCount((prev) =>
      increment ? prev + 1 : prev > 1 ? prev - 1 : prev
    );
  };

  // Parse and format the start date
  const startDateTime = new Date(data.concertByID.start);
  const uiFriendlyStart = startDateTime.toLocaleString("en-AU", {
    timeZone: "Australia/Brisbane",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
  });

  // Boolean to determine if concert is SOLD OUT
  const soldOut = data.concertByID.available_tickets < 1000
  
  const backgroundImageStyle = {
    backgroundImage: `url('${data.concertByID.base_image}')`,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAuthenticated && user ) {
      navigate(`/payments/${concert_id}`)
      // purchaseTickets(
      //   { variables: { 
      //     ticketInfo: {
      //       user_id: "65ab4cf4747e9c24531475a7", 
      //       concert_id
      //     }
      //   }
      // }
      // )
    }
    else {
      loginWithRedirect()
    }
  }

  return (
    <div className="page-container">
      <div className="main-image" style={backgroundImageStyle}></div>
      <div className="content-container">
        <div className="content">
          <h1 className="title">{data.concertByID.name}</h1>
          <p className="description">{data.concertByID.artist}</p>
          <p className="description">{data.concertByID.description}</p>
          <div className="details">
            <span className="location">Brisbane</span>
            <span className="datetime">{uiFriendlyStart}</span>
            <span className="price">${data.concertByID.price}pp</span>
          </div>
        </div>
        <div className="actions">
          <div className={soldOut ? "hidden" : "ticket-selector"}>
            <button onClick={() => handleTicketCountChange(false)}>-</button>
            <span className="ticket-count">{ticketCount}</span>
            <button onClick={() => handleTicketCountChange(true)}>+</button>
          </div>
          <p className={soldOut ? "soldOut" : "hidden"}>SOLD OUT</p>
          <button className={soldOut ? "hidden" : "book-now"} onClick={handleSubmit}>BOOK NOW</button>
        </div>
        <p className="nft-info">
          With each ticket you receive an event unique NFT to accredit your
          attendance. Hold onto this special Memorabilia, it might be worth more
          in the future!
        </p>
      </div>
    </div>
  );
};

export default ConcertProfile;
