# Gas Station — Public Web

The customer-facing website for the Gas Station system. Visitors can see a list of stations, whether each is open right now, today's fuel prices, how much fuel is left in each tank, and the station's location, services and contact details.

This app only reads data. Stations, prices and stock are managed in the admin app (`../admin-web`) and served by the backend (`../gas-api`). Product requirements are in `../requirement.md`.

## Features

- **Station list.** Every active station, with its open/closed status and today's opening hours. Hours are calculated in the `Asia/Bangkok` time zone, including shifts that run past midnight.
- **Fuel prices and stock.** Pick a station to see a price board (baht per litre) and tank levels per fuel type. A fuel with no price or no reading shows a dash.
- **Map.** Embedded Google Map plus a Google Maps directions link (`/map`).
- **Services and contact pages** for the selected station.
- **Thai / English.** Picks the language from the browser on first visit and remembers the choice in `localStorage`. Thai is the main language.
- **Accessibility.** Skip link, ARIA live regions for loading states, semantic tabs.

## Tech stack

| Area      | Choice                                   |
| --------- | ---------------------------------------- |
| Framework | React 19 + TypeScript, built with Vite   |
| Routing   | React Router 7                           |
| State     | Zustand                                  |
| HTTP      | Axios                                    |
| Styling   | Tailwind CSS v4                          |
| Structure | Atomic design                            |

## Getting started

Requirements: Node.js 20+ and the `gas-api` backend running (by default on `http://localhost:8080`).

```bash
npm install
cp .env.example .env   # optional, see Configuration
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

### Scripts

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload      |
| `npm run build`   | Type-check (`tsc -b`) and build to `dist/` |
| `npm run preview` | Serve the production build locally        |
| `npm run lint`    | Run ESLint                                |

## Configuration

Environment variables (set them in `.env`):

| Variable                   | Required | Description |
| -------------------------- | -------- | ----------- |
| `VITE_PUBLIC_API_URL`      | In production | Base URL of the API, e.g. `https://api.example.com`. In dev, leave it unset to use the Vite proxy. If set, the API must allow CORS from this site. |
| `VITE_GOOGLE_MAPS_API_KEY` | No       | Google Maps Embed API key. Without it, `/map` shows no embedded map, but the directions link still works. |

How the API base URL is chosen (`src/lib/api.ts`):

1. `VITE_PUBLIC_API_URL` if it is set.
2. In dev, `/api`. Vite proxies it to `http://localhost:8080` and strips the `/api` prefix (see `vite.config.ts`).
3. In a production build with no variable set, `http://localhost:8080`. Always set the variable for real deployments.

## Backend API

The app calls two public endpoints:

| Endpoint                              | Used for |
| ------------------------------------- | -------- |
| `GET /api/v1/public/stations`         | List of active stations (JSON array): `id`, `slug`, `name`, `address`, `latitude`, `longitude`, `isActive` |
| `GET /api/v1/public/stations/{slug}`  | Station detail: `tagline`, `description`, `address`, `phone`, `hours` (JSON string), and a `fuels` array |

Each entry in `fuels` has `fuelTypeCode`, `fuelTypeName`, `pricePerLitre`, `volumeLitres` and `tankCapacityLitres`. Both camelCase and snake_case field names are accepted. A missing `pricePerLitre` or `volumeLitres` is shown as "unavailable".

`hours` is an object keyed `mon`…`sun`, each `{ "open": "HH:MM", "close": "HH:MM", "closed": false }`.

On startup the app loads the station list, then loads every station's detail in parallel and caches it, so switching between stations is instant. Raw responses are converted into the app's types in `src/lib/mapPublicApi.ts`.

## Routes

| Path        | Page |
| ----------- | ---- |
| `/`         | Station list, price board and tank levels |
| `/map`      | Map and directions for the selected station |
| `/services` | Services offered by the station |
| `/contact`  | Address, phone and contact details |

Any other path redirects to `/`. Routes follow `requirement.md` §9.1.

## Project structure

```
src/
├── atoms/        Basic UI pieces (Button, Badge, Text, SkipLink…)
├── molecules/    Small groups of atoms (PriceRow, FuelGaugeRow, NavItem, LanguageSwitcher…)
├── organisms/    Page sections (PublicHeader, FuelPriceBoard, FuelAvailabilityPanel, StationMap…)
├── templates/    PublicLayout: header, footer, loading/error states, loads data on mount
├── pages/        One component per route
├── store/        usePublicStationStore: Zustand store for stations, selection and fuel data
└── lib/
    ├── api.ts            Axios client and API calls
    ├── mapPublicApi.ts   Converts API responses into app types
    ├── types.ts          Station, FuelType, FuelPrice, FuelLevel
    ├── hours.ts          Open/closed logic in Bangkok time
    ├── maps.ts           Google Maps embed and directions URLs
    ├── format.ts         Number and date formatting
    ├── mockData.ts       Sample data for local UI work (not used by default)
    └── i18n/             Thai/English strings, provider and useI18n hook
```

To add or change UI text, edit `src/lib/i18n/strings.ts` and add the key in both `th` and `en`. Missing Thai keys fall back to English.
