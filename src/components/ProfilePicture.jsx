import { useState, useRef, useEffect } from 'react';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { Avatar, message, Spin } from 'antd';

const ProfilePicture = ({ profileImage, onImageChange }) => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(profileImage);
  const [loading, setLoading] = useState(false);

  // Update preview if profileImage prop changes
  useEffect(() => {
    if (profileImage) {
      setPreviewImage(profileImage);
    }
  }, [profileImage]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type and size
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
        return;
      }
      
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
        return;
      }

      setLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target.result;
        setPreviewImage(newImage);
        onImageChange(newImage);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <div
        className="cursor-pointer relative"
        onClick={handleImageClick}
      >
        {loading ? (
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center ">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
          </div>
        ) : (
          <>
            <Avatar
              size={128}
              icon={!previewImage && <UserOutlined style={{ fontSize: '64px' }} />}
              src={previewImage}
              className="bg-gray-100 border border-gray-200 "
            />
            <div className="absolute inset-0   bg-opacity-0 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-200">
              <span className="text-transparent hover:text-black text-xs font-medium">Change</span>
            </div>
          </>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png"
        className="hidden"
        disabled={loading}
        style={{ display: 'none' }}
        title=""
        aria-hidden="true"

      />
    </div>
  );
};

export default ProfilePicture;