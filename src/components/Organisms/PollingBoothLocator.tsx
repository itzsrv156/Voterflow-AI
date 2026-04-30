import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, ExternalLink, Globe, Search, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet marker icon issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const BENGALURU_CENTER: [number, number] = [12.9716, 77.5946];

interface Booth {
  id: number;
  name: string;
  distance: string;
  address: string;
  status: string;
  lat: number;
  lng: number;
  waitTime: string;
}

const booths: Booth[] = [
  { id: 1, name: 'BBMP Head Office (City Corp)', distance: '0.4 km', address: 'Hudson Circle, Bengaluru', status: 'Optimal', lat: 12.9698, lng: 77.5898, waitTime: '2 mins' },
  { id: 2, name: "St. Joseph's Indian High School", distance: '1.2 km', address: 'Vittal Mallya Rd, Bengaluru', status: 'Moderate', lat: 12.9650, lng: 77.5960, waitTime: '15 mins' },
  { id: 3, name: 'Visvesvaraya Museum Center', distance: '2.5 km', address: 'Kasturba Rd, Bengaluru', status: 'Low Wait', lat: 12.9810, lng: 77.5930, waitTime: '5 mins' },
];

// Helper to pan map
const RecenterMap = ({ coords }: { coords: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 15);
  }, [coords, map]);
  return null;
};

