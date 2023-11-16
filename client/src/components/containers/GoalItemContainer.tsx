import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { goalActions, useGoals } from "../../store/goals/goal.slice";
import GoalItem from "../presentations/GoalItem";
import { IGoal } from "../../services/goals/goal.type";

type IGoalItemContainerProps = { goal: IGoal };
const GoalItemContainer = (props: IGoalItemContainerProps) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState({
		done: false,
		edit: false,
		delete: false,
	});
	const [edit, setEdit] = useState(false);
	const [text, setText] = useState(props.goal.text);
	const { isLoading } = useGoals();
	useEffect(() => {
		if (!isLoading) {
			setLoading({ done: false, edit: false, delete: false });
			setEdit(false);
			setText(props.goal.text);
		}
	}, [isLoading, props.goal]);

	const editor: React.FormEventHandler = (e) => {
		e.preventDefault();
		if (props.goal.text === text) return setEdit(false);
		setLoading((prev) => ({
			...prev,
			edit: true,
		}));
		dispatch(goalActions.updateGoal({ _id: props.goal._id, text: text }));
	};
	const remove: React.FormEventHandler = () => {
		setLoading((prev) => ({
			...prev,
			delete: true,
		}));
		dispatch(goalActions.removeGoal(props.goal._id));
	};
	const done: React.FormEventHandler = () => {
		dispatch(goalActions.markGoal(props.goal._id));
		setLoading((prev) => ({
			...prev,
			done: true,
		}));
	};
	return (
		<GoalItem
			edit={edit}
			goal={props.goal}
			text={text}
			setText={setText}
			setEdit={setEdit}
			loading={loading}
			done={done}
			remove={remove}
			editor={editor}
		/>
	);
};

export default GoalItemContainer;
