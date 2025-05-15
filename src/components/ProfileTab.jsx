import { Form, Input, Select, DatePicker, Checkbox } from 'antd';
import ProfilePicture from './ProfilePicture';

const ProfileTab = ({ form }) => {
  return (
    <div className="px-4">
      <div className="mb-4 mt-10">
        <Checkbox>
          <span className="flex items-center">
            <span className="text-gray-500 mr-1">ⓘ</span>
            Enable Email Two Factor Authentication
          </span>
        </Checkbox>
      </div>

      <div className="flex  mb-6">
        <ProfilePicture
          profileImage={form.getFieldValue('profileImage')}
          onImageChange={(image) => form.setFieldsValue({ profileImage: image })}
        />
      </div>

      <div className="mb-6">
        <Form.Item
          name="staffCode"
          label={<span className="flex items-center">Staff code</span>}
          rules={[{ required: true, message: 'Please input staff code!' }]}
        >
          <Input placeholder="Enter staff code" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item
          name="firstName"
          label={<span className="flex items-center"> First name</span>}
          rules={[{ required: true, message: 'Please input first name!' }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label={<span className="flex items-center"> Last name</span>}
          rules={[{ required: true, message: 'Please input last name!' }]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
        >
          <Select placeholder="None selected">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="birthday"
          label="Birthday"
        >
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className="flex items-center"> Email</span>}
          rules={[
            { required: true, message: 'Please input email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item
          name="workplace"
          label="Workplace"
        >
          <Select placeholder="None selected">
            <Select.Option value="main">Main Office</Select.Option>
            <Select.Option value="bengaluru">Bengaluru Office</Select.Option>
            <Select.Option value="remote">Remote</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label={<span className="flex items-center"> Status</span>}
          rules={[{ required: true, message: 'Please select status!' }]}
        >
          <Select placeholder="Working">
            <Select.Option value="working">Working</Select.Option>
            <Select.Option value="fulltime">Full-time</Select.Option>
            <Select.Option value="parttime">Part-time</Select.Option>
            <Select.Option value="onleave">On Leave</Select.Option>
            <Select.Option value="terminated">Terminated</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="jobPosition"
          label={<span className="flex items-center"> Job position</span>}
          rules={[{ required: true, message: 'Please select job position!' }]}
        >
          <Select placeholder="None selected">
            <Select.Option value="Manager">Manager</Select.Option>
            <Select.Option value="Developer">Developer</Select.Option>
            <Select.Option value="HR">HR Associate</Select.Option>
            <Select.Option value="Designer">Designer</Select.Option>
            <Select.Option value="Marketing">Marketing</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="directManager"
          label="Direct manager"
        >
          <Select placeholder="None selected">
            <Select.Option value="1">John Doe</Select.Option>
            <Select.Option value="2">Jane Smith</Select.Option>
            <Select.Option value="3">Robert Johnson</Select.Option>
          </Select>
        </Form.Item>

      </div>


      <div className="mb-6">
        <Form.Item
          name="role"
          label="Role"
        >

          <Select defaultValue="Employee">
            <Select.Option value="employee">Employee</Select.Option>
            <Select.Option value="manager">Manager</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Form.Item
          name="academicLevel"
          label="Academic level"
        >
          <Select defaultValue="Academic Level">
            <Select.Option value="">Not required</Select.Option>
            <Select.Option value="high_school">High School</Select.Option>
            <Select.Option value="bachelors">Bachelor's Degree</Select.Option>
            <Select.Option value="masters">Master's Degree</Select.Option>
            <Select.Option value="phd">PhD</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="hourlyRate"
          label="Hourly Rate"
        >
          <Input
            defaultValue="0.00"
            suffix={<span>₹</span>}
          />
        </Form.Item>

        <Form.Item
          name="defaultLanguage"
          label="Default Language"
        >
          <Select defaultValue="System Default">
            <Select.Option value="system_default">System Default</Select.Option>
            <Select.Option value="english">English</Select.Option>
            <Select.Option value="hindi">Hindi</Select.Option>
            <Select.Option value="tamil">Tamil</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="direction"
          label="Direction"
        >
          <Select defaultValue="System Default">
            <Select.Option value="system_default">System Default</Select.Option>
            <Select.Option value="ltr">Left to Right</Select.Option>
            <Select.Option value="rtl">Right to Left</Select.Option>
          </Select>
        </Form.Item>
      </div>
    </div>
  );
};

export default ProfileTab;