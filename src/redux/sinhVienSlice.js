import { createSlice } from "@reduxjs/toolkit";
import { removeVietnameseTones } from "../util/util";

const initialState = {
  arrSinhVien: [
    // {
    //   hoTen: "Baobu",
    //   mssv: "1",
    //   sdt: "0902378418",
    //   email: "dgb@gmail.com",
    // },
    // {
    //   hoTen: "anh Khải đẹp trai",
    //   mssv: "2",
    //   sdt: "0902378123",
    //   email: "doe@gmail.com",
    // },
    // {
    //   hoTen: "chị Giao đẹp gái",
    //   mssv: "3",
    //   sdt: "0902378456",
    //   email: "toi@gmail.com",
    // },
  ],
  sinhVien: {},
  arrSinhVienFilter: [],
  tenSinhVienTimKiem: "",
};

const sinhVienSlice = createSlice({
  name: "sinhVien",
  initialState,
  reducers: {
    themSinhVien: (state, action) => {
      state.arrSinhVien.push(action.payload);
    },
    xoaSinhVien: (state, action) => {
      const indexToRemove = state.arrSinhVien.findIndex(
        (student) => student.mssv === action.payload
      );
      if (indexToRemove !== -1) {
        state.arrSinhVien.splice(indexToRemove, 1);
      }
    },
    getSinhVien: (state, action) => {
      state.sinhVien = action.payload;
    },
    getSinhVienName: (state, action) => {
      // state.sinhVien = action.payload;
      state.tenSinhVienTimKiem = action.payload;
    },
    suaSinhVien: (state, action) => {
      const indexToUpdate = state.arrSinhVien.findIndex(
        (student) => student.mssv === action.payload.mssv
      );
      if (indexToUpdate !== -1) {
        state.arrSinhVien[indexToUpdate] = action.payload;
      }
    },
    searchSinhVien: (state, action) => {
      let newKeyWord = removeVietnameseTones(
        action.payload.toLowerCase().trim()
      );
      state.arrSinhVienFilter = state.arrSinhVien.filter((item, index) => {
        let newTenSinhVien = removeVietnameseTones(
          item.hoTen.toLowerCase().trim()
        );
        return newTenSinhVien.includes(newKeyWord);
      });
    },
  },
});

export const {
  themSinhVien,
  xoaSinhVien,
  getSinhVien,
  suaSinhVien,
  searchSinhVien,
  getSinhVienName,
} = sinhVienSlice.actions;

export default sinhVienSlice.reducer;
