export const internalErrorResponse = (error) => {
    return {
        success: false,
        err: error,
        data: {},
        message: 'INternal server error'
    }
}

export const customResponse = (error) => {
    if(!error.explanantion && !error.message) {
        return internalErrorResponse(error);
    }
    return {
        success: false,
        err: error.explanantion,
        data: {},
        message: error.message
    }
}

export const SuccessResponse = (data, message)  => {
    return {
        success: true,
        data,
        message,
        err: {}
    }
}