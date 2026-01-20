import { createContext, useContext, useState } from 'react';

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [priceRange, setPriceRange] = useState({ min: 0, max: null });
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <FilterContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        searchTerm,
        setSearchTerm
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within FilterProvider');
  }
  return context;
}
