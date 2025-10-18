import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { LogoWithText } from '../Logo';

interface RegisterPageProps {
  onRegister: () => void;
  onNavigateToLogin: () => void;
}

export function RegisterPage({ onRegister, onNavigateToLogin }: RegisterPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#E0F2F1] via-[#F9FAFB] to-[#FFF9E6]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <LogoWithText size="lg" />
          </div>
        </div>

        <div className="bg-white rounded-[24px] shadow-xl p-6 sm:p-8 border border-[#009688]/10">
          <h2 className="text-[#37474F] mb-6">Create Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#78909C]" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 rounded-2xl border-[#009688]/20 focus:border-[#009688] focus:ring-[#009688]"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#78909C]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 rounded-2xl border-[#009688]/20 focus:border-[#009688] focus:ring-[#009688]"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#78909C]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 rounded-2xl border-[#009688]/20 focus:border-[#009688] focus:ring-[#009688]"
                  required
                />
              </div>
              <p className="text-xs text-[#78909C] mt-1.5">Must be at least 8 characters</p>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-[#009688] to-[#00796B] hover:from-[#00796B] hover:to-[#00695C] rounded-2xl shadow-md hover:shadow-lg transition-all">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#78909C]">
              Already have an account?{' '}
              <button
                onClick={onNavigateToLogin}
                className="text-[#009688] hover:text-[#00796B] transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        <p className="text-xs text-[#78909C] text-center mt-6 px-4">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
