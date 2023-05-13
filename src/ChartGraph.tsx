import React from "react"
import Graph from "./Graph"
import Map from "./Map"
function ChartGraph() {
  return(
    <div>
      <h3 style={{color:"red", fontSize:"large"}}>Corona Cases Chart</h3>
     <Graph/>
     <h3 style={{color:"red", fontSize:"large"}}>Corona Cases World Map</h3>
     <Map/>
    </div>
    )

}

export default ChartGraph