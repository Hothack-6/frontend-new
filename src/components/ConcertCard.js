// import Link from "next/link";
// import Image from "next/image";
import React from "react";
import { Link } from "react-router-dom";

export default function ConcertCard(props) {
  const { concertData } = props;
  const concertLink = `/concert/${concertData._id}`;

  return (
    <div>
      <Link to={concertLink}>
        <img
          src={concertData.base_image}
          alt="Image of {concertData.artist}"
          width={200}
          height={200}
          className="cover"
        />
        <h3>{concertData.name}</h3>
        <h3>{concertData.artist}</h3>
        <p>{concertData.start}</p>
      </Link>
    </div>
  );
}
