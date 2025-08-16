import { StatusCodes } from "http-status-codes";

class ValidationError extends Error {
    constructor(errorDetails, message) {
        super(message);
        let explanantion = [];
        Object.keys(errorDetails.error).forEach((key) => {
            explanantion.push(errorDetails.error[key])
        });
        this.explanantion = explanantion;
        this.message = message;
        this.statusCode = StatusCodes.BAD_REQUEST;
        
    }
}

export default ValidationError;

