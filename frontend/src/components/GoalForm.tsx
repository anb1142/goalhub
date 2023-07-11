import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { goalActions, useGoals } from "../store/goals/goal.slice";
import Input from "./Input";

const goalFormSchema = yup.object().shape({
	text: yup.string().required("Required"),
});

type IGoalFormInput = {
	text: string;
};

function GoalForm() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IGoalFormInput>({
		delayError: 300,
		mode: "onChange",
		resolver: yupResolver(goalFormSchema),
		defaultValues: { text: "" },
	});
	const { isLoading } = useGoals();
	useEffect(() => {
		if (!isLoading) setLoading(false);
	}, [isLoading]);

	const onSubmit: SubmitHandler<IGoalFormInput> = (data) => {
		setLoading(true);
		dispatch(goalActions.createGoal(data));
		reset();
	};
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
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input
				label="Text"
				name="text"
				size="small"
				sx={{
					width: { lg: "71%", md: "76%", sm: "78%", xs: "68%" },
				}}
				error={errors.text ? true : false}
				helperText={errors.text?.message}
				control={control}
			/>
			<Button
				type="submit"
				sx={{
					fontSize: { lg: "1.6vh", md: "1.5vw", sm: "1.8vw", xs: "3.7vw" },
					width: { lg: "28%", md: "22%", sm: "20%", xs: "30%" },
					px: { xs: 0 },
				}}
				variant="contained"
				disabled={loading}
			>
				{loading ? <CircularProgress size={27} color="inherit" /> : <>Add Goal</>}
			</Button>
		</Box>
	);
}

export default GoalForm;
