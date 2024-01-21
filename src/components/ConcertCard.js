// import Link from "next/link";
// import Image from "next/image";
import React from "react";
import { Link } from "react-router-dom";

export default function ConcertCard(props) {
  const { concertData } = props;
  const concertLink = `/concert/${concertData._id}`;


  return (
    <div>
      <Link to={concertLink} className="concertCard">
      <div className="cardContent">
      <h3 className="concertName">{concertData.name}</h3>
      <h3 className="concertInfo">{concertData.artist}</h3>
      <div className="datecostField">
      <p>{concertData.startDate}</p>
      <p>{concertData.price}</p>
      </div>
      </div>
        <img
          src={concertData.base_image}
          alt="Image of {concertData.artist}"
          width={80}
          height={80}
          className="cover"
        />
      </Link>
    </div>
  );
}