import { useDispatch } from "react-redux";
import { IGoal } from "../services/goals/goal.type";
import { goalActions } from "../store/goals/goal.slice";

function GoalItem(props: { goal: IGoal }) {
	const dispatch = useDispatch();
	return (
		<div className="goal">
			<div>{new Date(props.goal.createdAt).toLocaleDateString()}</div>
			<div className="h2">{props.goal.text}</div>
			<button
				onClick={() => dispatch(goalActions.removeGoal(props.goal._id))}
				className="close"
			>
				&times;
			</button>
		</div>
	);
}

export default GoalItem;
