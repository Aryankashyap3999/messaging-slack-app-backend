
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from "../config/serverConfig";
import userRepository from "../repositories/userRepository.js";
import { customResponse, internalErrorResponse } from "../utils/common/responseObject.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header['x-access-token'];
        if(!token) {
            throw new customResponse({
                explanation: 'Invalid data sent from client',
                mesaage: "Auth token not provided"
            });
        }

        const isMatch = jwt.verify(token, JWT_SECRET);
        if(!isMatch) {
            throw new customResponse({
                explanation: "Invalid data set from client",
                message: "Invalid auth token provided"
            })
        }

        const user = await userRepository.getById(isMatch.id);
        req.user = user.id;
        next();

    } catch (error) {
        console.log('Auth middleware error', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(StatusCodes.FORBIDDEN).json(
                customResponse({
                    explanation: 'Invalid data sent from the client',
                    message: 'Invalid auth token provided'
                })
            );
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}