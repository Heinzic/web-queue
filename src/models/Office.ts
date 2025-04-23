import { Line } from "./Line";

export interface Office {
  name: string;
  address: string;
  city: string;
  id: string;
  lines: Line[];
  timeZoneId: string;
  nearestDate: number;
  active: boolean;
}

export interface OfficeServerResponse {
  companyName: string
  offices: Office[]
}