import { ValueObject } from "../value-object";
import { randomUUIDv7 } from "bun";

export class Uuid extends ValueObject {
  readonly id: string;
  constructor(id?: string) {
    super();
    this.id = id || randomUUIDv7();
  }

  toString() {
    return this.id;
  }
}
