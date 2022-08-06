// import js ego network data
import JSHOP1NODE from "./graphdata/JavaScript_egograph_hop1_nodes.json"
import JSHOP1EDGE from "./graphdata/JavaScript_egograph_hop1_edges.json"
import JSHOP2NODE from "./graphdata/JavaScript_egograph_hop2_nodes.json"
import JSHOP2EDGE from "./graphdata/JavaScript_egograph_hop2_edges.json"
import JSHOP3NODE from "./graphdata/JavaScript_egograph_hop3_nodes.json"
import JSHOP3EDGE from "./graphdata/JavaScript_egograph_hop3_edges.json"

//import html ego network data
import HTMLHOP1NODE from "./graphdata/HTML_egograph_hop1_nodes.json"
import HTMLHOP1EDGE from "./graphdata/HTML_egograph_hop1_edges.json"
import HTMLHOP2NODE from "./graphdata/HTML_egograph_hop2_nodes.json"
import HTMLHOP2EDGE from "./graphdata/HTML_egograph_hop2_edges.json"
import HTMLHOP3NODE from "./graphdata/HTML_egograph_hop3_nodes.json"
import HTMLHOP3EDGE from "./graphdata/HTML_egograph_hop3_edges.json"

//import css ego network data
import CSSHOP1NODE from "./graphdata/CSS_egograph_hop1_nodes.json"
import CSSHOP1EDGE from "./graphdata/CSS_egograph_hop1_edges.json"
import CSSHOP2NODE from "./graphdata/CSS_egograph_hop2_nodes.json"
import CSSHOP2EDGE from "./graphdata/CSS_egograph_hop2_edges.json"
import CSSHOP3NODE from "./graphdata/CSS_egograph_hop3_nodes.json"
import CSSHOP3EDGE from "./graphdata/CSS_egograph_hop3_edges.json"

import React, { useState } from 'react';
import Select from 'react-select'
import ZoomableSVG from "./ZoomableSVG";

import 'bulma/css/bulma.css';

function App() {
  const alpha = 50
  let windowX = window.innerWidth
  let windowY = window.innerHeight

  const graphData = {
    "javascript":[[JSHOP1NODE,JSHOP1EDGE],[JSHOP2NODE,JSHOP2EDGE],[JSHOP3NODE,JSHOP3EDGE]],
    "html":[[HTMLHOP1NODE,HTMLHOP1EDGE],[HTMLHOP2NODE,HTMLHOP2EDGE],[HTMLHOP3NODE,HTMLHOP3EDGE]],
    "css":[[CSSHOP1NODE,CSSHOP1EDGE],[CSSHOP2NODE,CSSHOP2EDGE],[CSSHOP3NODE,CSSHOP3EDGE]]
  }

  const tagOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" }
  ] 

  const hopOptions = [
    { value: 1, label: "1"},
    { value: 2, label: "2"},
    { value: 3, label: "3"}
  ]

  const [tag, setTag] = useState("javascript")
  const [hop, setHop] = useState(0)

  return (
    <div className="App">
      <section className='hero is-small is-success'>
        <div className='hero-body'>
          <div className='container'>
            <h1 className='title'>Qiita Tag Ego Network</h1>
          </div>
        </div>
      </section>
        <div className="SelectForm columns is-centered mt-4">
          <Select className="tagsSelectFrom column is-two-fifths" options={tagOptions} placeholder="中心となるタグ"  onChange={opt => setTag(opt.value)}></Select>
          <Select className="hopsSelectFrom column is-one-quarter" options={hopOptions} placeholder="hop数"  onChange={opt => setHop(opt.value-1)}></Select>
        </div>
        <div className="graphtitle has-text-centered">
          {"中心が「"+tag+"」hop数"+(hop+1)+"のネットワーク"}
        </div>
        <ZoomableSVG width={windowX*0.8} height={windowY*0.9}>
          <g className="links">
            {
              graphData[tag][hop][1].map((data) =>{
                return (
                  <g className="link">
                    <line
                      x1={10*(graphData[tag][hop][0][data[0]][0]+windowX/20)}
                      y1={10*(graphData[tag][hop][0][data[0]][1]+alpha+80)}
                      x2={10*(graphData[tag][hop][0][data[1]][0]+windowX/20)}
                      y2={10*(graphData[tag][hop][0][data[1]][1]+alpha+80)}
                      stroke = "black"
                      strokeOpacity = {"0.4"}
                    >
                    </line>
                  </g>
                );
              })
            }
          </g>
          <g className="nodes">
            {
              Object.entries(graphData[tag][hop][0]).map((node) =>{
                return (
                  <g>
                    <circle
                      className = "node"
                      r = {15}
                      cx = {10*(node[1][0]+windowX/20)}
                      cy = {10*(node[1][1]+alpha+80)}
                      fill = "blue"
                      fillOpacity = {"0.4"}
                    >
                    </circle>
                    <text
                      className = "node-label"
                      fill      = "black"
                      fontSize  = {"32px"}
                      textAnchor = "middle"
                      x = {10*(node[1][0]+windowX/20)}
                      y = {10*(node[1][1]+alpha+80)+5}
                    >
                      {node[0]}
                    </text>
                  </g>
                );
              })
            }
          </g>
        </ZoomableSVG>
      <footer className = 'footer'>
        <div className = 'content has-text-centered'>
          <hr></hr>
          <p>&copy; 2022 Naoya Oda </p>
          <p><a href = "mailto:oden6680@gmail.com">oden6680@gmail.com</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
