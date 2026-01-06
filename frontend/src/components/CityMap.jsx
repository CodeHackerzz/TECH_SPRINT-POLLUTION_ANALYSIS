import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function getAQIColor(aqi) {
  if (aqi <= 100) return "#22c55e";
  if (aqi <= 200) return "#facc15";
  return "#ef4444";
}

function getPM25Color(val) {
  if (val <= 60) return "#22c55e";
  if (val <= 120) return "#facc15";
  return "#ef4444";
}

function getPM10Color(val) {
  if (val <= 100) return "#22c55e";
  if (val <= 150) return "#f97316";
  return "#dc2626";
}

function bar(label, value, max, color) {
  const width = Math.min(100, Math.round((value / max) * 100));
  return `
    <div style="margin-bottom:6px">
      <div style="font-size:12px">${label}: ${value}</div>
      <div style="background:#1e293b;border-radius:4px;height:8px">
        <div style="width:${width}%;background:${color};height:8px;border-radius:4px"></div>
      </div>
    </div>
  `;
}

export default function CityMap({ onWardSelect }) {
  useEffect(() => {
    const map = L.map("map", {
      center: [28.6139, 77.209],
      zoom: 10,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    fetch("/data/wards.geojson")
      .then((res) => res.json())
      .then((geojson) => {
        const layer = L.geoJSON(geojson, {
          style: (feature) => {
            const aqi = 80 + Math.floor(Math.random() * 180);
            const pm25 = 30 + Math.floor(Math.random() * 150);
            const pm10 = 50 + Math.floor(Math.random() * 200);

            feature.properties.aqi = aqi;
            feature.properties.pm25 = pm25;
            feature.properties.pm10 = pm10;

            return {
              fillColor: getAQIColor(aqi),
              fillOpacity: 0.65,
              weight: 1,
              color: "#020617",
            };
          },

          onEachFeature: (feature, layer) => {
            const { aqi, pm25, pm10 } = feature.properties;

            layer.bindTooltip(`AQI: ${aqi}`, { sticky: true });

            layer.bindPopup(`
              <div style="width:200px">
                <b>Pollution Snapshot</b><br/><br/>
                ${bar("AQI", aqi, 300, getAQIColor(aqi))}
                ${bar("PM2.5", pm25, 200, getPM25Color(pm25))}
                ${bar("PM10", pm10, 300, getPM10Color(pm10))}
              </div>
            `);

            
            layer.on("click", () => {
              onWardSelect({
                ward: feature.properties.ward || "Unknown Ward",
                aqi,
                pm25,
                pm10,
              });
            });
          },
        });

        layer.addTo(map);
      });

    return () => map.remove();
  }, [onWardSelect]);

  return <div id="map" className="h-full w-full" />;
}
