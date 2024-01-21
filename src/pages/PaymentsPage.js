import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import { Login } from "../components/Login";
import { useParams } from "react-router-dom"; // Import useParams

export const PaymentsPage = () => {
    const { concert_id } = useParams(); // Retrieve concert_id from URL parameters
    const { user } = useAuth0();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({});

    const onSubmit = (data) => console.log(data);

    useEffect(() => {
        if (!user || !user.email) {
            return;
        }
        setValue("email", user.email);
    }, [setValue, user]);

    return (
        <div className="payment-container">
            {user ? (
                <div className="payment-form">
                    <h3 className="payment-title">Make a Payment</h3>
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
                        <span>1x Ticket to P!NK Summer Carnival</span>
                        <span className="ticket-price">$200.00</span>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="back-button">Back</button>
                        <button type="submit" className="pay-now">Pay Now</button>
                    </div>
                </div>
            ) : (
                <Login />
            )}
        </div>
    );
};

