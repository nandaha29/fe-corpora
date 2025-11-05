export async function fetchLandingHero() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/landing/hero`, {
    cache: "no-store", // biar data selalu fresh
  });

  if (!res.ok) {
    throw new Error("Failed to fetch hero section data");
  }

  return res.json();
}
