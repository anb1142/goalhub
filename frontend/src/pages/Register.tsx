import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Input from "../components/Input";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { authActions, useAuth } from "../store/auth/auth.slice";

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

	const { user, isLoading, message } = useAuth();
	useEffect(() => {
		if (message !== "") toast.error(message);

		if (user) {
			navigate("/");
		} else {
			dispatch(authActions.reset());
		}
	}, [user, message, navigate, dispatch]);
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
	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			<section className="heading">
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>
			<div className="form">
				<form onSubmit={onSubmit}>
					<Input
						name="name"
						type="text"
						value={name}
						placeholder={`Name`}
						onChange={onChange}
					/>
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
					<Input
						name="password2"
						type="password"
						value={password2}
						placeholder={`Retype Password`}
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

export default Register;
