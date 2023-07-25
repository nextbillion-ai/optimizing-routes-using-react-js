// different zoom 
const BREAKPOINT_ZOOM_1 = 11
const BREAKPOINT_ZOOM_2 = 6
const BREAKPOINT_ZOOM_3 = 3.1


// map layer 
export const MAP_LAYERS = [
  {
    id: "res-routes-outfit",
    type: "line",
    source: "res-routes",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      'line-color': ['get', 'color'],
      'line-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        BREAKPOINT_ZOOM_2-1, 0, 
        BREAKPOINT_ZOOM_2-0.1, 0, 
        BREAKPOINT_ZOOM_2, 2, 
        BREAKPOINT_ZOOM_1-0.1, 3, 
        BREAKPOINT_ZOOM_1, 8,
      ],
    },
    minzoom: BREAKPOINT_ZOOM_3
  },
  {
    id: "res-routes",
    type: "line",
    source: "res-routes",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#FFF",
      "line-width": 2,
    },
    minzoom: BREAKPOINT_ZOOM_1
  },
  {
    id: "res-step-bg",
    type: "circle",
    source: "res-routes-steps",
    paint: {
      'circle-color': ['get', 'color'],
      'circle-radius': [
        "interpolate", ["linear"], ["zoom"],
        BREAKPOINT_ZOOM_2, 6,
        BREAKPOINT_ZOOM_1 - 1, 3,
        BREAKPOINT_ZOOM_1 - 0.1, 5,
        BREAKPOINT_ZOOM_1, 10,

      ],
    },
    minzoom: BREAKPOINT_ZOOM_2,
  },
 

  {
    id: "res-step-number",
    type: "symbol",
    source: "res-routes-steps",
    layout: {
      'text-field': ['get', 'index'],
      'text-size': 10,
      'text-ignore-placement': true,
    },
    paint: {
      'text-color': '#FFFFFF',
    },
    minzoom: BREAKPOINT_ZOOM_1
  },
  {
    id: "res-step-bg-active",
    type: "circle",
    filter: false,
    source: "res-routes-steps",
    paint: {
      'circle-color': ['get', 'color'],
      'circle-radius': 14,
    },
    minzoom: BREAKPOINT_ZOOM_1
  },
  {
    id: "res-step-number-active",
    type: "symbol",
    filter: false,
    source: "res-routes-steps",
    layout: {
      'text-field': ['get', 'index'],
      'text-size': 14,
      'text-ignore-placement': true,
    },
    paint: {
      'text-color': '#FFFFFF',
    },
    minzoom: BREAKPOINT_ZOOM_1
  },
  {
    id: "unassigned-tasks",
    type: "symbol",
    source: "res-unassigned-tasks",
    layout: {
      'symbol-placement': 'point',
      'symbol-spacing': 1,
      'icon-allow-overlap': true,
      // 'icon-ignore-placement': true,
      'icon-image': 'unassigned_task',
      'icon-size': 0.5,
      'visibility': 'visible',
    },
    paint: {
    },
  },
  {
    'id': 'route-ani-point',
    'source': 'route-ani-point',
    'type': 'circle',
    paint: {
      'circle-color': '#8D5A9E',
      'circle-stroke-color': ['get', 'color'],
      'circle-radius': 8,
      'circle-stroke-width': 2,
    }
  },
  {
    id: "jobs",
    type: "symbol",
    source: "jobs",
    layout: {
      'symbol-placement': 'point',
      'symbol-spacing': 1,
      'icon-allow-overlap': true,
      // 'icon-ignore-placement': true,
      'icon-image': 'job',
      'icon-size': 0.5,
      'visibility': 'visible',
    },
    paint: {
    },
  },
  {
    id: "vehicles-destination",
    type: "symbol",
    source: "vehicles",
    filter: ['==', ['get', 'type'], 'vehicle-end'],
    layout: {
      'symbol-placement': 'point',
      'symbol-spacing': 1,
      'icon-allow-overlap': true,
      // 'icon-ignore-placement': true,
      'icon-image': 'vehicle_end',
      'icon-size': 0.5,
      'visibility': 'visible',
    },
    paint: {
    },
  },
  {
    id: "vehicles-start",
    type: "symbol",
    source: "vehicles",
    filter: ['==', ['get', 'type'], 'vehicle-start'],
    layout: {
      'symbol-placement': 'point',
      'symbol-spacing': 1,
      'icon-allow-overlap': true,
      // 'icon-ignore-placement': true,
      'icon-image': 'vehicle_start',
      'icon-size': 0.5,
      'visibility': 'visible',
    },
    paint: {
    },
  },
  {
    id: "shipments-pickup",
    type: "symbol",
    source: "shipments",
    filter: ['==', ['get', 'type'], 'shipment-pickup'],
    layout: {
      'symbol-placement': 'point',
      'symbol-spacing': 1,
      'icon-allow-overlap': true,
      // 'icon-ignore-placement': true,
      'icon-image': 'shipment_pickup',
      'icon-size': 0.5,
      'visibility': 'visible',
    },
    paint: {
    },
  },
  {
    id: "shipments-delivery",
    type: "symbol",
    source: "shipments",
    filter: ['==', ['get', 'type'], 'shipment-delivery'],
    layout: {
      'symbol-placement': 'point',
      'symbol-spacing': 1,
      'icon-allow-overlap': true,
      // 'icon-ignore-placement': true,
      'icon-image': 'shipment_delivery',
      'icon-size': 0.5,
      'visibility': 'visible',
    },
    paint: {
    },
  },

  
]

//  map sources
export const SOURCE_TYPES = ['res-routes', 'res-routes-steps', 'jobs', 'vehicles', 'shipments', 'res-unassigned-tasks', 'route-ani-point']

export const DEFAULT_SOURCES_CONFIG = SOURCE_TYPES.map(key => {
  return {
    name: key,
    data: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    },
  }
})

