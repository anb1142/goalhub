import { IGoal } from "../services/goals/goal.type";

function GoalItem(props: { goal: IGoal }) {
	return (
		<div className="goal">
			<div>{new Date(props.goal.createdAt).toLocaleDateString()}</div>
			<div className="h2">{props.goal.text}</div>
		</div>
	);
}

export default GoalItem;
