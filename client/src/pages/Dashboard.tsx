import { Container, Typography } from "@mui/material";
import GoalFormContainer from "../components/containers/GoalFormContainer";
import GoalsContainer from "../components/containers/GoalsContainer";
import { useAuth } from "../store/auth/auth.slice";

function Dashboard() {
	const { user } = useAuth();
	return (
		<>
			<Typography
				component={"h1"}
				variant="h1"
				fontWeight={500}
				sx={{
					fontSize: { lg: "6vh", md: "5.5vw", sm: "8vw", xs: "12vw" },
				}}
			>
				Welcome {user && user.name}
			</Typography>
			<Typography
				variant="subtitle1"
				sx={{
					color: "#666",
					fontSize: { lg: "2vh", md: "2.2vw", sm: "4vw", xs: "6vw" },
				}}
			>
				Goals Dashboard
			</Typography>
			{user && (
				<Container
					sx={{
						px: 0,
						width: { lg: "50vh", md: "45vw", sm: "60vw", xs: "92vw" },
					}}
				>
					<GoalFormContainer />
					<GoalsContainer />
				</Container>
			)}
		</>
	);
}

export default Dashboard;
