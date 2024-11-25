import axiosInstance from "@/utils/axiosInstance";
import { Partner } from "../entities/Partner";

export async function getPartnerById(partnerId: string) {
  try {
    const response = await axiosInstance.get(`/partners/${partnerId}`);

    const partners: Partner = response.data.data;

    if (!partners) return null;

    return partners;
  } catch {
    return null;
  }
}

export async function getNewestPartnerByUserId(userId: string) {
  try {
    const response = await axiosInstance.get(`/partners`);

    const partner: Partner[] = response.data.data;

    if (partner.length === 0 || partner[0].id === undefined) return null;

    const filteredDiscuss = partner.filter((item) => item.user.id === userId);

    if (filteredDiscuss.length === 0) return null;
    else {
      const sorteredDiscuss = filteredDiscuss.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return sorteredDiscuss;
    }
  } catch {
    return null;
  }
}

export async function getNewestPartner() {
  try {
    const response = await axiosInstance.get("/partners");

    const partners: Partner[] = response.data.data;

    if (partners.length === 0 || partners[0].id === undefined) return null;

    const filteredPartners = partners.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return filteredPartners;
  } catch {
    return null;
  }
}

export async function getPopularPartner() {
  try {
    const response = await axiosInstance.get("/partners");

    const partners: Partner[] = response.data.data;

    if (partners.length === 0 || partners[0].id === undefined) return null;

    const filteredPartners = partners.sort(
      (a, b) => b._count.partnerLikes - a._count.partnerLikes
    );

    return filteredPartners.slice(0, 3);
  } catch {
    return null;
  }
}
