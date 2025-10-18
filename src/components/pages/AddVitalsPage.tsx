import { useState } from 'react';
import { Activity, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../Navbar';
import { BottomNav } from '../BottomNav';
import { Language, Vital } from '../../App';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface AddVitalsPageProps {
  language: Language;
  onNavigate: (page: string) => void;
  onToggleLanguage: () => void;
  onAddVital: (vital: Vital) => void;
  onLogout: () => void;
}

export function AddVitalsPage({
  language,
  onNavigate,
  onToggleLanguage,
  onAddVital,
  onLogout
}: AddVitalsPageProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [bpSystolic, setBpSystolic] = useState('');
  const [bpDiastolic, setBpDiastolic] = useState('');
  const [sugar, setSugar] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSaving(true);

    setTimeout(() => {
      const newVital: Vital = {
        id: Date.now().toString(),
        date,
        bpSystolic: Number(bpSystolic),
        bpDiastolic: Number(bpDiastolic),
        sugar: Number(sugar),
        weight: Number(weight),
        notes
      };

      onAddVital(newVital);
      setIsSaving(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        onNavigate('timeline');
      }, 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20 md:pb-8">
      <Navbar
        language={language}
        onToggleLanguage={onToggleLanguage}
        onLogout={onLogout}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-sm text-[#78909C] hover:text-[#37474F] mb-2 transition-colors"
          >
            ← {language === 'en' ? 'Back to Dashboard' : 'Dashboard par wapas'}
          </button>
          <h1 className="text-[#37474F] mb-1">
            {language === 'en' ? 'Add Vitals' : 'Vitals Add Karein'}
          </h1>
          <p className="text-[#78909C]">
            {language === 'en'
              ? 'Record your daily health measurements'
              : 'Apne daily health measurements record karein'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[24px] shadow-sm border border-[#009688]/10 p-6">
          <div className="space-y-5">
            {/* Date */}
            <div>
              <Label htmlFor="date">
                {language === 'en' ? 'Date' : 'Date'}
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1.5 rounded-2xl border-[#009688]/20 focus:border-[#009688] focus:ring-[#009688]"
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {/* Blood Pressure */}
            <div>
              <Label>
                {language === 'en' ? 'Blood Pressure (mmHg)' : 'Blood Pressure (mmHg)'}
              </Label>
              <div className="grid grid-cols-2 gap-3 mt-1.5">
                <div>
                  <Input
                    type="number"
                    placeholder={language === 'en' ? 'Systolic' : 'Systolic'}
                    value={bpSystolic}
                    onChange={(e) => setBpSystolic(e.target.value)}
                    className="rounded-2xl border-[#009688]/20 focus:border-[#009688] focus:ring-[#009688]"
                    min="60"
                    max="250"
                    required
                  />
                  <p className="text-xs text-[#78909C] mt-1">
                    {language === 'en' ? 'e.g., 120' : 'e.g., 120'}
                  </p>
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder={language === 'en' ? 'Diastolic' : 'Diastolic'}
                    value={bpDiastolic}
                    onChange={(e) => setBpDiastolic(e.target.value)}
                    className="rounded-2xl border-[#009688]/20 focus:border-[#009688] focus:ring-[#009688]"
                    min="40"
                    max="150"
                    required
                  />
                  <p className="text-xs text-[#78909C] mt-1">
                    {language === 'en' ? 'e.g., 80' : 'e.g., 80'}
                  </p>
                </div>
              </div>
            </div>

            {/* Blood Sugar */}
            <div>
              <Label htmlFor="sugar">
                {language === 'en' ? 'Blood Sugar (mg/dL)' : 'Blood Sugar (mg/dL)'}
              </Label>
              <Input
                id="sugar"
                type="number"
                placeholder={language === 'en' ? 'e.g., 95' : 'e.g., 95'}
                value={sugar}
                onChange={(e) => setSugar(e.target.value)}
                className="mt-1.5 rounded-2xl border-[#009688]/20 focus:border-[#009688] focus:ring-[#009688]"
                min="50"
                max="400"
                required
              />
              <p className="text-xs text-[#78909C] mt-1">
                {language === 'en' ? 'Normal fasting: 70-100 mg/dL' : 'Normal fasting: 70-100 mg/dL'}
              </p>
            </div>

            {/* Weight */}
            <div>
              <Label htmlFor="weight">
                {language === 'en' ? 'Weight (kg)' : 'Weight (kg)'}
              </Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder={language === 'en' ? 'e.g., 70.5' : 'e.g., 70.5'}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1.5 rounded-2xl border-[#009688]/20 focus:border-[#009688] focus:ring-[#009688]"
                min="30"
                max="300"
                required
              />
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">
                {language === 'en' ? 'Notes (Optional)' : 'Notes (Optional)'}
              </Label>
              <Textarea
                id="notes"
                placeholder={
                  language === 'en'
                    ? 'Add any additional notes, e.g., "After morning walk" or "Before breakfast"'
                    : 'Koi additional notes add karein, e.g., "Morning walk ke baad" ya "Breakfast se pehle"'
                }
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1.5 rounded-2xl border-[#009688]/20 focus:border-[#009688] focus:ring-[#009688]"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#009688] to-[#00796B] hover:from-[#00796B] hover:to-[#00695C] rounded-2xl shadow-md hover:shadow-lg transition-all"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {language === 'en' ? 'Saving...' : 'Save ho raha hai...'}
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Save Vitals' : 'Vitals Save Karein'}
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Info Card */}
        <div className="mt-6 bg-gradient-to-br from-[#E0F2F1] to-[#B2DFDB]/30 border border-[#009688]/20 rounded-[20px] p-4">
          <h3 className="text-sm text-[#00695C] mb-2">
            {language === 'en' ? 'Normal Ranges:' : 'Normal Ranges:'}
          </h3>
          <ul className="text-xs text-[#37474F] space-y-1">
            <li>• {language === 'en' ? 'Blood Pressure: 90/60 - 120/80 mmHg' : 'Blood Pressure: 90/60 - 120/80 mmHg'}</li>
            <li>• {language === 'en' ? 'Blood Sugar (fasting): 70-100 mg/dL' : 'Blood Sugar (fasting): 70-100 mg/dL'}</li>
            <li>• {language === 'en' ? 'Weight: Depends on height and age' : 'Weight: Height aur age par depend karta hai'}</li>
          </ul>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-[24px] p-8 max-w-sm mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FDD835] to-[#FBC02D] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-[#37474F] mb-2">
              {language === 'en' ? 'Success!' : 'Success!'}
            </h2>
            <p className="text-[#78909C]">
              {language === 'en'
                ? 'Your vitals have been saved successfully'
                : 'Aapke vitals successfully save ho gaye hain'}
            </p>
          </div>
        </div>
      )}

      <BottomNav currentPage="dashboard" onNavigate={onNavigate} />
    </div>
  );
}
