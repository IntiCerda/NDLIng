export interface Report {
  title: string;
  description: string;
  severity: "Bajo" | "Medio" | "Alto";
  photo: string;
  location: {
    latitude: number;
    longitude: number;
  };
  datetime: string;
}
