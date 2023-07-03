import http from "../../utils/http";
import { IAddGoal, IGoalDto, IRemoveGoal } from "./goal.type";

const API_URL = "/goals/";

const getGoals = async () => await http.get(API_URL);

const createGoal = async (goalData: IAddGoal): Promise<IGoalDto> =>
	await http.post(API_URL, goalData);

const removeGoal = async (goal: string): Promise<IRemoveGoal> =>
	await http.delete(API_URL + goal);

const goalService = { getGoals, createGoal, removeGoal };
export default goalService;
