class Metadata {
  readonly slotId: string;
  readonly appointmentDate: Date;
  readonly patientData: string;
}

export class PaymentIntentsEventDto {
  readonly id: string;
  readonly metadata: Metadata;
  readonly enabled_events: Array<string>;
}
