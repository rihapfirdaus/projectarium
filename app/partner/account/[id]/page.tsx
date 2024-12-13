"use server";

import PartnerCard from "@/components/card/PartnerCard";
import ProjectCard from "@/components/card/ProjectCard";
import FormEditAccount from "@/components/form/FormUpdateProfil";
import TemplateCatalog from "@/components/template/TemplateCatalog";
import { getAccount, getAccountById } from "@/libs/fetchs/fetchAccount";
import {
  getNewestPartner,
  getNewestPartnerByUserId,
} from "@/libs/fetchs/fetchPartner";
import {
  getNewestProjectByUserId,
  getPopularProject,
} from "@/libs/fetchs/fetchProject";
import { capitalizeFirstWord } from "@/libs/helpers/formatter/stringFormatter";

export default async function AccountPage({
  params,
}: {
  params?: Promise<{ id: string }>;
}) {
  const param = await params;
  const account = param ? await getAccountById(param.id) : await getAccount();
  const user = await getAccount();
  const isMe = user?.id === account?.id;

  if (account != null) {
    const myProjects =
      (await getNewestProjectByUserId(param?.id || account.id)) || [];
    const popularProjects = (await getPopularProject()) || [];
    const myPartners =
      (await getNewestPartnerByUserId(param?.id || account.id)) || [];
    const newestPartners = (await getNewestPartner())?.slice(0, 5) || [];

    return (
      <div className="py-2 flex flex-col gap-2 divide-y">
        <div>
          <h2 className="text-primary-darker font-bold text-3xl">
            {capitalizeFirstWord(account.fullname)}
          </h2>
          <p className="text-base font-normal text-black">
            {"@" + account.username}
          </p>
          {account.bio && <p>{account.bio}</p>}
          {isMe && user != null && <FormEditAccount user={user} />}
        </div>

        {myProjects.length > 0 && (
          <TemplateCatalog
            title={
              isMe
                ? "Proyek Anda"
                : "Proyek " + capitalizeFirstWord(account.fullname)
            }
            user={user}
            data={myProjects}
            Card={ProjectCard}
            cardProps={{ user: user, size: "mini" }}
          />
        )}

        {myPartners.length > 0 && (
          <TemplateCatalog
            title={
              isMe
                ? "Reqruitment Anda"
                : "Reqruitment " + capitalizeFirstWord(account.fullname)
            }
            user={user}
            data={myPartners}
            Card={PartnerCard}
            cardProps={{ user: user, size: "mini" }}
          />
        )}

        <TemplateCatalog
          title="Proyek Terpopuler"
          user={user}
          data={popularProjects}
          Card={ProjectCard}
          cardProps={{ user: user, size: "list" }}
        />

        <TemplateCatalog
          title="Reqruitment Terbaru"
          user={user}
          data={newestPartners}
          Card={PartnerCard}
          cardProps={{ user: user, size: "list" }}
        />
      </div>
    );
  }
}
