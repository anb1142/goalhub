import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../store/auth/auth.slice";
import { goalActions, useGoals } from "../store/goals/goal.slice";
import GoalItem from "./GoalItem";
import { Collapse, Skeleton, Stack, Typography } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
function Goals() {
	const dispatch = useDispatch();
	const { goals, isLoading, fetched } = useGoals();
	const { user } = useAuth();
	useEffect(() => {
		dispatch(goalActions.getGoals());
	}, [user]);

	return (
		<>
			{goals.length > 0 ? (
				<Stack width={{ md: "50vh", xd: "95vw" }}>
					<TransitionGroup>
						{goals.map((goal) => (
							<Collapse
								sx={{
									mb: 2,
								}}
								key={goal._id}
							>
								<GoalItem goal={goal} />
							</Collapse>
						))}
					</TransitionGroup>
				</Stack>
			) : !fetched && isLoading ? (
				<>
					{[...Array(4).keys()].map((_) => (
						<Skeleton
							variant="rectangular"
							sx={{
								width: { md: "50vh", xd: "95vw" },
								mb: 2,
							}}
							animation="wave"
							height={120}
						/>
					))}
				</>
			) : (
				<Typography>You got no goals</Typography>
			)}
		</>
	);
}

export default Goals;
