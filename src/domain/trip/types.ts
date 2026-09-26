export type TripRole = 'organizer' | 'participant';
export type TravelPace = 'relaxed' | 'balanced' | 'intense';

export type Coordinates = Readonly<{ latitude: number; longitude: number }>;

export type Trip = Readonly<{
  id: string;
  ownerId: string;
  destination: string;
  startsAt: string;
  endsAt: string;
  pace: TravelPace;
  status: 'draft' | 'approved' | 'completed';
}>;
