import { Form, Input, Select, DatePicker } from 'antd';
import { FacebookOutlined, LinkedinOutlined, SkypeOutlined } from '@ant-design/icons';

const RelatedInformationTab = () => {
  return (
    <div className="px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item 
          name="domicile" 
          label="Domicile"
        >
          <Input placeholder="Enter domicile" />
        </Form.Item>
        
        <Form.Item 
          name="maritalStatus" 
          label="Marital status"
        >
          <Select placeholder="None selected">
            <Select.Option value="single">Single</Select.Option>
            <Select.Option value="married">Married</Select.Option>
            <Select.Option value="divorced">Divorced</Select.Option>
            <Select.Option value="widowed">Widowed</Select.Option>
          </Select>
        </Form.Item>
      
        <Form.Item 
          name="currentAddress" 
          label="Current address"
        >
          <Input placeholder="Enter current address" />
        </Form.Item>
        
        <Form.Item 
          name="nation" 
          label="Nation"
        >
          <Input placeholder="Enter nation" />
        </Form.Item>
      
        <Form.Item 
          name="placeOfBirth" 
          label="Place of birth"
        >
          <Input placeholder="Enter place of birth" />
        </Form.Item>
        
        <Form.Item 
          name="religion" 
          label="Religion"
        >
          <Input placeholder="Enter religion" />
        </Form.Item>
      
        <Form.Item 
          name="citizenIdentification" 
          label="Citizen identification"
        >
          <Input placeholder="Enter citizen identification" />
        </Form.Item>
        
        <Form.Item 
          name="dateOfIssue" 
          label="Date of issue"
        >
          <DatePicker className="w-full" />
        </Form.Item>
      
        <Form.Item 
          name="placeOfIssue" 
          label="Place of issue"
        >
          <Input placeholder="Enter place of issue" />
        </Form.Item>
        
        <Form.Item 
          name="resident" 
          label="Resident"
        >
          <Input placeholder="Enter resident" />
        </Form.Item>
      
        <Form.Item 
          name="bankAccountNumber" 
          label="Bank account number"
        >
          <Input placeholder="Enter bank account number" />
        </Form.Item>
        
        <Form.Item 
          name="bankAccountName" 
          label="Bank account name"
        >
          <Input placeholder="Enter bank account name" />
        </Form.Item>
      
        <Form.Item 
          name="bankName" 
          label="Bank name"
        >
          <Input placeholder="Enter bank name" />
        </Form.Item>
        
        <Form.Item 
          name="personalTaxCode" 
          label="Personal tax code"
        >
          <Input placeholder="Enter personal tax code" />
        </Form.Item>
      
        <Form.Item 
          name="epfNo" 
          label="EPF No"
        >
          <Input placeholder="Enter EPF number" />
        </Form.Item>
        
        <Form.Item 
          name="socialSecurityNo" 
          label="Social Security No"
        >
          <Input placeholder="Enter social security number" />
        </Form.Item>
      
        <Form.Item 
          name="facebook" 
          label={<><FacebookOutlined className="mr-1" /> Facebook</>}
        >
          <Input placeholder="Enter Facebook profile" />
        </Form.Item>
        
        <Form.Item 
          name="linkedin" 
          label={<><LinkedinOutlined className="mr-1" /> LinkedIn</>}
        >
          <Input placeholder="Enter LinkedIn profile" />
        </Form.Item>
      </div>
      
      <div className="md:w-1/2">
        <Form.Item 
          name="skype" 
          label={<><SkypeOutlined className="mr-1" /> Skype</>}
        >
          <Input placeholder="Enter Skype ID" />
        </Form.Item>
      </div>
    </div>
  );
};

export default RelatedInformationTab;