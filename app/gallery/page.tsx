import GalleryCard from "@/components/card/GalleryCard";
import PostCard from "@/components/card/PostCard";
import { Search, Settings2, SlidersHorizontal } from "lucide-react";

export default function galleryPage() {
  return (
    <div className="flex flex-col overflow-y-clip max-h-screen gap-4">
      <div className="w-full flex gap-2 justify-center items-center border rounded-xl overflow-clip px-4 py-2 bg-white sticky top-2">
        <Search className="text-primary-darker" />
        <input
          type="text"
          className="flex-grow border-none outline-none bg-transparent"
          placeholder="Cari projek"
        />
        <Settings2 className="text-primary-darker" />
      </div>
      <p className="text-primary-darker font-semibold text-lg">
        Projek terpopuler
      </p>
      <PostCard />
      <p className="text-primary-darker font-semibold text-lg">
        Projek terbaru
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-2 overflow-y-scroll">
        <GalleryCard />
        <GalleryCard />
        <GalleryCard />
        <GalleryCard />
        <GalleryCard />
        <GalleryCard />
        <GalleryCard />
        <GalleryCard />
        <GalleryCard />
        <GalleryCard />
        <GalleryCard />
        <GalleryCard />
        <GalleryCard />
        <GalleryCard />
      </div>
    </div>
  );
}
