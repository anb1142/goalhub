import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AlignCenter from "../components/AlignCenter";
import SignForm from "../components/SignForm";
import { authActions, useAuth } from "../store/auth/auth.slice";
import { Link, TextField } from "@mui/material";
function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});
	const { name, email, password, password2 } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading } = useAuth();
	useEffect(() => {
		if (!isLoading && user?.token) navigate("/");
	}, [user, isLoading]);

	const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		if (password !== password2) return toast.error(`Password do not match`);

		const userData = {
			name,
			email,
			password,
		};
		dispatch(authActions.register(userData));
	};

	return (
		<AlignCenter>
			<SignForm
				name={"Register"}
				onSubmit={onSubmit}
				reRouteText={"Already registered ? Login Here"}
				reRouteTo="/login"
			>
				<TextField
					margin="normal"
					fullWidth
					label="Name"
					name="name"
					value={name}
					onChange={onChange}
				/>
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
				<TextField
					margin="normal"
					fullWidth
					name="password2"
					label="Confirm Password"
					type="password"
					value={password2}
					onChange={onChange}
				/>
			</SignForm>
		</AlignCenter>
	);
}

export default Register;
