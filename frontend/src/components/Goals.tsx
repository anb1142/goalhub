import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../store/auth/auth.slice";
import { goalActions, useGoals } from "../store/goals/goal.slice";
import GoalItem from "./GoalItem";
import { Stack } from "@mui/material";
function Goals() {
	const dispatch = useDispatch();
	const { goals } = useGoals();
	const { user } = useAuth();

	useEffect(() => {
		dispatch(goalActions.getGoals());
	}, [user]);

	return (
		<>
			{goals.length > 0 ? (
				<Stack
					sx={{
						pb: 5,
					}}
					width={{ md: "50vh", xd: "95vw" }}
					spacing={2}
				>
					{goals.map((goal) => (
						<GoalItem key={goal._id} goal={goal} />
					))}
				</Stack>
			) : (
				<h3>You got no goals</h3>
			)}
		</>
	);
}

export default Goals;
