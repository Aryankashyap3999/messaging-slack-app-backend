import { StatusCodes } from "http-status-codes";

class ClientError extends Error {
    constructor(error) {
        super();
        this.name = 'ClientError',
        this.message = error.message,
        this.explanation = error.explanantion,
        this.statusCode = error.statusCode ? error.statusCode : StatusCodes.BAD_REQUEST;
    }
}

export default ClientError;