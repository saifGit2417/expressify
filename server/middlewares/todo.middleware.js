import { z } from "zod";

const AddToDo = z.object({
  title: z.string().min(1),
  description: z.string().max(500),
});

const UpdateToDo = z.object({
  title: z.string().min(1),
  description: z.string().max(500),
});

const validateSchema = (schema) => (req, res, next) => {
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

export const addToDoValidate = validateSchema(AddToDo);
export const updateToDoValidate = validateSchema(UpdateToDo);
