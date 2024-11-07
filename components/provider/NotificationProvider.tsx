"use client";
import { notificationService } from "@/libs/services/NotificationService";
import React, { useEffect, useState } from "react";

type Notification = {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
};

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const handleNotification = (notification: Omit<Notification, "id">) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newNotification = { id, ...notification };
      setNotifications((prev) => [...prev, newNotification]);

      // Remove notification after timeout
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 3000);
    };

    // Listen for "notification" events
    notificationService.on("notification", handleNotification);

    // Clean up listener on unmount
    return () => {
      notificationService.off("notification", handleNotification);
    };
  }, []);

  return (
    <div>
      {children}
      <div className="fixed top-4 right-4 flex gap-4 flex-col z-50">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg text-white cursor-pointer transition-opacity duration-75 min-w-80 max-w-80 shadow ${
              notification.type === "success"
                ? "bg-green-800"
                : notification.type === "error"
                ? "bg-red-800"
                : "bg-blue-800"
            }`}
          >
            {notification.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationProvider;
