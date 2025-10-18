import { User, Mail, Phone, Calendar, FileText, Activity, Settings, LogOut } from 'lucide-react';
import { Navbar } from '../Navbar';
import { BottomNav } from '../BottomNav';
import { Language } from '../../App';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface ProfilePageProps {
  language: Language;
  onNavigate: (page: string) => void;
  onToggleLanguage: () => void;
  onLogout: () => void;
}

export function ProfilePage({
  language,
  onNavigate,
  onToggleLanguage,
  onLogout
}: ProfilePageProps) {
  const userName = 'Ahmed Khan';
  const userEmail = 'ahmed.khan@example.com';
  const userPhone = '+92 300 1234567';
  const joinDate = 'October 2025';

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20 md:pb-8">
      <Navbar
        language={language}
        onToggleLanguage={onToggleLanguage}
        onLogout={onLogout}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-[#37474F] mb-1">
            {language === 'en' ? 'Profile' : 'Profile'}
          </h1>
          <p className="text-[#78909C]">
            {language === 'en' ? 'Manage your account settings' : 'Apne account settings manage karein'}
          </p>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-[24px] shadow-sm border border-[#009688]/10 p-6 mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-gradient-to-br from-[#009688] to-[#00796B] text-white text-2xl">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-[#37474F] mb-1">{userName}</h2>
              <p className="text-sm text-[#78909C]">{userEmail}</p>
            </div>

            <Button variant="outline" size="sm" className="rounded-2xl border-[#009688] text-[#009688] hover:bg-[#E0F2F1]">
              {language === 'en' ? 'Edit' : 'Edit'}
            </Button>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white rounded-[24px] shadow-sm border border-[#009688]/10 p-6 mb-6">
          <h2 className="text-[#37474F] mb-4">
            {language === 'en' ? 'Account Details' : 'Account Details'}
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-[#009688]/10">
              <div className="w-10 h-10 bg-gradient-to-br from-[#E0F2F1] to-[#B2DFDB] rounded-2xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#009688]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#78909C]">
                  {language === 'en' ? 'Email' : 'Email'}
                </p>
                <p className="text-[#37474F]">{userEmail}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pb-4 border-b border-[#009688]/10">
              <div className="w-10 h-10 bg-gradient-to-br from-[#E0F2F1] to-[#B2DFDB] rounded-2xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#009688]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#78909C]">
                  {language === 'en' ? 'Phone' : 'Phone'}
                </p>
                <p className="text-[#37474F]">{userPhone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#E0F2F1] to-[#B2DFDB] rounded-2xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#009688]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#78909C]">
                  {language === 'en' ? 'Member Since' : 'Member Since'}
                </p>
                <p className="text-[#37474F]">{joinDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Health Summary */}
        <div className="bg-white rounded-[24px] shadow-sm border border-[#009688]/10 p-6 mb-6">
          <h2 className="text-[#37474F] mb-4">
            {language === 'en' ? 'Health Summary' : 'Health Summary'}
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-[#E0F2F1] to-[#B2DFDB]/50 rounded-[20px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-[#009688]" />
                <span className="text-sm text-[#78909C]">
                  {language === 'en' ? 'Reports' : 'Reports'}
                </span>
              </div>
              <p className="text-2xl text-[#37474F]">2</p>
            </div>

            <div className="bg-gradient-to-br from-[#FDD835]/20 to-[#FBC02D]/20 rounded-[20px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-[#F57F17]" />
                <span className="text-sm text-[#78909C]">
                  {language === 'en' ? 'Vitals' : 'Vitals'}
                </span>
              </div>
              <p className="text-2xl text-[#37474F]">2</p>
            </div>
          </div>
        </div>

        {/* Settings & Actions */}
        <div className="bg-white rounded-[24px] shadow-sm border border-[#009688]/10 p-6">
          <h2 className="text-[#37474F] mb-4">
            {language === 'en' ? 'Settings' : 'Settings'}
          </h2>
          
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-[#E0F2F1] transition-colors text-left">
              <Settings className="w-5 h-5 text-[#78909C]" />
              <span className="text-[#37474F]">
                {language === 'en' ? 'Account Settings' : 'Account Settings'}
              </span>
            </button>

            <button className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-[#E0F2F1] transition-colors text-left">
              <User className="w-5 h-5 text-[#78909C]" />
              <span className="text-[#37474F]">
                {language === 'en' ? 'Privacy Settings' : 'Privacy Settings'}
              </span>
            </button>

            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-red-50 transition-colors text-left text-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span>
                {language === 'en' ? 'Logout' : 'Logout'}
              </span>
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-[20px] p-4">
          <p className="text-xs text-amber-800">
            <span className="font-semibold">
              {language === 'en' ? 'Privacy Notice: ' : 'Privacy Notice: '}
            </span>
            {language === 'en'
              ? 'Your health data is encrypted and stored securely. We never share your personal information without your consent.'
              : 'Aapka health data encrypted aur securely store hai. Hum aapki personal information aapki consent ke bina kabhi share nahi karte.'}
          </p>
        </div>
      </div>

      <BottomNav currentPage="profile" onNavigate={onNavigate} />
    </div>
  );
}
