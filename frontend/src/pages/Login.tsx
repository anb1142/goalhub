import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignForm from "../components/SignForm";
import { authActions, useAuth } from "../store/auth/auth.slice";
import { Link, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import {
	Link as RouterLink,
	LinkProps as RouterLinkProps,
} from "react-router-dom";
import AlignCenter from "../components/AlignCenter";
function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isLoading } = useAuth();

	useEffect(() => {
		if (!isLoading && user?.token) navigate("/");
	}, [user, isLoading]);

	const [formData, setFormData] = useState({ email: "", password: "" });
	const { email, password } = formData;
	const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		dispatch(authActions.login(formData));
	};

	return (
		<AlignCenter>
			<SignForm
				name={"Sign In"}
				onSubmit={onSubmit}
				reRouteText={"Don't have an account? Register Here"}
				reRouteTo="/register"
			>
				<TextField
					margin="normal"
					fullWidth
					label="Email Address"
					name="email"
					value={email}
					onChange={onChange}
				/>
				<TextField
					margin="normal"
					fullWidth
					name="password"
					label="Password"
					type="password"
					value={password}
					onChange={onChange}
				/>
			</SignForm>
		</AlignCenter>
	);
}

export default Login;
