import { FoodPreference, RSVPResponse } from "./prisma-types";

export function parseFoodPreference(value: string): FoodPreference {
  if (Object.values(FoodPreference).includes(value as FoodPreference)) {
    return value as FoodPreference;
  }

  throw new Error("Invalid FoodPreference: " + value);
}

export function parseRSVPResponse(value: string): RSVPResponse {
  if (Object.values(RSVPResponse).includes(value as RSVPResponse)) {
    return value as RSVPResponse;
  }

  throw new Error("Invalid RSVPResponse: " + value);
}

export function rsvpResponseToString(rsvpResponse: RSVPResponse | null) {
  if (!rsvpResponse) {
    return "Waiting for response...";
  }
  switch (rsvpResponse) {
    case RSVPResponse.FULL_DAY:
      return "All Day";
    case RSVPResponse.EVENING_ONLY:
      return "Evening Only";
    default:
      return "Not Attending";
  }
}