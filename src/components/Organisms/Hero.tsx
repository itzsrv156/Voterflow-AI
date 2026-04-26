import { motion } from 'framer-motion';
import { useVoterStore, type Persona } from '../../store/useVoterStore';
import { useTranslation } from '../../LanguageContext';
import { cn } from '../../lib/utils';
import { GraduationCap, User, Users, ShieldCheck } from 'lucide-react';

const personaData: { 
  type: Persona; 
  titleKey: string; 
  descKey: string; 
  icon: any; 
  color: string;
  badge?: string;
}[] = [
  {
    type: 'FirstTime',
    titleKey: 'First-Time Voter',
    descKey: 'persona_first_desc',
    icon: User,
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    type: 'Student',
    titleKey: 'Student / Migrant',
    descKey: 'persona_student_desc',
    icon: GraduationCap,
    color: 'from-purple-500/20 to-purple-600/20',
    badge: 'Form 6 Specialist',
  },
  {
    type: 'Senior',
    titleKey: 'Senior Citizen',
    descKey: 'persona_senior_desc',
    icon: Users,
    color: 'from-orange-500/20 to-orange-600/20',
  },
];

// Add translations for these specific keys
export const Hero = () => {
  const { setPersona } = useVoterStore();
  const { t } = useTranslation();

  return (
    <>
      <motion.section 
      exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)', transition: { duration: 0.8, ease: "circIn" } }}
      className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-civic-saffron/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-civic-navy/20 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-civic-navy mb-8 tracking-tight">
            {t('select_persona').split('Voter')[0]} 
            <span className="bg-gradient-to-r from-civic-saffron to-civic-navy bg-clip-text text-transparent">
               {t('select_persona').includes('Voter') ? 'Voter Persona' : 'Persona'}
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-medium">
            {t('persona_desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {personaData.map((data, index) => {
            const Icon = data.icon;

            return (
              <motion.div
                key={data.type}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPersona(data.type)}
                className={cn(
                  "relative group cursor-pointer p-8 rounded-[3rem] transition-all duration-500",
                  "bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl overflow-hidden",
                  "hover:bg-white/60 hover:shadow-3xl hover:shadow-civic-navy/20"
                )}
              >
                {/* Badge */}
                {data.badge && (
                  <div className="absolute top-6 right-6 px-3 py-1 bg-civic-saffron text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-civic-saffron/30 z-20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    {data.badge}
                  </div>
                )}

                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  data.color
                )} />

                <div className="relative z-10 text-left">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 bg-gray-100 text-gray-600 group-hover:bg-civic-navy group-hover:text-white shadow-sm"
                  )}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-civic-navy mb-4">
                    {t(`persona_${data.type.toLowerCase()}`)}
                  </h3>
                  <p className="text-gray-500 font-medium leading-relaxed text-sm">
                    {t(`persona_${data.type.toLowerCase()}_desc`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
    
    {/* Privacy Note */}
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none">
      <p className="text-[7px] font-black text-gray-400 uppercase tracking-[0.3em]">
        Demo Environment // 2026.ECI.Compliance // No data persistence active
      </p>
    </div>
  </>
  );
};
