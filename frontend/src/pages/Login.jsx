import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import Input from "../components/Input";

function Login() {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const { email, password } = formData;
	const onChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit = (e) => {
		e.preventDefault();
	};
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
					<Input type="email" id="email" value={email} ph={`Email`} onChange={onChange} />
					<Input type="password" id="password" value={password} ph={`Password`} onChange={onChange} />
					<div className="form-group">
						<button className="btn btn-block">Submit</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default Login;
