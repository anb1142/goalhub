import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import { useAuth } from "../store/auth/auth.slice";
import Goals from "../components/Goals";
import Spinner from "../components/Spinner";

function Dashboard() {
	const navigate = useNavigate();
	const { user, isLoading } = useAuth();

	useEffect(() => {
		if (!isLoading && !user?.token) {
			navigate("/login");
		}
	}, [user, navigate]);
	if (isLoading) return <Spinner />;
	return (
		<>
			<section className="heading">
				<h1>Welcome {user && user.name}</h1>
				<p>Goals Dashboard</p>
			</section>
			{user && (
				<>
					<GoalForm />
					<Goals />
				</>
			)}
		</>
	);
}

export default Dashboard;
