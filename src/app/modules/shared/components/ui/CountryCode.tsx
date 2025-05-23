'use client'
import React, { useState, useRef, useEffect } from 'react';

// Country data type
interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

// Sample countries data
const countries: Country[] = [
  { name: 'Nigeria', code: 'NG', dialCode: '+234', flag: '/icons/flag.svg' },
  { name: 'United States', code: 'US', dialCode: '+1', flag: '/flags/us.svg' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '/flags/gb.svg' },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '/flags/ca.svg' },
  { name: 'Ghana', code: 'GH', dialCode: '+233', flag: '/flags/gh.svg' },
  { name: 'South Africa', code: 'ZA', dialCode: '+27', flag: '/flags/za.svg' },
  { name: 'Kenya', code: 'KE', dialCode: '+254', flag: '/flags/ke.svg' },
  { name: 'India', code: 'IN', dialCode: '+91', flag: '/flags/in.svg' },
  { name: 'China', code: 'CN', dialCode: '+86', flag: '/flags/cn.svg' },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: '/flags/au.svg' },
  { name: 'France', code: 'FR', dialCode: '+33', flag: '/flags/fr.svg' },
  { name: 'Germany', code: 'DE', dialCode: '+49', flag: '/flags/de.svg' },
];

// Get Nigeria as the default country
export const DEFAULT_COUNTRY = countries.find(country => country.code === 'NG') || countries[0];

interface CountryCodeSelectorProps {
  value?: Country;
  onChange: (country: Country) => void;
}

const CountryCodeSelector: React.FC<CountryCodeSelectorProps> = ({ 
  value = DEFAULT_COUNTRY, // Set Nigeria as default if no value is provided
  onChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Filter countries based on search term
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    country.dialCode.includes(searchTerm)
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  // Set default country on mount if value is not provided
  useEffect(() => {
    if (!value) {
      onChange(DEFAULT_COUNTRY);
    }
  }, [value, onChange]);

  const handleCountrySelect = (country: Country) => {
    onChange(country);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="w-24 border rounded-l-md flex items-center justify-center bg-gray-50 h-full px-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value && (
          <>
            <img src={value.flag} alt={value.name} className="h-3 w-5 mr-1" />
            <span className="text-xs">{value.dialCode}</span>
          </>
        )}
        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-60 mt-1 bg-white border rounded-md shadow-lg max-h-72 overflow-y-auto left-0">
          <div className="sticky top-0 bg-white p-2 border-b">
            <input
              ref={searchRef}
              type="text"
              className="w-full px-2 py-1 text-sm border rounded-md"
              placeholder="Search country or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="py-1">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex"
                onClick={() => handleCountrySelect(country)}
              >
                <img src={country.flag} alt={country.name} className="h-3 w-5 mr-2" />
                <span>{country.name}</span>
                <span className="ml-auto text-gray-500">{country.dialCode}</span>
              </button>
            ))}
            {filteredCountries.length === 0 && (
              <div className="px-3 py-2 text-sm text-gray-500">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelector;