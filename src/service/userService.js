import bcrypt from 'bcrypt'
import { StatusCodes } from "http-status-codes";

import { ENABLE_EMAIL_VERFICATION } from '../config/serverConfig.js';
import { addEmailtoMailQueue } from '../producers/mailQueueProducer.js';
import userRepository from "../repositories/userRepository.js"
import { createJWT } from "../utils/common/authUtils.js";
import { verifyEmailMail } from '../utils/common/mailObject.js';
import ClientError from "../utils/errors/ClientError.js";
import ValidationError from "../utils/errors/validationError.js";

export const signUp = async (data) => {
    try {
        const response = await userRepository.create(data);
        if(ENABLE_EMAIL_VERFICATION === true) {
            addEmailtoMailQueue({
                ...verifyEmailMail(response.verificationToken),
                to: response.email
            });
        }
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

export const verifyTokenService = async (token) => {
  try {
    const user = await userRepository.getByToken(token);
    if (!user) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Invalid token',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    // check if the token has expired or not
    if (user.verificationTokenExpiry < Date.now()) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Token has expired',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;
    await user.save();

    return user;
  } catch (error) {
    console.log('User service error', error);
    throw error;
  }
};

export const signin = async (data) => {
    try {
        const user = await userRepository.getUserByEmail(data.email);
        if(!user) {
            throw new ClientError({
                explanation: 'Invalid data send from client',
                message: 'No registrered user found with this email',
                statusCode: StatusCodes.NOT_FOUND
            });
        }

        const isMatch = bcrypt.compareSync(data.password, user.password);
        if(!isMatch) {
            throw new ClientError({
                explanation: 'Invalid data send from client',
                message: "Incorrect Password",
                statusCode: StatusCodes.BAD_REQUEST
            })
        }

        return {
            username: user.username,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
            token: createJWT({id: user._id, email: user.email})
        }

        
    } catch(error) {
        console.log("Error while signing from service layer: ", error);
        throw error;
    }
}