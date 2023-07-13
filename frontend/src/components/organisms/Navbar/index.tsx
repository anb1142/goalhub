import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../services/auth/auth.service";
import { authActions, useAuth } from "../../store/auth/auth.slice";
import { goalActions } from "../../store/goals/goal.slice";
import NavTo from "../atoms/NavTo";

function Navbar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useAuth();
	const onLogout = () => {
		authService.logout();
		dispatch(authActions.reset());
		dispatch(goalActions.reset());
		navigate("/login");
	};
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
