export async function generateStaticParams() {
  const { showtimes } = await import('@/data/showtimes');
  return showtimes.map((s: any) => ({ showtimeId: s.id }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
