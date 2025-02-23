import { AggregateRoot } from "../../shared/domain/aggregate.root";
import type { ValueObject } from "../../shared/domain/value-object";
import { Uuid } from "../../shared/domain/value-object/uuid.vo";
import { NestedUser } from "../../user/domain/nested-user.entity";
import type { NestedUserConstructorProps } from "../../user/domain/nested-user.entity";

export type TagConstructorProps = {
  tagId: TagId;
  owner: Map<string, NestedUser>;
  name: string;
};

export type TagCreateCommand = {
  name: string;
  owner: NestedUserConstructorProps;
};

export class TagId extends Uuid {}

export class TagAggregate extends AggregateRoot {
  tagId: TagId;
  owner: Map<string, NestedUser>;
  name: string;

  constructor(props: TagConstructorProps) {
    super();
    this.tagId = props.tagId;
    this.owner = props.owner;
    this.name = props.name;
  }

  static create(props: TagCreateCommand) {
    const entity = new TagAggregate({
      tagId: new TagId(),
      owner: new Map([[props.owner.userId.id, new NestedUser(props.owner)]]),
      name: props.name,
    });

    return entity;
  }

  public changeName(value: string) {
    this.name = value;
  }

  toJSON() {
    return {
      id: this.tagId.toString(),
      owner: this.owner,
      name: this.name,
    };
  }

  get entityId(): ValueObject {
    return this.tagId;
  }
}
