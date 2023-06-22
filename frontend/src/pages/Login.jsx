import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../components/Input";

import Spinner from "../components/Spinner";
import { login, reset } from "../features/auth/authSlice";
function Login() {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const { email, password } = formData;
	const onChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		} else if (isSuccess || user) {
			navigate("/");
		}
		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email,
			password,
		};
		dispatch(login(userData));
	};

	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			<section className="heading">
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Sign In</p>
			</section>
			<div className="form">
				<form onSubmit={onSubmit}>
					<Input
						type="email"
						id="email"
						value={email}
						ph={`Email`}
						onChange={onChange}
					/>
					<Input
						type="password"
						id="password"
						value={password}
						ph={`Password`}
						onChange={onChange}
					/>
					<div className="form-group">
						<button className="btn btn-block">Submit</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default Login;
