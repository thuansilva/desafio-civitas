import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { dateToDayName, getQualityColor } from "@/lib/utils";
import { AirQualityReading } from "@/app/page";

const chartConfig = {
  aqi: {
    label: "AQI",
    color: "#10b981",
  },
} satisfies ChartConfig;

function ChartNeighborhood({
  readingsObject,
}: {
  readingsObject: AirQualityReading[];
}) {
  if (!Array.isArray(readingsObject)) {
    return null;
  }

  function chartMountData(obj: AirQualityReading[]) {
    const datecontent: string[] = [];

    const chartData = obj
      .slice(0, 7)
      .reverse()
      .map((item, index) => {
        datecontent.push(item.recorded_at);
        return {
          day: dateToDayName(datecontent[index]),
          aqi: item.aqi,
          quality_level: item.quality_level,
        };
      });

    return chartData;
  }

  const data = chartMountData(readingsObject);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // Usar o nome completo, ou descomentar o tickFormatter se quiser abreviar:
          //   tickFormatter={(value) => value.slice(0, 3)}
        />

        <YAxis />
        <Tooltip contentStyle={{ backgroundColor: "#ffff", border: "none" }} />

        <Bar dataKey="aqi" radius={4}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getQualityColor(entry.quality_level)}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

export default ChartNeighborhood;
