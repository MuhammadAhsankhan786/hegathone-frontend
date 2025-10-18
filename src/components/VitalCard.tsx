import { Activity, Droplet, Weight, Calendar } from 'lucide-react';
import { Vital } from '../App';

interface VitalCardProps {
  vital: Vital;
}

export function VitalCard({ vital }: VitalCardProps) {
  return (
    <div className="bg-white rounded-[20px] p-4 shadow-sm border border-[#009688]/10">
      <div className="flex items-center gap-2 text-sm text-[#78909C] mb-3">
        <Calendar className="w-4 h-4" />
        <span>{new Date(vital.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Activity className="w-4 h-4 text-[#009688]" />
            <span className="text-xs text-[#78909C]">BP</span>
          </div>
          <p className="text-[#37474F]">{vital.bpSystolic}/{vital.bpDiastolic}</p>
        </div>
        
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Droplet className="w-4 h-4 text-[#009688]" />
            <span className="text-xs text-[#78909C]">Sugar</span>
          </div>
          <p className="text-[#37474F]">{vital.sugar}</p>
        </div>
        
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Weight className="w-4 h-4 text-[#009688]" />
            <span className="text-xs text-[#78909C]">Weight</span>
          </div>
          <p className="text-[#37474F]">{vital.weight} kg</p>
        </div>
      </div>
      
      {vital.notes && (
        <p className="mt-3 text-sm text-[#78909C] italic">"{vital.notes}"</p>
      )}
    </div>
  );
}
