import { z } from "zod";
import { ZodValidatorFields } from "../../shared/domain/validators/zod-validator-fields";

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

type UserOutput = z.infer<typeof userSchema>;
type UserInput = string | UserOutput;

export class UserValidator extends ZodValidatorFields<UserOutput, UserInput> {
  constructor() {
    super(userSchema);
  }
}

export class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}

export default UserValidatorFactory;
