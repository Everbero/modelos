
import EditForm from '@/app/components/EditForm';
import { getAd, getAds } from '@/app/lib/database/scripts/crud';
import AnuncioData from '@/app/types/Anuncio';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const ad = await  getAd(id);

  if (!ad) return notFound();

  return (
    <main>
      <EditForm ad={ad as unknown as AnuncioData} />
    </main>
  );
}
