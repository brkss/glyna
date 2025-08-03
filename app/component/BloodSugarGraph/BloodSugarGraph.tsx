// BloodSugarGraph.tsx
import { bisector, max, min } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  ScrollView,
  Text,
  View,
} from "react-native";
import Svg, { Circle, G, Line, Rect, Text as SvgText } from "react-native-svg";

export interface BloodSugarReading {
  time: Date;
  value: number;
}

interface BloodSugarGraphProps {
  data: BloodSugarReading[];
  lowThreshold?: number;
  highThreshold?: number;
  height?: number;
}

// Adjust constants:
const Y_AXIS_WIDTH = 40;
const PADDING = { top: 12, bottom: 32, left: 0, right: 12 };
const POINT_SPACING = 30;

export const BloodSugarGraph: React.FC<BloodSugarGraphProps> = ({
  data,
  lowThreshold = 70,
  highThreshold = 130,
  height = 200,
}) => {
  const sorted = useMemo(
    () => [...data].sort((a, b) => a.time.getTime() - b.time.getTime()),
    [data]
  );
  if (!sorted.length) return null;

  // compute width: at least screen width, else based on number of points
  const screenWidth = Dimensions.get("window").width;
  const computedWidth = Math.max(screenWidth, sorted.length * POINT_SPACING);

  // X domain from first to last time
  const xDomain: [Date, Date] = [
    sorted[0].time,
    sorted[sorted.length - 1].time,
  ];
  const values = sorted.map((d) => d.value);
  const yMin = Math.min(lowThreshold, min(values) ?? lowThreshold) - 10;
  const yMax = Math.max(highThreshold, max(values) ?? highThreshold) + 10;

  // Compute raw min/max including thresholds
  const rawMin = Math.min(lowThreshold, Math.min(...values));
  const rawMax = Math.max(highThreshold, Math.max(...values));

  // Add a small buffer so points aren't flush to edges
  const buffer = (rawMax - rawMin) * 0.1; // 10%
  const domainMin = rawMin - buffer;
  const domainMax = rawMax + buffer;

  const xScale = useMemo(
    () =>
      scaleTime()
        .domain(xDomain)
        .range([PADDING.left, computedWidth - PADDING.right]),
    [xDomain, computedWidth]
  );
  const yScale = useMemo(() => {
    const s = scaleLinear()
      .domain([domainMin, domainMax])
      .range([height - PADDING.bottom, PADDING.top]);
    // make tick generation nicer
    return s.nice();
  }, [domainMin, domainMax, height]);

  // Generate Y ticks from the scale directly so they align
  const yTicks = useMemo(() => {
    const ticks = yScale.ticks(5); // about 5 ticks
    // ensure thresholds are included if they fall between
    if (!ticks.includes(lowThreshold)) ticks.push(lowThreshold);
    if (!ticks.includes(highThreshold)) ticks.push(highThreshold);
    return ticks.sort((a, b) => a - b);
  }, [yScale, lowThreshold, highThreshold]);

  // X ticks hourly
  const xTicks = useMemo(() => {
    const ticks: Date[] = [];
    const start = new Date(xDomain[0]);
    start.setMinutes(0, 0, 0);
    const end = xDomain[1];
    let cursor = new Date(start);
    while (cursor <= end) {
      ticks.push(new Date(cursor));
      cursor = new Date(cursor.getTime() + 1000 * 60 * 60);
    }
    if (!ticks.length) ticks.push(xDomain[0]);
    return ticks;
  }, [xDomain]);

  // tooltip logic
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    reading: BloodSugarReading;
  } | null>(null);
  const bisectDate = bisector<BloodSugarReading, Date>((d) => d.time).left;

  const handleTouch = (evt: GestureResponderEvent) => {
    const { locationX } = evt.nativeEvent;
    const clamped = Math.min(Math.max(locationX, 0), computedWidth);
    const timeAt = xScale.invert(clamped);
    const idx = bisectDate(sorted, timeAt, 1);
    const nearest =
      idx >= sorted.length
        ? sorted[sorted.length - 1]
        : idx === 0
        ? sorted[0]
        : (() => {
            const before = sorted[idx - 1];
            const after = sorted[idx];
            return Math.abs(after.time.getTime() - timeAt.getTime()) <
              Math.abs(before.time.getTime() - timeAt.getTime())
              ? after
              : before;
          })();
    setTooltip({
      x: xScale(nearest.time),
      y: yScale(nearest.value),
      reading: nearest,
    });
  };

  const formatTime = (d: Date) => {
    const h = d.getHours().toString().padStart(2, "0");
    const m = d.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  const getColor = (v: number) => {
    if (v < lowThreshold) return "#FF3B30";
    if (v > highThreshold) return "#FFCC00";
    return "#4CD964";
  };

  // In the component render, wrap like this:
  return (
    <View style={{ flexDirection: "row" }}>
      {/* Fixed Y-axis */}
      <View style={{ width: Y_AXIS_WIDTH, height }}>
        {yTicks.map((tick, i) => {
          let y = yScale(tick);
          // clamp so label doesn't overflow top/bottom
          y = Math.min(Math.max(y, 0), height);
          return (
            <View
              key={`yt-${i}`}
              style={{
                position: "absolute",
                top: y - 8,
                right: 4,
                width: Y_AXIS_WIDTH - 4,
                alignItems: "flex-end",
              }}
            >
              <Text style={{ fontSize: 10, color: "#FFF" }}>
                {Math.round(tick)}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Scrollable chart area */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Svg
          width={computedWidth}
          height={height}
          onStartShouldSetResponder={() => true}
          onResponderGrant={handleTouch}
        >
          {/* shift content right so it doesn't overlap Y-axis labels */}
          <G x={0}>
            {/* background */}
            <Rect
              x={0}
              y={0}
              width={computedWidth}
              height={height}
              fill="#0f0f0f"
              rx={6}
            />

            {/* horizontal grid lines */}
            {yTicks.map((tick, i) => {
              const y = yScale(tick);
              return (
                <Line
                  key={`grid-${i}`}
                  x1={0}
                  x2={computedWidth}
                  y1={y}
                  y2={y}
                  stroke="#333"
                  strokeDasharray={[4, 6]}
                  strokeWidth={1}
                />
              );
            })}

            {/* threshold lines */}
            <Line
              x1={0}
              x2={computedWidth}
              y1={yScale(lowThreshold)}
              y2={yScale(lowThreshold)}
              stroke="#666"
              strokeDasharray={[3, 5]}
              strokeWidth={1}
            />
            <Line
              x1={0}
              x2={computedWidth}
              y1={yScale(highThreshold)}
              y2={yScale(highThreshold)}
              stroke="#666"
              strokeDasharray={[3, 5]}
              strokeWidth={1}
            />

            {/* vertical time grid + labels */}
            {xTicks.map((t, i) => {
              const x = xScale(t);
              return (
                <G key={`xt-${i}`}>
                  <Line
                    x1={x}
                    x2={x}
                    y1={PADDING.top}
                    y2={height - PADDING.bottom}
                    stroke="#222"
                    strokeDasharray={[2, 4]}
                    strokeWidth={1}
                  />
                  <SvgText
                    x={x}
                    y={height - PADDING.bottom + 14}
                    fontSize={10}
                    fill="#FFF"
                    textAnchor="middle"
                    rotation={-45}
                    origin={`${x}, ${height - PADDING.bottom + 14}`}
                  >
                    {formatTime(t)}
                  </SvgText>
                </G>
              );
            })}

            {/* points */}
            {sorted.map((d, i) => {
              const cx = xScale(d.time);
              const cy = yScale(d.value);
              return (
                <Circle
                  key={`pt-${i}`}
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill={getColor(d.value)}
                  stroke="#000"
                  strokeWidth={1}
                />
              );
            })}

            {/* tooltip */}
            {tooltip && (
              <G>
                <Line
                  x1={tooltip.x}
                  x2={tooltip.x}
                  y1={PADDING.top}
                  y2={height - PADDING.bottom}
                  stroke="#888"
                  strokeDasharray={[3, 4]}
                />
                <G x={tooltip.x + 6} y={tooltip.y - 40}>
                  <Rect
                    x={0}
                    y={0}
                    width={100}
                    height={36}
                    rx={6}
                    fill="#1f1f1f"
                    stroke="#555"
                  />
                  <SvgText
                    x={8}
                    y={14}
                    fontSize={12}
                    fill="#FFF"
                    fontWeight="600"
                  >
                    {`BG: ${tooltip.reading.value}`}
                  </SvgText>
                  <SvgText x={8} y={28} fontSize={10} fill="#AAA">
                    {formatTime(tooltip.reading.time)}
                  </SvgText>
                </G>
              </G>
            )}
          </G>
        </Svg>
      </ScrollView>
    </View>
  );
};
