export interface Location {
  latitude: number
  longitude: number
}

export interface Message {
  text: string
  createdAt: number
}

export interface LocationMessage {
  locationUrl: string
  createdAt: number
}
