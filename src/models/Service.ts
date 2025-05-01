export interface Service {
    id: number;
    name: string;
    description?: string;
    duration?: string;
    officeIds: string[];
    // --- New fields for filtering ---
    category?: string;         // e.g., "Документы", "Образование", "Медицина"
    type?: string;             // e.g., "Очная", "Онлайн", "Консультация"
    isOnline?: boolean;        // true if the service can be provided online
    price?: number;            // Service price for filtering by cost
    tags?: string[];           // e.g., ["срочно", "без очереди", "госуслуга"]
}  