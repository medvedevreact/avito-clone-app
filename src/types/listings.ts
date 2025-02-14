export interface RealEstateItem {
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

export interface AutoItem {
  brand: string;
  model: string;
  year: number;
  mileage: number;
}

export interface ServicesItem {
  serviceType: string;
  experience: number;
  cost: number;
}

export type Item =
  | (RealEstateItem & {
      id: number;
      name: string;
      description: string;
      location: string;
      type: "Недвижимость";
    })
  | (AutoItem & {
      id: number;
      name: string;
      description: string;
      location: string;
      type: "Авто";
    })
  | (ServicesItem & {
      id: number;
      name: string;
      description: string;
      location: string;
      type: "Услуги";
    });
