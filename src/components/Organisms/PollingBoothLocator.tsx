import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, ExternalLink, Globe, Search } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

export const PollingBoothLocator = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState<any>(null);

  const booths = [
    { id: 1, name: 'St. Josephs High School', distance: '0.8 km', address: 'Museum Rd, Shanthala Nagar', status: 'Optimal' },
    { id: 2, name: 'BBMP Community Hall', distance: '1.4 km', address: 'Richmond Rd, Langford Town', status: 'Moderate' },
    { id: 3, name: 'Government Primary School', distance: '2.1 km', address: 'Austin Town, Neelasandra', status: 'Low Wait' },
  ];

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSelectedBooth(booths[0]);
    }, 1500);
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-[3.5rem] p-12 border border-white/50 shadow-sm space-y-8">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-civic-navy rounded-2xl flex items-center justify-center shadow-xl">
            <Globe className="text-civic-saffron w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold text-civic-navy">Polling Booth Locator</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Simulated Google Maps API v3</p>
          </div>
        </div>
        <button 
          onClick={handleSearch}
          className="px-6 py-3 bg-civic-navy text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
        >
          {isSearching ? 'Syncing...' : <><Search className="w-4 h-4" /> Locate Near Me</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map Placeholder - The "Google" Aesthetic */}
        <div className="h-[300px] bg-gray-100 rounded-[2.5rem] relative overflow-hidden border border-gray-200 group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center grayscale opacity-40 group-hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
            
            {/* Map Markers */}
            {booths.map((b, i) => (
                <motion.div 
                    key={b.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.2 }}
                    style={{ top: `${20 + i * 20}%`, left: `${30 + i * 15}%` }}
                    className="absolute"
                >
                    <div className="relative cursor-pointer group/pin" onClick={() => setSelectedBooth(b)}>
                        <MapPin className={cn(
                            "w-10 h-10 transition-colors",
                            selectedBooth?.id === b.id ? "text-civic-navy" : "text-gray-400 group-hover/pin:text-civic-navy"
                        )} />
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-bold text-civic-navy border border-gray-100">
                            {b.name}
                        </div>
                    </div>
                </motion.div>
            ))}

            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white shadow-xl">
                <div className="flex items-center gap-3">
                    <Navigation className="w-4 h-4 text-civic-navy animate-pulse" />
                    <span className="text-[10px] font-black text-civic-navy uppercase tracking-widest">G-Maps Live Intelligence Active</span>
                </div>
            </div>
        </div>

        {/* Booth Details */}
        <div className="space-y-4">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Nearby Stations</h4>
            <div className="space-y-3">
                {booths.map(b => (
                    <button 
                        key={b.id}
                        onClick={() => setSelectedBooth(b)}
                        className={cn(
                            "w-full p-6 rounded-[2rem] border text-left transition-all flex justify-between items-center",
                            selectedBooth?.id === b.id ? "bg-civic-navy text-white border-civic-navy shadow-2xl" : "bg-white border-gray-100 text-gray-500 hover:border-civic-navy"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                selectedBooth?.id === b.id ? "bg-white/10" : "bg-gray-50"
                            )}>
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm font-bold">{b.name}</div>
                                <div className="text-[9px] font-medium opacity-60 mt-0.5">{b.address}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-black uppercase">{b.distance}</div>
                            <div className={cn(
                                "text-[8px] font-black uppercase mt-1",
                                b.status === 'Optimal' ? "text-civic-green" : "text-civic-saffron"
                            )}>{b.status}</div>
                        </div>
                    </button>
                ))}
            </div>

            {selectedBooth && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-civic-saffron/10 border border-civic-saffron/20 rounded-[2rem] flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-civic-navy" />
                        <div>
                            <div className="text-[9px] font-black text-civic-navy uppercase tracking-widest">Booth Helpdesk</div>
                            <div className="text-xs font-bold text-civic-navy">+91 80 2221 0001</div>
                        </div>
                    </div>
                    <button className="px-5 py-2 bg-civic-navy text-white text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2">
                        Directions <ExternalLink className="w-3 h-3" />
                    </button>
                </motion.div>
            )}
        </div>
      </div>
    </div>
  );
};
