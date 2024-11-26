import axiosInstance from "@/utils/axiosInstance";
import { modalService } from "../services/ModalService";
import { loadingService } from "../services/LoadingService";
import { ErrorMessage } from "../entities/Error";

export async function actionUploadDiscussion(
  formData: FormData,
  type: "project" | "partner"
) {
  try {
    if (type === "project") {
      const discussionRequest = {
        comment: formData.get("comment"),
        projectId: formData.get("projectId"),
      };

      await axiosInstance.post("/discussions/projects", discussionRequest);
    } else {
      const discussionRequest = {
        comment: formData.get("comment"),
        discussId: formData.get("discussId"),
      };

      const response = await axiosInstance.post(
        "/discussions/partners",
        discussionRequest
      );
      console.log(response);
    }
  } catch (e: any) {
    console.log(e);
  }
}

export async function actionUploadReply(
  formData: FormData,
  type: "project" | "partner"
) {
  try {
    let replyRequest = {
      comment: formData.get("comment"),
    };

    if (formData.get("username")) {
      replyRequest = {
        comment: `@${formData.get("username")} ${formData.get("comment")}`,
      };
    }

    await axiosInstance.post(
      `/discussions/${type}s/${formData.get("discussId")}/reply`,
      replyRequest
    );
  } catch (e: any) {
    console.log(e);
  }
}

export async function actionDeleteDiscussion(
  discussId: string,
  type: "project" | "partner"
) {
  const userResponse = await modalService.showModal({
    message: "Hapus diskusi?",
    type: "validation",
  });

  if (userResponse) {
    try {
      const { status } = await axiosInstance.delete(
        `/discussions/${type}s/${discussId}`
      );

      if (status === 200) {
        loadingService.hideLoading();
        modalService.showModal({
          message: "Diskusi terhapus!",
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
