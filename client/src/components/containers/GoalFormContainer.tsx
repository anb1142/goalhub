import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { goalActions, useGoals } from "../../store/goals/goal.slice";
import GoalForm from "../presentations/GoalForm";

const goalFormSchema = yup.object().shape({
	text: yup.string().required("Required"),
});

type IGoalFormInput = {
	text: string;
};

const GoalFormContainer = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IGoalFormInput>({
		delayError: 300,
		mode: "onChange",
		resolver: yupResolver(goalFormSchema),
		defaultValues: { text: "" },
	});
	const { isLoading } = useGoals();
	useEffect(() => {
		if (!isLoading) setLoading(false);
	}, [isLoading]);

	const onSubmit: SubmitHandler<IGoalFormInput> = (data) => {
		setLoading(true);
		dispatch(goalActions.createGoal(data));
		reset();
	};
	return (
		<GoalForm
			handleSubmit={handleSubmit}
			control={control}
			errors={errors}
			onSubmit={onSubmit}
			loading={loading}
		/>
	);
};

export default GoalFormContainer;
