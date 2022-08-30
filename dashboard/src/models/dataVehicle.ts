export interface DataVehicles extends Array<DataVehicle>{}

export interface DataVehicle{
  id: number | string;
  vin: string;
  odometer: string;
  tirePressure: string;
  status: string;
  batteryStatus: string;
  fuelLevel: string;
  lat: string;
  long: string;
}
