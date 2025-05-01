import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FormInput } from './FormInput';
import { FormButton } from './FormButton';

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // 檢查是否有來自註冊頁面的成功訊息
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // 移除 URL 中的狀態，避免重新整理後仍顯示成功訊息
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};

    // 電子郵件驗證
    if (!formData.email) {
      newErrors.email = '請輸入電子郵件';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '請輸入有效的電子郵件格式';
    }

    // 密碼驗證
    if (!formData.password) {
      newErrors.password = '請輸入密碼';
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
      // 發送登入請求，告知後端是否勾選「記住我」選項
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 允許跨域請求攜帶 cookies
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe // 傳送「記住我」選項到後端
        })
      });

      // 解析API響應
      const data = await response.json();

      // 檢查請求是否成功
      if (!response.ok) {
        throw new Error(data.message || '登入失敗');
      }

      console.log('登入成功:', data);

      // 安全地儲存令牌 (將在下面的安全改進提到)
      if (data.data && data.data.token) {
        // 使用安全的方式存儲 token
        securelyStoreToken(data.data.token);

        // 存儲基本的用戶資訊 (不含敏感資料)
        if (data.data && data.data.user) {
          localStorage.setItem('userDisplay', JSON.stringify({
            id: data.data.user.id,
            name: data.data.user.name,
            email: data.data.user.email,
            avatar: data.data.user.avatar, // 確保頭像資訊被儲存
            role: data.data.user.role
          }));
        }
      } else {
        console.error('未收到預期的令牌或用戶資料');
      }

      // 登入成功後導航到首頁或指定的重定向頁面
      const redirectTo = location.state?.from?.pathname || '/';

      setIsSubmitting(false);
      navigate(redirectTo);

    } catch (error) {
      console.error('登入錯誤:', error);

      let errorMessage = '登入失敗，請檢查您的帳號和密碼';
      if (error.message === '帳號或密碼錯誤') {
        errorMessage = '帳號或密碼錯誤';
      } else if (error.message.includes('伺服器')) {
        errorMessage = '系統暫時無法處理您的請求，請稍後再試';
      }

      setSubmitError(errorMessage);
      setIsSubmitting(false);
    }
  };

  // 安全地存儲令牌的函數
  const securelyStoreToken = (token) => {
    // 將令牌存儲在 localStorage 中
    localStorage.setItem('token', token);

    // 設置令牌過期時間檢查
    const tokenExpiryTime = formData.rememberMe
      ? Date.now() + (30 * 24 * 60 * 60 * 1000) // 30天
      : Date.now() + (24 * 60 * 60 * 1000);     // 24小時

    localStorage.setItem('tokenExpiry', tokenExpiryTime.toString());
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-md">
          {successMessage}
        </div>
      )}

      {submitError && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          type="email"
          id="email"
          label="電子郵件"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          required
          error={errors.email}
          autoComplete="email"
        />

        <FormInput
          type="password"
          id="password"
          name="password"
          label="密碼"
          value={formData.password}
          onChange={handleChange}
          placeholder="請輸入您的密碼"
          required
          error={errors.password}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-[#5a6440] focus:ring-[#5a6440] border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              記住我
            </label>
          </div>

          <div className="text-sm">
            <Link to="/forgot-password" className="text-[#5a6440] hover:underline">
              忘記密碼？
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <FormButton isSubmitting={isSubmitting} fullWidth>
            登入
          </FormButton>
        </div>
      </form>

      <div className="mt-4 text-center text-gray-600">
        還沒有帳號？
        <Link to="/register" className="text-[#5a6440] ml-1 hover:underline">
          立即註冊
        </Link>
      </div>
    </div>
  );
}
