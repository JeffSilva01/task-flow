import type { Notification } from "./notification";

export type FieldsErrors =
  | {
      [field: string]: string[];
    }
  | string;

export interface IValidatorFields<Input> {
  validate(notification: Notification, data: Input, fields: string[]): boolean;
}
