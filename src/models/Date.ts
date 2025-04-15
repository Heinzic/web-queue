export interface DateInfo {
    available: boolean;
    date: string;
    from: string;
    to: string;
    description: string;
}

export interface MonthData {
    month: string;
    dates: DateInfo[];
}
