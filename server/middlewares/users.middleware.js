import { z } from "zod";

const UserSignUp = z.object({
  email: z.string().email(),
  firstName: z.string().min(6),
  lastName: z.string().min(6),
  password: z.string().min(6),
});

const UserSignIn = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const schemaValidator = (schema) => (req, res, next) => {
  try {
    const isSchemaValidated = schema.safeParse(req.body);
    if (isSchemaValidated.success) {
      next();
    } else {
      res.status(400).json({
        message: "schema validation failed",
        validationMessage: isSchemaValidated.error.issues,
      });
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

export const signUpValidateDetails = schemaValidator(UserSignUp);
export const signInValidateDetails = schemaValidator(UserSignIn);
