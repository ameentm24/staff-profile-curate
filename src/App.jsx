import { useState } from 'react';
import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import StaffProfileModal from './components/StaffProfileModal';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Provider store={store}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-8">Staff Management System</h1>
        
        <Button 
          type="primary" 
          size="large" 
          icon={<UserAddOutlined />}
          onClick={() => setModalVisible(true)}
          className="bg-gray-900 hover:bg-gray-800"
        >
          Add Staff
        </Button>
        
        <StaffProfileModal 
          visible={modalVisible} 
          onClose={() => setModalVisible(false)} 
        />
      </div>
    </Provider>
  );
};

export default App;