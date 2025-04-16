import { User } from "./User";

export interface Appointment {
    customer: User;
    generalConditionChecked: boolean;
    lineId: number;
    participantsNumber: number;
    placeId: string;
    serviceId: number;
    timeslotId: number;
}
