import userModel from "../models/users.js";

export const getUser = async (email) =>
  await userModel.findOne({ email: email });

export const getUsers = async () =>
  await userModel.find({}).select("email _id rol status");

export const deleteUsers = async () => {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const result = await userModel.updateMany(
    { lastLogin: { $lt: twoDaysAgo } },
    { $set: { status: false } },
    { new: true }
  );
};

export const createUser = async (user) => await userModel.create(user);

export const getUserById = async (id) => await userModel.findById(id);

export const updatePassword = async (email, hashedPassword) =>
  await userModel.updateOne(
    { email: email },
    { $set: { password: hashedPassword } }
  );

export const uploadDocument = async (uid, newDocument) => {
  await userModel.updateOne(
    { _id: uid },
    { $push: { documents: newDocument } }
  );
};

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

export const updatedUsers = async () => {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const result = await userModel.find({
    lastLogin: { $lt: twoDaysAgo },
    status: true,
  });
  return result;
};
