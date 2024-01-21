import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const RedeemQRCode = gql`
    mutation redeemQRCode($concert_id: ID!) {
        redeemQRCode(concert_id: $concert_id) {
            _id
        }
    }
`;

export const ConfirmTicket = () => {
const { ticket_id } = useParams();
const [ticketRedeemed, setTicketRedeemed] = useState(false)
const [redeemQRCode] = useMutation(RedeemQRCode);

	// TODO: on mount, call redeem ticket mutation
	useEffect(() => {
        redeemQRCode({
            variables: {
                concert_id: ticket_id
            }
        }).then(() => {
            setTicketRedeemed(true);
        })
    }, []);

	return <div>{ticket_id}</div>;
};
