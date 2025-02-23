import { AggregateRoot } from "../../shared/domain/aggregate.root";
import type { ValueObject } from "../../shared/domain/value-object";
import { Priority } from "../../shared/domain/value-object/priority.vo";
import type { StatusValue } from "../../shared/domain/value-object/status.vo";
import { Status } from "../../shared/domain/value-object/status.vo";
import { Uuid } from "../../shared/domain/value-object/uuid.vo";
import type { NestedTagConstructorProps } from "../../tag/domain/nested-tag.entity";
import type { NestedUserConstructorProps } from "../../user/domain/nested-user.entity";
import { NestedTag } from "../../tag/domain/nested-tag.entity";
import { NestedUser } from "../../user/domain/nested-user.entity";

export type TaskConstructorProps = {
  taskId: TaskId;
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  status: Status;
  tags: Map<string, NestedTag>;
  responsible: Map<string, NestedUser>;
  creator: Map<string, NestedUser>;
};

export type TaskCreateCommand = {
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  status: StatusValue;
  tags: NestedTagConstructorProps[];
  responsible: NestedUserConstructorProps;
  creator: NestedUserConstructorProps;
};

export class TaskId extends Uuid {}

export class TaskAggregate extends AggregateRoot {
  taskId: TaskId;
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  status: Status;
  tags: Map<string, NestedTag> = new Map();
  responsible: Map<string, NestedUser> = new Map();
  creator: Map<string, NestedUser> = new Map();

  constructor(props: TaskConstructorProps) {
    super();
    this.taskId = props.taskId;
    this.title = props.title;
    this.description = props.description;
    this.dueDate = new Date();
    this.priority = props.priority;
    this.status = props.status;
    this.tags = props.tags;
    this.responsible = props.responsible;
    this.creator = props.creator;
  }

  create(props: TaskCreateCommand) {
    const entity = new TaskAggregate({
      taskId: new TaskId(),
      title: props.title,
      description: props.description,
      dueDate: props.dueDate,
      priority: Priority.fromValue(props.priority),
      status: Status.fromValue(props.status),
      tags: new Map(
        props.tags.map((tag) => [tag.tagId.id, new NestedTag(tag)]),
      ),
      responsible: new Map([
        [props.responsible.userId.id, new NestedUser(props.responsible)],
      ]),
      creator: new Map([
        [props.creator.userId.id, new NestedUser(props.creator)],
      ]),
    });

    return entity;
  }

  public changeTitle(value: string) {
    this.title = value;
  }

  public changeDescription(value: string) {
    this.description = value;
  }

  public setLowPriority() {
    this.priority = this.priority.setLow();
  }

  public setMediumPriority() {
    this.priority = this.priority.setMedium();
  }

  public setHighPriority() {
    this.priority = this.priority.setHigh();
  }

  public toNextStatus() {
    this.status = this.status.transitionToNextStatus();
  }

  public toBackStatus() {
    this.status = this.status.toBlockedStatus();
  }

  public changeTags(tags: NestedTagConstructorProps[]) {
    this.tags = new Map(tags.map((tag) => [tag.tagId.id, new NestedTag(tag)]));
  }

  public updateDueDate(value: Date) {
    const isFutureDate = this.isFutureDate(value);

    if (!isFutureDate) {
      throw new Error("A nova data deve ser superior a data atual");
    }

    this.dueDate = value;
  }

  private isFutureDate(date: Date): boolean {
    const currentDate = new Date();
    return date >= currentDate;
  }

  toJSON() {
    return {
      id: this.taskId.toString(),
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority.toString(),
      status: this.status.toString(),
      tags: this.tags,
    };
  }

  get entityId(): ValueObject {
    return this.taskId;
  }
}
