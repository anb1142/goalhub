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
import { IGoal } from "../../services/goals/goal.type";
import GoalButton from "./GoalButton";

type IGoalItemProps = {
	goal: IGoal;
	text: string;
	edit: boolean;
	done: React.FormEventHandler;
	remove: React.FormEventHandler;
	editor: React.FormEventHandler;
	setEdit: React.Dispatch<React.SetStateAction<boolean>>;
	setText: React.Dispatch<React.SetStateAction<string>>;

	loading: { done: boolean; edit: boolean; delete: boolean };
};

const GoalItem = (props: IGoalItemProps) => {
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
						loading={props.loading.done}
						onClick={props.done}
					/>

					{!props.goal.done && (
						<GoalButton
							btncolor="black"
							sx={{
								borderRadius: "50%",
								bgcolor: `${props.edit && "primary.main"}`,
								"&:hover, &.Mui-focusVisible": {
									bgcolor: `${props.edit && "primary.main"}`,
								},
							}}
							icon={<EditIcon />}
							loading={props.loading.edit}
							onClick={() => props.setEdit((prev) => !prev)}
						/>
					)}
					<GoalButton
						btncolor="#ff2424"
						icon={<DeleteIcon />}
						loading={props.loading.delete}
						onClick={props.remove}
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
				onSubmit={props.editor}
			>
				<TextField
					id={`${props.edit && "outlined-uncontrolled"}`}
					label={props.edit && "Edit"}
					size="small"
					value={props.text}
					onChange={(e) => props.setText(e.target.value)}
					sx={{
						width: props.edit ? { lg: "82%", xs: "78%" } : "100%",
						"& fieldset": { border: `${!props.edit && "none"}` },
						pointerEvents: `${!props.edit && "none"}`,
						pb: 0,
						mb: 0,
					}}
				/>
				{props.edit && (
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
