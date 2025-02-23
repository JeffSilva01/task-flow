import { Entity } from "../../shared/domain/entity";
import type { ValueObject } from "../../shared/domain/value-object";
import { UserId } from "./user.aggregate";

export type NestedUserConstructorProps = {
  userId: UserId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};

export type NestedUserCreateCommand = {
  name: string;
  email: string;
  password: string;
};

export class NestedUser extends Entity {
  userId: UserId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;

  constructor(props: NestedUserConstructorProps) {
    super();
    this.userId = props.userId;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt;
  }

  static create(props: NestedUserCreateCommand) {
    const entity = new NestedUser({
      userId: new UserId(),
      name: props.name,
      email: props.email,
      password: props.password,
      createdAt: new Date(),
    });

    return entity;
  }

  changeName(name: string) {
    this.name = name;
  }

  changeEmail(email: string) {
    this.email = email;
  }

  changePassword(password: string) {
    this.password = password;
  }

  toJSON() {
    return {
      id: this.userId.toString(),
      name: this.name,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
    };
  }

  get entityId(): ValueObject {
    return this.userId;
  }
}
