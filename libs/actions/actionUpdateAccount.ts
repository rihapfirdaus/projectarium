import axiosInstance from "@/utils/axiosInstance";
import { loadingService } from "../services/LoadingService";
import { modalService } from "../services/ModalService";
import { ErrorMessage } from "../entities/Error";

export async function actionUpdateAccount(accountRequest: any) {
  loadingService.showLoading();
  try {
    const { status } = await axiosInstance.put(
      `/users/profile`,
      accountRequest
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
    console.log(e);

    modalService.showModal({ message: ErrorMessage.System, type: "error" });
    return e.status;
  }
}
