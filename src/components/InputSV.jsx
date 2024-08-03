import React from "react";

const InputSV = ({
  contentLabel,
  placeHolder,
  name,
  type = "text",
  onChange,
  value,
  onBlur,
  touched,
  error,
  classCustom = "",
}) => {
  return (
    <div className={classCustom}>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {contentLabel}
        </label>
        <input
          name={name}
          type={type}
          className={`bg-gray-50 border mssv border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            error && touched ? "border-red-500" : ""
          } `}
          placeholder={placeHolder}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
        />
        {error && touched && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default InputSV;
