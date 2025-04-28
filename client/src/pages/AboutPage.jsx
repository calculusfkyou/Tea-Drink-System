import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AboutHeader } from '../components/about/AboutHeader';
import { AboutIntro } from '../components/about/AboutIntro';
import { AboutStory } from '../components/about/AboutStory';
import { AboutValues } from '../components/about/AboutValues';
import { AboutFeatures } from '../components/about/AboutFeatures';
import { AboutGallery } from '../components/about/AboutGallery';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* 頁面標題 */}
      <AboutHeader />

      <main className="flex-grow">
        {/* 品牌介紹 */}
        <AboutIntro />

        {/* 品牌故事 */}
        <AboutStory />

        {/* 品牌理念 */}
        <AboutValues />

        {/* 產品特色 */}
        <AboutFeatures />

        {/* 圖片展示 */}
        <AboutGallery />
      </main>

      <Footer />
    </div>
  );
}
