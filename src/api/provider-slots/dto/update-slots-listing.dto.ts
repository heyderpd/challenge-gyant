export class Slots {
  readonly slotId?: string;
  readonly time?: string;
}

export class UpdateProviderDto {
  readonly date?: Date;
  readonly slots?: Array<Slots>;
}
