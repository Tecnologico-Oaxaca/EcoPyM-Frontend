import React, { useEffect } from 'react';
import './Notification.css';
import { IoWarningOutline } from 'react-icons/io5'; // Icono de advertencia
import { AiOutlineClose } from 'react-icons/ai';

const Notification = ({ message, show, onClose }) => {
    useEffect(() => {
      if (show) {
        const timer = setTimeout(() => {
          onClose();
        }, 2000); 
        return () => clearTimeout(timer);
      }

    }, [show, onClose]);
  
    if (!show) return null;
    return (
      <div className="notification-mensaje">
        <IoWarningOutline className="notification-icon" />
        <span>{message}</span>
        <AiOutlineClose className="notification-close-icon" onClick={onClose} />
      </div>
    );
  };
  
  export default Notification;
