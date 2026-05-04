import { cookies } from "next/headers";

export const UNLOCKED_COOKIE = "site_unlocked";

export async function canAccessSite(): Promise<boolean> {
  const jar = await cookies();
  const raw = jar.get(UNLOCKED_COOKIE)?.value;
  if (!raw) return false;
  try {
    return raw === "true";
  } catch {
    return false;
  }
}
