import { Form, Input, Select, Button } from 'antd';
import { EyeOutlined, RedoOutlined, CheckOutlined } from '@ant-design/icons';

const AdditionalInfoTab = () => {
  return (
    <div className="px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item
          name="role"
          label="Role"
        >
          <Select 
            defaultValue="Employee" 
          >
            <Select.Option value="employee">Employee</Select.Option>
            <Select.Option value="manager">Manager</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>

        <div></div> {/* Empty div for spacing */}

        <Form.Item
          name="academicLevel"
          label="Academic level"
        >
          <Select 
            defaultValue="Not required" 
          >
            <Select.Option value="not_required">Not required</Select.Option>
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
          <div className="flex">
            <Input placeholder="0.00" className="rounded-r-none" />
            <div className="bg-white border border-l-0 rounded-r-md flex items-center justify-center px-3 text-gray-600">
              ₹
            </div>
          </div>
        </Form.Item>

        <Form.Item
          name="defaultLanguage"
          label="Default Language"
        >
          <Select 
            defaultValue="System Default" 
          >
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
          <Select 
            defaultValue="System Default" 
          >
            <Select.Option value="system_default">System Default</Select.Option>
            <Select.Option value="ltr">Left to Right</Select.Option>
            <Select.Option value="rtl">Right to Left</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="emailSignature"
          label={<span className="flex items-center"><span className="text-black font-bold mr-1">•</span>Email Signature</span>}
        >
          <Input.TextArea rows={4} placeholder="Enter email signature" />
        </Form.Item>

        <Form.Item
          name="otherInformation"
          label="Other information"
        >
          <Input.TextArea rows={4} placeholder="Enter other information" />
        </Form.Item>
      </div>

      <Form.Item
        name="twilioPhoneNumber"
        label={<span className="flex items-center"><CheckOutlined className="text-blue-600 mr-1" />Twilio Phone Number</span>}
        className="mt-4"
      >
        <Input placeholder="Enter Twilio phone number" />
      </Form.Item>

      <Form.Item
        name="isWhatsAppEnabled"
        label={<span className="flex items-center"><CheckOutlined className="text-blue-600 mr-1" />Is twilio number whats app enabled</span>}
      >
        <Select placeholder="None selected">
          <Select.Option value="yes">Yes</Select.Option>
          <Select.Option value="no">No</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="password"
        label={<span className="flex items-center"><span className="text-red-500 mr-1">*</span>Password</span>}
      >
        <Input.Password
          placeholder="Enter password"
          suffix={
            <div className="flex space-x-2">
              <EyeOutlined className="text-gray-400 cursor-pointer" />
              <RedoOutlined className="text-gray-400 cursor-pointer" />
            </div>
          }
        />
      </Form.Item>

      <div className="text-gray-500 text-sm mb-6">
        Note: if you populate this field, password will be changed on this member.
      </div>
    </div>
  );
};

export default AdditionalInfoTab;