import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  name: string;
  value: string | null;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ 
  options, 
  name, 
  value, 
  onChange 
}) => {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label 
          key={option.value} 
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="h-4 w-4 text-green-500 focus:ring-green-500"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;