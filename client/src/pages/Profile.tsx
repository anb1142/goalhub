import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import AppInput from "../components/presentations/AppInput";
import ConfirmPrompt from "../components/presentations/ConfirmPrompt";
import SignForm from "../components/presentations/SignForm";
import { authActions, useAuth } from "../store/auth/auth.slice";

const profileSchema = yup.object().shape({
	name: yup.string().required("Required"),
	email: yup.string().email("Must be a valid Email").required("Required"),
	password: yup
		.string()
		.min(8, "Must be at least 8 characters")
		.max(32, "Must be less than 32 characters")
		.required("Required"),
	password2: yup
		.string()
		.required("Required")
		.oneOf([yup.ref("password")], "Passwords does not match"),
});
type IProfileInput = {
	name: string;
	email: string;
	password: string;
	password2: string;
};
function Profile() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const { user } = useAuth();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IProfileInput>({
		delayError: 300,
		mode: "onChange",
		resolver: yupResolver(profileSchema),
		defaultValues: {
			email: user?.email || "",
			name: user?.name || "",
			password: "",
			password2: "",
		},
	});

	const removeAccount = () => {
		dispatch(authActions.remove());
		navigate("/login");
	};

	const onSubmit: SubmitHandler<IProfileInput> = (data) => {};

	return (
		<SignForm
			name={"Profile"}
			submitText={"Update"}
			onSubmit={handleSubmit(onSubmit)}
			autoComplete="off"
			buttonExtra={
				<Button
					onClick={() => setOpen(true)}
					size="large"
					type="reset"
					color="error"
					variant="contained"
				>
					delete
				</Button>
			}
		>
			<ConfirmPrompt
				title="Delete Account"
				content="Are you sure you want to delete your account?"
				open={open}
				handleClose={() => setOpen(false)}
				yesText="Delete"
				yesAction={removeAccount}
				yesColor="error"
			/>
			<AppInput
				name="name"
				control={control}
				label="Name"
				error={errors.name ? true : false}
				helperText={errors.name?.message}
			/>
			<AppInput
				name="email"
				control={control}
				label="Email Address"
				error={errors.email ? true : false}
				helperText={errors.email?.message}
				autoComplete="off"
			/>
			<AppInput
				name="password"
				control={control}
				label="Password"
				type="password"
				error={errors.password ? true : false}
				helperText={errors.password?.message}
				autoComplete="off"
			/>
			<AppInput
				name="password2"
				control={control}
				label="Retype Password"
				type="password"
				error={errors.password2 ? true : false}
				helperText={errors.password2?.message}
				autoComplete="off"
			/>
		</SignForm>
	);
}

export default Profile;
