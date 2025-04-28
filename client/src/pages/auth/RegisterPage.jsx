import React from 'react';
import axios from 'axios';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AuthHeader } from '../../components/auth/AuthHeader';
import { RegisterForm } from '../../components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <AuthHeader title="會員註冊" subtitle="REGISTER" />

      <main className="flex-grow container mx-auto px-4 py-8 mb-12">
        <RegisterForm />
      </main>

      <Footer />
    </div>
  );
}
