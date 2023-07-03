import { AxiosResponse } from "axios";

export interface IGoal {
	_id: string;
	text: string;
	createdAt: Date;
	updatedAt: Date;
}
export type IGoals = Array<IGoal>;

export type IGoalsDto = AxiosResponse<IGoals>;
