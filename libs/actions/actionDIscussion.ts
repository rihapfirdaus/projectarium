import axiosInstance from "@/utils/axiosInstance";

export async function actionUploadDiscussion(formData: FormData) {
  try {
    const discussionRequest = {
      comment: formData.get("comment"),
      projectId: formData.get("projectId"),
    };

    await axiosInstance.post("/discussions/projects", discussionRequest);
  } catch (e: any) {
    console.log(e);
  }
}

export async function actionUploadReply(formData: FormData) {
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
      `/discussions/projects/${formData.get("discussId")}/reply`,
      replyRequest
    );
  } catch (e: any) {
    console.log(e);
  }
}
