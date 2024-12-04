import { IResolvers } from '@graphql-tools/utils';
import User, { UserDocument } from '../models/User.js';  
import { IWorkout } from '../models/Workout.js';
import { AuthenticationError } from '../services/auth.js';
import { signToken } from '../services/auth.js';

const resolvers: IResolvers = {
    Query: {
        me: async (_, __, { user }): Promise<UserDocument | null> => {
            if (!user) throw new AuthenticationError('You must be logged in');
            try {
                const foundUser = await User.findById(user._id).populate('savedWorkouts');
                if (!foundUser) {
                    throw new Error('User not found');
                }
                return foundUser;
            } catch (err) {
                console.error('Error fetching user:', err);
                throw new Error('Error fetching user');
            }
        },
    },
    Mutation: {
        createUser: async (
            _: any,
            { username, email, password }: { username: string; email: string; password: string }
        ): Promise<{ token: string; user: UserDocument }> => {
            try {
                const newUser = await User.create({ username, email, password }) as UserDocument;
                const token = signToken(newUser.username, newUser.email, newUser._id);
                return { token, user: newUser };
            } catch (error) {
                console.error("Error creating user:", error);
                throw new Error("User creation failed");
            }
        },
        login: async (
            _: any,
            { email, password }: { email: string; password: string }
        ): Promise<{ token: string; user: UserDocument }> => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }
            const token = signToken(user.username, user.email, user._id); 

            return { token, user }; 
        },

        saveWorkout: async (
            _: any,
            { workoutInput }: { workoutInput: IWorkout },
            { user }: { user: UserDocument, req: any }
        ): Promise<UserDocument> => {
            console.log("User in saveWorkout mutation:", user);
            if (!user) throw new AuthenticationError('You must be logged in');

            user.savedWorkouts = user.savedWorkouts || []; 
            const existingWorkout = user.savedWorkouts.some((workout) => workout.id === workoutInput.id);
            if (existingWorkout) {
                throw new Error("Workout is already saved.");
            }
            const updatedUser = await User.findByIdAndUpdate(user._id,
                { $addToSet: { savedWorkouts: workoutInput } },
                { new: true, runValidators: true }
            ).populate('savedWorkouts');

            if (!updatedUser) throw new Error('User not found');
            return updatedUser;
        },

        deleteWorkout: async (
            _: any,
            { workoutId }: { workoutId: string },
            { user }: { user: UserDocument, req: any }
        ): Promise<UserDocument> => {
            if (!user) throw new AuthenticationError('You must be logged in');
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { $pull: { savedWorkouts: { workoutId } } },  
                { new: true }
            ).populate('savedWorkouts');

            if (!updatedUser) throw new Error('User not found');

            return updatedUser;
        },
    },
};

export default resolvers;