import http from "../../utils/http";
import { IAddGoal, IGoal, IGoalDto, IGoalId, IUpdateGoal } from "./goal.type";

const API_URL = "/goals/";

const getGoals = async () => await http.get(API_URL);

const createGoal = async (goalData: IAddGoal): Promise<IGoalDto> =>
	await http.post(API_URL, goalData);

const removeGoal = async (goal: string): Promise<IGoalId> =>
	await http.delete(API_URL + goal);

const updateGoal = async (goalData: IUpdateGoal): Promise<IGoal> =>
	await http.put(API_URL + goalData._id, { text: goalData.text });

const markGoal = async (goal: string): Promise<IGoalId> =>
	await http.post(API_URL + goal);

const goalService = {
	getGoals,
	createGoal,
	updateGoal,
	removeGoal,
	markGoal,
};
export default goalService;
