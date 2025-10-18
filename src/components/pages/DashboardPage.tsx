import { Activity, FileText, Plus, TrendingUp } from 'lucide-react';
import { Navbar } from '../Navbar';
import { BottomNav } from '../BottomNav';
import { ReportCard } from '../ReportCard';
import { Language, Report, Vital } from '../../App';
import { Button } from '../ui/button';

interface DashboardPageProps {
  reports: Report[];
  vitals: Vital[];
  language: Language;
  onNavigate: (page: string, reportId?: string) => void;
  onToggleLanguage: () => void;
  onLogout: () => void;
}

export function DashboardPage({
  reports,
  vitals,
  language,
  onNavigate,
  onToggleLanguage,
  onLogout
}: DashboardPageProps) {
  const latestReport = reports[0];
  const latestVital = vitals[0];

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20 md:pb-8">
      <Navbar
        language={language}
        onToggleLanguage={onToggleLanguage}
        onLogout={onLogout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[#37474F] mb-1">Dashboard</h1>
          <p className="text-[#78909C]">
            {language === 'en' ? 'Your health overview' : 'Aapki sehat ka overview'}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Latest Report Summary */}
          <div className="bg-gradient-to-br from-[#009688] to-[#00796B] rounded-[24px] p-6 text-white shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[#B2DFDB] text-sm mb-1">
                  {language === 'en' ? 'Latest Report' : 'Latest Report'}
                </p>
                <h2 className="text-white">{latestReport?.type || 'No reports yet'}</h2>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
            {latestReport && (
              <>
                <p className="text-sm text-[#B2DFDB] mb-4">
                  {new Date(latestReport.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                <Button
                  onClick={() => onNavigate('view-report', latestReport.id)}
                  variant="secondary"
                  className="w-full bg-white text-[#009688] hover:bg-[#E0F2F1] rounded-2xl"
                >
                  {language === 'en' ? 'View Report' : 'Report dekhein'}
                </Button>
              </>
            )}
          </div>

          {/* Latest Vitals Summary */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#009688]/10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[#78909C] text-sm mb-1">
                  {language === 'en' ? 'Latest Vitals' : 'Latest Vitals'}
                </p>
                <h2 className="text-[#37474F]">
                  {latestVital
                    ? new Date(latestVital.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })
                    : 'No vitals yet'}
                </h2>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#FDD835]/20 to-[#FBC02D]/20 rounded-2xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#F57F17]" />
              </div>
            </div>
            {latestVital && (
              <>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-[#78909C] mb-1">BP</p>
                    <p className="text-[#37474F]">
                      {latestVital.bpSystolic}/{latestVital.bpDiastolic}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#78909C] mb-1">Sugar</p>
                    <p className="text-[#37474F]">{latestVital.sugar}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#78909C] mb-1">Weight</p>
                    <p className="text-[#37474F]">{latestVital.weight} kg</p>
                  </div>
                </div>
                <Button
                  onClick={() => onNavigate('add-vitals')}
                  variant="outline"
                  className="w-full rounded-2xl border-[#009688] text-[#009688] hover:bg-[#E0F2F1]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Add New' : 'Naya add karein'}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            onClick={() => onNavigate('upload')}
            className="bg-gradient-to-r from-[#009688] to-[#00796B] hover:from-[#00796B] hover:to-[#00695C] h-auto py-4 rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <FileText className="w-5 h-5 mr-2" />
            {language === 'en' ? 'Upload Report' : 'Report upload karein'}
          </Button>
          <Button
            onClick={() => onNavigate('timeline')}
            variant="outline"
            className="h-auto py-4 rounded-2xl border-[#009688] text-[#009688] hover:bg-[#E0F2F1]"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            {language === 'en' ? 'View Timeline' : 'Timeline dekhein'}
          </Button>
        </div>

        {/* Recent Reports */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#37474F]">
              {language === 'en' ? 'Recent Reports' : 'Recent Reports'}
            </h2>
            {reports.length > 3 && (
              <button
                onClick={() => onNavigate('timeline')}
                className="text-sm text-[#009688] hover:text-[#00796B] transition-colors"
              >
                {language === 'en' ? 'View all' : 'Sab dekhein'}
              </button>
            )}
          </div>

          {reports.length === 0 ? (
            <div className="bg-white rounded-[24px] p-8 text-center shadow-sm border border-[#009688]/10">
              <FileText className="w-12 h-12 text-[#B2DFDB] mx-auto mb-3" />
              <p className="text-[#78909C] mb-4">
                {language === 'en'
                  ? 'No reports uploaded yet'
                  : 'Abhi tak koi report upload nahi hui'}
              </p>
              <Button onClick={() => onNavigate('upload')} className="bg-gradient-to-r from-[#009688] to-[#00796B] hover:from-[#00796B] hover:to-[#00695C] rounded-2xl shadow-md">
                {language === 'en' ? 'Upload First Report' : 'Pehli report upload karein'}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.slice(0, 3).map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onClick={() => onNavigate('view-report', report.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav currentPage="dashboard" onNavigate={onNavigate} />
    </div>
  );
}
