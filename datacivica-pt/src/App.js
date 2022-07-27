//import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { ResponsiveLine } from '@nivo/line'
import { usePapaParse } from 'react-papaparse';
import siteListCSV from './identificacion_humana.csv';
import Chart from './chart.js'
const data = [];
const MyResponsiveLine = ({ datos  }) => (
  <ResponsiveLine
      data={datos}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle'
      }}
      axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle'
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
          {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
  />
)

function App() {
   const [datos, setDatos] = useState(data)
  const { readString } = usePapaParse();
  const papaConfig = {
    complete: (results) => {
      let id = 0;
      results.data.forEach(element => {
        element.id = id++;
        datos.push(element)
      });
    },
    header: true,
    download: true,
    error: (error, file) => {
      console.log('Error while parsing:', error, file);
    },
  };
  readString(siteListCSV, papaConfig);


  return (
    <div className="App" style={{
      height: 300,
      width: 700
    }}>

    <MyResponsiveLine datos={datos} />
    </div>
    
  );
}

export default App;
