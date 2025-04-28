import React, { useState } from 'react';

export function FormInput({
  type,
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  autoComplete
}) {
  // 新增狀態 - 控制密碼顯示/隱藏
  const [showPassword, setShowPassword] = useState(false);

  // 是否為密碼輸入框
  const isPassword = type === 'password';

  // 根據 showPassword 決定實際的輸入類型
  const inputType = isPassword && showPassword ? 'text' : type;

  // 處理密碼顯示/隱藏切換
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          type={inputType}
          id={id}
          name={name || id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'}
                    rounded-md shadow-sm focus:outline-none
                    focus:ring-[#5a6440] focus:border-[#5a6440]`}
        />

        {/* 密碼顯示/隱藏圖標 */}
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
          >
            {showPassword ? (
              // 隱藏密碼圖標 (睜開的眼睛)
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            ) : (
              // 顯示密碼圖標 (閉上的眼睛)
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
