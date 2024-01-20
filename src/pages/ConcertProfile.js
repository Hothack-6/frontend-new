import React, { useState } from "react";
import "./ConcertProfile.css";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_CONCERTS_BY_ID = gql`
  query concertsByID($_id: ID!) {
    concertByID(_id: $_id) {
      _id
      name
    }
  }
`;

const ConcertProfile = () => {
  // Concert ID from URL
  const { concert_id } = useParams();

  // Load concefrt by id
  const { loading, error, data } = useQuery(GET_CONCERTS_BY_ID, {
    variables: {
      _id: concert_id,
    },
  });
  const [ticketCount, setTicketCount] = useState(1);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No data</p>;

  // Function to handle ticket count change
  const handleTicketCountChange = (increment) => {
    setTicketCount((prev) =>
      increment ? prev + 1 : prev > 1 ? prev - 1 : prev
    );
  };

  // Parse and format the start date
  const startDateTime = new Date(data.start);
  const uiFriendlyStart = startDateTime.toLocaleString("en-AU", {
    timeZone: "Australia/Brisbane",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
  });

  const backgroundImageStyle = {
    backgroundImage: `url('${data.base_image}')`,
  };

  return (
    <div className="page-container">
      <div className="main-image" style={backgroundImageStyle}></div>
      <div className="content-container">
        <div className="content">
          <h1 className="title">{data.name}</h1>
          <p className="description">{data.artist}</p>
          <p className="description">{data.description}</p>
          <div className="details">
            <span className="location">{data.location}</span>
            <span className="datetime">{uiFriendlyStart}</span>
            <span className="price">${data.price}pp</span>
          </div>
        </div>
        <div className="actions">
          <div className="ticket-selector">
            <button onClick={() => handleTicketCountChange(false)}>-</button>
            <span className="ticket-count">{ticketCount}</span>
            <button onClick={() => handleTicketCountChange(true)}>+</button>
          </div>
          <button className="book-now">BOOK NOW</button>
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
