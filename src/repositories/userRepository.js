import User from "../schema/user.js"
import crudRepository from "./crudRepository.js";


export const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
}

export const getUserByName = async (name) => {
    const user = await User.findOne({ name });
    return user;
}

const curdMethods = crudRepository(User);

export default curdMethods;