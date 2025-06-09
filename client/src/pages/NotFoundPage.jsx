import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { NotFoundHeader } from '../components/notfound/NotFoundHeader';
import { NotFoundImage } from '../components/notfound/NotFoundImage';
import { NotFoundMessage } from '../components/notfound/NotFoundMessage';
import { NotFoundAction } from '../components/notfound/NotFoundAction';

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
