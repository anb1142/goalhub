import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions, useAuth } from "../../store/auth/auth.slice";
import { goalActions } from "../../store/goals/goal.slice";
import Navbar from "../presentations/Navbar";

const NavbarContainer = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useAuth();
	const onLogout = () => {
		dispatch(authActions.reset());
		dispatch(goalActions.reset());
		navigate("/login");
	};
	return <Navbar user={user} onLogout={onLogout} />;
};

export default NavbarContainer;
