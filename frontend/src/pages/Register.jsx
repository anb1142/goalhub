import { useState } from "react";
import { FaUser } from "react-icons/fa";
import Input from "../components/Input";

function Register() {
	const [formData, setFormData] = useState({ name: "", email: "", password: "", password2: "" });
	const { name, email, password, password2 } = formData;
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
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>
			<div className="form">
				<form onSubmit={onSubmit}>
					<Input type="text" id="name" value={name} ph={`Name`} onChange={onChange} />
					<Input type="email" id="email" value={email} ph={`Email`} onChange={onChange} />
					<Input type="password" id="password" value={password} ph={`Password`} onChange={onChange} />
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
