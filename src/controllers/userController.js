import { StatusCodes } from "http-status-codes";

import { signin, signUp } from "../service/userService.js"
import { customResponse, internalErrorResponse, SuccessResponse } from "../utils/common/responseObject.js";

export const signupController = async (req, res) => {
    try {
        console.log("User object: ", req.body)
        const response = await signUp(req.body);
        // console.log("User: ", response);
        return res.status(StatusCodes.CREATED).json(SuccessResponse(response, "User created successfully"));

    } catch (error) {
        console.log("Error at signup controller: ", error);
        if(error.statusCode) {
            return res.status(error.statusCode).json(customResponse(error));
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export const signinController = async (req, res) => {
    console.log("User info: ", req.body);
    try {
        
        const response = await signin(req.body);
        return res.status(StatusCodes.CREATED).json(SuccessResponse(response, "User signed in successfully"));
    } catch (error) {
        console.log("signin error from user controller: ", error);
        if(error.statusCode) {
            return res.status(error.statusCode).json(customResponse(error));
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    
    }
}