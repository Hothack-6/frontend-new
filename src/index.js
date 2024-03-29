import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import "./globals.css";
import Home from "./pages/Home";
import ConcertProfile from "./pages/ConcertProfile";
import NavBar from "./components/Navbar";
import { AuthProvider } from "./components/AuthProvider";
import Mint from "./pages/Mint";
import { PaymentsPage } from "./pages/PaymentsPage";
import { ConfirmTicket } from "./pages/ConfirmTicket";

export default function App() {
	const client = new ApolloClient({
		uri: process.env.REACT_APP_BACKEND || "http://localhost:8000/graphql",
		cache: new InMemoryCache(),
	});

	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="/concert/:concert_id" element={<ConcertProfile />} />
						<Route path="/mint/:ticket_id" element={<Mint />} />
						<Route path="/payments/:concert_id" element={<PaymentsPage />} />
						<Route
							path="/concert-tickets/:ticket_id"
							element={<ConfirmTicket />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</ApolloProvider>
	);
}

function Layout() {
	return (
		<html lang="en">
			<body className="background_color text-white m-0">
				<AuthProvider>
					<NavBar />
					<Outlet />
				</AuthProvider>
			</body>
		</html>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
