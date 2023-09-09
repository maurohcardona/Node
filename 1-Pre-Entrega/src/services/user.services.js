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

export const uploadDocument = async (uid, newDocument) =>
  await userModel.updateOne(
    { _id: uid },
    { $push: { documents: newDocument } }
  );

export const toPremium = async (uid) =>
  await userModel.updateOne({ _id: uid }, { $set: { rol: "premium" } });

export const lastLogin = async (email) => {
  await userModel.updateOne(
    { email: email },
    { $set: { lastLogin: Date.now() } }
  );
};

export const lastLogout = async (uid) => {
  await userModel.updateOne({ _id: uid }, { $set: { lastLogout: Date.now() } });
};
