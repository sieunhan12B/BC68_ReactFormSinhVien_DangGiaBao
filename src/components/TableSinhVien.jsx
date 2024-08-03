import React from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getSinhVien, xoaSinhVien } from "../redux/sinhVienSlice";
const TableSinhVien = ({ arrSinhVien, arrSinhVienFilter }) => {
  const handleEditClick = () => {
    document.querySelector(".mssv").disabled = true;
  };
  const { tenSinhVienTimKiem } = useSelector((state) => state.sinhVienSlice);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "mssv",
      dataIndex: "mssv",
    },
    {
      title: "Tên sinh viên",
      dataIndex: "hoTen",
    },
    {
      title: "phone",
      dataIndex: "sdt",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "Hành động",
      render: (text, record, index) => {
        return (
          <>
            <button
              onClick={() => {
                dispatch(xoaSinhVien(record.mssv));
              }}
              className="py-2 px-5 bg-red-500 text-white rounded-md"
            >
              Xóa
            </button>
            <button
              onClick={() => {
                handleEditClick();
                dispatch(getSinhVien(record));
              }}
              className="py-2 px-5 bg-yellow-500 rounded-md ml-3"
            >
              Sửa
            </button>
          </>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={
        arrSinhVienFilter.length == 0 && !tenSinhVienTimKiem
          ? arrSinhVien
          : arrSinhVienFilter
      }
    />
  );
};

export default TableSinhVien;
