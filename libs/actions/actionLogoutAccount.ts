// import { redirect } from "next/navigation";
// import { auth, removeAuthToken } from "./tokenHandler";
// import { loadingService } from "../services/LoadingService";
// import { modalService } from "../services/ModalService";

// export async function actionLogoutAccount() {
//   loadingService.showLoading();
//   try {
//     removeAuthToken();

//     const isAuth = await auth();
//     if (!isAuth) {
//       loadingService.hideLoading();
//       redirect("/");
//     }
//   } catch {
//     loadingService.hideLoading();
//     modalService.showModal({ message: "Logout gagal!" });
//   }
// }
