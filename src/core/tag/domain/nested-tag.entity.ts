import { Entity } from "../../shared/domain/entity";
import type { ValueObject } from "../../shared/domain/value-object";
import { TagId } from "./tag.aggregate";

export type NestedTagConstructorProps = {
  tagId: TagId;
  name: string;
};

export type NestedTagCreateCommand = {
  name: string;
};

export class NestedTag extends Entity {
  tagId: TagId;
  name: string;

  constructor(props: NestedTagConstructorProps) {
    super();
    this.tagId = props.tagId;
    this.name = props.name;
  }

  static create(props: NestedTagCreateCommand) {
    const entity = new NestedTag({
      tagId: new TagId(),
      name: props.name,
    });

    return entity;
  }

  toJSON() {
    return {
      id: this.tagId.toString(),
      name: this.name,
    };
  }

  get entityId(): ValueObject {
    return this.tagId;
  }
}
