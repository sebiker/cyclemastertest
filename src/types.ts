/**
 * Cycling measurement data interface
 */
export interface CyclingMeasurement {
  timestamp: number;
  speed: number;
  cadence: number;
  heartRate: number;
  power: number;
}

/**
 * Process cycling measurement data
 */
export function processMeasurement(data: CyclingMeasurement): void {
  console.log(`Measurement at ${new Date(data.timestamp).toISOString()}:`, data);
}
