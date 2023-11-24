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
});
type IProfileInput = {
	name: string;
	email: string;
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
		},
	});

	const removeAccount = () => {
		dispatch(authActions.remove());
		navigate("/login");
	};

	const onSubmit: SubmitHandler<IProfileInput> = (data) => {
		dispatch(authActions.update(data));
	};

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
		</SignForm>
	);
}

export default Profile;
