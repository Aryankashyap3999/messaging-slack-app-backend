import { StatusCodes } from "http-status-codes";

import { customResponse } from "../utils/common/responseObject.js";

export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            console.log('zod validation error', error);
            let explanation = [];
            let errormessage = '';
            error.errors.forEach((key) => {
                explanation.push(key.message);
                errormessage += ':' + key.path[0] + ' ' + key.message;
            })
            res.status(StatusCodes.BAD_REQUEST).json(customResponse({
                message: 'Validation error' + errormessage,
                explanation: explanation
            }))
        }
    }
}