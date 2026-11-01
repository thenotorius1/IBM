"use client";

import { useEffect, useRef } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { RestaurantWithDistance } from "@/types/restaurant";
import { formatPrice } from "@/lib/constants";
import { formatDistance } from "@/lib/haversine";

interface MapViewProps {
  restaurants: RestaurantWithDistance[];
  selectedId?: number | null;
  userLat?: number | null;
  userLng?: number | null;
  onMarkerClick?: (id: number) => void;
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function MapView({
  restaurants,
  selectedId,
  userLat,
  userLng,
  onMarkerClick,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<number, google.maps.Marker>>(new Map());
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const initializedRef = useRef(false);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || initializedRef.current) return;
    initializedRef.current = true;

    const initMap = async () => {
      setOptions({ key: GOOGLE_MAPS_API_KEY, v: "weekly" });

      try {
        const { Map, InfoWindow } = (await importLibrary("maps")) as google.maps.MapsLibrary;

        const center =
          userLat && userLng
            ? { lat: userLat, lng: userLng }
            : { lat: -6.2088, lng: 106.8456 };

        mapInstanceRef.current = new Map(mapRef.current!, {
          center,
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        infoWindowRef.current = new InfoWindow();
      } catch (err) {
        console.error("Google Maps failed to load:", err);
      }
    };

    initMap();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update markers when restaurants change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current.clear();

    const addMarkers = async () => {
      const { Marker } = (await importLibrary("marker")) as google.maps.MarkerLibrary;

      restaurants.forEach((r) => {
        const marker = new Marker({
          position: { lat: r.latitude, lng: r.longitude },
          map: mapInstanceRef.current!,
          title: r.name,
          icon: {
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44">
                <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 26 18 26s18-12.5 18-26C36 8.06 27.94 0 18 0z" fill="#F97316"/>
                <circle cx="18" cy="18" r="9" fill="white"/>
                <text x="18" y="22" text-anchor="middle" font-size="11" fill="#F97316">🍽</text>
              </svg>`),
            scaledSize: new google.maps.Size(36, 44),
            anchor: new google.maps.Point(18, 44),
          },
        });

        marker.addListener("click", () => {
          const content = `
            <div style="padding:8px;max-width:200px;font-family:sans-serif">
              <p style="font-weight:700;font-size:14px;color:#292524;margin:0 0 4px">${r.name}</p>
              <p style="font-size:12px;color:#78716C;margin:0 0 4px">${r.address.substring(0, 60)}...</p>
              <p style="font-size:13px;font-weight:600;color:#F97316;margin:0 0 2px">~${formatPrice(r.average_price)}</p>
              ${
                r.distance !== undefined
                  ? `<p style="font-size:12px;color:#78716C;margin:0">📍 ${formatDistance(r.distance)}</p>`
                  : ""
              }
              <a href="/restaurant/${r.id}" style="display:inline-block;margin-top:8px;padding:4px 10px;background:#F97316;color:white;border-radius:8px;text-decoration:none;font-size:12px;font-weight:600">Lihat Detail</a>
            </div>
          `;
          infoWindowRef.current?.setContent(content);
          infoWindowRef.current?.open(mapInstanceRef.current!, marker);
          onMarkerClick?.(r.id);
        });

        markersRef.current.set(r.id, marker);
      });

      // User location marker
      if (userLat && userLng) {
        new Marker({
          position: { lat: userLat, lng: userLng },
          map: mapInstanceRef.current!,
          title: "Lokasi Anda",
          icon: {
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#3b82f6" stroke="white" stroke-width="3"/>
                <circle cx="12" cy="12" r="4" fill="white"/>
              </svg>`),
            scaledSize: new google.maps.Size(24, 24),
            anchor: new google.maps.Point(12, 12),
          },
          zIndex: 999,
        });
      }
    };

    if (typeof google !== "undefined") {
      addMarkers();
    }
  }, [restaurants, userLat, userLng, onMarkerClick]);

  // Pan to selected marker
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedId) return;
    const marker = markersRef.current.get(selectedId);
    if (marker) {
      mapInstanceRef.current.panTo(marker.getPosition()!);
      mapInstanceRef.current.setZoom(15);
      google.maps.event.trigger(marker, "click");
    }
  }, [selectedId]);

  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "YOUR_API_KEY_HERE") {
    return (
      <div className="w-full h-full min-h-[400px] bg-[#FFF7ED] rounded-2xl border-2 border-dashed border-[#FED7AA] flex flex-col items-center justify-center p-8 text-center">
        <div className="text-5xl mb-4">🗺️</div>
        <h3 className="font-bold text-[#292524] mb-2">Google Maps API Key Diperlukan</h3>
        <p className="text-[#78716C] text-sm max-w-xs">
          Tambahkan{" "}
          <code className="bg-[#FED7AA] px-1.5 py-0.5 rounded text-xs font-mono">
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
          </code>{" "}
          di file{" "}
          <code className="bg-[#FED7AA] px-1.5 py-0.5 rounded text-xs font-mono">
            .env.local
          </code>{" "}
          untuk menampilkan peta interaktif.
        </p>
        <div className="mt-6 bg-white border border-[#FED7AA] rounded-xl p-4 text-left w-full max-w-xs">
          <p className="text-xs font-mono text-[#78716C]">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=</p>
          <p className="text-xs font-mono text-[#F97316]">&quot;your_api_key_here&quot;</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden border border-[#FED7AA]"
    />
  );
}
