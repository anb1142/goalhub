import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { IUserState } from "../../store/auth/auth.type";
import NavTo from "./NavTo";

type INavbarProps = {
	user: IUserState;
	onLogout: React.MouseEventHandler;
};

function Navbar(props: INavbarProps) {
	return (
		<AppBar
			component="nav"
			sx={{
				borderBottom: "1px solid #ccc",
				bgcolor: "#fff",
				boxShadow: "none",
			}}
		>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					padding: { lg: "0 5vh", md: "0 10vw", sm: "0 6vw", xs: "0 1vw" },
				}}
			>
				<NavLink to={props.user?.token ? "/" : window.location.pathname}>
					<Button sx={{ color: "black" }}>goalhub</Button>
				</NavLink>

				<Box>
					{props.user?.token ? (
						<>
							<NavTo to="/profile" icon={<PersonIcon />} title={"Profile"} />
							<Button
								sx={{ color: "black" }}
								startIcon={<LogoutIcon />}
								onClick={props.onLogout}
							>
								Logout
							</Button>
						</>
					) : (
						<>
							<NavTo to="/login" icon={<LoginIcon />} title={"Login"} />
							<NavTo to="/register" icon={<PersonIcon />} title={"Register"} />
						</>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
