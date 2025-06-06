import React from 'react';
import { SectionTitle } from './SectionTitle';
import { DrinkCard } from './DrinkCard';

export function SpecialSection({ specialDrinksData, onProductClick }) {
  if (!specialDrinksData || specialDrinksData.length === 0) {
    return null;
  }

  const formatPrice = (product) => {
    if (product.priceM && product.priceL) {
      return `M $${product.priceM} | L $${product.priceL}`;
    } else if (product.priceM) {
      return `M $${product.priceM}`;
    } else if (product.priceL) {
      return `L $${product.priceL}`;
    }
    return '';
  };

  return (
    <section id="special" className="mb-16 pt-8 scroll-mt-20">
      <SectionTitle title="SPECIAL" subtitle="期間限定飲品" />
      <p className="text-center text-gray-500 text-sm mb-8 -mt-4">『 一場驚喜的小冒險，替你帶走日常的枯燥感！ 』♪</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {specialDrinksData.map(drink => (
          <DrinkCard
            key={drink.id}
            id={drink.id}
            name={drink.name}
            image={drink.image}
            description={drink.description}
            price={formatPrice(drink)}
            onClick={onProductClick}
          />
        ))}
      </div>
    </section>
  );
}
