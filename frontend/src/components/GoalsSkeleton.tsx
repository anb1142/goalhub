import { Skeleton } from "@mui/material";

function GoalsSkeleton() {
	return (
		<>
			{[...Array(4).keys()].map((_) => (
				<Skeleton
					variant="rectangular"
					sx={{
						width: "100%",
						mb: 2,
					}}
					animation="wave"
					height={120}
				/>
			))}
		</>
	);
}

export default GoalsSkeleton;
