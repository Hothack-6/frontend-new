// import Link from "next/link";
// import Image from "next/image";
import React from "react";
import { Link } from "react-router-dom";

export default function ConcertCard(props) {
  const { concertData } = props;
  const concertLink = `/concert/${concertData._id}`;
  const newStartDate = Intl.DateTimeFormat("en-au", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(concertData.start)
  return (
    <div>
      <Link to={concertLink}>
      <h3>{concertData.name}</h3>
        <img
          src={concertData.base_image}
          alt={`Image of ${concertData.artist}`}
          width={200}
          height={200}
          className="cover"
        />
        <p>{newStartDate}</p>
        <p>${concertData.price}</p>
      </Link>
    </div>
  );
}
