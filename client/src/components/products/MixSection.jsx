import React from 'react';
import { SectionTitle } from './SectionTitle';
import { DrinkCard } from './DrinkCard';

export function MixSection({ mixDrinksData, onProductClick }) {
  if (!mixDrinksData || mixDrinksData.length === 0) {
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
    <section id="mix" className="mb-16 pt-8 scroll-mt-20">
      <SectionTitle title="特調系列" />
      <p className="text-center text-gray-500 text-sm mb-8 -mt-4">『 不只滿足了味蕾，更在咀嚼中嚐出幸福滋味。 』</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {mixDrinksData.map(drink => (
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
