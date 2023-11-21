import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import AppInput from "../components/presentations/AppInput";
import SignForm from "../components/presentations/SignForm";
import { authActions, useAuth } from "../store/auth/auth.slice";

const registerSchema = yup.object().shape({
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
type IRegisterInput = {
	name: string;
	email: string;
	password: string;
	password2: string;
};
function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegisterInput>({
		delayError: 300,
		mode: "onChange",
		resolver: yupResolver(registerSchema),
	});

	const { user, isLoading } = useAuth();
	useEffect(() => {
		if (!isLoading && user?.token) navigate("/");
	}, [user, isLoading]);

	const onSubmit: SubmitHandler<IRegisterInput> = (data) => {
		dispatch(
			authActions.register({
				name: data.name,
				email: data.email,
				password: data.password,
			})
		);
	};

	return (
		<SignForm
			name={"Register"}
			onSubmit={handleSubmit(onSubmit)}
			reRouteText={"Already registered ? Login Here"}
			reRouteTo="/login"
		>
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
			/>
			<AppInput
				name="password"
				control={control}
				label="Password"
				type="password"
				error={errors.password ? true : false}
				helperText={errors.password?.message}
			/>
			<AppInput
				name="password2"
				control={control}
				label="Retype Password"
				type="password"
				error={errors.password2 ? true : false}
				helperText={errors.password2?.message}
			/>
		</SignForm>
	);
}

export default Register;
