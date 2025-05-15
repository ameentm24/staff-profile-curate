import { useState } from 'react';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { Route, Routes } from 'react-router-dom';
import StaffProfilePage from './pages/StaffProfilePage';
import Home from './pages/Home';

const App = () => {

  return (
    <Provider store={store}>
      

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/staff-profile" element={<StaffProfilePage />} />
        </Routes>
      
    </Provider>
  );
};

export default App;