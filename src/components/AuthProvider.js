import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

export const AuthProvider = ({ children }) => (
  <Auth0Provider
    domain={"https://hothack2.au.auth0.com"}
    clientId={"VxM75q1Qa1OqjzR4PusNr27FPzVkngn8"}
    authorizationParams={{
      redirect_uri: "http://localhost:3000",
    }}
  >
    {children}
  </Auth0Provider>
);
