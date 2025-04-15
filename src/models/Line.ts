export interface Line {
    name: string;
    id: number;
    shortName: string;
    nearestDate: number;
    notActive: boolean;
    lineBookingOpenHours: boolean;
    totalWaitingDelayShowAlert: boolean;
    serviceId: number;
    lineBookingUnavailable: boolean;
    smartphoneModeEnabled: boolean;
    smartphoneModeEnabledShowAlert: boolean;
    positionsShowAlert: boolean;
    servicePointsShowAlert: boolean;
}