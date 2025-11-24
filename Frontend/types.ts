export interface Report {
  title: string;
  description: string;
  user: string,
  category: string
  severity: 1 | 2 | 3;
  latitude: number;
  longitude: number;
  date: string;
}
