import { Skeleton } from "@mui/material";

const GoalsSkeleton = () => (
	<>
		{[...Array(4).keys()].map((key) => (
			<Skeleton
				variant="rectangular"
				sx={{
					width: "100%",
					mb: 2,
				}}
				animation="wave"
				height={120}
				key={key}
			/>
		))}
	</>
);

export default GoalsSkeleton;
