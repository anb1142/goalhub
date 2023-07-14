import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IGoal } from "../../../services/goals/goal.type";
import { goalActions, useGoals } from "../../../store/goals/goal.slice";
import GoalButton from "../../atoms/GoalButton";

const GoalItem = (props: { goal: IGoal }) => {
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
		<Card
			sx={{
				width: "100%",
				bgcolor: "#eee",
			}}
		>
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
						btncolor={!props.goal.done ? "green" : "gray"}
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

					{!props.goal.done && (
						<GoalButton
							btncolor="black"
							sx={{
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
					)}
					<GoalButton
						btncolor="#ff2424"
						icon={<DeleteIcon />}
						loading={loading.delete}
						onClick={remove}
					/>
				</Box>
			</Box>
			<CardContent
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-start",
					width: "100%",
					py: 0,
					pt: 0.5,
					"&:last-child": {
						pb: 1.25,
					},
				}}
				component={"form"}
				onSubmit={editor}
			>
				<TextField
					id={`${edit && "outlined-uncontrolled"}`}
					label={edit && "Edit"}
					size="small"
					value={text}
					onChange={(e) => setText(e.target.value)}
					sx={{
						width: edit ? { lg: "82%", xs: "78%" } : "100%",
						"& fieldset": { border: `${!edit && "none"}` },
						pointerEvents: `${!edit && "none"}`,
						pb: 0,
						mb: 0,
					}}
				/>
				{edit && (
					<Button
						variant="contained"
						type={"submit"}
						sx={{ width: { lg: "15%", xs: "20%" } }}
					>
						Edit
					</Button>
				)}
			</CardContent>
		</Card>
	);
};

export default GoalItem;
