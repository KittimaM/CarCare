import React, { useState } from "react";

const Notification = ({ message, type }) => {
  const colorNotificationPanel =
    type == "SUCCESS" ? "bg-lime-100" : "bg-rose-300";
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } fixed top-5 right-5 ${colorNotificationPanel} p-4 border border-gray-200 shadow-md rounded-md transition-all duration-300 z-50`}
      role="alert"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-800">{message}</p>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &#10006;
        </button>
      </div>
    </div>
  );
};

export default Notification;