export const PollingBoothLocator = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(BENGALURU_CENTER);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSelectedBooth(booths[0]);
      setMapCenter([booths[0].lat, booths[0].lng]);
    }, 2000);
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-[3.5rem] p-6 lg:p-12 border border-white/50 shadow-sm space-y-8 h-full lg:h-auto overflow-hidden relative">
      <div className="flex justify-between items-start relative z-[500] lg:z-auto">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-civic-navy rounded-2xl flex items-center justify-center shadow-xl">
            <Globe className="text-civic-saffron w-6 h-6 lg:w-7 lg:h-7" />
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-display font-bold text-civic-navy">Sovereign Map Intelligence</h3>
            <p className="text-[8px] lg:text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Google Maps Satellite Engine // Bengaluru Central Sector</p>
          </div>
        </div>
        <button 
          onClick={handleSearch}
          className="hidden lg:flex px-6 py-3 bg-civic-navy text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg items-center gap-2 hover:scale-105 active:scale-95 transition-all"
        >
          {isSearching ? 'Syncing...' : <><Search className="w-4 h-4" /> Locate Near Me</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full lg:h-auto">
        {/* Real Leaflet Map - Full Screen on Mobile */}
        <div className="h-[500px] lg:h-[450px] bg-gray-100 rounded-[2.5rem] lg:rounded-[2.5rem] fixed inset-0 lg:relative z-0 lg:z-10 overflow-hidden border border-gray-200 shadow-inner">
            <MapContainer 
              center={mapCenter} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
              />
              <RecenterMap coords={mapCenter} />
              {booths.map(b => (
                <Marker 
                  key={b.id} 
                  position={[b.lat, b.lng]}
                  eventHandlers={{
                    click: () => {
                      setSelectedBooth(b);
                      setMapCenter([b.lat, b.lng]);
                    },
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <div className="font-bold text-civic-navy text-xs">{b.name}</div>
                      <div className="text-[10px] text-gray-500 mt-1">{b.address}</div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[9px] font-black uppercase text-civic-saffron">{b.status}</span>
                        <span className="text-[9px] font-bold">{b.waitTime} wait</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            <div className="absolute bottom-24 lg:bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white shadow-xl z-[400]">
                <div className="flex items-center gap-3">
                    <Navigation className="w-4 h-4 text-civic-navy animate-pulse" />
                    <span className="text-[9px] lg:text-[10px] font-black text-civic-navy uppercase tracking-widest">
                        {selectedBooth ? `Navigating to ${selectedBooth.name}` : 'Sovereign Map Intelligence Active'}
                    </span>
                </div>
            </div>
            
            {/* Mobile Locate FAB */}
            <button 
              onClick={handleSearch}
              className="lg:hidden absolute top-24 right-6 w-14 h-14 bg-civic-navy text-white rounded-2xl shadow-2xl flex items-center justify-center z-[500] active:scale-95 transition-all border border-white/20"
            >
              {isSearching ? <Loader2 className="w-6 h-6 animate-spin text-civic-saffron" /> : <Search className="w-6 h-6 text-civic-saffron" />}
            </button>
        </div>

        {/* Booth Details - Hidden on Mobile */}
        <div className="hidden lg:block space-y-4">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 px-2">Karnataka Polling Stations</h4>
            <div className="space-y-3 h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {booths.map(b => (
                    <button 
                        key={b.id}
                        onClick={() => {
                          setSelectedBooth(b);
                          setMapCenter([b.lat, b.lng]);
                        }}
                        className={cn(
                            "w-full p-6 rounded-[2rem] border text-left transition-all flex justify-between items-center group",
                            selectedBooth?.id === b.id ? "bg-civic-navy text-white border-civic-navy shadow-2xl" : "bg-white border-gray-100 text-gray-500 hover:border-civic-navy/30"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                selectedBooth?.id === b.id ? "bg-white/10" : "bg-gray-50 group-hover:bg-civic-navy/5"
                            )}>
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm font-bold">{b.name}</div>
                                <div className="text-[9px] font-medium opacity-60 mt-0.5">{b.address}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-black uppercase tracking-tighter">{b.distance}</div>
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
                    className="p-6 bg-civic-saffron/10 border border-civic-saffron/20 rounded-[2rem] flex items-center justify-between mt-4"
                >
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-civic-navy" />
                        <div>
                            <div className="text-[9px] font-black text-civic-navy uppercase tracking-widest">Booth Helpdesk</div>
                            <div className="text-xs font-bold text-civic-navy">+91 80 2221 0001</div>
                        </div>
                    </div>
                    <button className="px-5 py-2 bg-civic-navy text-white text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 hover:scale-105 transition-all">
                        Directions <ExternalLink className="w-3 h-3" />
                    </button>
                </motion.div>
            )}
        </div>

        {/* Mobile Bottom Sheet Drawer */}
        <motion.div 
          initial={{ y: "80%" }}
          animate={{ y: selectedBooth ? "0%" : "80%" }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-[1000] bg-white/90 backdrop-blur-2xl rounded-t-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.2)] border-t border-white p-6 pb-12 transition-all duration-500"
        >
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
               <h4 className="text-[10px] font-black text-civic-navy uppercase tracking-widest">Sovereign Booth Selection</h4>
               {selectedBooth && (
                 <button onClick={() => setSelectedBooth(null)} className="text-[10px] font-bold text-gray-400 uppercase">Clear</button>
               )}
            </div>
            
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
               {booths.map(b => (
                 <button
                   key={b.id}
                   onClick={() => {
                     setSelectedBooth(b);
                     setMapCenter([b.lat, b.lng]);
                   }}
                   className={cn(
                     "min-w-[280px] p-6 rounded-[2.5rem] border transition-all text-left flex justify-between items-center",
                     selectedBooth?.id === b.id ? "bg-civic-navy text-white shadow-2xl border-civic-navy" : "bg-white border-gray-100 text-gray-500"
                   )}
                 >
                   <div className="flex items-center gap-4">
                     <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", selectedBooth?.id === b.id ? "bg-white/10" : "bg-gray-50")}>
                       <MapPin className="w-5 h-5" />
                     </div>
                     <div>
                       <div className="text-sm font-bold truncate max-w-[150px]">{b.name}</div>
                       <div className="text-[9px] opacity-60 mt-0.5">{b.distance} away</div>
                     </div>
                   </div>
                   <div className={cn("w-2 h-2 rounded-full", b.status === 'Optimal' ? "bg-civic-green" : "bg-civic-saffron")} />
                 </button>
               ))}
            </div>

            {selectedBooth && (
               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                 <div className="p-6 bg-civic-navy/5 rounded-[2rem] border border-civic-navy/10">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <div className="text-lg font-bold text-civic-navy">{selectedBooth.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{selectedBooth.address}</div>
                       </div>
                       <div className="text-right">
                          <div className="text-xs font-bold text-civic-navy">{selectedBooth.waitTime}</div>
                          <div className="text-[8px] font-black text-gray-400 uppercase">Wait Time</div>
                       </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                       <button className="flex-1 py-4 bg-civic-navy text-white text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                          Get Directions <ExternalLink className="w-4 h-4" />
                       </button>
                       <button className="w-14 h-14 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-civic-navy hover:bg-gray-50 transition-all">
                          <Phone className="w-6 h-6" />
                       </button>
                    </div>
                 </div>
               </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
