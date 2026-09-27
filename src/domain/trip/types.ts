export type TripRole = 'organizer' | 'participant';
export type TravelPace = 'relaxed' | 'balanced' | 'intense';
export type TravelParty = 'solo' | 'couple' | 'family' | 'friends';

export type TripDraft = Readonly<{
  destination: string;
  departureDate: string;
  returnDate: string;
  party: TravelParty | null;
  travelerCount: number;
  travelingWithChildren: boolean | null;
  childAges: readonly (number | null)[];
}>;

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
