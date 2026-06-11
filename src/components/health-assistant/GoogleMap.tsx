import React, { useEffect, useRef, useState } from "react";
import { Hospital } from "@/types/hospital";
import { getUserLocation, findNearbyHospitals } from "@/utils/google-maps/mapUtils";
import MapLoading from "@/components/health-assistant/map/MapLoading";
import MapError from "@/components/health-assistant/map/MapError";

interface GoogleMapProps {
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
  onHospitalsFound?: (hospitals: Hospital[]) => void;
}

// Load Leaflet CSS from CDN
const loadLeafletCSS = () => {
  if (!document.querySelector('link[href*="leaflet"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);
  }
};

// Load Leaflet JS from CDN
const loadLeafletJS = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if ((window as any).L) {
      resolve((window as any).L);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.onload = () => resolve((window as any).L);
    script.onerror = () => reject(new Error('Failed to load Leaflet'));
    document.head.appendChild(script);
  });
};

const LeafletMap = ({ hospitals, selectedHospital, onHospitalsFound }: GoogleMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      try {
        loadLeafletCSS();
        const L = await loadLeafletJS();
        
        if (!isMounted || !mapContainerRef.current) return;

        const userLocation = await getUserLocation();

        if (onHospitalsFound) {
          const nearbyHospitals = findNearbyHospitals(userLocation);
          onHospitalsFound(nearbyHospitals);
        }

        if (mapRef.current) {
          mapRef.current.remove();
        }

        const map = L.map(mapContainerRef.current).setView(
          [userLocation.lat, userLocation.lng],
          12
        );

        // OpenStreetMap tiles - free, no API key needed
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // User location marker
        const userIcon = L.divIcon({
          html: '<div style="background: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(59,130,246,0.5);"></div>',
          className: 'user-marker',
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });
        L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
          .addTo(map)
          .bindPopup('<strong>📍 Your Location</strong>')
          .openPopup();

        mapRef.current = map;
        setIsLoading(false);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load map');
          setIsLoading(false);
        }
      }
    };

    const timer = setTimeout(initMap, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers when hospitals change
  useEffect(() => {
    if (!mapRef.current || !(window as any).L) return;
    const L = (window as any).L;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Hospital icon
    const hospitalIcon = L.divIcon({
      html: '<div style="background: #06b6d4; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #0891b2; box-shadow: 0 0 8px rgba(6,182,212,0.4);"></div>',
      className: 'hospital-marker',
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });

    hospitals.forEach(hospital => {
      const marker = L.marker([hospital.lat, hospital.lng], { icon: hospitalIcon })
        .addTo(mapRef.current)
        .bindPopup(`<div style="min-width: 200px;"><strong>🏥 ${hospital.name}</strong><br/><span style="color: #666;">${hospital.address}</span></div>`);
      markersRef.current.push(marker);
    });

    // Fit bounds if hospitals exist
    if (hospitals.length > 0) {
      const bounds = L.latLngBounds(hospitals.map(h => [h.lat, h.lng]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    }
  }, [hospitals]);

  // Pan to selected hospital
  useEffect(() => {
    if (!mapRef.current || !selectedHospital || !(window as any).L) return;

    mapRef.current.setView([selectedHospital.lat, selectedHospital.lng], 15, {
      animate: true,
    });

    // Open popup of the selected hospital
    markersRef.current.forEach(marker => {
      const pos = marker.getLatLng();
      if (
        Math.abs(pos.lat - selectedHospital.lat) < 0.0001 &&
        Math.abs(pos.lng - selectedHospital.lng) < 0.0001
      ) {
        marker.openPopup();
      }
    });
  }, [selectedHospital]);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    window.location.reload();
  };

  return (
    <div className="relative">
      {isLoading && <MapLoading />}
      {error && <MapError errorMessage={error} onRetry={handleRetry} />}
      <div
        ref={mapContainerRef}
        className="h-[400px] w-full rounded-b-lg bg-gray-800"
        style={{ minHeight: '400px', zIndex: 0 }}
      />
      {!error && !isLoading && hospitals.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-b-lg">
          <p className="text-gray-400">Finding nearby hospitals...</p>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
