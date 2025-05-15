import { useState } from 'react';
import { Modal, Tabs, Form, Button, Steps, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { addStaff } from '../store/staffSlice';
import ProfileTab from './ProfileTab';
import RelatedInformationTab from './RelatedInformationTab';
import AdditionalInfoTab from './AdditionalInfoTab';
import StaffPreviewTab from './StaffPreviewTab';
import { UserOutlined, InfoCircleOutlined, SettingOutlined, FileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Step } = Steps;

const StaffProfileModal = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState('profile');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const getCurrentStep = () => {
        switch (activeTab) {
            case 'profile':
                return 0;
            case 'related-info':
                return 1;
            case 'additional-info':
                return 2;
            case 'preview':
                return 3;
            default:
                return 0;
        }
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            // Format dates and create a staffName property
            const formattedValues = {
                ...values,
                birthday: values.birthday ? values.birthday.format('DD MMM YYYY') : undefined,
                dateOfIssue: values.dateOfIssue ? values.dateOfIssue.format('DD MMM YYYY') : undefined,
                staffName: values.firstName && values.lastName ?
                    `${values.firstName} ${values.lastName}` :
                    values.firstName || values.lastName || '-'
            };

            // Add to Redux store with a unique ID
            const staffId = Date.now();
            const staffWithId = { id: staffId, ...formattedValues };

            try {
                // Dispatch action to add staff to Redux store
                dispatch(addStaff(staffWithId));

                // Show success notification
                notification.success({
                    message: 'Staff Profile Created',
                    description: `Staff profile for ${staffWithId.staffName} has been successfully created.`,
                    duration: 3
                });

                // Close modal
                onClose();

                // Reset form
                form.resetFields();

                // Navigate to staff profile page with the ID
                navigate('/staff-profile', {
                    state: {
                        staffId: staffId,
                        // Also passing the full data as fallback
                        staffData: staffWithId
                    }
                });
            } catch (error) {
                // Show error notification
                notification.error({
                    message: 'Error Creating Staff Profile',
                    description: 'There was an error creating the staff profile. Please try again.',
                    duration: 3
                });
                console.error('Error adding staff to store:', error);
            }
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    const handleNext = () => {
        if (activeTab === 'profile') {
            form.validateFields(['staffCode', 'firstName', 'lastName', 'email', 'status', 'jobPosition'])
                .then(() => {
                    setActiveTab('related-info');
                })
                .catch((error) => {
                    console.log('Validation failed:', error);
                });
        } else if (activeTab === 'related-info') {
            setActiveTab('additional-info');
        } else if (activeTab === 'additional-info') {
            setActiveTab('preview');
        }
    };

    const handlePrev = () => {
        if (activeTab === 'related-info') {
            setActiveTab('profile');
        } else if (activeTab === 'additional-info') {
            setActiveTab('related-info');
        } else if (activeTab === 'preview') {
            setActiveTab('additional-info');
        }
    };

    const renderFooterButtons = () => {
        return [
            <Button key="close" onClick={onClose} className="border-black text-black hover:bg-gray-100">
                Close
            </Button>,
            activeTab !== 'profile' && (
                <Button key="prev" onClick={handlePrev} className="border-black text-black hover:bg-gray-100">
                    Previous
                </Button>
            ),
            activeTab !== 'preview' ? (
                <Button key="next" type="primary" onClick={handleNext} className="bg-black hover:bg-gray-800 border-black">
                    Next
                </Button>
            ) : (""
                // <Button
                //     key="save"
                //     type="primary"
                //     onClick={handleSubmit}
                //     className="bg-black hover:bg-gray-800 border-black"
                // >
                //     Save
                // </Button>
            )
        ].filter(Boolean);
    };

    return (
        <Modal
            title="Staff Profile Create"
            open={visible}
            onCancel={onClose}
            width={1200}
            footer={renderFooterButtons()}
            className="staff-profile-modal"
            maskClosable={false}
        >
            <Steps current={getCurrentStep()} className="mb-6 px-4">
                <Step title="Profile" icon={<UserOutlined />} />
                <Step title="Related Info" icon={<InfoCircleOutlined />} />
                <Step title="Additional" icon={<SettingOutlined />} />
                <Step title="Preview" icon={<FileOutlined />} />
            </Steps>

            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    status: 'Working',
                    role: 'Employee',
                    academicLevel: '-',
                    hourlyRate: '0.00',
                    defaultLanguage: 'System Default',
                    direction: 'System Default'
                }}
            >
                {activeTab === 'profile' && <ProfileTab form={form} />}
                {activeTab === 'related-info' && <RelatedInformationTab />}
                {activeTab === 'additional-info' && <AdditionalInfoTab />}
                {activeTab === 'preview' && <StaffPreviewTab form={form} />}
            </Form>
        </Modal>
    );
};

export default StaffProfileModal;