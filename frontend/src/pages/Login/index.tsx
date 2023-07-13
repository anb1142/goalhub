import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import AlignCenter from "../components/templates/AlignCenter";
import Input from "../components/atoms/Input";
import SignForm from "../components/organisms/SignForm";
import { authActions, useAuth } from "../store/auth/auth.slice";

const loginSchema = yup.object().shape({
	email: yup.string().email("Must be a valid Email").required("Required"),
	password: yup
		.string()
		.min(8, "Must be at least 8 characters")
		.max(32, "Must be less than 32 characters")
		.required("Required"),
});

export type ILoginInput = {
	email: string;
	password: string;
};

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isLoading } = useAuth();

	useEffect(() => {
		if (!isLoading && user?.token) navigate("/");
	}, [user, isLoading]);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginInput>({
		delayError: 300,
		mode: "onChange",
		resolver: yupResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	const onSubmit: SubmitHandler<ILoginInput> = (data) => {
		dispatch(authActions.login(data));
	};
	return (
		<AlignCenter>
			<SignForm
				name={"Sign In"}
				onSubmit={handleSubmit(onSubmit)}
				reRouteText={"Don't have an account? Register Here"}
				reRouteTo="/register"
			>
				<Input
					name="email"
					control={control}
					label="Email Address"
					error={errors.email ? true : false}
					helperText={errors.email?.message}
				/>
				<Input
					name="password"
					control={control}
					type="password"
					label="Password"
					error={errors.password ? true : false}
					helperText={errors.password?.message}
				/>
			</SignForm>
		</AlignCenter>
	);
}

export default Login;
