function Input({ id, value, ph, onChange }) {
	return (
		<div className="form-group">
			<input
				type="text"
				className="form-control"
				id={id}
				name={id}
				value={value}
				placeholder={ph}
				onChange={onChange}
			/>
		</div>
	);
}

export default Input;
