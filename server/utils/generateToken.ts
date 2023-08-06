import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import JWT_SECRET from "./JWT_SECRET";

export type TokenDataType = {
	_id: ObjectId;
};

const generateToken = (_id: ObjectId) =>
	jwt.sign({ _id }, JWT_SECRET, { expiresIn: "100d" });

export default generateToken;
