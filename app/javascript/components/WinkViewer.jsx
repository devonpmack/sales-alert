import React from 'react';
import {ResponsiveLine} from '@nivo/line';

export default function WinkViewer(props) {
  const {name, threshold, id, queries} = props.wink;

  if (!queries || queries.length === 0) {
    return <div />;
  }

  const priceHistory = queries.map((query) => {
    return {
      x: new Date(query.date),
      y: query.price,
    };
  });

  if (priceHistory.length === 1) {
    priceHistory.push({
      x: new Date(priceHistory[0].x.getTime() + 10000),
      y: priceHistory[0].y,
    });
  }

  const thresholdLine = [
    {x: new Date(priceHistory[0].x.getTime() - 10000), y: threshold},
    {x: priceHistory[priceHistory.length - 1].x, y: threshold},
  ];

  const data = [
    {
      id: 'Price',
      color: 'hsl(172, 70%, 50%)',
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
        enablePoints={false}
        lineWidth={4}
        colors={{scheme: 'nivo'}}
        margin={{top: 20, right: 20, bottom: 60, left: 55}}
        enableSlices="x"
        data={data}
        xScale={{
          type: 'time',
          format: 'native',
          precision: 'minute',
        }}
        xFormat="time:%Y-%m-%d %H:%M:%S"
        yScale={{
          type: 'linear',
          stacked: false,
          min: threshold * 0.9,
          max: Math.max(...queries.map((q) => q.price)) * 1.1,
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Price ($)',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        axisBottom={{
          format: '%b %d %H:%M',
          tickValues: 6,
          legend: 'Time',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        // enablePointLabel
        // pointLabel={(n) => formatPrice(n.y)}
        pointSize={16}
        useMesh
        enableCrosshair={false}
        // sliceTooltip={(point) => {
        //   const dt = point.slice.points.filter(
        //     (pt) => pt.serieId === 'Price',
        //   )[0];
        //   return dt
        //     ? `${formatPrice(dt.data.y)} ${new Date(
        //         dt.data.x,
        //       ).toLocaleString()}`
        //     : 'Threshold: 4';
        // }}

        legends={[
          {
            anchor: 'top-right',
            direction: 'column',
            justify: false,
            translateX: 0,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 20,
            itemsSpacing: 4,
            symbolSize: 20,
            symbolShape: 'circle',
            itemDirection: 'left-to-right',
            itemTextColor: '#777',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

function formatPrice(n) {
  return `$${n.toFixed(2)}`;
}
