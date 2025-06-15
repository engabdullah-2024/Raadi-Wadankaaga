'use client';

import { useEffect, useState } from 'react';

type CountryType = {
  cca3: string;
  name: { common: string };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area?: number;
  flags: { png: string };
  languages?: Record<string, string>;
};

export default function Home() {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<CountryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,capital,region,subregion,population,area,flags,cca3,languages'
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();

        if (Array.isArray(data)) {
          setCountries(data);
          setResult(data);
          setError(null);
        } else {
          setError('Unexpected data format');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  const handleSearch = () => {
    if (!search.trim()) {
      setResult(countries);
      return;
    }

    const filtered = countries.filter((c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase().trim())
    );
    setResult(filtered);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-100 p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">Find Your Country</h1>

      <div className="max-w-xl mx-auto flex gap-3 mb-8">
        <input
          type="text"
          className="flex-grow p-3 rounded border"
          placeholder="Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          className="bg-blue-600 text-white px-6 rounded hover:bg-blue-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading countries...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {result.map((country) => {
          const languages = country.languages
            ? Object.values(country.languages).join(', ')
            : 'N/A';

          return (
            <div key={country.cca3} className="bg-white rounded shadow p-4 hover:scale-105 transition">
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="w-full h-40 object-cover rounded mb-3"
                loading="lazy"
              />
              <h2 className="font-semibold text-xl mb-1">{country.name.common}</h2>
              <p>Capital: {country.capital?.[0] || 'N/A'}</p>
              <p>Region: {country.region}</p>
              <p>Subregion: {country.subregion || 'N/A'}</p>
              <p>Population: {country.population.toLocaleString()}</p>
              <p>Area: {country.area ? `${country.area.toLocaleString()} km²` : 'N/A'}</p>
              <p>Languages: {languages}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
