import http from "../../utils/http";

const API_URL = "/goals/";

const getGoals = async () => await http.get(API_URL);

const goalService = { getGoals };
export default goalService;
