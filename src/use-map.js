import { useCallback, useEffect, useState } from "react";
import "@nbai/nbmap-gl/dist/nextbillion.css";
import nextbillion, { NBMap, utils } from "@nbai/nbmap-gl";
import { DEFAULT_SOURCES_CONFIG, MAP_LAYERS } from "./map-config";
import { getLocations } from "./utils";

// add source on map load

const initSource = (nbMap) => {
  DEFAULT_SOURCES_CONFIG.forEach((config) => {
    nbMap?.map.addSource(config.name, config.data);
  });
};


// add layers on map load
const initLayers = (nbmap) => {
  MAP_LAYERS.forEach((layerConfig) => {
    nbmap?.map.addLayer(layerConfig);
  });
};


// create map object for map view
export const useMap = ({ element, apiKey }) => {
  const [nbMap, setNBMap] = useState(null);

  useEffect(() => {
    if (!element?.current || !apiKey) return;
    nextbillion.setApiKey(apiKey);
    const mapObj = new NBMap({
      container: element.current,
      zoom: 12,
      style: "https://api.nextbillion.io/maps/streets/style.json",
      center: { lat: 34.08572, lng: -118.324569 },
    });
    mapObj.on("load", () => {
      setNBMap(mapObj);
      initSource(mapObj);
      initLayers(mapObj);
    });
  }, [element.current, apiKey]);
  return { nbMap };
};


// inserts empty geojson feature for the map layers 
export function useInputSources(data) {
  const [sources, setSources] = useState([]);
  const [error, setError] = useState(null);

  const updateSources = useCallback(() => {
    if (!data) {
      return;
    }
    const rawData = data;
    const locations = getLocations(rawData.locations?.location) || undefined;
    const vehicles = rawData.vehicles;
    const shipments = rawData.shipments;
    const vehicleSourceData = {
      type: "FeatureCollection",
      features: [],
    };
    const shipmentSourceData = {
      type: "FeatureCollection",
      features: [],
    };

    if (vehicles) {
      vehicleSourceData.features = vehicles.flatMap((vehicle) => {
        const start = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates:
              vehicle.startLocation || locations[vehicle.start_index],
          },
          properties: {
            id: vehicle.id,
            type: "vehicle-start",
            capacity: vehicle.capacity,
            breaks: vehicle.breaks,
            maxTasks: vehicle.max_tasks,
            skills: vehicle.skills,
            timeWindow: vehicle.time_window,
            description: vehicle.description,
          },
        };
        if (vehicle.endLocation || vehicle.end_index) {
          const end = Object.assign({}, start);
          end.properties = Object.assign({}, end.properties, {
            type: "vehicle-destination",
          });
          end.geometry.coordinates =
            vehicle.endLocation || locations[vehicle.end_index];
          return [start, end];
        }
        return [start];
      });
    }

    if (shipments) {
      shipmentSourceData.features = shipments.flatMap((shipment) => {
        const pickup = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates:
              shipment.startLocation ||
              locations[shipment.pickup.location_index],
          },
          properties: {
            type: "shipment-pickup",
            id: shipment.pickup.id,
            service: shipment.pickup.service,
            timeWindows: shipment.pickup.time_windows,
            priority: shipment.priority,
            skills: shipment.skills,
            amount: shipment.amount,
            shipment: shipment.description,
          },
        };
        const delivery = Object.assign({}, pickup);
        delivery.properties = Object.assign({}, pickup.properties, {
          type: "shipment-delivery",
        });
        delivery.geometry.coordinates =
          shipment.endLocation || locations[shipment.delivery.location_index];
        return [pickup, delivery];
      });
    }

    setSources([
      {
        name: "shipments",
        data: shipmentSourceData,
      },
      {
        name: "vehicles",
        data: vehicleSourceData,
      },
    ]);
  }, [data]);

  useEffect(() => {
    try {
      updateSources();
    } catch (e) {
      setError(e);
    }
  }, [data, updateSources]);
  return { sources, error };
}
// inserts  geojson into map layers 
export function useResultSources(resData) {
  const [resSources, setResSources] = useState([]);
  const [error, setError] = useState(null);

  const updateSources = useCallback(() => {
    if (!resData) {
      return;
    }
    const data = resData;
    const rawData = data;
    const sources = [];
    const features = [];
    const setpFeatures = [];
    if (!rawData?.routes) return;
    rawData?.routes &&
      rawData?.routes.forEach((route, index) => {
        // @ts-ignore

        const themeColor = index % 2 == 0 ? '#F08D0B' : "#7EC832";
        if (route.geometry) {
          const routeData = {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: utils.polyline
                .decode(route.geometry, 5)
                .map((c) => c.reverse()),
            },
            properties: {
              type: "res-route",
              color: themeColor,
              cost: route.cost,
              index,
              distance: route.distance,
              duration: route.duration,
              priority: route.priority,
              service: route.service,
              setup: route.setup,
              // @ts-ignore
              waitingTime: route.waiting_time,
              // @ts-ignore
              id: route.vehicle,
              stepsNum: route.steps?.length || 0,
              description: route.description ? route.description : null,
            },
          };
          features.push(routeData);
        }

        route.steps?.forEach((step, si) => {
          if (!step.location) {
            return;
          }
          setpFeatures.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: step.location?.concat().reverse(),
            },
            properties: {
              type: "res-step",
              stepType: step.type,
              color: themeColor,
              index: si,
              setup: step.setup,
              service: step.service,
              waitingTime: step.waiting_time,
              arrival: step.arrival,
              duration: step.duration,
              // @ts-ignore
              id: step.id || "N/A",
              // @ts-ignore
              description: step.description ? step.description : null,
              vehicle: route.vehicle,
              // @ts-ignore
              timewindows: step.timewindows,
            },
          });
        });
      });
    const routesData = {
      name: "res-routes",
      data: {
        type: "FeatureCollection",
        features: features || [],
      },
    };
    const routeStepsData = {
      name: "res-routes-steps",
      data: {
        type: "FeatureCollection",
        features: setpFeatures || [],
      },
    };

    sources.push(routesData);
    sources.push(routeStepsData);

    const unassginedFeatures = rawData.unassigned?.map(
      (unassignedItem, index) => {
        const unassignedData = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: unassignedItem.location?.concat().reverse(),
          },
          properties: {
            index,
            id: unassignedItem.id,
            description: unassignedItem.description
              ? unassignedItem.description
              : null,
          },
        };
        return unassignedData;
      }
    );

    const unassignedsData = {
      name: "res-unassigned-tasks",
      data: {
        type: "FeatureCollection",
        features: unassginedFeatures || [],
      },
    };

    sources.push(unassignedsData);

    setResSources(sources);
  }, [resData]);

  useEffect(() => {
    try {
      updateSources();
    } catch (e) {
      console.error("generate features error:", e);
      setError(e);
    }
  }, [resData, updateSources]);

  return { sources: resSources, error };
}
