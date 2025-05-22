import React from 'react';



interface IconProps {
  color: string;
}

const SearchIcon: React.FC<IconProps> = () => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center">
    <img 
      src="/icons/searchIcon.svg" 
      alt="Time icon" 
      className="w-10 h-10"
    />
  </div>
);

export default SearchIcon;