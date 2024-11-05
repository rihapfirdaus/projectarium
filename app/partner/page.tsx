import PartnerCard from "@/components/card/PartnerCard";
import UserCard from "@/components/card/UserCard";
import { Search, Settings2 } from "lucide-react";

export default function galleryPage() {
  return (
    <div className="flex flex-col overflow-y-clip max-h-screen gap-4">
      <div className="w-full flex gap-2 justify-center items-center border rounded-xl overflow-clip px-4 py-2 bg-white sticky top-2">
        <Search className="text-primary-darker" />
        <input
          type="text"
          className="flex-grow border-none outline-none bg-transparent"
          placeholder="Cari partner, posisi"
        />
        <Settings2 className="text-primary-darker" />
      </div>
      <p className="text-primary-darker font-semibold text-lg">
        Pengguna terkait/Pengguna dengan keahlian yang sama
      </p>
      <UserCard />
      <p className="text-primary-darker font-semibold text-lg">
        Reqruitment terkait/Reqruitment terbaru
      </p>
      <div className="flex flex-col gap-2 overflow-y-scroll">
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
      </div>
    </div>
  );
}
