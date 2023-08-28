import { useCallback, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./components/atoms/Spinner";
import Navbar from "./components/organisms/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import authService from "./services/auth/auth.service";
import { useAuth } from "./store/auth/auth.slice";
import http from "./utils/http";
function App() {
	const { isLoading: userLoading, user } = useAuth();
	const navigate = useNavigate();

	const confirmUser = useCallback(async () => {
		if (!userLoading && !!user?.token) {
			try {
				await http.get(`/users/me`);
			} catch (error) {
				authService.logout();
				navigate("/login");
			}
		}
	}, [userLoading, user, navigate]);

	useEffect(() => {
		confirmUser();
	}, [confirmUser]);

	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Dashboard />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/register" element={<Register />}></Route>
			</Routes>

			{userLoading && <Spinner />}

			<ToastContainer />
		</>
	);
}

export default App;
