// staffSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staffList: [],
  isLoading: false,
  error: null,
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    addStaff: (state, action) => {
      // Check if staff with same ID already exists
      const existingStaffIndex = state.staffList.findIndex(
        (staff) => staff.id === action.payload.id
      );

      if (existingStaffIndex >= 0) {
        // Update existing staff if ID exists
        state.staffList[existingStaffIndex] = action.payload;
      } else {
        // Add new staff
        state.staffList.push(action.payload);
      }

      // For debugging
      console.log("Staff added/updated in Redux store:", action.payload);
      console.log("Current staff list:", state.staffList);
    },
    updateStaff: (state, action) => {
      const { id, ...updates } = action.payload;
      const staffIndex = state.staffList.findIndex((staff) => staff.id === id);

      if (staffIndex !== -1) {
        state.staffList[staffIndex] = {
          ...state.staffList[staffIndex],
          ...updates,
        };
      }
    },
    deleteStaff: (state, action) => {
      state.staffList = state.staffList.filter(
        (staff) => staff.id !== action.payload
      );
    },
    setStaffList: (state, action) => {
      state.staffList = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addStaff,
  updateStaff,
  deleteStaff,
  setStaffList,
  setLoading,
  setError,
} = staffSlice.actions;

// Selectors
export const selectAllStaff = (state) => state.staff.staffList;
export const selectStaffById = (state, staffId) =>
  state.staff.staffList.find((staff) => staff.id === staffId);
export const selectStaffLoading = (state) => state.staff.isLoading;
export const selectStaffError = (state) => state.staff.error;

export default staffSlice.reducer;
