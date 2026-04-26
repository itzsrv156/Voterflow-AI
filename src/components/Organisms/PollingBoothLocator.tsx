import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, ExternalLink, Globe, Search } from 'lucide-react';
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
    <div className="bg-white/40 backdrop-blur-xl rounded-[3.5rem] p-12 border border-white/50 shadow-sm space-y-8">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-civic-navy rounded-2xl flex items-center justify-center shadow-xl">
            <Globe className="text-civic-saffron w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold text-civic-navy">Sovereign Map Intelligence</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Live OpenStreetMap Federation // Bengaluru Central Sector</p>
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
        {/* Real Leaflet Map */}
        <div className="h-[450px] bg-gray-100 rounded-[2.5rem] relative overflow-hidden border border-gray-200 shadow-inner z-10">
            <MapContainer 
              center={mapCenter} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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

            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white shadow-xl z-[400]">
                <div className="flex items-center gap-3">
                    <Navigation className="w-4 h-4 text-civic-navy animate-pulse" />
                    <span className="text-[10px] font-black text-civic-navy uppercase tracking-widest">
                        {selectedBooth ? `Navigating to ${selectedBooth.name}` : 'Sovereign Map Intelligence Active'}
                    </span>
                </div>
            </div>
        </div>

        {/* Booth Details */}
        <div className="space-y-4">
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
      </div>
    </div>
  );
};
