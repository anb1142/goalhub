import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../store/auth/auth.slice";
import { goalActions, useGoals } from "../store/goals/goal.slice";
import GoalItem from "./GoalItem";
import { Collapse, Skeleton, Stack, Typography } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { IGoals } from "../services/goals/goal.type";

function GoalList(props: { goals: IGoals }) {
	return (
		<Stack width={{ md: "50vh", xd: "95vw" }}>
			<TransitionGroup>
				{props.goals.map((goal) => (
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
	);
}

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
				<>
					<GoalList goals={goals.filter((goal) => !goal.done)} />
					<GoalList goals={goals.filter((goal) => goal.done)} />
				</>
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
