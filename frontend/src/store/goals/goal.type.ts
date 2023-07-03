import { IGoalsDto } from "../../services/goals/goal.type";

export interface IGoalsState {
	goals: IGoalsDto["data"] | [];
	isLoading: boolean;
	message: string;
}
