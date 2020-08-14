/*
import { firestore } from 'firebase/app'
import 'firebase/firestore';

const seedDocs = [
  {
    type: "GROUND_COVER",
    name: "Gravel",
    lowPrice: 200000,
    highPrice: 400000
  },
  {
    type: "GROUND_COVER",
    name: "Pavers",
    lowPrice: 400000,
    highPrice: 800000
  },
  {
    type: "GROUND_COVER",
    name: "Turf",
    lowPrice: 200000,
    highPrice: 600000
  },
  {
    type: "DECK_MATERIAL",
    name: "Redwood",
    lowPrice: 1200000,
    highPrice: 1400000
  },
  {
    type: "DECK_MATERIAL",
    name: "Composite",
    lowPrice: 400000,
    highPrice: 1200000
  },
  {
    type: "GROUND_COVER",
    name: "Gravel",
    lowPrice: 200000,
    highPrice: 400000
  },
  {
    type: "STRUCTURES",
    name: "Pergola",
    lowPrice: 1200000,
    highPrice: 3000000
  },
  {
    type: "STRUCTURES",
    name: "Taj Mahal",
    lowPrice: 200000,
    highPrice: 600000
  },
  {
    type: "STRUCTURES",
    name: "Pirate Ship",
    lowPrice: 400000,
    highPrice: 1200000
  },
  {
    type: "FENCING_AND_PRIVACY",
    name: "Bamboo Shroud",
    lowPrice: 300000,
    highPrice: 500000
  },
  {
    type: "FENCING_AND_PRIVACY",
    name: "Plywood Fence",
    lowPrice: 50000,
    highPrice: 300000
  },
  {
    type: "FENCING_AND_PRIVACY",
    name: "Redwood Fence",
    lowPrice: 300000,
    highPrice: 1000000
  },
  {
    type: "LIGHTING",
    name: "3-5",
    lowPrice: 50000,
    highPrice: 100000
  },
  {
    type: "LIGHTING",
    name: "6-15",
    lowPrice: 60000,
    highPrice: 150000
  },
  {
    type: "LIGHTING",
    name: "16+",
    lowPrice: 150000,
    highPrice: 3000000
  },
  {
    type: "WATER_FEATURES",
    name: "Fountain",
    lowPrice: 2000000,
    highPrice: 6000000
  },
  {
    type: "WATER_FEATURES",
    name: "Pool",
    lowPrice: 6000000,
    highPrice: 10000000,
  },
]

export default async () => {
  const existingCollectionSnapshot = await firestore().collection('items').get();

  if (!existingCollectionSnapshot.empty) {
    const batch = firestore().batch();

    existingCollectionSnapshot.docs.forEach(d => batch.delete(d.ref));

    await batch.commit();
  }

  return Promise.all(
    seedDocs.map(
      async item => firestore().collection('items').add(item)
    )
  );
}
*/
