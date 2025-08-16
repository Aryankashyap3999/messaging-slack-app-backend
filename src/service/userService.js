import userRepository from "../repositories/userRepository.js"
import ValidationError from "../utils/errors/validationError.js";

export const signUp = async (data) => {
    try {
        const response = await userRepository.create(data);
        return response;        
    } catch (error) {
        console.log("user signup error: ", error);
        if(error.name === 'ValidationError') {
            throw new ValidationError({
                error: error.errors
            }, error.message);
        }
        if(error.name === 'MongoServerError' && error.code === 11000) {
            throw new ValidationError({
                error: ['A user with same email and username already exists']
            }, 'A user with same email and username already exists')
        }
    }
}