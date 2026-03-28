import { FoodPreference } from "./prisma-types";

export function parseFoodPreference(value: string): FoodPreference {
  if (Object.values(FoodPreference).includes(value as FoodPreference)) {
    return value as FoodPreference;
  }

  throw new Error("Invalid FoodPreference: " + value);
}