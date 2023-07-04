import { useDispatch } from "react-redux";
import { goalActions, useGoals } from "../store/goals/goal.slice";
import GoalItem from "./GoalItem";
import Spinner from "./Spinner";
import { useAuth } from "../store/auth/auth.slice";
import { useEffect } from "react";

function Goals() {
	const dispatch = useDispatch();
	const { goals, isLoading } = useGoals();
	const { user } = useAuth();

	useEffect(() => {
		dispatch(goalActions.getGoals());
	}, [user]);

	if (isLoading) return <Spinner />;

	return (
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
	);
}

export default Goals;
