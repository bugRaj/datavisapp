import './App.css';
import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import dataset from './data/wine.data';


const getData =(setResult)=>{
   fetch(dataset)
  .then(r => r.text())
  .then(data => {
    // console.log('text decoded:', data);
    const rows = data.split('\n').map(row=> row.split(','));
    const result = rows.map(row=>{
      const val=[];
      val.push(parseFloat(row[10]));
      val.push(parseFloat(row[11]));
      if(!isNaN(val[0]) && !isNaN(val[1])){
        // console.log(val)
        return val;
      }
    });
    setResult(result)
    
  })
  
  
}

function App() {
  const [data, setData]=useState([]);
  
   if(!data.length)getData(setData);
  
  const option = {
    title: {
      text: "Wine Data Scatter Graph"
    },
    xAxis: {name:'Colour-intensity',type:'value'},
    yAxis: {name:'Hue',type: 'value'},
    series: [
      {
        symbolSize: 7,
        data: data,
        type: 'scatter'
      }
    ]
  };
  
  const option2 = {
    title: {
      text: "Wine Data Bar Graph"
    },
    xAxis: {name:'Colour-intensity',type:'value'},
    yAxis: {name:'Hue',type: 'value'},
    series: [
      {
        symbolSize: 10,
        data: data,
        type: 'bar'
      }
    ]
  };
  return (
    <div className="App">
    <h1>Data Visualization App</h1>
    <ReactECharts option={option}/>
    <ReactECharts option={option2}/>
    </div> 
  )
} 

export default App;

