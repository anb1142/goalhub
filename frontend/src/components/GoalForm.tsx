import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { goalActions, useGoals } from "../store/goals/goal.slice";

function GoalForm() {
	const [text, setText] = useState("");
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setText(e.target.value);
	};
	const onSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		setLoading(true);
		dispatch(goalActions.createGoal({ text }));
		setText("");
	};
	const { isLoading } = useGoals();
	useEffect(() => {
		if (!isLoading) setLoading(false);
	}, [isLoading]);
	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				py: 3,
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
				sx={{
					width: { lg: "71%", md: "76%", sm: "78%", xs: "68%" },
				}}
			/>
			<Button
				type="submit"
				sx={{
					fontSize: { lg: "1.6vh", md: "1.5vw", sm: "1.8vw", xs: "3.7vw" },
					width: { lg: "28%", md: "22%", sm: "20%", xs: "30%" },
					px: { xs: 0 },
				}}
				variant="contained"
				disabled={loading ? true : false}
			>
				{loading ? <CircularProgress size={27} color="inherit" /> : <>Add Goal</>}
			</Button>
		</Box>
	);
}

export default GoalForm;
