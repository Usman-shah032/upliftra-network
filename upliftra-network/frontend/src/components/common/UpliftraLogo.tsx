import React from 'react';

interface UpliftraLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon-only' | 'wordmark';
  theme?: 'dark' | 'light' | 'auto';
}

export const UpliftraLogo: React.FC<UpliftraLogoProps> = ({
  className = '',
  size = 'md',
  theme = 'auto'
}) => {
  const sizeMap = {
    sm: 32,
    md: 46,
    lg: 60,
    xl: 84
  };

  const height = sizeMap[size] || 46;

  return (
    <div
      className={`inline-flex items-center justify-center select-none shrink-0 ${className}`}
      style={{ height }}
    >
      <img
        src="/upliftra-logo.png"
        alt="Upliftra Network"
        className="h-full w-auto object-contain shrink-0 transition-opacity duration-150"
        loading="eager"
        style={{
          maxHeight: height,
          display: 'block'
        }}
      />
    </div>
  );
};

export default UpliftraLogo;

