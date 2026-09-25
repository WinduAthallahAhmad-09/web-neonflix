import { getMovieById } from "@/data/movies";
import { MovieHero } from "@/components/movies/MovieHero";
import { ShowtimeSelector } from "@/components/movies/ShowtimeSelector";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const movie = getMovieById(id);
  return {
    title: movie ? `${movie.title} | NEONFLIX` : "Movie Not Found | NEONFLIX",
  };
}

export default async function MovieDetailPage({ params }: Props) {
  const { id } = await params;
  const movie = getMovieById(id);
  
  if (!movie) {
    notFound();
  }
  
  return (
    <main className="min-h-screen bg-dark-bg pb-24">
      <MovieHero movie={movie} />
      <ShowtimeSelector movie={movie} />
    </main>
  );
}

 = await import('@/data/movies'); return movies.map((m: any) => ({ id: m.id })); }


export async function generateStaticParams() { const { movies } = await import('@/data/movies'); return movies.map((m: any) => ({ id: m.id })); }
