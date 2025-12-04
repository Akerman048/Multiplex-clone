export interface Movie {
    id: number;
    title: string;
    image: string;
    trailer: string;
    schedule: Schedule;
    rating: number;
    "viewer rating": string;
    "criics rating": string;
    year: number;
    director: string;
    genre: string[];
    duration: string;
    producer: string;
    "production studio": string;
    starring: string;
    description: string;
    released: boolean;
    price:number;
  }
  
  export interface Schedule {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
  }