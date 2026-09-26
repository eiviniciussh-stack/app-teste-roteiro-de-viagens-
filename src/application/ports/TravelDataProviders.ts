import type { Coordinates } from '@/domain/trip/types';

export interface WeatherProvider {
  getForecast(location: Coordinates, startsAt: string): Promise<unknown>;
}

export interface PlacesProvider {
  search(query: string, near: Coordinates): Promise<readonly unknown[]>;
}

export interface RouteProvider {
  estimate(origin: Coordinates, destination: Coordinates): Promise<unknown>;
}

export interface AiAssistantProvider {
  suggest(context: Readonly<Record<string, unknown>>): Promise<unknown>;
}
