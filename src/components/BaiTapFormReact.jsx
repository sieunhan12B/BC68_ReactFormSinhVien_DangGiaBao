import React, { useEffect, useState } from "react";
import InputSV from "./InputSV";
import { useFormik } from "formik";
import TableSinhVien from "./TableSinhVien";
import {
  getSinhVien,
  getSinhVienName,
  searchSinhVien,
  suaSinhVien,
  themSinhVien,
} from "../redux/sinhVienSlice";
import { useDispatch, useSelector } from "react-redux";
import "./tableSinhVien.scss";
import * as yup from "yup";

const BaiTapFormReact = () => {
  const handleUpdateClick = () => {
    document.querySelector(".mssv").disabled = false;
  };
  const { arrSinhVien, sinhVien, arrSinhVienFilter, tenSinhVienTimKiem } =
    useSelector((state) => state.sinhVienSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    setValues(sinhVien);
  }, [sinhVien]);
  const {
    handleChange,
    handleSubmit,
    values,
    resetForm,
    setValues,
    isValid,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      mssv: "",
      hoTen: "",
      sdt: "",
      email: "",
    },
    onSubmit: (values, { resetForm }) => {
      resetForm();
      dispatch(themSinhVien(values));
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Vui lòng nhập đúng định dạng email")
        .required("Vui lòng nhập email"),
      mssv: yup
        .string()
        .required("Vui lòng nhập mssv")
        .min(4, "Vui lòng nhập trên 4 kí tự ")
        .max(8, "Vui lòng nhâp ít hơn 8 kí tự "),
      sdt: yup
        .string()
        .required("Vui lòng nhập số điện thoại")
        .matches(
          /((^(\\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
          "Vui lòng nhập đúng định dạng số điện thoại Việt Nam"
        ),

      hoTen: yup
        .string()
        .matches(/^[a-zA-Z\s]*$/, "Vui lòng nhập họ tên không chứa số")
        .required("Vui lòng nhập họ tên "),
    }),
  });

  return (
    <div>
      <h1 className="bg-gray-800 text-white text-2xl font-medium p-3 mb-3">
        Thông tin sinh viên{" "}
      </h1>
      <form onSubmit={handleSubmit} action="">
        <div className="grid grid-cols-2 gap-5">
          <InputSV
            contentLabel="Mã số Sinh Viên"
            placeHolder="MSSV"
            name="mssv"
            onChange={handleChange}
            value={values.mssv}
            onBlur={handleBlur}
            error={errors.mssv}
            touched={touched.mssv}
          />
          <InputSV
            contentLabel="Họ và tên Sinh Viên "
            placeHolder="Họ tên"
            name="hoTen"
            onChange={handleChange}
            value={values.hoTen}
            onBlur={handleBlur}
            error={errors.hoTen}
            touched={touched.hoTen}
          />
          <InputSV
            contentLabel="Số điện thoại "
            placeHolder="0987654321"
            name="sdt"
            onChange={handleChange}
            value={values.sdt}
            onBlur={handleBlur}
            error={errors.sdt}
            touched={touched.sdt}
          />
          <InputSV
            contentLabel="Email"
            placeHolder="cyber@gmail.com"
            name="email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Thêm sinh viên
        </button>
        <button
          type="button"
          onClick={() => {
            resetForm();
          }}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          {" "}
          Reset form{" "}
        </button>
        <button
          type="button"
          onClick={() => {
            handleUpdateClick();
            if (!isValid) {
              return;
            } else {
              dispatch(suaSinhVien(values));
            }
          }}
          className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          {" "}
          Cập nhật nhân viên{" "}
        </button>
        <div className="search-sinh-vien flex  items-center">
          <InputSV
            classCustom="w-4/5"
            placeHolder="Tìm kiếm Sinh Viên"
            name="email"
            onChange={(event) => {
              dispatch(getSinhVienName(event.target.value));
              dispatch(searchSinhVien(event.target.value));
            }}
          />
          <button
            type="button"
            onClick={() => {
              dispatch(searchSinhVien(tenSinhVienTimKiem));
            }}
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-3 h-4/5 w-1/5"
          >
            {" "}
            Search
          </button>
        </div>
      </form>
      <TableSinhVien
        arrSinhVien={arrSinhVien}
        arrSinhVienFilter={arrSinhVienFilter}
      />
    </div>
  );
};

export default BaiTapFormReact;
