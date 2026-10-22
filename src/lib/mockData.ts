import type { DayKey, FuelLevel, FuelPrice, FuelType, Station } from './types'

export const mockStation: Station = {
  id: '00000000-0000-4000-8000-000000000001',
  name: 'ปั๊มบางกอก เซ็นทรัล — สาขาหลัก',
  logoUrl: null,
  tagline: 'เติมเต็มทุกการเดินทาง · คุณภาพที่ไว้ใจได้',
  description:
    'สถานีบริการน้ำมันครบวงจร บริการรวดเร็ว สะอาด และปลอดภัย พร้อมร้านสะดวกซื้อและล้างรถ',
  address: '88 ถนนพระราม 4 แขวงสีลม เขตบางรัก กรุงเทพฯ 10500',
  latitude: 13.7305,
  longitude: 100.541,
  phone: '02-123-4567',
  email: 'hello@bangkokcentral.station',
  socialLinks: {
    line: 'https://line.me/',
    facebook: 'https://facebook.com/',
  },
  services: [
    'ร้านสะดวกซื้อ',
    'ล้างรถอัตโนมัติ',
    'เติมลมยาง',
    'ห้องน้ำสาธารณะ',
    'Wi‑Fi',
  ],
  hours: {
    mon: { open: '05:30', close: '23:00' },
    tue: { open: '05:30', close: '23:00' },
    wed: { open: '05:30', close: '23:00' },
    thu: { open: '05:30', close: '23:00' },
    fri: { open: '05:30', close: '23:30' },
    sat: { open: '06:00', close: '23:30' },
    sun: { open: '06:00', close: '22:00' },
  } satisfies Record<DayKey, { open: string; close: string }>,
}

export const mockStation2: Station = {
  ...mockStation,
  id: '00000000-0000-4000-8000-000000000002',
  name: 'ปั๊มบางกอก — สาขาลาดพร้าว',
  tagline: 'ใกล้บ้านคุณ · บริการมาตรฐานเดียวกันทุกสาขา',
  description:
    'จุดบริการสาขารองรับรถบรรทุกและรถยนต์ส่วนบุคคล ที่จอดกว้างขวาง ทางเข้า-ออกสะดวก',
  address: '1688 ถนนลาดพร้าว แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพฯ 10310',
  latitude: 13.8144,
  longitude: 100.609,
  phone: '02-987-6543',
  email: 'ladprao@bangkokcentral.station',
  hours: {
    mon: { open: '06:00', close: '22:00' },
    tue: { open: '06:00', close: '22:00' },
    wed: { open: '06:00', close: '22:00' },
    thu: { open: '06:00', close: '22:00' },
    fri: { open: '06:00', close: '23:00' },
    sat: { open: '06:00', close: '23:00' },
    sun: { open: '00:00', close: '00:00', closed: true },
  },
}

/** Stations shown on the public home overview (FR-P01). */
export const mockStations: Station[] = [mockStation, mockStation2]

export const mockFuelTypes: FuelType[] = [
  {
    id: 'f1',
    name: 'Gasohol 95',
    code: 'G95',
    tankCapacityLitres: 40_000,
    lowThresholdLitres: 8_000,
    isActive: true,
  },
  {
    id: 'f2',
    name: 'Gasohol 91',
    code: 'G91',
    tankCapacityLitres: 35_000,
    lowThresholdLitres: 7_000,
    isActive: true,
  },
  {
    id: 'f3',
    name: 'Diesel B7',
    code: 'D7',
    tankCapacityLitres: 45_000,
    lowThresholdLitres: 9_000,
    isActive: true,
  },
  {
    id: 'f4',
    name: 'E20',
    code: 'E20',
    tankCapacityLitres: 20_000,
    lowThresholdLitres: 4_000,
    isActive: true,
  },
]

function pricesForStation(stationId: string): FuelPrice[] {
  return [
    {
      stationId,
      fuelTypeId: 'f1',
      pricePerLitre: 47.68,
      source: 'api',
      recordedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      stale: false,
    },
    {
      stationId,
      fuelTypeId: 'f2',
      pricePerLitre: 44.15,
      source: 'api',
      recordedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      stale: false,
    },
    {
      stationId,
      fuelTypeId: 'f3',
      pricePerLitre: 32.94,
      source: 'manual',
      recordedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      stale: stationId === mockStation.id,
    },
    {
      stationId,
      fuelTypeId: 'f4',
      pricePerLitre: 41.2,
      source: 'api',
      recordedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      stale: false,
    },
  ]
}

function levelsForStation(stationId: string): FuelLevel[] {
  return [
    {
      stationId,
      fuelTypeId: 'f1',
      volumeLitres: stationId === mockStation.id ? 28_500 : 35_000,
      source: 'api',
      recordedAt: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
    },
    {
      stationId,
      fuelTypeId: 'f2',
      volumeLitres: stationId === mockStation.id ? 6_200 : 18_000,
      source: 'api',
      recordedAt: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
    },
    {
      stationId,
      fuelTypeId: 'f3',
      volumeLitres: 31_000,
      source: 'api',
      recordedAt: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
    },
    {
      stationId,
      fuelTypeId: 'f4',
      volumeLitres: 0,
      source: 'api',
      recordedAt: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
      unavailable: stationId === mockStation.id,
    },
  ]
}

export const mockPrices: FuelPrice[] = [
  ...pricesForStation(mockStation.id),
  ...pricesForStation(mockStation2.id),
]

export const mockLevels: FuelLevel[] = [
  ...levelsForStation(mockStation.id),
  ...levelsForStation(mockStation2.id),
]
