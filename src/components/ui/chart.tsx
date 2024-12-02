"use client";

import * as React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { cn } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ReactNode;
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        {children}
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colors = Object.entries(config).reduce((acc, [key, value]) => {
    if ("color" in value && value.color) {
      acc[key] = value.color;
    }
    return acc;
  }, {} as Record<string, string>);

  const cssVars = Object.entries(colors).reduce((acc, [key, value]) => {
    acc[`--color-${key}`] = value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          #${id} {
            ${Object.entries(cssVars)
              .map(([key, value]) => `${key}: ${value};`)
              .join("\n")}
          }
        `,
      }}
    />
  );
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
  className?: string;
  hideIcon?: boolean;
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  ({ className, hideIcon = false, active, payload, label }, ref) => {
    const { config } = useChart();

    if (!active || !payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-background p-2 shadow-sm",
          className
        )}
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            {label && <div className="text-sm font-medium">{label}</div>}
          </div>
          {payload.map(({ value, dataKey, color }, index) => {
            const itemConfig = config[dataKey];

            return (
              <div
                key={`item-${index}`}
                className="flex items-center justify-between gap-8"
              >
                <div className="flex items-center gap-2">
                  {!hideIcon &&
                    (itemConfig.icon ? (
                      <itemConfig.icon />
                    ) : (
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ background: color }}
                      />
                    ))}
                  <span className="text-sm font-medium">
                    {itemConfig.label ?? dataKey}
                  </span>
                </div>
                <span className="text-sm tabular-nums">
                  {typeof value === "number" ? value.toLocaleString() : value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";

export {
  ChartContainer,
  ChartTooltipContent,
};
