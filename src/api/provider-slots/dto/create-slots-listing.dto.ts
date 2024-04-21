export class Slots {
  readonly slotId: string;
  readonly time: string;
}

export class CreateProviderDto {
  readonly providerId: string;
  readonly date: Date;
  readonly slots: Array<Slots>;
}
