import { AxiosResponse } from "axios";

export interface IGoal {
	_id: string;
	text: string;
	user: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IAddGoal {
	text: string;
}

export type IGoals = Array<IGoal>;

export type IGoalsDto = AxiosResponse<IGoals>;
export type IGoalDto = AxiosResponse<IGoal>;
