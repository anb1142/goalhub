import { Skeleton } from "@mui/material";

const GoalsSkeleton = () => (
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

export default GoalsSkeleton;
