import axiosInstance from "@/utils/axiosInstance";
import { loadingService } from "../services/LoadingService";
import { modalService } from "../services/ModalService";
import { ErrorMessage } from "../entities/Error";
import { strict } from "assert";
import { stringify } from "querystring";
import { Partner } from "../entities/Partner";

export async function actionUploadPartner(partnerRequest: any) {
  loadingService.showLoading();
  try {
    const { status } = await axiosInstance.post("/partners", partnerRequest);

    if (status === 201) {
      loadingService.hideLoading();
      modalService.showModal({
        message: "Upload berhasil!",
        type: "success",
      });
    }
  } catch (e: any) {
    loadingService.hideLoading();
    console.log(e);

    modalService.showModal({ message: ErrorMessage.System, type: "error" });
  }
}

export async function actionUpdatePartner(
  partnerId: string,
  partnerRequest: any
) {
  loadingService.showLoading();
  try {
    const { status } = await axiosInstance.put(
      `/partners/${partnerId}`,
      partnerRequest
    );

    if (status === 200) {
      loadingService.hideLoading();
      modalService.showModal({
        message: "Update berhasil!",
        type: "success",
      });
      return status;
    }
  } catch (e: any) {
    loadingService.hideLoading();
    console.error(e);

    modalService.showModal({ message: ErrorMessage.System, type: "error" });
    return e.status;
  }
}

export async function actionDeletePartner(partnerId: string) {
  const userResponse = await modalService.showModal({
    message: "Hapus postingan?\npostingan terhapus tidak bisa dikembalikan",
    type: "validation",
  });

  if (userResponse) {
    try {
      const { status } = await axiosInstance.delete(`/partners/${partnerId}`);

      if (status === 200) {
        loadingService.hideLoading();
        modalService.showModal({
          message: "Postingan terhapus!",
          type: "success",
          link: "/partner",
        });
      }
    } catch (e: any) {
      loadingService.hideLoading();
      console.error(e);

      modalService.showModal({ message: ErrorMessage.System, type: "error" });
    }
  }
}

export async function actionLikePartner(partnerId: string) {
  try {
    const { status, data } = await axiosInstance.post(
      `/partners/${partnerId}/like`
    );

    if (status === 200) {
      return data.data.likeCount;
    }
  } catch (e: any) {
    if (e.status === 401) {
      modalService.showModal({
        message: "Sesi anda telah habis, silakan login kembali!",
        link: "/auth",
        type: "error",
      });
    }
    return null;
  }
}

export async function actionDislikePartner(partnerId: string) {
  try {
    const { status, data } = await axiosInstance.post(
      `/partners/${partnerId}/dislike`
    );

    console.log(status, data);
    if (status === 200) {
      return data.data.likeCount;
    }
  } catch (e: any) {
    if (e.status === 401) {
      modalService.showModal({
        message: "Sesi anda telah habis, silakan login kembali!",
        link: "/auth",
        type: "error",
      });
    }
    return null;
  }
}
