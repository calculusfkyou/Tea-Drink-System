import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from './FormInput';
import { FormButton } from './FormButton';

export function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // 清除該欄位的錯誤訊息
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};

    // 姓名驗證
    if (!formData.name.trim()) {
      newErrors.name = '請輸入姓名';
    }

    // 電子郵件驗證
    if (!formData.email) {
      newErrors.email = '請輸入電子郵件';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '請輸入有效的電子郵件格式';
    }

    // 密碼驗證
    if (!formData.password) {
      newErrors.password = '請輸入密碼';
    } else if (formData.password.length < 6) {
      newErrors.password = '密碼長度需至少6個字符';
    }

    // 確認密碼驗證
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '兩次密碼輸入不一致';
    }

    // 手機號碼驗證
    if (formData.phone && !/^09\d{8}$/.test(formData.phone)) {
      newErrors.phone = '請輸入有效的手機號碼';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 表單驗證
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 在此加入實際API請求
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // 解析 API 響應
      const data = await response.json();

      // 檢查請求是否成功
      if (!response.ok) {
        throw new Error(data.message || '註冊失敗');
      }

      console.log('註冊成功:', data);

      // 模擬API延遲
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/login', { state: { message: '註冊成功，請登入您的帳號' } });
      }, 1500);

    } catch (error) {
      setSubmitError('註冊失敗，請稍後再試');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      {submitError && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          id="name"
          label="姓名"
          value={formData.name}
          onChange={handleChange}
          placeholder="請輸入您的姓名"
          required
          error={errors.name}
        />

        <FormInput
          type="email"
          id="email"
          label="電子郵件"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          required
          error={errors.email}
        />

        <FormInput
          type="password"
          id="password"
          name="password"
          label="密碼"
          value={formData.password}
          onChange={handleChange}
          placeholder="請設定密碼"
          required
          error={errors.password}
          autoComplete="new-password"
        />

        <FormInput
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          label="確認密碼"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="請再次輸入密碼"
          required
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <FormInput
          type="tel"
          id="phone"
          label="手機號碼"
          value={formData.phone}
          onChange={handleChange}
          placeholder="請輸入您的手機號碼"
          error={errors.phone}
        />

        <div className="mt-6">
          <FormButton isSubmitting={isSubmitting}>
            建立帳號
          </FormButton>
        </div>
      </form>

      <div className="mt-4 text-center text-gray-600">
        已有帳號？
        <Link to="/login" className="text-[#5a6440] ml-1 hover:underline">
          登入
        </Link>
      </div>
    </div>
  );
}
