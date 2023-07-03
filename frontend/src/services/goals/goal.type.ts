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

export interface IRemoveGoal {
	_id: string;
}

export type IGoals = Array<IGoal>;

export type IRemoveGoalDto = AxiosResponse<IRemoveGoal>;
export type IGoalsDto = AxiosResponse<IGoals>;
export type IGoalDto = AxiosResponse<IGoal>;
