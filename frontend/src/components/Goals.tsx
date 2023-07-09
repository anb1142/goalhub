import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
	Box,
	Collapse,
	Divider,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import { IGoals } from "../services/goals/goal.type";
import { useAuth } from "../store/auth/auth.slice";
import { goalActions, useGoals } from "../store/goals/goal.slice";
import GoalItem from "./GoalItem";

function GoalList(props: { goals: IGoals }) {
	return (
		<Stack sx={{ width: "100%" }}>
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
	const [open, setOpen] = useState(false);
	const todo = goals.filter((goal) => !goal.done);
	const done = goals.filter((goal) => goal.done);
	useEffect(() => {
		dispatch(goalActions.getGoals());
	}, [user]);
	useEffect(() => {
		if (done.length === 0) setOpen(false);
	}, [done]);
	return (
		<>
			{goals.length > 0 ? (
				<>
					<GoalList goals={todo} />
					{done.length > 0 && (
						<>
							<Box sx={{ my: 2 }} onClick={() => setOpen((prev) => !prev)}>
								<Typography
									sx={{
										fontSize: 14,
										color: "gray",
										width: "100%",
										cursor: "pointer",
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									Completed
									<Box>{open ? <ExpandLess /> : <ExpandMore />}</Box>
								</Typography>
								<Divider />
							</Box>
							<Collapse in={open}>
								<GoalList goals={done} />
							</Collapse>
						</>
					)}
				</>
			) : !fetched && isLoading ? (
				<>
					{[...Array(4).keys()].map((_) => (
						<Skeleton
							variant="rectangular"
							sx={{
								width: "100%",
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
