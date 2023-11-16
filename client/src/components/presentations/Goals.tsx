import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, Collapse, Divider, Typography } from "@mui/material";
import { IGoals } from "../../services/goals/goal.type";
import { GoalList } from "./GoalList";
import GoalsSkeleton from "./GoalsSkeleton";

type IGoalsProps = {
	goals: IGoals;
	todo: IGoals;
	done: IGoals;
	isLoading: boolean;
	fetched: boolean;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function Goals(props: IGoalsProps) {
	// TODO reduce nesting
	return (
		<>
			{props.goals.length > 0 ? (
				<>
					<GoalList goals={props.todo} />
					{props.done.length > 0 && (
						<>
							<Box sx={{ my: 2 }} onClick={() => props.setOpen((prev) => !prev)}>
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
									<Box>{props.open ? <ExpandLess /> : <ExpandMore />}</Box>
								</Typography>
								<Divider />
							</Box>
							<Collapse in={props.open}>
								<GoalList goals={props.done} />
							</Collapse>
						</>
					)}
				</>
			) : !props.fetched && props.isLoading ? (
				<GoalsSkeleton />
			) : (
				<Typography textAlign="center">You got no goals</Typography>
			)}
		</>
	);
}

export default Goals;
