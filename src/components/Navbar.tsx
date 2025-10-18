import { Globe, LogOut } from 'lucide-react';
import { Language } from '../App';
import { LogoWithText } from './Logo';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  onLogout?: () => void;
  showActions?: boolean;
}

export function Navbar({ language, onToggleLanguage, onLogout, showActions = true }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-[#009688]/10 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <LogoWithText size="sm" />

          {showActions && (
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleLanguage}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#E0F2F1] transition-colors"
              >
                <Globe className="w-5 h-5 text-[#009688]" />
                <span className="text-sm text-[#37474F] hidden sm:inline">
                  {language === 'en' ? 'English' : 'Roman Urdu'}
                </span>
              </button>
              
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm hidden sm:inline">Logout</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
