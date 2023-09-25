import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import bcrypt from "bcrypt";
import path from "path";
import { fakerES as faker } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { direct } = req.params;
    cb(null, `${__dirname}/Public/uploads/${direct}`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploader = multer({
  storage,
  onError: function (err, next) {
    console.log(err);
    next();
  },
});

export const publics = path.join(__dirname, "Public");

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export const generateProducts = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
    stock: faker.string.numeric(5),
    id: faker.database.mongodbObjectId(),
    image: faker.image.url(),
    code: faker.string.alphanumeric(10),
  };
};
