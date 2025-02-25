import { Notification } from "./validators/notification";
import type { ValueObject } from "./value-object";

export abstract class Entity {
  abstract toJSON(): any;
  abstract get entityId(): ValueObject;
  notification: Notification = new Notification();
}
