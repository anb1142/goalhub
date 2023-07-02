import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { authActions, useAuth } from "../store/auth/auth.slice";
import { useDispatch } from "react-redux";
import authService from "../services/auth/auth.service";

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useAuth();
	const onLogout = () => {
		authService.logout();
		dispatch(authActions.reset());
		navigate("/login");
	};
	return (
		<div className="header">
			<div className="logo">
				<Link to="/">Goalsetter</Link>
			</div>
			<ul>
				{user ? (
					<li>
						<button className="btn" onClick={onLogout}>
							<FaSignOutAlt /> Logout
						</button>
					</li>
				) : (
					<>
						<li>
							<Link to={`/login`}>
								<FaSignInAlt /> Login
							</Link>
						</li>
						<li>
							<Link to={`/register`}>
								<FaUser /> Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</div>
	);
}

export default Header;
