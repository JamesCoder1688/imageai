import Background from '@/components/Background';
import Header from '@/components/Header';
import Gallery from '@/components/Gallery';

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Background />
      <Header />
      <main className="pt-20">
        <Gallery />
      </main>
    </div>
  );
}