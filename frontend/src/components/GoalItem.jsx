import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

function GoalItem({ goal }) {
	const dispatch = useDispatch();
	return (
		<div className="goal">
			<div>{new Date(goal.createdAt).toLocaleDateString()}</div>
			<div className="h2">{goal.text}</div>
			<button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
				&times;
			</button>
		</div>
	);
}

export default GoalItem;
