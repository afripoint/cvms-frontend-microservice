import React, { useState } from 'react';

type TimeOption = '1 day' | '3 days' | '7 days' | '14 days' | '30 days' | '90 days';

interface TimeDropdownProps {
  defaultValue?: TimeOption;
  onChange?: (selected: TimeOption) => void;
}

const TimeDropdown: React.FC<TimeDropdownProps> = ({ 
  defaultValue = '7 days',
  onChange
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<TimeOption>(defaultValue);
  
  const options: TimeOption[] = ['1 day', '3 days', '7 days', '14 days', '30 days', '90 days'];
  
  const toggleDropdown = (): void => setIsOpen(!isOpen);
  
  const selectOption = (option: TimeOption): void => {
    setSelected(option);
    if (onChange) {
      onChange(option);
    }
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown}
        className="focus:outline-none"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between text-sm font-semibold text-gray-500 border-2 border-gray-300 px-3 rounded-md">
          <span>{selected}</span>
          <svg
            className={`h-4 w-4 ml-2 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute mt-1 w-24 bg-white shadow-lg rounded-md py-1 z-10" role="listbox">
          {options.map((option) => (
            <div
              key={option}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                selected === option ? 'bg-gray-100 font-semibold' : ''
              }`}
              onClick={() => selectOption(option)}
              role="option"
              aria-selected={selected === option}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeDropdown;