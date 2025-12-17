export async function fetchLandingHero() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/landing/hero`, {
    // Use revalidate instead of no-store to enable bfcache
    // Revalidate every 60 seconds for fresh data while allowing bfcache
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch hero section data");
  }

  return res.json();
}
