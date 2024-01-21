/* eslint-disable react/jsx-no-target-blank -- I am the captain now */
import React, { useState } from "react";
import "./Mint.css";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useAuth0 } from "@auth0/auth0-react";

const GET_CONCERTS_BY_ID = gql`
	query concertsByID($_id: ID!) {
		concertByID(_id: $_id) {
			_id
			name
			start
			artist
			description
			base_image
			token_id
		}
	}
`;

const GET_USER_BY_EMAIL = gql`
	query userByEmail($email: STRING!) {
		userByEmail(email: $email) {
			email
		}
	}
`;

const Mint = () => {
	// Concert ID from URL
	const { concert_id } = useParams();
	const { user } = useAuth0();
	const [userWallet, setUserWallet] = useState();
	const [isMinting, setIsMinting] = useState(false);
	const [hasClaimed, setHasClaimed] = useState(false);

	// Load concert by id
	const { loading, error, data } = useQuery(GET_CONCERTS_BY_ID, {
		variables: {
			_id: concert_id,
		},
	});

	const concertData = data?.concertByID;

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;
	if (!concertData) return <p>No data</p>;

	// Parse and format the start date
	const startDateTime = format(new Date(concertData.start), "MMM dd, yyyy");

	return (
		<div className="page-container">
			<div className="image-container">
				<img
					className="concert-image"
					src={concertData.base_image}
					alt={concertData.name}
				/>
			</div>
			<div className="content-container">
				<div className="content">
					<h1 className="title">
						We hope you enjoyed {concertData.name} on {startDateTime}!
					</h1>
					<p className="description">
						We would like to offer a FREE collectible NFT to remember your
						experience with. To claim, please make sure you have a wallet. If
						you do not have a wallet, we recommend installing{" "}
						<a target="_blank" href="https://metamask.io/download/">
							Metamask.
						</a>
					</p>
				</div>
				{hasClaimed ? (
					<div className="thank-you">
						<p>Thank you for claiming your NFT!</p>
						<p>
							<a
								target="_blank"
								href={`https://testnets.opensea.io/assets/arbitrum-sepolia/0x9ebcfbd21ba17c17a24af0b364c65454e1ee406f/${concertData.token_id}`}
							>
								View on OpenSea
							</a>
						</p>
						<p>
							<a
								target="_blank"
								href="https://sepolia.arbiscan.io/address/0x9ebcfbd21ba17c17a24af0b364c65454e1ee406f"
							>
								View Transaction
							</a>
						</p>
					</div>
				) : (
					<div className="content-container">
						<p>Input your wallet address here:</p>
						{user && (
							<input
								className="wallet-input"
								value={userWallet}
								onChange={(e) => {
									setUserWallet(e.target.value);
								}}
							/>
						)}
						{!isMinting ? (
							<button
								className="mint"
								disabled={!userWallet}
								onClick={() => {
									setIsMinting(true);
									setTimeout(() => {}, 10000);
									setIsMinting(false);
									setHasClaimed(true);
								}}
							>
								MINT
							</button>
						) : (
							<p>Minting...</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Mint;
