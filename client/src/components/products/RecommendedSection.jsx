import React from 'react';
import { SectionTitle } from './SectionTitle';
import { DrinkCard } from './DrinkCard';

export function RecommendedSection({ recommendedDrinksData, onProductClick }) {
  if (!recommendedDrinksData || recommendedDrinksData.length === 0) {
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
    <section id="recommended" className="mb-16 scroll-mt-20">
      <SectionTitle title="定番推薦" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-7" onClick={() => onProductClick(recommendedDrinksData[0]?.id)}>
          <DrinkCard
            id={recommendedDrinksData[0]?.id}
            name={recommendedDrinksData[0]?.name}
            image={recommendedDrinksData[0]?.image}
            description={recommendedDrinksData[0]?.description}
            price={formatPrice(recommendedDrinksData[0])}
            onClick={onProductClick}
          />
          <p className="text-center mt-2 text-lg font-semibold">{`1. ${recommendedDrinksData[0]?.name}`}</p>
        </div>
        <div className="md:col-span-5 grid grid-cols-2 grid-rows-2 gap-4">
          {recommendedDrinksData.slice(1).map((drink, index) => (
            <div key={drink.id}>
              <div onClick={() => onProductClick(drink.id)}>
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer"
                />
              </div>
              <p className="text-center mt-1 text-sm font-semibold">{`${index + 2}. ${drink.name}`}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
