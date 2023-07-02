import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth/auth.slice";

function Dashboard() {
	const navigate = useNavigate();
	const { user } = useAuth();
	useEffect(() => {
		if (!user) navigate("/login");
	}, [user, navigate]);
	return <h1>Dashboard</h1>;
}

export default Dashboard;
