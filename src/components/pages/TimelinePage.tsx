import { FileText, Activity, Calendar } from 'lucide-react';
import { Navbar } from '../Navbar';
import { BottomNav } from '../BottomNav';
import { Language, Report, Vital } from '../../App';
import { Badge } from '../ui/badge';

interface TimelinePageProps {
  reports: Report[];
  vitals: Vital[];
  language: Language;
  onNavigate: (page: string, reportId?: string) => void;
  onToggleLanguage: () => void;
  onLogout: () => void;
}

interface TimelineItem {
  id: string;
  type: 'report' | 'vital';
  date: string;
  data: Report | Vital;
}

export function TimelinePage({
  reports,
  vitals,
  language,
  onNavigate,
  onToggleLanguage,
  onLogout
}: TimelinePageProps) {
  // Combine and sort items by date
  const timelineItems: TimelineItem[] = [
    ...reports.map(r => ({ id: r.id, type: 'report' as const, date: r.date, data: r })),
    ...vitals.map(v => ({ id: v.id, type: 'vital' as const, date: v.date, data: v }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Group items by month
  const groupedItems: { [key: string]: TimelineItem[] } = {};
  timelineItems.forEach(item => {
    const monthYear = new Date(item.date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
    if (!groupedItems[monthYear]) {
      groupedItems[monthYear] = [];
    }
    groupedItems[monthYear].push(item);
  });

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
            {language === 'en' ? 'Health Timeline' : 'Health Timeline'}
          </h1>
          <p className="text-[#78909C]">
            {language === 'en'
              ? 'Chronological view of your health records'
              : 'Aapke health records ka chronological view'}
          </p>
        </div>

        {timelineItems.length === 0 ? (
          <div className="bg-white rounded-[24px] p-8 text-center shadow-sm border border-[#009688]/10">
            <Calendar className="w-12 h-12 text-[#B2DFDB] mx-auto mb-3" />
            <p className="text-[#78909C]">
              {language === 'en'
                ? 'No health records yet. Start by uploading a report or adding vitals.'
                : 'Abhi tak koi health records nahi hain. Report upload ya vitals add karke shuru karein.'}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedItems).map(([monthYear, items]) => (
              <div key={monthYear}>
                <h2 className="text-[#37474F] mb-4 sticky top-20 bg-[#F9FAFB] py-2 z-10">
                  {monthYear}
                </h2>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#009688] via-[#26A69A] to-[#B2DFDB]" />

                  <div className="space-y-6">
                    {items.map((item, index) => (
                      <div key={item.id} className="relative pl-16">
                        {/* Timeline dot */}
                        <div className={`absolute left-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${
                          item.type === 'report' 
                            ? 'bg-gradient-to-br from-[#009688] to-[#00796B]' 
                            : 'bg-gradient-to-br from-[#FDD835] to-[#FBC02D]'
                        }`}>
                          {item.type === 'report' ? (
                            <FileText className="w-6 h-6 text-white" />
                          ) : (
                            <Activity className="w-6 h-6 text-white" />
                          )}
                        </div>

                        {/* Content */}
                        {item.type === 'report' ? (
                          <ReportTimelineCard
                            report={item.data as Report}
                            language={language}
                            onClick={() => onNavigate('view-report', item.id)}
                          />
                        ) : (
                          <VitalTimelineCard
                            vital={item.data as Vital}
                            language={language}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav currentPage="timeline" onNavigate={onNavigate} />
    </div>
  );
}

function ReportTimelineCard({
  report,
  language,
  onClick
}: {
  report: Report;
  language: Language;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-[20px] p-4 shadow-sm hover:shadow-lg transition-all border border-[#009688]/10 text-left hover:border-[#009688]/30"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <Badge variant="outline" className="mb-2 rounded-full border-[#009688] text-[#009688]">
            {language === 'en' ? 'Report' : 'Report'}
          </Badge>
          <h3 className="text-[#37474F]">{report.type}</h3>
        </div>
        <span className="text-sm text-[#78909C]">
          {new Date(report.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>

      <p className="text-sm text-[#78909C] mb-3">{report.fileName}</p>

      {report.abnormalValues.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-2">
          <p className="text-xs text-amber-800">
            {report.abnormalValues.length} {language === 'en' ? 'abnormal values found' : 'abnormal values mile hain'}
          </p>
        </div>
      )}
    </button>
  );
}

function VitalTimelineCard({
  vital,
  language
}: {
  vital: Vital;
  language: Language;
}) {
  return (
    <div className="bg-white rounded-[20px] p-4 shadow-sm border border-[#009688]/10">
      <div className="flex items-start justify-between mb-3">
        <Badge variant="outline" className="bg-gradient-to-r from-[#FDD835]/20 to-[#FBC02D]/20 text-[#F57F17] border-[#FDD835]">
          {language === 'en' ? 'Vitals' : 'Vitals'}
        </Badge>
        <span className="text-sm text-[#78909C]">
          {new Date(vital.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-[#78909C] mb-1">BP</p>
          <p className="text-sm text-[#37474F]">
            {vital.bpSystolic}/{vital.bpDiastolic}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#78909C] mb-1">Sugar</p>
          <p className="text-sm text-[#37474F]">{vital.sugar}</p>
        </div>
        <div>
          <p className="text-xs text-[#78909C] mb-1">Weight</p>
          <p className="text-sm text-[#37474F]">{vital.weight} kg</p>
        </div>
      </div>

      {vital.notes && (
        <p className="mt-3 text-xs text-[#78909C] italic">"{vital.notes}"</p>
      )}
    </div>
  );
}
