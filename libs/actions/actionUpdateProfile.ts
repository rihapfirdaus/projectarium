// import axiosInstance from "@/utils/axiosInstance";
// import { ErrorMessage } from "../entities/Error";
// import { loadingService } from "../services/LoadingService";
// import { modalService } from "../services/ModalService";

// export async function ActionUpdateProfile(formData: FormData) {
//   loadingService.showLoading();
//   try {
//     const profileRequest = {
//       fullname: formData.get("fullname"),
//       username: formData.get("username"),
//       email: formData.get("email"),
//       organization: formData.get("organization"),
//       birthdate: formData.get("birthdate"),
//       gender: formData.get("gender"),
//       phone: formData.get("phone"),
//       address: formData.get("address"),
//       university: formData.get("university"),
//     };

//     const { status } = await axiosInstance.put(
//       `/accounts/${formData.get("id")}`,
//       profileRequest
//     );

//     if (status === 200) {
//       loadingService.hideLoading();

//       modalService.showModal({
//         message: "Update profil berhasil!",
//         type: "success",
//       });
//     }
//   } catch {
//     loadingService.hideLoading();

//     modalService.showModal({
//       message: ErrorMessage.System,
//       type: "error",
//     });
//   }
// }
