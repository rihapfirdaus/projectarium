import { EventEmitter } from "events";

type Notification = {
  message: string;
  type?: "success" | "error" | "info";
};

class NotificationService extends EventEmitter {
  public sendNotification(notification: Notification) {
    this.emit("notification", notification);
  }
}

export const notificationService = new NotificationService();
