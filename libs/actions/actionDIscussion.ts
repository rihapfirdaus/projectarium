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
