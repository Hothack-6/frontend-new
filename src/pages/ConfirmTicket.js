import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const RedeemQRCode = gql`
  mutation redeemQRCode($concert_ID: ID!) {
    redeemQRCode(concert_ID: $concert_ID) {
      _id
    }
  }
`;

export const ConfirmTicket = () => {
  const { ticket_id } = useParams();
  const [ticketRedeemed, setTicketRedeemed] = useState(false);
  const [redeemQRCode] = useMutation(RedeemQRCode);

  // TODO: on mount, call redeem ticket mutation
  useEffect(() => {
    redeemQRCode({
      variables: {
        concert_ID: ticket_id,
      },
    }).then(() => {
      setTicketRedeemed(true);
    });
  }, []);

  return (
    <div className="mx-auto">
      {setTicketRedeemed ? (
        <div>
          <p>Thank you for redeeming your ticket!</p>
          <p>Please check your email for a link to minting your NFT!</p>
        </div>
      ) : (
        <>Not redeemed</>
      )}
    </div>
  );
};
