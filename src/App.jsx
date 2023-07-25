
import { useEffect, useRef, useState } from "react";

import config from "./config";

import { payload } from "./data";
import { useInputSources, useMap, useResultSources } from "./use-map";
import { createTask, getOptimizedSolution } from "./services";
import { getBounds } from "./utils";








function App() {
  // ref element for map container
  const mapRef = useRef()
  
  // stores the task/request id of route opt task 
  const [requestId, setRequestId] = useState(null);

  // store result of RO response
  const [result, setResult] = useState(null);


  const {nbMap} = useMap({element:mapRef,apiKey:config.apiKey});

  const {sources:inputSources} = useInputSources(payload);

  const {sources:resultSources} = useResultSources(result)


  // send request as soon the payload
  useEffect(() => {
    if (nbMap) {
      createTask(payload).then((res) => {
        const { data } = res;
        setRequestId(data.id);
      });
    }
  }, [nbMap]);

    // fetch route opt using the task/request id
    useEffect(()=>{
      if(requestId){
        getOptimizedSolution(requestId).then((data)=>{
          setResult(data.result)
        })
      }
  
    },[requestId])


    // add the response to the maps source and layer
  useEffect(()=>{
    if(!resultSources) return;
    for (const source of resultSources) {
      console.log("data");
      (nbMap.map.getSource(source.name)).setData(source.data)
    }
    const bounds = getBounds(resultSources)
    let fitOptions = {
      duration: 100,
      padding: { top: 50, bottom: 50, left: 300, right: 50 },
      zoom: 11.5,
    }
    if (bounds.isEmpty()) {
      return
    }
    nbMap.map.fitBounds([bounds.getNorthEast(), bounds.getSouthWest()], fitOptions)
  },[resultSources,nbMap])

  // add blank source according according to routes , points
  useEffect(()=>{
    if(!nbMap) return;
    for (const source of inputSources) {
        (nbMap.map.getSource(source.name))?.setData(source.data)
    }
   

  },[inputSources,nbMap])
  



  return (
    <>
    <div
      id="map"
      ref={mapRef}
      style={{
        width: "100%",
        height: "70vh",
        top: "0",
        left: "0",
      }}
    ></div>
    {result && (<div>
      <p>cost :{result?.summary?.cost}</p>
      <p>Routes :{result?.summary?.routes}</p>
      <p>Distance :{result?.summary?.distance}</p>
      <p>Duration :{result?.summary?.duration}</p>
    </div>)}
    </>
  );
}

export default App;
