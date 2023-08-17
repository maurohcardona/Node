import userModel from "../models/users.js";

export const getUser = async (email) =>
  await userModel.findOne({ email: email });

export const createUser = async (user) => await userModel.create(user);

export const getUserById = async (id) => await userModel.findById(id);

export const updatePassword = async (email, hashedPassword) =>
  await userModel.updateOne(
    { email: email },
    { $set: { password: hashedPassword } }
  );
