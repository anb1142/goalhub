import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { authActions, useAuth } from "../store/auth/auth.slice";
import Spinner from "../components/Spinner";
function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, isLoading } = useAuth();

	useEffect(() => {
		if (user) navigate("/");
	}, [user, navigate]);

	const [formData, setFormData] = useState({ email: "", password: "" });
	const { email, password } = formData;
	const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const handleSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		dispatch(authActions.login(formData));
		navigate("/");
	};
	if (isLoading) return <Spinner />;

	return (
		<>
			<section className="heading">
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Sign In</p>
			</section>
			<div className="form">
				<form onSubmit={handleSubmit}>
					<Input
						name="email"
						type="email"
						value={email}
						placeholder={`Email`}
						onChange={onChange}
					/>
					<Input
						name="password"
						type="password"
						value={password}
						placeholder={`Password`}
						onChange={onChange}
					/>
					<div className="form-group">
						<button type="submit" className="btn btn-block">
							Submit
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default Login;
