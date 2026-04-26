import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoterStore } from '../../store/useVoterStore';
import { 
  X, CheckCircle, ChevronRight, Upload, Loader2, 
  User, Home, FileText, ShieldCheck, 
  Maximize, ClipboardCheck, AlertCircle, Download
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface FormData {
  name?: string;
  dob?: string;
  residencyType?: 'Day Scholar' | 'Hostel Resident';
  hostelName?: string;
  wardenName?: string;
  permanentAddress?: string;
  wantsPostalBallot?: boolean;
  photo?: boolean;
  addressProof?: boolean;
  idProof?: boolean;
  [key: string]: any;
}

interface FormStepProps {
  onNext: () => void;
  data: FormData;
  setData: (d: FormData) => void;
}

const StudentBranch = ({ data, setData }: { data: FormData, setData: (d: FormData) => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Residency Type</label>
        <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
          {(['Day Scholar', 'Hostel Resident'] as const).map(type => (
            <button
              key={type}
              onClick={() => setData({ ...data, residencyType: type })}
              className={cn(
                "flex-1 py-3 rounded-xl font-bold text-xs transition-all",
                data.residencyType === type ? "bg-white text-civic-navy shadow-sm" : "text-gray-400 hover:text-gray-600"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      {data.residencyType === 'Hostel Resident' ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Hostel Name</label>
              <input 
                className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-civic-navy outline-none"
                placeholder="e.g. Ganga Hostel"
                value={data.hostelName || ''}
                onChange={e => setData({ ...data, hostelName: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Warden Name</label>
              <input 
                className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-civic-navy outline-none"
                placeholder="Dr. Sharma"
                value={data.wardenName || ''}
                onChange={e => setData({ ...data, wardenName: e.target.value })}
              />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Permanent Address (Native)</label>
          <textarea 
            className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-civic-navy outline-none min-h-[100px]"
            placeholder="Enter your permanent native address as per Aadhaar..."
            value={data.permanentAddress || ''}
            onChange={e => setData({ ...data, permanentAddress: e.target.value })}
          />
          <div className="flex items-center gap-2 text-[9px] text-gray-400 font-bold uppercase tracking-tight">
            <ShieldCheck className="w-3 h-3" /> Privacy: Permanent address used for constituency mapping only.
          </div>
        </motion.div>
      )}

      {data.residencyType === 'Hostel Resident' && (
          <div className="p-8 bg-civic-navy/5 rounded-[2.5rem] border border-civic-navy/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <FileText className="w-24 h-24" />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <ClipboardCheck className="w-5 h-5 text-civic-navy" />
              <h4 className="text-[10px] font-bold text-civic-navy uppercase tracking-widest">Annexure-II Live Preview</h4>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-2xl text-[10px] font-serif text-gray-600 leading-relaxed max-w-sm mx-auto transform group-hover:scale-[1.02] transition-transform">
              <div className="text-center font-bold text-civic-navy mb-4 border-b border-gray-100 pb-4 uppercase tracking-tighter text-xs">Student Declaration (Annexure-II)</div>
              I, <strong>{data.name || '___________'}</strong>, s/o, d/o ________________, studying at <strong>{data.hostelName || '___________'}</strong>, 
              declare that I am an ordinary resident of this hostel. <br/><br/>
              Warden: <strong>{data.wardenName || '___________'}</strong> <br/>
              Date: {new Date().toLocaleDateString()}
            </div>
          </div>
      )}
    </div>
  );
};

const FormStep1 = ({ onNext, data, setData }: FormStepProps) => {
  const { persona } = useVoterStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.name || data.name.length < 3) newErrors.name = "Full name is required (min 3 chars)";
    if (!data.dob) newErrors.dob = "Date of birth is mandatory";
    if (persona === 'Student' && data.residencyType === 'Hostel Resident' && !data.hostelName) newErrors.hostel = "Hostel name is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Legal Name</label>
            {errors.name && <span className="text-[9px] text-red-500 font-bold uppercase">{errors.name}</span>}
        </div>
        <input 
          type="text" 
          placeholder="As per Aadhaar"
          className={cn(
            "p-5 bg-gray-50 border rounded-2xl text-lg font-bold text-civic-navy focus:ring-2 focus:ring-civic-navy outline-none transition-all",
            errors.name ? "border-red-200 bg-red-50" : "border-gray-100"
          )}
          value={data.name || ''}
          onChange={e => setData({ ...data, name: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date of Birth</label>
            {errors.dob && <span className="text-[9px] text-red-500 font-bold uppercase">{errors.dob}</span>}
        </div>
        <input 
          type="date" 
          className={cn(
            "p-5 bg-gray-50 border rounded-2xl font-bold text-civic-navy transition-all",
            errors.dob ? "border-red-200 bg-red-50" : "border-gray-100"
          )}
          value={data.dob || ''}
          onChange={e => setData({ ...data, dob: e.target.value })}
        />
      </div>
      
      {persona === 'Student' && <StudentBranch data={data} setData={setData} />}
      
      {persona === 'Senior' && (
        <div className="p-8 bg-orange-50 border border-orange-100 rounded-[2.5rem] space-y-6">
          <div className="flex items-start gap-4">
             <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center shrink-0">
                <Home className="w-6 h-6 text-orange-600" />
             </div>
             <div>
                <h4 className="font-bold text-orange-900 text-base">Form 12D: Home Voting Assistant</h4>
                <p className="text-[10px] text-orange-700/70 mt-1 uppercase tracking-widest font-bold">ECI Priority Access 2026</p>
             </div>
          </div>
          <div className="space-y-3">
              <label className="flex items-center gap-4 cursor-pointer p-5 bg-white/60 rounded-2xl border border-orange-200 hover:bg-white transition-all group">
                <input 
                  type="checkbox" 
                  checked={data.wantsPostalBallot || false}
                  onChange={e => setData({ ...data, wantsPostalBallot: e.target.checked })}
                  className="w-6 h-6 accent-orange-500 rounded-lg"
                />
                <span className="text-sm font-bold text-orange-900 group-hover:translate-x-1 transition-transform">I request Home Voting due to age (85+)</span>
              </label>
              <div className="flex items-start gap-3 p-4 bg-orange-100/50 rounded-xl">
                 <AlertCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                 <p className="text-[10px] text-orange-800 leading-relaxed font-medium">
                    A BLO team will visit your home for biometric authentication and manual form signing within 7 days of submission.
                 </p>
              </div>
          </div>
        </div>
      )}

      <button
        onClick={() => validate() && onNext()}
        className={cn(
          "w-full py-6 font-bold rounded-[2.5rem] flex items-center justify-center gap-3 transition-all",
          (data.name && data.dob) ? "bg-civic-navy text-white shadow-2xl shadow-civic-navy/30 hover:scale-[1.02]" : "bg-gray-100 text-gray-400"
        )}
      >
        Continue to Secure Upload <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const FormStep2 = ({ onNext, data, setData }: FormStepProps) => {
  const { persona } = useVoterStore();
  const [scanning, setScanning] = useState<string | null>(null);
  const [files, setFiles] = useState<Record<string, File>>({});
  
  const handleFileUpload = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScanning(type);
    
    // Simulate AI Neural Scan
    setTimeout(() => {
      setFiles(prev => ({ ...prev, [type]: file }));
      
      const updates: Partial<FormData> = { [type as keyof FormData]: true };
      
      // SMART OCR SIMULATION: Pre-fill data if it's an ID proof
      if (type === 'idProof') {
          updates.name = "SARVESH ARUNKUMAR";
          updates.dob = "2006-05-24";
          // If the user was a student persona, we can even guess their hostel
          if (persona === 'Student') {
              updates.hostelName = "Ganga Residency";
              updates.wardenName = "Dr. M. S. Kumar";
          }
      }
      
      setData({ ...data, ...updates });
      setScanning(null);
    }, 2500);
  };

  const isComplete = data.photo && data.addressProof && data.idProof;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4">
        {[
          { id: 'photo', label: 'Passport Size Photo', icon: User, desc: 'Clear face, white background' },
          { id: 'addressProof', label: 'Address Proof', icon: Home, desc: 'Aadhaar, Passport, or Utility Bill' },
          { id: 'idProof', label: 'Identity Proof', icon: ShieldCheck, desc: 'Aadhaar Card or PAN Card' },
        ].map(doc => (
          <div key={doc.id} className="group relative">
            <div className={cn(
                "flex items-center justify-between p-6 bg-gray-50 rounded-[2.5rem] border transition-all overflow-hidden",
                scanning === doc.id ? "border-civic-navy ring-4 ring-civic-navy/5" : "border-gray-100 hover:border-gray-200"
            )}>
              {scanning === doc.id && (
                  <motion.div 
                    initial={{ y: -100 }}
                    animate={{ y: 200 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-b from-civic-navy/0 via-civic-navy/20 to-civic-navy/0 h-24 w-full z-0"
                  />
              )}

              <div className="flex items-center gap-5 relative z-10">
                <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm",
                    data[doc.id] ? "bg-civic-green text-white" : "bg-white text-gray-400"
                )}>
                  {data[doc.id] ? <CheckCircle className="w-7 h-7" /> : <doc.icon className="w-7 h-7" />}
                </div>
                <div>
                  <span className="text-sm font-bold text-civic-navy block mb-0.5">{doc.label}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{doc.desc}</span>
                  {files[doc.id] && (
                    <span className="text-[9px] text-civic-navy/60 font-bold truncate max-w-[150px] block mt-1">
                        {files[doc.id].name} ({(files[doc.id].size / 1024).toFixed(1)} KB)
                    </span>
                  )}
                </div>
              </div>

              <div className="relative z-10">
                <input 
                  type="file" 
                  id={`upload-${doc.id}`}
                  className="hidden"
                  onChange={(e) => handleFileUpload(doc.id, e)}
                  accept="image/*,.pdf"
                />
                <label
                  htmlFor={`upload-${doc.id}`}
                  className={cn(
                    "px-6 py-4 rounded-xl text-[10px] font-black cursor-pointer flex items-center gap-2 transition-all uppercase tracking-widest",
                    scanning === doc.id ? "bg-civic-navy text-white" : 
                    data[doc.id] ? "bg-civic-green/10 text-civic-green" : "bg-white border border-gray-200 text-gray-500 hover:bg-civic-navy hover:text-white hover:border-civic-navy"
                  )}
                >
                  {scanning === doc.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        AI Verifying...
                      </>
                  ) : data[doc.id] ? 'Verified' : (
                      <>
                        <Upload className="w-4 h-4" />
                        Scan
                      </>
                  )}
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <button
          onClick={onNext}
          disabled={!isComplete}
          className={cn(
            "w-full py-7 font-black rounded-[2.5rem] flex items-center justify-center gap-3 transition-all uppercase tracking-[0.2em] text-sm",
            isComplete 
                ? "bg-civic-green text-white shadow-2xl shadow-civic-green/30 hover:scale-[1.02] active:scale-95" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
        >
          {isComplete ? 'Submit Sovereign Application' : 'Awaiting Field Completion'}
          {isComplete && <ShieldCheck className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export const DigitalFormEngine = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({ residencyType: 'Day Scholar' });
  const [isFinished, setIsFinished] = useState(false);
  const { updateProgress } = useVoterStore();

  const handleFinish = () => {
    updateProgress('registration', 100);
    setIsFinished(true);
  };

  if (isFinished) {
    return (
        <div className="fixed inset-0 z-[3200] flex items-center justify-center p-6 bg-civic-navy/40 backdrop-blur-2xl">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white w-full max-w-2xl rounded-[4rem] p-16 text-center shadow-[0_50px_150px_rgba(0,0,0,0.4)] border border-white/20 relative"
            >
                <div className="w-24 h-24 bg-civic-green rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-civic-green/20">
                    <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl font-display font-bold text-civic-navy mb-4">Application Synchronized!</h2>
                <p className="text-gray-500 font-medium mb-12 max-w-sm mx-auto">
                    Your sovereign data has been pre-verified against ECI standards. You can now download your digital draft to expedite the official filing.
                </p>
                
                <div className="space-y-4">
                    <button 
                        onClick={() => {
                            const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `VoterFlow_Draft_Form6_${formData.name?.replace(/\s+/g, '_') || 'Citizen'}.json`;
                            a.click();
                        }}
                        className="w-full py-6 bg-civic-navy text-white font-black rounded-3xl text-xs uppercase tracking-widest shadow-2xl shadow-civic-navy/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        <Download className="w-5 h-5" /> Download Draft Application (.JSON)
                    </button>
                    <button 
                        onClick={() => window.print()}
                        className="w-full py-6 bg-gray-100 text-civic-navy font-black rounded-3xl text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white border border-gray-100 transition-all"
                    >
                        <FileText className="w-5 h-5" /> Print Physical Draft
                    </button>
                    <button 
                        onClick={onClose}
                        className="mt-8 text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] hover:text-civic-navy transition-colors"
                    >
                        Return to Command Center
                    </button>
                </div>
            </motion.div>
        </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[3200] flex items-center justify-center p-6 bg-civic-navy/40 backdrop-blur-2xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        className="bg-white w-full max-w-2xl rounded-[4rem] shadow-[0_50px_150px_rgba(0,0,0,0.4)] overflow-hidden relative border border-white/20"
      >
        <button 
            onClick={onClose} 
            className="absolute top-12 right-12 p-4 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-500 transition-all z-20 group"
        >
          <X className="w-7 h-7 group-hover:rotate-90 transition-transform" />
        </button>

        <div className="p-16">
          <header className="mb-14">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-civic-navy rounded-2xl flex items-center justify-center shadow-xl shadow-civic-navy/20">
                    <Maximize className="text-civic-saffron w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-3xl font-display font-bold text-civic-navy tracking-tight">Sovereign Filing Assistant</h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Election Commission Standard 2026</p>
                </div>
            </div>
            <div className="flex gap-4">
              {[1, 2].map(s => (
                <div key={s} className="flex-1">
                    <div className={cn("h-2 rounded-full transition-all duration-700", s <= step ? "bg-civic-navy" : "bg-gray-100")} />
                    <span className={cn("text-[9px] font-black uppercase mt-3 block tracking-widest transition-colors", s === step ? "text-civic-navy" : "text-gray-300")}>
                        Phase 0{s}: {s === 1 ? 'Logic Mapping' : 'Biometric/Docs'}
                    </span>
                </div>
              ))}
            </div>
          </header>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <FormStep1 data={formData} setData={setFormData} onNext={() => setStep(2)} />
              </motion.div>
            ) : (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <FormStep2 data={formData} setData={setFormData} onNext={handleFinish} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
