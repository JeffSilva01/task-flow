import { ValueObject } from "../value-object";

export type StatusValue = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";
type LabelEnum = "pending" | "in progress" | "completed" | "blocked";

export class Status extends ValueObject {
  public static readonly PENDING: Status = new Status("PENDING", "pending");
  public static readonly IN_PROGRESS: Status = new Status(
    "IN_PROGRESS",
    "in progress",
  );
  public static readonly COMPLETED: Status = new Status(
    "COMPLETED",
    "completed",
  );
  public static readonly BLOCKED: Status = new Status("BLOCKED", "blocked");

  private readonly value: StatusValue;
  private readonly label: LabelEnum;

  private constructor(value: StatusValue, label: LabelEnum) {
    super();
    this.value = value;
    this.label = label;
  }

  public static getPending(): Status {
    return Status.PENDING;
  }

  public static getInProgress(): Status {
    return Status.IN_PROGRESS;
  }

  public static getCompleted(): Status {
    return Status.COMPLETED;
  }

  public isPending(): boolean {
    return this.value === Status.PENDING.value;
  }

  public isInProgress(): boolean {
    return this.value === Status.IN_PROGRESS.value;
  }

  public isCompleted(): boolean {
    return this.value === Status.COMPLETED.value;
  }

  public transitionToNextStatus(): Status {
    if (this.isPending()) {
      return Status.IN_PROGRESS;
    }

    if (this.isInProgress()) {
      return Status.COMPLETED;
    }

    throw new Error("Não é possível transicionar a partir do status atual.");
  }

  public toBlockedStatus() {
    if (this.isCompleted()) {
      throw new Error("Não é possível bloquear a partir do estatus completo.");
    }

    return Status.BLOCKED;
  }

  static fromValue(value: StatusValue) {
    switch (value) {
      case "PENDING":
        return Status.PENDING;
      case "IN_PROGRESS":
        return Status.IN_PROGRESS;
      case "COMPLETED":
        return Status.COMPLETED;
      case "BLOCKED":
        return Status.BLOCKED;
      default:
        return Status.PENDING;
    }
  }

  public toString(): string {
    return this.label;
  }
}
