import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { goalActions } from "../store/goals/goal.slice";

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
		<Box
			sx={{
				width: { md: "50vh", xs: "95vw" },
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				py: { md: 5, xs: 3 },
			}}
			component={"form"}
			onSubmit={onSubmit}
		>
			<TextField
				fullWidth
				label="Text"
				name="text"
				value={text}
				onChange={onChange}
				size="small"
				sx={{ width: { md: "72%", sm: "82%", xs: "65%" } }}
			/>
			<Button
				type="submit"
				sx={{ width: { md: "25%", sm: "15%", xs: "30%" } }}
				variant="contained"
			>
				Add Goal
			</Button>
		</Box>
	);
}

export default GoalForm;
