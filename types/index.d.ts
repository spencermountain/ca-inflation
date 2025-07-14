// Input types for date parameters
export type DateInput = string | number // string for full date, number for year

// Result type for the main function
export interface InflationResult {
  start: string
  end: string
  initial: number
  result: number
  average: number
  growth: number
}

// Main function with static method
export interface CaInflationFunction {
  (value: number, start: DateInput, end?: DateInput): InflationResult
  getLatest(): number
}

export declare const caInflation: CaInflationFunction

export default caInflation
