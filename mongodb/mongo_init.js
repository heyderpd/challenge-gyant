db.createCollection('providers');
db.createCollection('providerslotslists');
db.createCollection('providerslotsstatuses');

db.providers.insert([
  {
    providerId: ObjectId('100000000000000000000001'),
    source: 'some-source',
    name: 'some-name',
    specialty: 'some-specialty',
    cost: 1000,
    location: 'some-location',
  },
  {
    providerId: ObjectId('100000000000000000000002'),
    source: 'some-source',
    name: 'some-name',
    specialty: 'some-specialty',
    cost: 1000,
    location: 'some-location',
  },
]);

db.providerslotslists.insert([
  {
    providerId: ObjectId('100000000000000000000001'),
    date: new Date('2024-01-02T00:00:00.000Z'),
    slots: [
      {
        slotId: ObjectId('200000000000000000000001'),
        time: "14:00",
      },
      {
        slotId: ObjectId('200000000000000000000002'),
        time: "14:30",
      },
      {
        slotId: ObjectId('200000000000000000000003'),
        time: "15:00",
      },
    ],
  },
  {
    providerId: ObjectId('100000000000000000000001'),
    date: new Date('2024-01-03T00:00:00.000Z'),
    slots: [
      {
        slotId: ObjectId('200000000000000000000004'),
        time: "15:00",
        appointmentId: "appointment001",
      },
    ],
  },
  {
    providerId: ObjectId('100000000000000000000002'),
    date: new Date('2024-01-04T00:00:00.000Z'),
    slots: [
    ],
  },
]);

db.providerslotsstatuses.insert([
  {
    appointmentId: "appointment001",
    providerId: ObjectId('100000000000000000000001'),
    slotId: ObjectId('200000000000000000000001'),
    paymentIntentDate: new Date('2024-01-01T00:00:00.000Z'),
    status: "new",
  },
  {
    appointmentId: "appointment001",
    providerId: ObjectId('100000000000000000000001'),
    slotId: ObjectId('200000000000000000000002'),
    paymentIntentDate: new Date('2024-01-01T00:00:00.000Z'),
    status: "confirmed",
  },
  {
    appointmentId: "appointment001",
    providerId: ObjectId('100000000000000000000001'),
    slotId: ObjectId('200000000000000000000003'),
    paymentIntentDate: new Date('2024-01-01T00:00:00.000Z'),
    status: "rejected",
  },
  {
    appointmentId: "appointment001",
    providerId: ObjectId('100000000000000000000001'),
    slotId: ObjectId('200000000000000000000004'),
    paymentIntentDate: new Date('2024-01-01T00:00:00.000Z'),
    status: "unavailable",
  },
]);
