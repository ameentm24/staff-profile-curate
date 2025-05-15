import { useState } from 'react';
import { Modal, Tabs, Form, Button, Steps } from 'antd';
import { useDispatch } from 'react-redux';
import { addStaff } from '../store/staffSlice';
import ProfileTab from './ProfileTab';
import RelatedInformationTab from './RelatedInformationTab';
import AdditionalInfoTab from './AdditionalInfoTab';
import StaffPreviewTab from './StaffPreviewTab';
import { UserOutlined, InfoCircleOutlined, SettingOutlined, FileOutlined } from '@ant-design/icons';

const { Step } = Steps;

const StaffProfileModal = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState('profile');
    const dispatch = useDispatch();

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
            dispatch(addStaff(values));
            form.resetFields();
            onClose();
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
            <Button key="close" onClick={onClose}>
                Close
            </Button>,
            activeTab !== 'profile' && (
                <Button key="prev" onClick={handlePrev}>
                    Previous
                </Button>
            ),
            activeTab !== 'preview' ? (
                <Button key="next" type="primary" onClick={handleNext} className="bg-gray-900 hover:bg-gray-800">
                    Next
                </Button>
            ) : (
                <Button
                    key="save"
                    type="primary"
                    onClick={handleSubmit}
                    className="bg-gray-900 hover:bg-gray-800"
                >
                    Save
                </Button>
            )
        ].filter(Boolean);
    };

    return (
        <Modal
            title="Staff profile Create"
            open={visible}
            onCancel={onClose}
            width={800}
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
                    academicLevel: 'Not required',
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