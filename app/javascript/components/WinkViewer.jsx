import React from 'react';
import {ResponsiveLine} from '@nivo/line';

export default function WinkViewer(props) {
  const {name, threshold, id} = props.wink;

  const priceHistory = [
    {x: '2018-01-01', y: 7},
    {x: '2018-01-02', y: 5},
    {x: '2018-01-03', y: 11},
    {x: '2018-01-04', y: 9},
    {x: '2018-01-05', y: 12},
    {x: '2018-01-06', y: 16},
    {x: '2018-01-07', y: 13},
    {x: '2018-01-08', y: 13},
  ];

  const thresholdLine = [
    {x: priceHistory[0].x, y: threshold},
    {x: priceHistory[priceHistory.length - 1].x, y: threshold},
  ];

  const data = [
    {
      id: 'Price over Time',
      color: 'hsl(79, 70%, 50%)',
      data: priceHistory,
    },
    {
      id: 'Threshold',
      color: 'rgb(255, 0, 0)',
      data: thresholdLine,
    },
  ];
  return (
    <div style={{height: '30em'}}>
      <ResponsiveLine
        margin={{top: 20, right: 20, bottom: 60, left: 55}}
        enableSlices="x"
        data={data}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          precision: 'day',
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{type: 'linear', stacked: false, min: 'auto', max: 'auto'}}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Price',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        axisBottom={{
          format: '%b %d',
          tickValues: 'every 2 days',
          legend: 'Time',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        enablePointLabel
        pointSize={16}
        pointBorderWidth={1}
        pointBorderColor={{
          from: 'color',
          modifiers: [['darker', 0.3]],
        }}
        useMesh
      />
    </div>
  );
}
