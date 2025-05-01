import React from 'react';

export default function ProfileHeader({ user }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        {/* 用戶頭像 */}
        <div className="h-20 w-20 rounded-full bg-[#4a5332] text-white flex items-center justify-center text-xl">
          {user?.name?.charAt(0).toUpperCase() || '?'}
        </div>

        {/* 用戶基本信息 */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-semibold text-gray-800">{user?.name || '用戶'}</h1>
          <p className="text-gray-500">{user?.email || 'email@example.com'}</p>
          <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
            {user?.role && (
              <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                {user.role === 'admin' ? '管理員' : user.role === 'manager' ? '經理' : '一般會員'}
              </span>
            )}
            {user?.isVerified && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                已驗證
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
