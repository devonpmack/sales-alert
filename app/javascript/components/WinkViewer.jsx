import React from 'react';
import {ResponsiveLine} from '@nivo/line';
import {Stack, Spinner, TextStyle} from '@shopify/polaris';
import {isMobile} from './helpers';

export default function WinkViewer(props) {
  const {name, threshold, id, queries} = props.wink;

  if (!queries || queries.length === 0) {
    return (
      <Stack vertical distribution="center" alignment="center">
        <Spinner size="large" />
        <TextStyle variation="subdued">
          We have no data yet on your Product. Please wait for us to begin
          tracking.
        </TextStyle>
      </Stack>
    );
  }

  const sortedQueries = queries.sort(function(left, right) {
    const dateA = new Date(left.date_changed);
    const dateB = new Date(right.date_changed);
    return dateA - dateB;
  });

  const priceHistory = [];
  sortedQueries.forEach((query) => {
    if (!query.date_changed || !query.date_updated) {
      return;
    }

    if (priceHistory.length > 0) {
      priceHistory[priceHistory.length - 1].x = new Date(
        new Date(query.date_changed).getTime() - 1000,
      );
    }
    priceHistory.push({
      x: new Date(query.date_changed),
      y: query.price,
    });
    if (query.date_changed !== query.date_updated) {
      priceHistory.push({
        x: new Date(query.date_updated),
        y: query.price,
      });
    }
  });

  const latestDate = priceHistory[priceHistory.length - 1].x;
  const dateDiff = latestDate.getTime() - priceHistory[0].x.getTime();

  const rightEdge = new Date(
    latestDate.getTime() + (dateDiff === 0 ? 10000 : dateDiff / 10),
  );

  const thresholdLine = [
    {x: new Date(priceHistory[0].x.getTime()), y: threshold},
    {x: rightEdge, y: threshold},
  ];

  priceHistory.push({
    x: rightEdge,
    y: priceHistory[priceHistory.length - 1].y,
  });

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
    <div style={{height: isMobile() ? '37em' : '45em'}}>
      <ResponsiveLine
        enablePoints={false}
        lineWidth={4}
        colors={{scheme: 'nivo'}}
        margin={{top: 20, right: 55, bottom: 60, left: 55}}
        enableSlices="x"
        data={data}
        xScale={{
          type: 'time',
          format: 'native',
          precision: 'minute',
          max: rightEdge,
        }}
        xFormat="time:%Y-%m-%d %H:%M:%S"
        yScale={{
          type: 'linear',
          stacked: false,
          min: Math.min(threshold, ...queries.map((q) => q.price)) * 0.8,
          max: Math.max(threshold, ...queries.map((q) => q.price)) * 1.2,
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
          tickValues: isMobile() ? 3 : 6,
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
