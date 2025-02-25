import { ZodError } from "zod";
import type { z } from "zod";
import type { IValidatorFields } from "./validator-fields-interface";
import type { Notification } from "./notification";

export abstract class ZodValidatorFields<Output, Input = Output>
  implements IValidatorFields<Input>
{
  constructor(protected schema: z.ZodType<Output, z.ZodTypeDef, Input>) {}

  validate(notification: Notification, data: Input): boolean {
    try {
      this.schema.parse(data);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        for (const err of error.errors) {
          const field = err.path.join(".");
          notification.addError(err.message, field);
        }
      } else {
        notification.addError("Validation failed");
      }
      return false;
    }
  }
}
