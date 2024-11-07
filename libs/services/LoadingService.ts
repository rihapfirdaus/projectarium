import { EventEmitter } from "events";

class LoadingService extends EventEmitter {
  public showLoading() {
    this.emit("showLoading");
  }

  public hideLoading() {
    this.emit("hideLoading");
  }
}

export const loadingService = new LoadingService();
