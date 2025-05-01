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
  // New fields for filtering:
  district?: string;         // Район
  type?: string;             // Тип офиса (например, "Основной", "Филиал", "Передвижной пункт")
  isAccessible?: boolean;    // Доступно для инвалидов
  hasParking?: boolean;      // Есть парковка
  worksOnWeekends?: boolean; // Работает по выходным
  phone?: string;            // Телефон
  email?: string;            // Email
  openingHours?: string;     // Часы работы (например, "09:00-18:00")
}

export interface OfficeServerResponse {
  companyName: string
  offices: Office[]
}