import { Box, Button, CircularProgress } from "@mui/material";
import {
	Control,
	FieldErrors,
	SubmitHandler,
	UseFormHandleSubmit,
} from "react-hook-form";
import AppInput from "./AppInput";

type IGoalFormInput = {
	text: string;
};

type IGoalFormProps = {
	loading: boolean;
	handleSubmit: UseFormHandleSubmit<IGoalFormInput, undefined>;
	onSubmit: SubmitHandler<IGoalFormInput>;
	control: Control<IGoalFormInput, any>;
	errors: FieldErrors<IGoalFormInput>;
};

const GoalForm = (props: IGoalFormProps) => {
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
			onSubmit={props.handleSubmit(props.onSubmit)}
		>
			<AppInput
				label="Text"
				name="text"
				size="small"
				sx={{
					width: { lg: "71%", md: "76%", sm: "78%", xs: "68%" },
				}}
				error={props.errors.text ? true : false}
				helperText={props.errors.text?.message}
				control={props.control}
			/>
			<Button
				type="submit"
				sx={{
					fontSize: { lg: "1.6vh", md: "1.5vw", sm: "1.8vw", xs: "3.7vw" },
					width: { lg: "28%", md: "22%", sm: "20%", xs: "30%" },
					px: { xs: 0 },
				}}
				variant="contained"
				disabled={props.loading}
			>
				{props.loading ? (
					<CircularProgress size={27} color="inherit" />
				) : (
					<>Add Goal</>
				)}
			</Button>
		</Box>
	);
};

export default GoalForm;
