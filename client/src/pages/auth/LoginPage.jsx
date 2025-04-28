import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AuthHeader } from '../../components/auth/AuthHeader';
import { LoginForm } from '../../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <AuthHeader title="會員登入" subtitle="LOGIN" />

      <main className="flex-grow container mx-auto px-4 py-8 mb-12">
        <LoginForm />
      </main>

      <Footer />
    </div>
  );
}
