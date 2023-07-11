import { ButtonProps, CircularProgress, IconButton } from "@mui/material";
import { useGoals } from "../store/goals/goal.slice";

interface GoalButtonProps extends ButtonProps {
	icon: React.ReactElement;
	btnColor?: string;
	loading: boolean;
}

function GoalButton(props: GoalButtonProps) {
	const { isLoading } = useGoals();
	return (
		<IconButton
			{...props}
			sx={{
				...props.sx,
				color: props.btnColor || "primary",
				pointerEvents: isLoading ? "none" : "auto",
			}}
			onClick={props.onClick}
			size={"small"}
		>
			{props.loading ? <CircularProgress size={24} color="inherit" /> : props.icon}
		</IconButton>
	);
}
export default GoalButton;
