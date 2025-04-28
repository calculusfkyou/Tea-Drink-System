import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { NotFoundHeader } from '../components/notFound/NotFoundHeader';
import { NotFoundImage } from '../components/notFound/NotFoundImage';
import { NotFoundMessage } from '../components/notFound/NotFoundMessage';
import { NotFoundAction } from '../components/notFound/NotFoundAction';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <NotFoundHeader />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <NotFoundImage />
          <NotFoundMessage />
          <NotFoundAction />
        </div>
      </main>

      <Footer />
    </div>
  );
}
