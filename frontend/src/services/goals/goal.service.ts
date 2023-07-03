import http from "../../utils/http";
import { IAddGoal, IGoalDto } from "./goal.type";

const API_URL = "/goals/";

const getGoals = async () => await http.get(API_URL);

const createGoal = async (goalData: IAddGoal): Promise<IGoalDto> =>
	await http.post(API_URL, goalData);

const goalService = { getGoals, createGoal };
export default goalService;
