import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { goalActions } from "../store/goals/goal.slice";
import Input from "./Input";

function GoalForm() {
	const [text, setText] = useState("");
	const dispatch = useDispatch();
	const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setText(e.target.value);
	};
	const onSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		dispatch(goalActions.createGoal({ text }));
		setText("");
	};
	return (
		<section className="form">
			<form onSubmit={onSubmit}>
				<label htmlFor="text"></label>
				<Input
					type="text"
					name="text"
					value={text}
					placeholder={`Text`}
					onChange={onChange}
				/>
				<div className="form-group">
					<button className="btn btn-block">Add Goal</button>
				</div>
			</form>
		</section>
	);
}

export default GoalForm;
