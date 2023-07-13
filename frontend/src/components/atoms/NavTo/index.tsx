import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

type NavToProps = { to: string; icon: React.ReactElement; title: string };
const NavTo = ({ to, icon, title }: NavToProps) => (
	<NavLink to={to}>
		<Button startIcon={icon} sx={{ color: "black" }}>
			{title}
		</Button>
	</NavLink>
);

export default NavTo;
