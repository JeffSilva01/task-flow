import { ValueObject } from "../value-object";

export class Priority extends ValueObject {
  public static readonly LOW: Priority = new Priority("LOW", "low");
  public static readonly MEDIUM: Priority = new Priority("MEDIUM", "medium");
  public static readonly HIGH: Priority = new Priority("HIGH", "high");

  constructor(
    private readonly value: string,
    private readonly label: string,
  ) {
    super();
  }

  static getLow() {
    return Priority.LOW;
  }

  static getMedium() {
    return Priority.MEDIUM;
  }

  static getHigh() {
    return Priority.HIGH;
  }

  public setLow() {
    return Priority.LOW;
  }

  public setMedium() {
    return Priority.MEDIUM;
  }

  public setHigh() {
    return Priority.HIGH;
  }

  public isLow() {
    return this.value === Priority.LOW.value;
  }

  public isMedium() {
    return this.value === Priority.MEDIUM.value;
  }

  public isHigh() {
    return this.value === Priority.HIGH.value;
  }

  static fromValue(value: string) {
    switch (value) {
      case "LOW":
        return Priority.LOW;
      case "MEDIUM":
        return Priority.MEDIUM;
      case "HIGH":
        return Priority.HIGH;
      default:
        throw new Error(`Priority inválido: ${value}`);
    }
  }

  public toString() {
    return this.label;
  }
}
