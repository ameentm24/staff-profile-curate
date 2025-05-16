import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Button, notification, Spin } from 'antd';
import { useSelector } from 'react-redux';
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

const StaffProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Get staffId from location state
  const staffId = location.state?.staffId;
  const locationStaffData = location.state?.staffData;
  
  // Get all staff from Redux store
  const staffList = useSelector(state => state.staff.staffList);
  
  // Find staff with matching ID in Redux store
  const staffFromStore = staffId ? staffList.find(staff => staff.id === staffId) : null;
  
  // Use data from Redux store if available, otherwise fallback to location state
  const [staffData, setStaffData] = useState(null);

  useEffect(() => {
    // Simulating data fetching with a short delay
    setLoading(true);
    
    setTimeout(() => {
      if (staffFromStore) {
        // Use data from Redux store if available
        setStaffData(staffFromStore);
        console.log("Using staff data from Redux store:", staffFromStore);
      } else if (locationStaffData) {
        // Fallback to data passed through location state
        setStaffData(locationStaffData);
        console.log("Using staff data from location state:", locationStaffData);
      } else if (staffId) {
        // If we have an ID but no data, try to find it in the store again
        const foundStaff = staffList.find(staff => staff.id === staffId);
        if (foundStaff) {
          setStaffData(foundStaff);
          console.log("Found staff data on second attempt:", foundStaff);
        } else {
          console.error("Staff data not found with ID:", staffId);
          notification.error({
            message: 'Staff Data Not Found',
            description: `Unable to find staff profile with ID: ${staffId}`,
            duration: 5
          });
        }
      } else {
        // No ID or data provided
        console.error("No staff ID or data provided");
        notification.error({
          message: 'Staff Data Not Found',
          description: 'No staff profile ID or data was provided.',
          duration: 5
        });
      }
      
      setLoading(false);
    }, 300); // Short delay for better UX
  }, [staffFromStore, locationStaffData, staffId, staffList]);


  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const handleGoBack = () => {
    navigate(-1);
  };

 
  if (loading) {
    return (
      <div className="bg-white p-6 max-w-6xl mx-auto text-center" style={{ minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" tip="Loading staff profile..." />
      </div>
    );
  }


  if (!staffData) {
    return (
      <div className="bg-white p-6 max-w-6xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Staff Profile Not Found</h1>
        <p className="mb-6">Unable to load staff profile data.</p>
        <Button onClick={handleGoBack}>Go Back</Button>
      </div>
    );
  }

  const profileImage = staffData.profileImage || null;
  const staffName = staffData.staffName || 
    (staffData.firstName && staffData.lastName
      ? `${staffData.firstName} ${staffData.lastName}`
      : staffData.firstName || staffData.lastName || '-');

  return (
    <div className="bg-white p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Staff Profile</h1>
        {/* <div className="text-gray-500">
          Viewed on: {formattedDate}
        </div> */}
      </div>

      <div className="flex gap-8">
        {/* Left column with profile details */}
        <div className="w-1/3">
          <div className="border border-gray-200 rounded-md mb-6">
            <div className="p-8 flex flex-col items-center">
              <Avatar
                size={96}
                icon={!profileImage && <UserOutlined />}
                src={profileImage}
                className="bg-gray-100 mb-4"
              />
              <h2 className="text-xl font-bold mb-3">{staffName}</h2>
              <div className="flex gap-3 text-blue-500">
                <FacebookOutlined />
                <LinkedinOutlined />
                <SkypeOutlined />
                <MailOutlined />
              </div>
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center py-2">
                <MailOutlined className="mr-2 text-gray-500" />
                <span>{staffData.email || '-'}</span>
              </div>
              <div className="flex items-center py-2">
                <PhoneOutlined className="mr-2 text-gray-500" />
                <span>{staffData.phone || '-'}</span>
              </div>
              <div className="flex items-center py-2">
                <BankOutlined className="mr-2 text-gray-500" />
                <span>{staffData.academicLevel || '-'}</span>
              </div>
              <div className="flex items-center py-2">
                <span>{staffData.jobPosition || '-'}</span>
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

        {/* Right column with information sections */}
        <div className="w-2/3">
          <div className="mb-6">
            <SectionTitle title="General information" />
            <div className="bg-gray-50 rounded-md p-4">
              <InfoRow label="Staff code" value={staffData.staffCode || '-'} />
              <InfoRow label="Staff name" value={staffName} />
              <InfoRow label="Gender" value={staffData.gender || '-'} />
              <InfoRow label="Birthday" value={staffData.birthday || '-'} />
              <InfoRow label="Phone" value={staffData.phone || '-'} />
              <InfoRow label="Workplace" value={staffData.workplace || '-'} />
              <InfoRow label="Status" value={staffData.status || '-'} />
              <InfoRow label="Job position" value={staffData.jobPosition || '-'} />
              <InfoRow label="Academic level" value={staffData.academicLevel || '-'} />
              <InfoRow label="Hourly Rate" value={staffData.hourlyRate ? `₹${staffData.hourlyRate}` : '-'} />
              <InfoRow label="Religion" value={staffData.religion || '-'} />
              <InfoRow label="Nation" value={staffData.nation || '-'} />
              <InfoRow label="Marital status" value={staffData.maritalStatus || '-'} />
            </div>
          </div>

          <div>
            <SectionTitle title="Related information" />
            <div className="bg-gray-50 rounded-md p-4">
              <InfoRow label="Citizen identification" value={staffData.citizenIdentification || '-'} />
              <InfoRow label="Date of issue" value={staffData.dateOfIssue || '-'} />
              <InfoRow label="Place of birth" value={staffData.placeOfBirth || '-'} />
              <InfoRow label="Current address" value={staffData.currentAddress || '-'} />
              <InfoRow label="Bank account number" value={staffData.bankAccountNumber || '-'} />
              <InfoRow label="Bank account name" value={staffData.bankAccountName || '-'} />
              <InfoRow label="Bank name" value={staffData.bankName || '-'} />
              <InfoRow label="Personal tax code" value={staffData.personalTaxCode || '-'} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Button to go back */}
      <div className="mt-6">
        <Button onClick={handleGoBack}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default StaffProfilePage;