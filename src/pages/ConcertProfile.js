import React, { useState } from "react";
import "./ConcertProfile.css";
import { gql, useQuery } from "@apollo/client";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

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

const ConcertProfile = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [ticketCount, setTicketCount] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { concert_id } = useParams();
  const paymentSuccess = location.state?.paymentSuccess;

  const { loading, error, data } = useQuery(GET_CONCERTS_BY_ID, {
    variables: {
      _id: concert_id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No data</p>;

  const handleTicketCountChange = (increment) => {
    setTicketCount((prev) => increment ? prev + 1 : prev > 1 ? prev - 1 : prev);
  };

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

  const soldOut = data.concertByID.available_tickets < 1;

  const backgroundImageStyle = {
    backgroundImage: `url('${data.concertByID.base_image}')`,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAuthenticated) {
      navigate(`/payments/${concert_id}`);
    } else {
      loginWithRedirect();
    }
  };

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
          {paymentSuccess ? (
            <p className="thank-you-message">THANK YOU FOR PURCHASING</p>
          ) : (
            <button className={soldOut ? "hidden" : "book-now"} onClick={handleSubmit}>BOOK NOW</button>
          )}
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
