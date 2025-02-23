import { AggregateRoot } from "../../shared/domain/aggregate.root";
import type { ValueObject } from "../../shared/domain/value-object";
import { Uuid } from "../../shared/domain/value-object/uuid.vo";

export type UserConstructorProps = {
  userId: UserId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};

export type UserCreateCommand = {
  name: string;
  email: string;
  password: string;
};

export class UserId extends Uuid {}

export class UserAggregate extends AggregateRoot {
  userId: UserId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;

  constructor(props: UserConstructorProps) {
    super();
    this.userId = props.userId;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt;
  }

  static create(props: UserCreateCommand) {
    const entity = new UserAggregate({
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
