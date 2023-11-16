import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth/auth.service";
import { authActions, useAuth } from "../../store/auth/auth.slice";
import { goalActions } from "../../store/goals/goal.slice";
import Navbar from "../presentations/Navbar";

const NavbarContainer = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useAuth();
	const onLogout = () => {
		authService.logout();
		dispatch(authActions.reset());
		dispatch(goalActions.reset());
		navigate("/login");
	};
	return <Navbar user={user} onLogout={onLogout} />;
};

export default NavbarContainer;
