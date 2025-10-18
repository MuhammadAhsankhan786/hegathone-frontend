import { useState } from 'react';
import { FileText, Download, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';
import { Navbar } from '../Navbar';
import { BottomNav } from '../BottomNav';
import { Language, Report } from '../../App';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ViewReportPageProps {
  report?: Report;
  language: Language;
  onNavigate: (page: string) => void;
  onToggleLanguage: () => void;
  onLogout: () => void;
}

export function ViewReportPage({
  report,
  language,
  onNavigate,
  onToggleLanguage,
  onLogout
}: ViewReportPageProps) {
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);

  if (!report) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] pb-20 md:pb-8">
        <Navbar
          language={language}
          onToggleLanguage={onToggleLanguage}
          onLogout={onLogout}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center py-12">
            <p className="text-[#78909C]">Report not found</p>
            <Button onClick={() => onNavigate('dashboard')} className="mt-4 bg-gradient-to-r from-[#009688] to-[#00796B] rounded-2xl">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    alert(language === 'en' ? 'Download started...' : 'Download shuru ho gaya...');
  };

  const handleAskDoctor = () => {
    setShowQuestionDialog(true);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20 md:pb-8">
      <Navbar
        language={language}
        onToggleLanguage={onToggleLanguage}
        onLogout={onLogout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-sm text-[#78909C] hover:text-[#37474F] mb-2 transition-colors"
          >
            ← {language === 'en' ? 'Back to Dashboard' : 'Dashboard par wapas'}
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[#37474F] mb-1">{report.type}</h1>
              <p className="text-[#78909C]">
                {new Date(report.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex items-center gap-2 rounded-2xl border-[#009688] text-[#009688] hover:bg-[#E0F2F1]"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === 'en' ? 'Download' : 'Download'}
              </span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* File Preview */}
          <div className="bg-white rounded-[24px] shadow-sm border border-[#009688]/10 p-6">
            <h2 className="text-[#37474F] mb-4">
              {language === 'en' ? 'File Preview' : 'File Preview'}
            </h2>
            
            <div className="bg-gradient-to-br from-[#E0F2F1] to-[#B2DFDB]/30 rounded-[20px] aspect-[3/4] flex items-center justify-center">
              {report.fileUrl.endsWith('.pdf') ? (
                <div className="text-center">
                  <FileText className="w-20 h-20 text-[#B2DFDB] mx-auto mb-4" />
                  <p className="text-[#78909C] mb-2">{report.fileName}</p>
                  <Button onClick={handleDownload} variant="outline" size="sm" className="rounded-2xl border-[#009688] text-[#009688]">
                    {language === 'en' ? 'Open PDF' : 'PDF kholein'}
                  </Button>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#E0F2F1] to-[#FFF9E6] rounded-[20px] flex items-center justify-center">
                  <FileText className="w-20 h-20 text-[#B2DFDB]" />
                </div>
              )}
            </div>

            <div className="mt-4">
              <p className="text-sm text-[#78909C]">{report.fileName}</p>
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-white rounded-[24px] shadow-sm border border-[#009688]/10 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FDD835] to-[#FBC02D] rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-[#37474F]">
                {language === 'en' ? 'AI Summary' : 'AI Summary'}
              </h2>
              <Badge variant="outline" className="ml-auto rounded-full border-[#009688] text-[#009688]">
                {language === 'en' ? 'English' : 'Roman Urdu'}
              </Badge>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-[#37474F] leading-relaxed">
                {language === 'en' ? report.summary.en : report.summary.ur}
              </p>
            </div>

            {/* Abnormal Values */}
            {report.abnormalValues.length > 0 && (
              <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-[20px] p-4">
                <div className="flex items-start gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <h3 className="text-amber-900">
                    {language === 'en' ? 'Abnormal Values Detected' : 'Abnormal Values Mile Hain'}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {report.abnormalValues.map((value, index) => (
                    <li key={index} className="text-sm text-amber-800 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <Button
                onClick={handleAskDoctor}
                className="w-full bg-gradient-to-r from-[#009688] to-[#00796B] hover:from-[#00796B] hover:to-[#00695C] rounded-2xl shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Ask Doctor Questions' : 'Doctor se sawal puchein'}
              </Button>
              
              <Button
                onClick={() => alert(language === 'en' ? 'Saved to your records' : 'Aapke records mein save ho gaya')}
                variant="outline"
                className="w-full rounded-2xl border-[#009688] text-[#009688] hover:bg-[#E0F2F1]"
              >
                {language === 'en' ? 'Save to Records' : 'Records mein save karein'}
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 pt-6 border-t border-[#009688]/10">
              <p className="text-xs text-[#78909C] italic">
                {language === 'en'
                  ? 'This AI analysis is for explanation purposes only and is not medical advice. Please consult with your healthcare provider for proper interpretation and treatment.'
                  : 'Yeh AI analysis sirf explanation ke liye hai aur medical advice nahi hai. Proper interpretation aur treatment ke liye apne healthcare provider se consult karein.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ask Doctor Dialog */}
      {showQuestionDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[24px] p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-[#37474F] mb-4">
              {language === 'en' ? 'Ask Your Doctor' : 'Apne Doctor se Puchein'}
            </h2>
            <p className="text-[#78909C] mb-4">
              {language === 'en'
                ? 'This feature allows you to send questions directly to your healthcare provider about this report.'
                : 'Is feature se aap is report ke baare mein apne healthcare provider ko directly sawal bhej sakte hain.'}
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowQuestionDialog(false)}
                variant="outline"
                className="flex-1 rounded-2xl border-[#009688] text-[#009688]"
              >
                {language === 'en' ? 'Cancel' : 'Cancel'}
              </Button>
              <Button
                onClick={() => {
                  alert(language === 'en' ? 'Feature coming soon!' : 'Feature jald aa raha hai!');
                  setShowQuestionDialog(false);
                }}
                className="flex-1 bg-gradient-to-r from-[#009688] to-[#00796B] rounded-2xl"
              >
                {language === 'en' ? 'Continue' : 'Continue'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <BottomNav currentPage="dashboard" onNavigate={onNavigate} />
    </div>
  );
}
