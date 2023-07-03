import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth/auth.slice";
import { goalActions, useGoals } from "../store/goals/goal.slice";
import Spinner from "../components/Spinner";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import { useDispatch } from "react-redux";

function Dashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useAuth();
	const { goals, message, isLoading } = useGoals();

	useEffect(() => {
		if (message !== "") {
			console.log(message);
		}

		if (!user) navigate("/login");

		dispatch(goalActions.getGoals());
	}, [user, navigate]);

	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			<section className="heading">
				<h1>Welcome {user && user.name}</h1>
				<p>Goals Dashboard</p>
			</section>
			<GoalForm />
			<section className="content">
				{goals.length > 0 ? (
					<div className="goals">
						{goals.map((goal) => (
							<GoalItem key={goal._id} goal={goal} />
						))}
					</div>
				) : (
					<h3>You got no goals</h3>
				)}
			</section>
		</>
	);
}

export default Dashboard;
