import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "./Input";
import { createGoal } from "../features/goals/goalSlice";

function GoalForm() {
	const [text, setText] = useState("");
	const dispatch = useDispatch();
	const onChange = (e) => {
		setText(e.target.value);
	};
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createGoal({ text }));
		setText("");
	};
	useState(() => {}, []);
	return (
		<section className="form">
			<form onSubmit={onSubmit}>
				<label htmlFor="text"></label>
				<Input type="text" id="text" value={text} ph={`Text`} onChange={onChange} />
				<div className="form-group">
					<button className="btn btn-block">Add Goal</button>
				</div>
			</form>
		</section>
	);
}

export default GoalForm;
