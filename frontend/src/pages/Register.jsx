import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Input from "../components/Input";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { register, reset } from "../features/auth/authSlice";

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
	const onChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) return toast.error(`Password do not match`);

		const userData = {
			name,
			email,
			password,
		};
		dispatch(register(userData));
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
						type="text"
						id="name"
						value={name}
						ph={`Name`}
						onChange={onChange}
					/>
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
					<Input
						type="password"
						id="password2"
						value={password2}
						ph={`Retype Password`}
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
