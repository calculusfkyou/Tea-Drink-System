import React from 'react';
import { SectionTitle } from './SectionTitle';

export function RecommendedSection({ recommendedDrinksData }) {
  return (
    <section id="recommended" className="mb-16 scroll-mt-20">
      <SectionTitle title="定番推薦" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-7">
          <img
            src={recommendedDrinksData[0].image}
            alt={recommendedDrinksData[0].name}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
          <p className="text-center mt-2 text-lg font-semibold">{`1. ${recommendedDrinksData[0].name}`}</p>
        </div>
        <div className="md:col-span-5 grid grid-cols-2 grid-rows-2 gap-4">
          {recommendedDrinksData.slice(1).map((drink, index) => (
            <div key={drink.id}>
              <img
                src={drink.image}
                alt={drink.name}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
              <p className="text-center mt-1 text-sm font-semibold">{`${index + 2}. ${drink.name}`}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
