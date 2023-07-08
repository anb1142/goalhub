import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./store/auth/auth.slice";
function App() {
	const { isLoading: userLoading } = useAuth();

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
			{userLoading && <Spinner />}

			<ToastContainer />
		</>
	);
}

export default App;
