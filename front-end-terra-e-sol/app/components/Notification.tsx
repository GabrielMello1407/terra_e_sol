import React, { useEffect } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return isVisible ? (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />
      <div className="bg-[#F2F2F2] p-4 rounded-lg shadow-lg w-[300px] h-[200px] flex items-center justify-between relative z-50">
        <p
          className="text-[#025213] font-poppins text-2xl font-bold text-center"
          dangerouslySetInnerHTML={{ __html: message }}
        />
        <BsFillCheckCircleFill className="text-[#025213] text-3xl w-[75px] h-auto" />
      </div>
    </div>
  ) : null;
};

export default Notification;
