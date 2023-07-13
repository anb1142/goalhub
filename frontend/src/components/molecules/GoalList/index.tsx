import { Collapse, Stack } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { IGoals } from "../../../services/goals/goal.type";
import GoalItem from "../GoalItem";

export function GoalList(props: { goals: IGoals }) {
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
