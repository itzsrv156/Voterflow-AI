import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoterStore } from '../../store/useVoterStore';
import { 
  X, CheckCircle, ChevronRight, Loader2, 
  User, Home, ShieldCheck
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface FormData {
  residencyType?: 'Day Scholar' | 'Hostel';
  wardenName?: string;
  hostelAddress?: string;
  dob?: string;
  isFutureVoter?: boolean;
  wantsPostalBallot?: boolean;
  photo?: boolean;
  addressProof?: boolean;
  idProof?: boolean;
  [key: string]: unknown;
}

interface FormStepProps {
  onNext: () => void;
  data: FormData;
  setData: (d: FormData) => void;
}

const StudentBranch = ({ data, setData }: { data: FormData, setData: (d: FormData) => void }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-400 uppercase">Residency Type</label>
        <div className="flex gap-2">
          {(['Day Scholar', 'Hostel'] as const).map(type => (
            <button
              key={type}
              onClick={() => setData({ ...data, residencyType: type })}
              className={cn(
                "flex-1 py-3 rounded-xl border font-bold text-sm transition-all",
                data.residencyType === type ? "bg-civic-navy text-white border-civic-navy" : "bg-white text-gray-500 border-gray-100"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      {data.residencyType === 'Hostel' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Warden Name</label>
            <input 
              className="p-4 bg-white border border-gray-100 rounded-xl"
              value={data.wardenName || ''}
              onChange={e => setData({ ...data, wardenName: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Hostel Address</label>
            <textarea 
              className="p-4 bg-white border border-gray-100 rounded-xl min-h-[100px]"
              value={data.hostelAddress || ''}
              onChange={e => setData({ ...data, hostelAddress: e.target.value })}
            />
          </div>
          <div className="p-4 bg-civic-navy/5 rounded-xl border border-civic-navy/10">
            <h4 className="text-[10px] font-bold text-civic-navy uppercase mb-2">Annexure-II Preview</h4>
            <div className="bg-white p-3 rounded border border-gray-200 text-[8px] font-mono text-gray-400">
              DECLARATION BY STUDENT... <br/>
              Warden: {data.wardenName || '_______'} <br/>
              Address: {data.hostelAddress || '_______'}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const FormStep1 = ({ onNext, data, setData }: FormStepProps) => {
  const { persona } = useVoterStore();
  const qualifyingDate = new Date('2026-01-01');
  
  const validateDOB = (val: string) => {
    const d = new Date(val);
    const age = qualifyingDate.getFullYear() - d.getFullYear();
    const m = qualifyingDate.getMonth() - d.getMonth();
    const isUnder18 = (age < 18) || (age === 18 && m < 0);
    setData({ ...data, dob: val, isFutureVoter: isUnder18 });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-400 uppercase">Date of Birth</label>
        <input 
          type="date" 
          className="p-4 bg-white border border-gray-100 rounded-xl font-bold"
          value={data.dob || ''}
          onChange={e => validateDOB(e.target.value)}
        />
        {data.isFutureVoter && (
          <p className="text-[10px] text-blue-500 font-bold uppercase mt-1">Pre-registration (Under 18)</p>
        )}
      </div>
      
      {persona === 'Student' && <StudentBranch data={data} setData={setData} />}
      
      {persona === 'Senior' && (
        <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={data.wantsPostalBallot || false}
              onChange={e => setData({ ...data, wantsPostalBallot: e.target.checked })}
              className="w-5 h-5 accent-orange-500"
            />
            <span className="text-xs font-bold text-orange-900 uppercase">Request Form 12D (Postal Ballot)</span>
          </label>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!data.dob}
        className={cn(
          "w-full py-4 font-bold rounded-2xl flex items-center justify-center gap-2",
          data.dob ? "bg-civic-navy text-white" : "bg-gray-100 text-gray-400"
        )}
      >
        Next Step <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const FormStep2 = ({ onNext, data, setData }: FormStepProps) => {
  const [uploading, setUploading] = useState<string | null>(null);

  const handleUpload = (type: string) => {
    setUploading(type);
    setTimeout(() => {
      setData({ ...data, [type]: true });
      setUploading(null);
    }, 1500);
  };

  const isComplete = data.photo && data.addressProof && data.idProof;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {[
          { id: 'photo', label: 'Passport Photo', icon: User },
          { id: 'addressProof', label: 'Address Proof', icon: Home },
          { id: 'idProof', label: 'Identity Proof (Aadhaar)', icon: ShieldCheck },
        ].map(doc => (
          <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3">
              <doc.icon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-bold text-civic-navy">{doc.label}</span>
            </div>
            <button
              onClick={() => handleUpload(doc.id)}
              disabled={!!data[doc.id] || !!uploading}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                data[doc.id] ? "bg-civic-green text-white" : "bg-white border border-gray-200 text-gray-500"
              )}
            >
              {uploading === doc.id ? <Loader2 className="w-4 h-4 animate-spin" /> : data[doc.id] ? <CheckCircle className="w-4 h-4" /> : 'Upload'}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!isComplete}
        className={cn(
          "w-full py-4 font-bold rounded-2xl flex items-center justify-center gap-2",
          isComplete ? "bg-civic-green text-white shadow-lg shadow-civic-green/20" : "bg-gray-100 text-gray-400"
        )}
      >
        Submit Digital Form <CheckCircle className="w-5 h-5" />
      </button>
    </div>
  );
};

export const DigitalForm = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-civic-navy/40 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden relative"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors z-10">
          <X className="w-6 h-6" />
        </button>

        <div className="p-12">
          <header className="mb-10">
            <h2 className="text-3xl font-display font-bold text-civic-navy mb-2">Smart Registration</h2>
            <div className="flex gap-2">
              {[1, 2].map(s => (
                <div key={s} className={cn("h-1.5 flex-1 rounded-full transition-all", s <= step ? "bg-civic-navy" : "bg-gray-100")} />
              ))}
            </div>
          </header>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <FormStep1 key="s1" data={formData} setData={setFormData} onNext={() => setStep(2)} />
            ) : (
              <FormStep2 key="s2" data={formData} setData={setFormData} onNext={onClose} />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
