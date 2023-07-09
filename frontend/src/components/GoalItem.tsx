import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	IconButton,
	SxProps,
	TextField,
	Theme,
	Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { IGoal } from "../services/goals/goal.type";
import { goalActions, useGoals } from "../store/goals/goal.slice";
import { useEffect, useState } from "react";

type GoalButtonProps = {
	icon: React.ReactElement;
	sx?: SxProps<Theme>;
	color?: string;
	loading: boolean;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
};
function GoalButton(props: GoalButtonProps) {
	return (
		<IconButton
			sx={props.sx ? props.sx : { color: props.color }}
			onClick={props.onClick}
		>
			{props.loading ? <CircularProgress size={24} color="inherit" /> : props.icon}
		</IconButton>
	);
}

function GoalItem(props: { goal: IGoal }) {
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
	return (
		<Card sx={{ width: "100%", bgcolor: "#eee" }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					pl: 1,
					pr: 0.5,
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

					<GoalButton
						sx={{
							color: "black",
							borderRadius: "50%",
							bgcolor: `${edit && "primary.main"}`,
							"&:hover, &.Mui-focusVisible": {
								bgcolor: `${edit && "primary.main"}`,
							},
						}}
						icon={<EditIcon />}
						loading={loading.edit}
						onClick={() => setEdit((prev) => !prev)}
					/>
					<GoalButton
						color="#ff2424"
						icon={<DeleteIcon />}
						loading={loading.delete}
						onClick={remove}
					/>
				</Box>
			</Box>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<Box
						component={"form"}
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-start",
							width: "100%",
						}}
						onSubmit={editor}
					>
						<TextField
							multiline
							id={`${edit && "outlined-uncontrolled"}`}
							label={edit && "Edit"}
							size="small"
							value={text}
							onChange={(e) => setText(e.target.value)}
							sx={{
								width: edit ? "80%" : "100%",
								"& fieldset": { border: `${!edit && "none"}` },
								pointerEvents: `${!edit && "none"}`,
							}}
							inputProps={{ spellcheck: "false" }}
						/>
						{edit && (
							<Button variant="contained" type={"submit"} sx={{ width: "15%" }}>
								Edit
							</Button>
						)}
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}

export default GoalItem;
