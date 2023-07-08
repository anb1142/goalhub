import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import {
	Box,
	Card,
	CardContent,
	CircularProgress,
	IconButton,
	Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { IGoal } from "../services/goals/goal.type";
import { goalActions, useGoals } from "../store/goals/goal.slice";
import { useEffect, useState } from "react";

type GoalButtonProps = {
	icon: React.ReactElement;
	color: string;
	loading: boolean;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
};
function GoalButton(props: GoalButtonProps) {
	return (
		<IconButton sx={{ color: props.color }} onClick={props.onClick}>
			{props.loading ? <CircularProgress size={24} color="inherit" /> : props.icon}
		</IconButton>
	);
}

function GoalItem(props: { goal: IGoal }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState({ done: false, delete: false });
	const { isLoading } = useGoals();
	useEffect(() => {
		if (!isLoading) setLoading({ done: false, delete: false });
	}, [isLoading]);
	return (
		<Card sx={{ width: "100%", bgcolor: "#eee" }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					px: 1,
				}}
			>
				<Typography
					sx={{
						fontSize: 12,
						color: "#888",
					}}
				>
					{new Date(props.goal.createdAt).toISOString().substring(0, 10)}
				</Typography>
				<Box sx={{ pt: 0.5 }}>
					<GoalButton
						color={!props.goal.done ? "green" : "gray"}
						icon={!props.goal.done ? <DoneIcon /> : <CloseIcon />}
						loading={loading.done}
						onClick={() => {
							dispatch(goalActions.markGoal(props.goal._id));
							setLoading((prev) => ({
								...prev,
								done: true,
							}));
						}}
					/>

					<IconButton sx={{ color: "black" }}>
						<EditIcon />
					</IconButton>

					<GoalButton
						color="#ff2424"
						icon={<DeleteIcon />}
						loading={loading.delete}
						onClick={() => {
							dispatch(goalActions.removeGoal(props.goal._id));
							setLoading((prev) => ({
								...prev,
								delete: true,
							}));
						}}
					/>
				</Box>
			</Box>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						// bgcolor: "red",
					}}
				>
					<Typography
						sx={{
							wordBreak: "break-all",
						}}
					>
						{props.goal.text}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
}

export default GoalItem;
