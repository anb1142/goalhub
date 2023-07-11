import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, Collapse, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../store/auth/auth.slice";
import { goalActions, useGoals } from "../store/goals/goal.slice";
import { GoalList } from "./GoalList";
import GoalsSkeleton from "./GoalsSkeleton";

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
				<GoalsSkeleton />
			) : (
				<Typography textAlign="center">You got no goals</Typography>
			)}
		</>
	);
}

export default Goals;
