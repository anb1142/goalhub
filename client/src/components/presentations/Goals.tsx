import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, Collapse, Divider, Typography } from "@mui/material";
import { IGoals } from "../../services/goals/goal.type";
import { GoalList } from "./GoalList";
import GoalsSkeleton from "./GoalsSkeleton";

type ICompletedListProps = {
	done: IGoals;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type IGoalsProps = {
	goals: IGoals;
	todo: IGoals;
	done: IGoals;
	isLoading: boolean;
	fetched: boolean;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const DoneList = (props: ICompletedListProps) => (
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
);

function Goals(props: IGoalsProps) {
	if (props.goals.length > 0) {
		return (
			<>
				<GoalList goals={props.todo} />
				{props.done.length > 0 && (
					<DoneList open={props.open} setOpen={props.setOpen} done={props.done} />
				)}
			</>
		);
	} else if (!props.fetched && props.isLoading) {
		return <GoalsSkeleton />;
	}
	return <Typography textAlign="center">You got no goals</Typography>;
}

export default Goals;
