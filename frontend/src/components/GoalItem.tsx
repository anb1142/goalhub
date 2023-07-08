import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { IGoal } from "../services/goals/goal.type";
import { goalActions } from "../store/goals/goal.slice";
function GoalItem(props: { goal: IGoal }) {
	const dispatch = useDispatch();
	return (
		<Card sx={{ bgcolor: "#eee" }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					// flexDirection: "column",
					alignItems: "center",
					height: "100%",
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
				<Box
					sx={{
						display: "flex",
						// alignItems: "center",
						// justifyContent: "space-between",
						// flexDirection: "column",
						// mt: -2,
						// mr: -2,
					}}
				>
					<IconButton
						sx={{ color: "green", display: "flex" }}
						// onClick={() => dispatch(goalActions.completeGoal(props.goal._id))}
					>
						<DoneIcon />
					</IconButton>
					<IconButton
						sx={{ color: "black" }}
						// onClick={() => dispatch(goalActions.editGoal(props.goal._id))}
					>
						<EditIcon />
					</IconButton>
					<IconButton
						sx={{ color: "#ff2424" }}
						onClick={() => dispatch(goalActions.removeGoal(props.goal._id))}
					>
						<DeleteIcon />
					</IconButton>
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
