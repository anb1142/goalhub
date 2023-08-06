import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../services/user/user.model";
import JWT_SECRET from "../utils/JWT_SECRET";
import { TokenDataType } from "../utils/generateToken";

const protect = asyncHandler(async (req, res, next) => {
	const auth = req.headers.authorization;
	if (auth && auth.startsWith("Bearer")) {
		try {
			const token = auth.split(" ")[1];
			const decoded = jwt.verify(token, JWT_SECRET) as TokenDataType;
			req.body.auth = await User.findById(decoded._id).select("-password");
			next();
		} catch (error) {
			res.status(401);
			throw new Error("Not authorized");
		}
	} else {
		res.status(401);
		throw new Error("Not authorized");
	}
});

export default protect;
