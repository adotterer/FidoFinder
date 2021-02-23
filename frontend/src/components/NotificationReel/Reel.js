import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./notifications.css";

export default function NotificationReel({ notifications }) {
  return (
    <div>
      {notifications &&
        notifications.map((notification, i) => {
          return (
            <div key={`${notification.user.username}++${i}`}>
              {notification.user.username}: {notification.msg}
            </div>
          );
        })}
    </div>
  );
}
