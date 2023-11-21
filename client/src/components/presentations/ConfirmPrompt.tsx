import {
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
type IConfirmPromptProps = {
	title: string;
	open: boolean;
	yesText?: string;
	noText?: string;
	content?: string;
	yesAction?: () => void;
	handleClose: () => void;
	yesColor?:
		| "inherit"
		| "primary"
		| "secondary"
		| "success"
		| "error"
		| "info"
		| "warning";
};
const ConfirmPrompt = (props: IConfirmPromptProps) => {
	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle>{props.title}</DialogTitle>
			{props.content && (
				<DialogContent>
					<DialogContentText>{props.content}</DialogContentText>
				</DialogContent>
			)}
			<DialogActions>
				<Button onClick={props.handleClose}>{props.noText || "Cancel"}</Button>
				<Button
					color={props.yesColor || "primary"}
					onClick={props.yesAction || props.handleClose}
					autoFocus
				>
					{props.yesText || "Confirm"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default ConfirmPrompt;
