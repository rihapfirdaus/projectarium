"use client";
import PartnerCard from "@/components/card/PartnerCard";
import FormPartner from "@/components/form/FormPartner";
import { getAccount } from "@/libs/fetchs/fetchAccount";
import { getNewestPartner } from "@/libs/fetchs/fetchPartner";
import { searchPost } from "@/libs/services/SearchService";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function GalleryPage() {
  const [user, setUser] = useState<any>(null);
  const [partners, setPartners] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const [filteredPartners, setFilteredPartners] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const userData = await getAccount();
      const partnerData = await getNewestPartner();
      setUser(userData || undefined);
      setPartners(partnerData || []);
      setFilteredPartners(partnerData || []);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = searchPost(partners, query);
    setFilteredPartners(filtered);
  }, [query]);

  return (
    <div className="flex flex-col overflow-y-clip max-h-screen gap-2">
      <div className="flex flex-col gap-2 sticky top-2">
        <form className="w-full flex gap-2 justify-center items-center border rounded-xl overflow-clip px-4 py-2 bg-white sticky top-2">
          <Search className="text-primary-darker" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="flex-grow border-none outline-none bg-transparent"
            placeholder="Cari projek"
          />
        </form>
        <FormPartner user={user} />
      </div>

      {filteredPartners.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-2 overflow-y-scroll">
          {filteredPartners.map((partner, index) => (
            <PartnerCard key={index} user={user} data={partner} />
          ))}
        </div>
      )}
    </div>
  );
}
