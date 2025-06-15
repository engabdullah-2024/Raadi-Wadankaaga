import React from 'react'

type CountryProps = {
  name: string;
  capital: string;
  region: string;
  population: number;
  flag: string;
};

const CountryCard = ({ name, capital, region, population, flag }: CountryProps) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform">
      <img src={flag} alt={name} className="w-full h-40 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-semibold">{name}</h2>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Region:</strong> {region}</p>
      <p><strong>Population:</strong> {population.toLocaleString()}</p>
    </div>
  );
};

export default CountryCard;
