import nextbillion from "@nbai/nbmap-gl";


// convert location string to [lng,lat] array
export function getLocations(locationString) {
    if (!locationString) {
      return [];
    }
  
    if (typeof locationString === "string") {
      return locationString.split("|").map((location) => {
        const [lat, lng] = location.split(",");
  
        return [parseFloat(lng), parseFloat(lat)];
      });
    } else {
      return locationString.map((location) => {
        const [lat, lng] = location.split(",");
        return [parseFloat(lng), parseFloat(lat)];
      });
    }
  }


//   this function bring the source co-ordinates into view
  export function getBounds(sources) {
    const bounds = new nextbillion.maps.LngLatBounds()
    sources.forEach((source) => {
      if (source.data && source.data.type === 'FeatureCollection') {
        source.data.features.forEach((feature) => {
          feature.geometry.coordinates.forEach((coordinate) => {
            bounds.extend(coordinate)
          })
        })
      }
    })
    return bounds
  }