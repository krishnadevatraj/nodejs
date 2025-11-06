import joi from "joi";
const loginSchema = {
  body: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(3).max(3),
  }),
};

export default loginSchema;
