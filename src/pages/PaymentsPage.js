import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import { Login } from "../components/Login";
import { useParams } from "react-router-dom"; // Import useParams

export const PaymentsPage = () => {
    const { concert_id } = useParams(); // Retrieve concert_id from URL parameters
    console.log("Payments page is rendering for concert ID:", concert_id); // Logging to check concert_id value
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
        <div className="w-full justify-center flex h-screen">
            {user ? (
                <div className="justify-center align-middle w-1/2 h-screen">
                    <h3>Logged in as {user.email}</h3>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-22 h-1/2 flex flex-col w-full justify-between align-middle"
                    >
                        <div className="flex flex-col">
                            <label>Name</label>
                            <input
                                className="placeholder:black text-black p-2"
                                defaultValue={user.name}
                                {...register("name")}
                            />
                            {errors.name && <span>{errors.name.message?.toString()}</span>}
                        </div>

                        <div className="flex flex-col">
                            <label>Bio</label>
                            <input
                                className="placeholder:black text-black p-2"
                                {...register("bio")}
                            />
                            {errors.bio && <span>{errors.bio.message?.toString()}</span>}
                        </div>

                        <div className="flex flex-col">
                            <label>Wallet Address*</label>
                            <input
                                className="placeholder:black text-black p-2"
                                {...register("walletAddress")}
                            />
                            {errors.walletAddress && (
                                <span>{errors.walletAddress.message?.toString()}</span>
                            )}
                        </div>

                        <p>
                            * A wallet address is required to collect NFTs for the
                            performances you attend. If you do not have a wallet, we recommend
                            installing <a href="https://metamask.io/download/">Metamask</a>.
                            However, a wallet is not required to complete registration and
                            purchase tickets.
                        </p>

                        <input type="submit" />
                    </form>
                </div>
            ) : (
                <Login />
            )}
        </div>
    );
};
