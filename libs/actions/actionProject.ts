import axiosInstance from "@/utils/axiosInstance";
import { loadingService } from "../services/LoadingService";
import { modalService } from "../services/ModalService";
import { ErrorMessage } from "../entities/Error";
import { strict } from "assert";
import { stringify } from "querystring";

export async function actionUploadProject(formData: FormData) {
  loadingService.showLoading();
  try {
    const { status } = await axiosInstance.post("/projects", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (status === 201) {
      loadingService.hideLoading();
      modalService.showModal({
        message: "Upload berhasil!",
        type: "success",
      });
    }
  } catch (e: any) {
    loadingService.hideLoading();
    console.error(e);

    modalService.showModal({ message: ErrorMessage.System, type: "error" });
  }
}

export async function actionUpdateProject(
  projectId: string,
  formData: FormData
) {
  loadingService.showLoading();
  try {
    const { status } = await axiosInstance.put(
      `/projects/${projectId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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

export async function actionDeleteProject(projectId: string) {
  const userResponse = await modalService.showModal({
    message: "Hapus postingan?\npostingan terhapus tidak bisa dikembalikan",
    type: "validation",
  });

  if (userResponse) {
    try {
      const { status } = await axiosInstance.delete(`/projects/${projectId}`);

      if (status === 200) {
        loadingService.hideLoading();
        modalService.showModal({
          message: "Postingan terhapus!",
          type: "success",
        });
      }
    } catch (e: any) {
      loadingService.hideLoading();
      console.error(e);

      modalService.showModal({ message: ErrorMessage.System, type: "error" });
    }
  }
}

export async function actionLikeProject(projectId: string) {
  try {
    const { status, data } = await axiosInstance.post(
      `/projects/${projectId}/like`
    );

    if (status === 200) {
      return data.data.likeCount;
    }
  } catch (e: any) {
    if (e.status === 401) {
      modalService.showModal({
        message: "Sesi anda telah habis, silakan login kembali!",
        link: "/auth?page=login",
        type: "error",
      });
    }
    return null;
  }
}

export async function actionDislikeProject(projectId: string) {
  try {
    const { status, data } = await axiosInstance.post(
      `/projects/${projectId}/dislike`
    );

    console.log(status, data);
    if (status === 200) {
      return data.data.likeCount;
    }
  } catch (e: any) {
    if (e.status === 401) {
      modalService.showModal({
        message: "Sesi anda telah habis, silakan login kembali!",
        link: "/auth?page=login",
        type: "error",
      });
    }
    return null;
  }
}
