import { FileText, Calendar, AlertCircle } from 'lucide-react';
import { Report } from '../App';

interface ReportCardProps {
  report: Report;
  onClick: () => void;
}

export function ReportCard({ report, onClick }: ReportCardProps) {
  const hasAbnormalValues = report.abnormalValues.length > 0;

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-[20px] p-4 shadow-sm hover:shadow-lg transition-all border border-[#009688]/10 text-left hover:border-[#009688]/30"
    >
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
          hasAbnormalValues ? 'bg-gradient-to-br from-amber-50 to-orange-50' : 'bg-gradient-to-br from-[#E0F2F1] to-[#B2DFDB]'
        }`}>
          <FileText className={`w-6 h-6 ${hasAbnormalValues ? 'text-amber-600' : 'text-[#009688]'}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-[#37474F] mb-1">{report.type}</h3>
          <div className="flex items-center gap-2 text-sm text-[#78909C] mb-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <p className="text-sm text-[#78909C]">{report.fileName}</p>
          
          {hasAbnormalValues && (
            <div className="mt-3 flex items-start gap-2 bg-gradient-to-r from-amber-50 to-orange-50 p-2 rounded-2xl border border-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-amber-800">
                {report.abnormalValues.length} abnormal value{report.abnormalValues.length > 1 ? 's' : ''} found
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
