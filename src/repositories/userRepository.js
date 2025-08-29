import User from "../schema/user.js"
import crudRepository from "./crudRepository.js";

const userRepository = {
    ...crudRepository(User),
    getUserByEmail: async (email) => {
        const user = await User.findOne({ email });
        return user;
    },
    getUserByName : async (name) => {
        const user = await User.findOne({ name }).select('-password');
        return user;
    },
    getByEmail: async function (email) {
        const user = await User.findOne({ email });
        return user;
    },
    getByToken: async function (token) {
        const user = await User.findOne({ verificationToken: token });
        return user;
    }
};

export default userRepository;