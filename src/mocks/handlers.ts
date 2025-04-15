import { http, HttpResponse, HttpHandler } from 'msw';
import { MonthData, Office } from '../models';

const getOfficesHandler: HttpHandler = http.get<never, never, { offices: Office[] }>(
  '/api/offices',
  () => {
    return HttpResponse.json({
      offices: [
        {
            name: "МФЦ",
            address: "ул. Металлургов, д. 87 (ТЦ «МЕГА»)",
            city: "Екатеринбург",
            id: "3538314b-16b5-46db-9825-08c536bc6653",
            lines: [
                {
                    name: "Физические лица",
                    id: 2,
                    shortName: "doc",
                    nearestDate: 1744705200000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 1,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                },
                {
                    name: "Биометрия",
                    id: 19,
                    shortName: "doc",
                    nearestDate: 1744710000000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 3,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                }
            ],
            timeZoneId: "Ekaterinburg Standard Time",
            nearestDate: 1744705200000,
            active: false
        },
        {
            name: "МФЦ",
            address: "ул. 8 Марта, д. 13",
            city: "Екатеринбург",
            id: "d81b5e25-b72d-4ae0-b761-0b0b13c46b7a",
            lines: [
                {
                    name: "Физические лица",
                    id: 1,
                    shortName: "doc",
                    nearestDate: 1744705200000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 1,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                }
            ],
            timeZoneId: "Ekaterinburg Standard Time",
            nearestDate: 1744705200000,
            active: false
        },
        {
            name: "МФЦ",
            address: "ул. Новосибирская, д. 109 ",
            city: "Екатеринбург",
            id: "9e1ffa3d-5d37-4e6a-a776-4a9740627ad2",
            lines: [
                {
                    name: "Физические лица",
                    id: 446,
                    shortName: "doc",
                    nearestDate: 1744706400000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 1,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                }
            ],
            timeZoneId: "Ekaterinburg Standard Time",
            nearestDate: 1744706400000,
            active: false
        },
        {
            name: "МФЦ",
            address: "ул. Готвальда, д. 6/4",
            city: "Екатеринбург",
            id: "C961BF59-6ADA-42B9-92F4-8A59D9ECD64B",
            lines: [
                {
                    name: "Юридические лица",
                    id: 5,
                    shortName: "doc",
                    nearestDate: 1744708800000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 2,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                }
            ],
            timeZoneId: "Ekaterinburg Standard Time",
            nearestDate: 1744708800000,
            active: false
        },
        {
            name: "МФЦ",
            address: "г. Екатеринбург, ул. Победы, 14а",
            city: "Екатеринбург",
            id: "5E575B0C-D1C5-4C96-B1EE-45D028E87D8A",
            lines: [
                {
                    name: "Юридические лица",
                    id: 17,
                    shortName: "doc",
                    nearestDate: 1744708800000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 2,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                }
            ],
            timeZoneId: "Ekaterinburg Standard Time",
            nearestDate: 1744708800000,
            active: false
        },
        {
            name: "МФЦ",
            address: "ул. Техническая, д. 63.",
            city: "Екатеринбург",
            id: "5aaca759-164c-4c9d-96c1-7008a423df5c",
            lines: [
                {
                    name: "Биометрия",
                    id: 414,
                    shortName: "doc",
                    nearestDate: 1744708800000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 3,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                }
            ],
            timeZoneId: "Ekaterinburg Standard Time",
            nearestDate: 1744708800000,
            active: false
        },
        {
            name: "МФЦ",
            address: "г. Екатеринбург, ул. Рощинская, 21",
            city: "Екатеринбург",
            id: "EEC7B4EB-8A11-440E-9F9F-17394DF4ED94",
            lines: [
                {
                    name: "Биометрия",
                    id: 13,
                    shortName: "doc",
                    nearestDate: 1744710000000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 3,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                }
            ],
            timeZoneId: "Ekaterinburg Standard Time",
            nearestDate: 1744710000000,
            active: false
        },
        {
            name: "МФЦ",
            address: "г. Екатеринбург, ул. Героев России, 2",
            city: "Екатеринбург",
            id: "FDCDB175-1ECA-479A-B428-E6715984BF04",
            lines: [
                {
                    name: "Биометрия",
                    id: 19,
                    shortName: "doc",
                    nearestDate: 1744710000000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 3,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                }
            ],
            timeZoneId: "Ekaterinburg Standard Time",
            nearestDate: 1744710000000,
            active: false
        },
        {
            name: "МФЦ",
            address: "г. Екатеринбург, ул. Учителей, 2Б",
            city: "Екатеринбург",
            id: "7DA75221-96A6-4F89-B9AE-FB5BA88C1A73",
            lines: [
                {
                    name: "Физические лица",
                    id: 11,
                    shortName: "doc",
                    nearestDate: 1744716000000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 1,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                }
            ],
            timeZoneId: "Ekaterinburg Standard Time",
            nearestDate: 1744716000000,
            active: false
        },
    ],
    });
  }
);

const getDatesHandler: HttpHandler = http.get<never, {lineName: string, placeId: string, serviceId: string, participantsNumber: number}, MonthData>(
  '/api/dates',
  () => {
    return HttpResponse.json({
            month: "2025-04-17T00:00:00Z",
            dates: [
                        {
                            available: true,
                            date: "2025-04-15T00:00:00Z",
                            from: "2025-04-15T08:40:00Z",
                            to: "2025-04-15T09:20:00Z",
                            description: ""
                        },
                        {
                            available: true,
                            date: "2025-04-17T00:00:00Z",
                            from: "2025-04-17T09:20:00Z",
                            to: "2025-04-17T17:20:00Z",
                            description: ""
                        },
                        {
                            available: true,
                            date: "2025-04-18T00:00:00Z",
                            from: "2025-04-18T09:00:00Z",
                            to: "2025-04-18T17:20:00Z",
                            description: ""
                        },
                        {
                            available: true,
                            date: "2025-04-19T00:00:00Z",
                            from: "2025-04-19T09:00:00Z",
                            to: "2025-04-19T16:00:00Z",
                            description: ""
                        },
                        {
                            available: true,
                            date: "2025-04-21T00:00:00Z",
                            from: "2025-04-21T09:20:00Z",
                            to: "2025-04-21T18:20:00Z",
                            description: ""
                        },
                        {
                            available: true,
                            date: "2025-04-22T00:00:00Z",
                            from: "2025-04-22T09:00:00Z",
                            to: "2025-04-22T17:20:00Z",
                            description: ""
                        },
                        {
                            available: true,
                            date: "2025-04-23T00:00:00Z",
                            from: "2025-04-23T09:00:00Z",
                            to: "2025-04-23T18:40:00Z",
                            description: ""
                        },
                        {
                            available: true,
                            date: "2025-04-24T00:00:00Z",
                            from: "2025-04-24T09:00:00Z",
                            to: "2025-04-24T18:40:00Z",
                            description: ""
                        },
                        {
                            available: true,
                            date: "2025-04-25T00:00:00Z",
                            from: "2025-04-25T09:20:00Z",
                            to: "2025-04-25T18:40:00Z",
                            description: ""
                        }
                    ]
    });
  }
);

export const handlers = [getOfficesHandler, getDatesHandler];