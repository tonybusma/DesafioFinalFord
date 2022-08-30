export interface Vehicles extends Array<Vehicle>{}

export interface Vehicle{
  id?: number | string
  model?: string
  volumetotal?: number | string
  connected?: number | string
  softwareUpdates?: number | string
}

export interface VehiclesApi {
  vehicles: Vehicles;
}
