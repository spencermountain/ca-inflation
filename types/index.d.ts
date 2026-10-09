// Input types for date parameters
export type DateInput = string | number // a year like 1970, '1970', or a date string like '1970-01-01'

// Result type for the main function
export interface InflationResult {
  start: string
  end: string
  initial: number
  result: number
  averageInflation: number // compound annual rate, in percent
  percentChange: number
}

// Main function with static method
export interface CaInflationFunction {
  /** convert a dollar amount from start-year dollars to end-year dollars.
   *  end defaults to the latest year in the data.
   *  throws a RangeError for dates outside the data, or a reversed range. */
  (value: number, start: DateInput, end?: DateInput): InflationResult
  /** the most-recent date in the data, like '2024-01-01' */
  getLatest(): string
  version: string
}

export declare const caInflation: CaInflationFunction

export default caInflation
