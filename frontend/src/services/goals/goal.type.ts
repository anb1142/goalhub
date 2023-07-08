import { AxiosResponse } from "axios";

export interface IGoal {
	_id: string;
	text: string;
	user: string;
	done: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface IAddGoal {
	text: string;
}

export interface IGoalId {
	_id: string;
}
export type IUpdateGoal = { _id: string; text: string };

export type IGoals = Array<IGoal>;

export type IGoalIdDto = AxiosResponse<IGoalId>;
export type IGoalsDto = AxiosResponse<IGoals>;
export type IGoalDto = AxiosResponse<IGoal>;
export type IUpdateGoalResponseDto = AxiosResponse<IGoal>;
