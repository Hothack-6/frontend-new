import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useForm } from 'react-hook-form';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { Login } from '../components/Login';

// GraphQL query to fetch concert details by ID
const GET_CONCERT_DETAILS = gql`
  query GetConcertDetails($concertId: ID!) {
    concertByID(_id: $concertId) {
      _id
      name
      price
      base_image
      description
      available_tickets
    }
  }
`;

const PurchaseTickets = gql`
    mutation purchaseTickets($ticketInfo: CreateTicketInput) {
        purchaseTicket(ticketInfo: $ticketInfo) {
            _id
        }
    }
`;

const CreateUser = gql`
    mutation createUser($user: CreateUserInput!) {
        createUser(user: $user){
            _id
        }
    }`

export const PaymentsPage = () => {
  const { concert_id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  const { data, loading, error } = useQuery(GET_CONCERT_DETAILS, {
    variables: { concertId: concert_id },
  });
  const [purchaseTickets] = useMutation(PurchaseTickets);
  const [createUser] = useMutation(CreateUser);


  useEffect(() => {
    if (user) {
      setValue('email', user.email);
      setValue('name', user.name);

    }
  }, [setValue, user, loading]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No concert data found</p>;

  // Accessing the concert details from the data object
  const { name, price } = data.concertByID;

  const onSubmit = async (event) => {
    const dbUser = await createUser({
        variables: {
            user: {
                email: user.email,
                first_name: user.given_name
            }
        }
    })
    const purchasedTickets = await purchaseTickets({
        variables: {
            ticketInfo: {
                user_id: dbUser.data.createUser._id,
                concert_id
            }
        }
    })
  };

  const goBack = (event) => {
    event.preventDefault();
    navigate(`/concert/${concert_id}`);
  };


  return (
    <div className="payment-container">
      {user ? (
        <form onSubmit={handleSubmit(onSubmit)} className="payment-form">
          <h3 className="payment-title">Make a Payment for {name}</h3>
          <p className="user-email">Email: {user.email}</p>
          <input
            type="text"
            placeholder="Name on Card"
            {...register("nameOnCard")}
            className="payment-input"
          />
          <input
            type="text"
            placeholder="Card Number"
            {...register("cardNumber")}
            className="payment-input"
          />
          <div className="expiry-cvv">
            <input
              type="text"
              placeholder="Expiry Date"
              {...register("expiryDate")}
              className="payment-input expiry"
            />
            <input
              type="text"
              placeholder="CVV"
              {...register("cvv")}
              className="payment-input cvv"
            />
          </div>
          <input
            type="text"
            placeholder="Wallet Address"
            {...register("walletAddress")}
            className="payment-input"
          />
          <textarea
            placeholder="Bio"
            {...register("bio")}
            className="payment-textarea"
          />
          <div className="ticket-info">
            <span>1x Ticket to {name}</span>
            <span className="ticket-price">${price.toFixed(2)}</span>
          </div>
          <div className="form-actions">
            <button type="button" className="back-button" onClick={goBack}>Back</button>
            <button type="submit" className="pay-now">Pay Now</button>
          </div>
          <p className="wallet-info">
            * A wallet address is required to collect NFTs for the performances you attend.
            If you do not have a wallet, we recommend installing 
            <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">
              Metamask
            </a>. However, a wallet is not required to complete registration and purchase tickets.
          </p>
        </form>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default PaymentsPage;
