import axiosInstance from "@/utils/axiosInstance";
import { loadingService } from "../services/LoadingService";
import { modalService } from "../services/ModalService";
import { ErrorMessage } from "../entities/Error";
import { ISOFormatter } from "../helpers/formatter/dateFormatter";

export async function actionRegisterAccount(formData: FormData) {
  loadingService.showLoading();
  try {
    const registerRequest = {
      fullname: formData.get("fullname"),
      username: formData.get("username"),
      password: formData.get("password"),
      birthdate: ISOFormatter(formData.get("birthdate") as string),
    };

    if (registerRequest.password != formData.get("confirm")) {
      return {
        status: 400,
        message: "Password yang Anda berikan tidak sama!",
      };
    }

    const { status } = await axiosInstance.post(
      "/auth/register",
      registerRequest
    );

    if (status === 201) {
      loadingService.hideLoading();
      modalService.showModal({
        message: "Register sukses! Silahkan login kembali..",
        type: "success",
        link: "/auth",
      });
    }
  } catch (e: any) {
    loadingService.hideLoading();
    console.log(e);
    if (e.status === 400) {
      modalService.showModal({
        message: "Username telah digunakan!",
        type: "error",
      });
    } else if (e.status === 500) {
      modalService.showModal({ message: ErrorMessage.System, type: "error" });
    }
  }
}
