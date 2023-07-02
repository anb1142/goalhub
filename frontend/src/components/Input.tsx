type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

function Input(props: InputProps) {
	return (
		<div className="form-group">
			<input className="form-control" {...props} />
		</div>
	);
}

export default Input;
