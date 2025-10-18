import { useState } from 'react';
import { Upload, FileText, X, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../Navbar';
import { BottomNav } from '../BottomNav';
import { Language, Report } from '../../App';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface UploadReportPageProps {
  language: Language;
  onNavigate: (page: string, reportId?: string) => void;
  onToggleLanguage: () => void;
  onAddReport: (report: Report) => void;
  onLogout: () => void;
}

export function UploadReportPage({
  language,
  onNavigate,
  onToggleLanguage,
  onAddReport,
  onLogout
}: UploadReportPageProps) {
  const [reportType, setReportType] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportType || !date || !file) return;

    setIsSubmitting(true);

    // Simulate upload delay
    setTimeout(() => {
      const newReport: Report = {
        id: Date.now().toString(),
        type: reportType,
        date: date,
        fileName: file.name,
        fileUrl: preview || '/sample-report.pdf',
        summary: {
          en: `Your ${reportType.toLowerCase()} has been successfully uploaded. AI analysis will be generated shortly. Please check back in a few minutes for detailed insights.`,
          ur: `Aapka ${reportType.toLowerCase()} successfully upload ho gaya hai. AI analysis thori der mein generate hoga. Detailed insights ke liye kuch minutes mein check karein.`
        },
        abnormalValues: []
      };

      onAddReport(newReport);
      setIsSubmitting(false);
      onNavigate('view-report', newReport.id);
    }, 1500);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
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
            {language === 'en' ? 'Upload Report' : 'Report Upload Karein'}
          </h1>
          <p className="text-[#78909C]">
            {language === 'en'
              ? 'Upload your medical reports for AI-powered analysis'
              : 'Apne medical reports upload karein AI analysis ke liye'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[24px] shadow-sm border border-[#009688]/10 p-6">
          <div className="space-y-5">
            {/* Report Type */}
            <div>
              <Label htmlFor="reportType">
                {language === 'en' ? 'Report Type' : 'Report Type'}
              </Label>
              <Select value={reportType} onValueChange={setReportType} required>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder={language === 'en' ? 'Select report type' : 'Report type select karein'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Blood Test">Blood Test</SelectItem>
                  <SelectItem value="X-Ray">X-Ray</SelectItem>
                  <SelectItem value="MRI Scan">MRI Scan</SelectItem>
                  <SelectItem value="CT Scan">CT Scan</SelectItem>
                  <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                  <SelectItem value="ECG">ECG</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div>
              <Label htmlFor="date">
                {language === 'en' ? 'Report Date' : 'Report Date'}
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1.5"
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <Label>
                {language === 'en' ? 'Upload File' : 'File Upload Karein'}
              </Label>
              
              {!file ? (
                <label className="mt-1.5 flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#009688]/30 rounded-[20px] cursor-pointer hover:border-[#009688] hover:bg-[#E0F2F1]/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 text-[#B2DFDB] mb-3" />
                    <p className="mb-2 text-sm text-[#78909C]">
                      <span className="text-[#009688]">
                        {language === 'en' ? 'Click to upload' : 'Upload karne ke liye click karein'}
                      </span>{' '}
                      {language === 'en' ? 'or drag and drop' : 'ya drag and drop karein'}
                    </p>
                    <p className="text-xs text-[#78909C]">PDF, PNG, JPG (MAX. 10MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              ) : (
                <div className="mt-1.5 bg-gradient-to-br from-[#E0F2F1] to-[#B2DFDB]/30 border border-[#009688]/20 rounded-[20px] p-4">
                  <div className="flex items-start gap-3">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gradient-to-br from-[#B2DFDB] to-[#80CBC4] rounded-2xl flex items-center justify-center">
                        <FileText className="w-10 h-10 text-[#009688]" />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#37474F] truncate mb-1">{file.name}</p>
                      <p className="text-xs text-[#78909C]">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-700">
                          {language === 'en' ? 'Ready to upload' : 'Upload ke liye ready'}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={clearFile}
                      className="p-1.5 hover:bg-[#B2DFDB]/50 rounded-xl transition-colors"
                    >
                      <X className="w-5 h-5 text-[#78909C]" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#009688] to-[#00796B] hover:from-[#00796B] hover:to-[#00695C] rounded-2xl shadow-md hover:shadow-lg transition-all"
              disabled={isSubmitting || !reportType || !date || !file}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {language === 'en' ? 'Uploading...' : 'Upload ho raha hai...'}
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Upload Report' : 'Report Upload Karein'}
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Disclaimer */}
        <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-[20px] p-4">
          <p className="text-xs text-amber-800">
            <span className="font-semibold">
              {language === 'en' ? 'Disclaimer: ' : 'Disclaimer: '}
            </span>
            {language === 'en'
              ? 'AI analysis is for explanation purposes only and not a substitute for professional medical advice. Always consult with qualified healthcare providers.'
              : 'AI analysis sirf explanation ke liye hai aur professional medical advice ka substitute nahi hai. Hamesha qualified healthcare providers se consult karein.'}
          </p>
        </div>
      </div>

      <BottomNav currentPage="upload" onNavigate={onNavigate} />
    </div>
  );
}
