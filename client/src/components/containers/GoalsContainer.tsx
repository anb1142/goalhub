import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../store/auth/auth.slice";
import { goalActions, useGoals } from "../../store/goals/goal.slice";
import Goals from "../presentations/Goals";

const GoalsContainer = () => {
	const dispatch = useDispatch();
	const { user } = useAuth();

	const { goals, isLoading, fetched } = useGoals();

	const [open, setOpen] = useState(false);

	const todo = goals.filter((goal) => !goal.done);
	const done = goals.filter((goal) => goal.done);

	useEffect(() => {
		dispatch(goalActions.getGoals());
	}, [user]);
	useEffect(() => {
		if (done.length === 0) setOpen(false);
	}, [done]);

	return (
		<Goals
			goals={goals}
			todo={todo}
			done={done}
			open={open}
			setOpen={setOpen}
			isLoading={isLoading}
			fetched={fetched}
		/>
	);
};

export default GoalsContainer;
