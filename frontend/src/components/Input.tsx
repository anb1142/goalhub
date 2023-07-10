import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldPath } from "react-hook-form";
import { ILoginInput } from "../pages/Login";

type ControllerProps = TextFieldProps & {
	name: FieldPath<ILoginInput>;
	control: Control<ILoginInput>;
};

function Input(props: ControllerProps) {
	return (
		<Controller
			name={props.name}
			control={props.control}
			render={({ field }) => (
				<TextField
					{...props}
					{...field}
					margin={props.margin ? props.margin : "normal"}
					fullWidth={props.fullWidth ? props.fullWidth : true}
				/>
			)}
		/>
	);
}

export default Input;
