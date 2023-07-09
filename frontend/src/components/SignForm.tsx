import { Box, Button, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

type SignFormProps = {
	name: string;
	children: React.ReactNode;
	reRouteText?: string;
	reRouteTo?: string;
	onSubmit: React.FormEventHandler<Element>;
};
function SignForm(props: SignFormProps) {
	return (
		<Box
			component="form"
			className="signform"
			onSubmit={props.onSubmit}
			sx={{
				borderRadius: "2vh",
				border: "1px solid #ccc",
				padding: { lg: 4, md: 4, sm: 4, xs: 3 },
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				width: { lg: "48vh", md: "29vh", sm: "48vw", xs: "90vw" },
			}}
		>
			<Typography
				align="center"
				component="h1"
				variant="h5"
				sx={{
					pb: 2,
				}}
			>
				{props.name}
			</Typography>
			{props.children}
			<Button size="large" type="submit" variant="contained" sx={{ my: 3 }}>
				{props.name}
			</Button>

			{props.reRouteTo && (
				<Link component={RouterLink} to={props.reRouteTo}>
					<Typography>{props.reRouteText}</Typography>
				</Link>
			)}
		</Box>
	);
}

export default SignForm;
