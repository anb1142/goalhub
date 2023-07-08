import { IGoalsDto } from "../../services/goals/goal.type";

export interface IGoalsState {
	goals: IGoalsDto["data"] | [];
	isLoading: boolean;
	fetched: boolean;
	message: string;
}
