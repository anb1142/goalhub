import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import { useAuth } from "../store/auth/auth.slice";
import Goals from "../components/Goals";
import { Typography } from "@mui/material";
import AlignCenter from "../components/AlignCenter";

function Dashboard() {
	const navigate = useNavigate();
	const { user, isLoading } = useAuth();

	useEffect(() => {
		if (!isLoading && !user?.token) navigate("/login");
	}, [user, isLoading]);
	return (
		<>
			<AlignCenter>
				<Typography
					component={"h1"}
					variant="h1"
					fontWeight={500}
					sx={{
						fontSize: { md: "6vh", sm: "8vw", xs: "12vw" },
					}}
				>
					Welcome {user && user.name}
				</Typography>
				<Typography
					variant="subtitle1"
					sx={{
						color: "#666",
						fontSize: { md: "2vh", sm: "4vw", xs: "6vw" },
					}}
				>
					Goals Dashboard
				</Typography>
				{user && (
					<>
						<GoalForm />
						<Goals />
					</>
				)}
			</AlignCenter>
		</>
	);
}

export default Dashboard;
