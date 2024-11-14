import axiosInstance from "@/utils/axiosInstance";
import { storeAuthToken } from "./tokenHandler";
import { modalService } from "../services/ModalService";
import { loadingService } from "../services/LoadingService";
import { ErrorMessage } from "../entities/Error";

export async function actionLoginAccount(formData: FormData) {
  loadingService.showLoading();
  try {
    const loginRequest = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const { status, data } = await axiosInstance.post(
      "/auth/login",
      loginRequest
    );

    if (status === 200) {
      await storeAuthToken({ token: data.data.token });

      loadingService.hideLoading();
      modalService.showModal({
        message: "Login sukses!",
        type: "success",
        link: "/gallery",
      });
    }
  } catch (e: any) {
    loadingService.hideLoading();
    if (e.status === 404 || e.status === 401 || e.status === 400) {
      modalService.showModal({
        message: "Email/Kata Sandi Anda salah.",
        type: "error",
      });
    } else if (e.status === 500) {
      modalService.showModal({
        message: ErrorMessage.System,
        type: "error",
      });
    }
  }
}
