import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./store/auth/auth.slice";
import { useGoals } from "./store/goals/goal.slice";
import { Alert, AlertTitle } from "@mui/material";
function App() {
	const [loading, setLoading] = useState(false);
	const { isLoading: userLoading } = useAuth();
	const { isLoading: goalsLoading } = useGoals();
	useEffect(() => {
		setLoading(userLoading || goalsLoading ? true : false);
	}, [userLoading, goalsLoading]);

	return (
		<>
			<Router>
				<div className="container">
					<Navbar />
					<Routes>
						<Route path="/" element={<Dashboard />}></Route>
						<Route path="/login" element={<Login />}></Route>
						<Route path="/register" element={<Register />}></Route>
					</Routes>
				</div>
			</Router>
			{loading && <Spinner />}

			<ToastContainer />
		</>
	);
}

export default App;
