import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../services/auth/auth.service";
import { authActions, useAuth } from "../store/auth/auth.slice";
import { goalActions } from "../store/goals/goal.slice";

function To(props: { to: string; icon: React.ReactElement; title: string }) {
	return (
		<NavLink to={props.to}>
			<Button startIcon={props.icon} sx={{ color: "black" }}>
				{props.title}
			</Button>
		</NavLink>
	);
}

function Navbar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useAuth();
	const onLogout = () => {
		dispatch(goalActions.reset());
		authService.logout();
		dispatch(authActions.reset());
		// navigate("/login");
	};
	return (
		<AppBar
			// position="static"
			component="nav"
			sx={{
				borderBottom: ".2vh solid #ccc",
				bgcolor: "#fff",
				boxShadow: "none",
			}}
		>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					padding: { md: "0 5vh", sm: "0 4 vw", xs: "0 1vw" },
				}}
			>
				<NavLink to={user?.token ? "/" : window.location.pathname}>
					<Button sx={{ color: "black" }}>Goalsetter</Button>
				</NavLink>

				<Box>
					{user ? (
						<Button
							sx={{ color: "black" }}
							startIcon={<LogoutIcon />}
							onClick={onLogout}
						>
							Logout
						</Button>
					) : (
						<>
							<To to="/login" icon={<LoginIcon />} title={"Login"} />
							<To to="/register" icon={<PersonIcon />} title={"Register"} />
						</>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
