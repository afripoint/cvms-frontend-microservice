import React from 'react';

interface IconProps {
  color: string;
}

const DocumentIcon: React.FC<IconProps> = () => (


    <div className="w-8 h-8 rounded-full flex items-center justify-center">
      <img 
      src="/icons/walleticon.svg" 
      alt="Time icon" 
      className="w-10 h-10"
    />
    </div>
  );

  export default DocumentIcon;