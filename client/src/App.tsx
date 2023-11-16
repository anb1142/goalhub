import { useCallback, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarContainer from "./components/containers/NavbarContainer";
import Spinner from "./components/presentations/Spinner";
import Login from "./pages/Login";
import authService from "./services/auth/auth.service";
import { useAuth } from "./store/auth/auth.slice";
import http from "./utils/http";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
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
			<NavbarContainer />
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
