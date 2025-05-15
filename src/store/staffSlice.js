import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  staffList: []
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    addStaff: (state, action) => {
      state.staffList.push({ id: Date.now(), ...action.payload });
    },
    updateStaff: (state, action) => {
      const { id, ...data } = action.payload;
      const staffIndex = state.staffList.findIndex(staff => staff.id === id);
      if (staffIndex !== -1) {
        state.staffList[staffIndex] = { ...state.staffList[staffIndex], ...data };
      }
    },
    deleteStaff: (state, action) => {
      state.staffList = state.staffList.filter(staff => staff.id !== action.payload);
    }
  }
});

export const { addStaff, updateStaff, deleteStaff } = staffSlice.actions;
export default staffSlice.reducer;