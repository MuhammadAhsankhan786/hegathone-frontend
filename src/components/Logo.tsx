export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dimensions = {
    sm: { container: 'w-8 h-8', icon: 'w-5 h-5' },
    md: { container: 'w-10 h-10', icon: 'w-6 h-6' },
    lg: { container: 'w-16 h-16', icon: 'w-10 h-10' }
  };

  const { container, icon } = dimensions[size];

  return (
    <div className={`${container} rounded-2xl bg-gradient-to-br from-[#009688] to-[#FDD835] flex items-center justify-center relative shadow-md`}>
      {/* Heart + Shield merged icon */}
      <svg
        viewBox="0 0 24 24"
        className={`${icon} text-white`}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shield base */}
        <path
          d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"
          opacity="0.9"
        />
        {/* Heart inside */}
        <path
          d="M12 18.5c-3-2.5-5-4.5-5-7 0-1.5 1-2.5 2.5-2.5 1 0 1.8.5 2.5 1.3.7-.8 1.5-1.3 2.5-1.3 1.5 0 2.5 1 2.5 2.5 0 2.5-2 4.5-5 7z"
          fill="white"
          opacity="0.95"
        />
      </svg>
      
      {/* AI Spark */}
      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#FDD835] rounded-full flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-2 h-2 text-[#009688]"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l2 7h7l-5.5 4 2 7-5.5-4-5.5 4 2-7L3 9h7z" />
        </svg>
      </div>
    </div>
  );
}

export function LogoWithText({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const textSizes = {
    sm: { title: 'text-base', tagline: 'text-[10px]' },
    md: { title: 'text-xl', tagline: 'text-xs' },
    lg: { title: 'text-3xl', tagline: 'text-base' }
  };

  const { title, tagline } = textSizes[size];

  return (
    <div className="flex items-center gap-3">
      <Logo size={size} />
      <div>
        <h1 className={`${title} text-[#009688] leading-tight`}>HealthMate</h1>
        <p className={`${tagline} tagline text-[#00695C] leading-tight`}>Sehat ka Smart Dost</p>
      </div>
    </div>
  );
}
