import React from 'react';
import { Avatar, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addStaff } from '../store/staffSlice';

import {
  UserOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  SkypeOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined
} from '@ant-design/icons';

const InfoRow = ({ label, value }) => (
  <div className="flex border-b border-gray-100 py-3">
    <div className="w-1/3 text-gray-600">{label}</div>
    <div className="w-2/3 text-gray-800 font-medium">{value}</div>
  </div>
);

const SectionTitle = ({ title }) => (
  <div className="text-lg font-semibold text-gray-800 mb-2">{title}</div>
);

const SocialButton = ({ icon, color }) => (
  <button className={`flex items-center justify-center w-8 h-8 rounded-full ${color}`}>
    {icon}
  </button>
);

const StaffProfilePreviewTab = ({ form }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formValues = form ? form.getFieldsValue(true) : {};

  const profileImage = formValues.profileImage || null;

  const staffName = formValues.firstName && formValues.lastName
    ? `${formValues.firstName} ${formValues.lastName}`
    : formValues.firstName || formValues.lastName || '-';

 
  const handleViewProfile = () => {
    
    const staffData = form.getFieldsValue(true);
    
    
    const formattedData = {
      ...staffData,
      birthday: staffData.birthday ? staffData.birthday.format('DD MMM YYYY') : undefined,
      dateOfIssue: staffData.dateOfIssue ? staffData.dateOfIssue.format('DD MMM YYYY') : undefined,
      staffName: staffName
    };

    
    const staffId = Date.now();
    const staffWithId = { id: staffId, ...formattedData };
    dispatch(addStaff(staffWithId));
    
   
    navigate('/staff-profile', { 
      state: { 
        staffId: staffId,
        staffData: staffWithId
      } 
    });
  };

  return (
    <>
      <div className="bg-white flex gap-20 mt-20 p-5">
        <div className="head w-1/2">
          <div className="border border-gray-200 rounded-md mb-6">
            <div className="p-8 flex flex-col items-center">
              <Avatar
                size={96}
                icon={!profileImage && <UserOutlined style={{ fontSize: '48px' }} />}
                src={profileImage}
                className="bg-gray-100 mb-4"
              />
              <h2 className="text-xl font-bold mb-3">{staffName}</h2>
              <div className="flex gap-3">
                <FacebookOutlined />
                <LinkedinOutlined />
                <SkypeOutlined />
                <MailOutlined />
              </div>
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center py-2">
                <MailOutlined className="mr-2 text-gray-500" />
                <span>{formValues.email || '-'}</span>
              </div>
              <div className="flex items-center py-2">
                <PhoneOutlined className="mr-2 text-gray-500" />
                <span>{formValues.phone || '-'}</span>
              </div>
              <div className="flex items-center py-2">
                <BankOutlined className="mr-2 text-gray-500" />
                <span>{formValues.academicLevel || '-'}</span>
              </div>
              <div className="flex items-center py-2">
                <span>{formValues.jobPosition || '-'}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="text-gray-600 mr-2">Direct manager:</div>
                <Avatar size={32} icon={<UserOutlined />} className="bg-gray-100" />
              </div>
            </div>
          </div>

         
        </div>

        <div className="data w-full">
          <div className="mb-6">
            <SectionTitle title="General information" />
            <div className="bg-gray-50 rounded-md p-4">
              <InfoRow label="Staff code" value={formValues.staffCode || '-'} />
              <InfoRow label="Staff name" value={staffName} />
              <InfoRow label="Gender" value={formValues.gender || '-'} />
              <InfoRow
                label="Birthday"
                value={formValues.birthday ? formValues.birthday.format('DD MMM YYYY') : '-'}
              />
              <InfoRow label="Phone" value={formValues.phone || '-'} />
              <InfoRow label="Workplace" value={formValues.workplace || '-'} />
              <InfoRow label="Status" value={formValues.status || '-'} />
              <InfoRow label="Job position" value={formValues.jobPosition || '-'} />
              <InfoRow label="Academic level" value={formValues.academicLevel || '-'} />
              <InfoRow label="Hourly Rate" value={`₹${formValues.hourlyRate || '-'}`} />
              <InfoRow label="Religion" value={formValues.religion || '-'} />
              <InfoRow label="Nation" value={formValues.nation || '-'} />
              <InfoRow label="Marital status" value={formValues.maritalStatus || '-'} />
            </div>
          </div>

          <div>
            <SectionTitle title="Related information" />
            <div className="bg-gray-50 rounded-md p-4">
              <InfoRow label="Citizen identification" value={formValues.citizenIdentification || '-'} />
              <InfoRow
                label="Date of issue"
                value={formValues.dateOfIssue ? formValues.dateOfIssue.format('DD MMM YYYY') : '-'}
              />
              <InfoRow label="Place of birth" value={formValues.placeOfBirth || '-'} />
              <InfoRow label="Current address" value={formValues.currentAddress || '-'} />
              <InfoRow label="Bank account number" value={formValues.bankAccountNumber || '-'} />
              <InfoRow label="Bank account name" value={formValues.bankAccountName || '-'} />
              <InfoRow label="Bank name" value={formValues.bankName || '-'} />
              <InfoRow label="Personal tax code" value={formValues.personalTaxCode || '-'} />
            </div>
<div className="flex justify-end mt-5">             <Button 
            type="primary" 
            onClick={handleViewProfile}
            className="w-50 self-end bg-black hover:bg-gray-800 border-black"
          >
            Save
          </Button>
          </div>

          </div>
        </div>
        
      </div>
    </>
  );
};

export default StaffProfilePreviewTab;