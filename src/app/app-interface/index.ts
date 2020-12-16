
export interface Marker {
  position: {
    lat: number,
    lng: number
  },
  options: {
    icon: string
  }
}

export interface HotelInfo {
  name: string,
  vicinity: string,
  rating?: number,
  user_ratings_total?: number,
  photo_reference: string
}