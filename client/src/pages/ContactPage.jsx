import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import ContactHeader from '../components/contact/ContactHeader';
import FranchiseSection from '../components/contact/FranchiseSection';
import ContactFormSection from '../components/contact/ContactFormSection';

export default function ContactPage() {
  const pageBgColor = 'bg-[#dde3d6]'; // 頁面主要背景色 (近似值)

  return (
    <div className={`flex flex-col min-h-screen ${pageBgColor}`}>
      <Navbar />

      <main className="flex-grow w-full">
        <ContactHeader />
        <FranchiseSection />
        <ContactFormSection />
      </main>

      <Footer />
    </div>
  );
}
