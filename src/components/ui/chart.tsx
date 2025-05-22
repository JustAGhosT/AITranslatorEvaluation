"use client"

import { createContext, useContext, type ReactNode } from "react"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = createContext<ChartContextValue | undefined>(undefined)

interface ChartContainerProps {
  children: ReactNode
  config?: ChartConfig
  className?: string
}

export function ChartContainer({ children, config = {}, className = "" }: ChartContainerProps) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        className={`chart-container ${className}`}
        style={
          {
            "--color-value": "hsl(var(--primary))",
            ...Object.entries(config).reduce(
              (acc, [key, value]) => ({
                ...acc,
                [`--color-${key}`]: value.color,
              }),
              {},
            ),
          } as any
        }
      >
        {children}
      </div>
    </ChartContext.Provider>
  )
}

interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

export function ChartTooltip({ children }: { children: ReactNode }) {
  return children
}

export function ChartTooltipContent({ active, payload, label }: ChartTooltipProps) {
  const context = useContext(ChartContext)

  if (!active || !payload || !payload.length || !context) {
    return null
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "0.5rem",
        border: "1px solid #ccc",
        borderRadius: "0.25rem",
      }}
    >
      <p style={{ margin: 0, fontWeight: "bold" }}>{label}</p>
      {payload.map((entry, index) => (
        <p key={`item-${index}`} style={{ margin: 0, color: entry.color }}>
          {context.config[entry.dataKey]?.label || entry.name}: {entry.value}
        </p>
      ))}
    </div>
  )
}
