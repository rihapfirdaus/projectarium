import { EventEmitter } from "events";

type Modal = {
  message: string | React.ReactNode;
  type?: "success" | "error" | "info" | "validation";
  link?: string;
  option?: string[];
};

class ModalService extends EventEmitter {
  public showModal(modal: Modal): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.emit("showModal", { modal, resolve }); // Pass the resolve function
    });
  }

  public hideModal() {
    this.emit("hideModal");
  }
}

export const modalService = new ModalService();
