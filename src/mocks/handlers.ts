import { http, HttpResponse, HttpHandler } from 'msw';
import { Appointment, MonthData, Service, OfficeServerResponse } from '../models';

const mfcOffices: OfficeServerResponse = {
    companyName:'МФЦ',
    offices: [
        {
            name: "МФЦ",
            address: "ул. Металлургов, д. 87 (ТЦ «МЕГА»)",
            city: "Екатеринбург",
            id: "3538314b-16b5-46db-9825-08c536bc6653",
            lines: [
                {
                    name: "Поступление на ВС по контракту / Справка участника СВО и членов его семьи",
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
                },
                {
                    name: "Лагеря",
                    id: 4,
                    shortName: "doc",
                    nearestDate: 1744710000000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 4,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                },
                {
                    name: "Школы",
                    id: 5,
                    shortName: "doc",
                    nearestDate: 1744710000000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 5,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                },
                {
                    name: "МВД. Регистрация/снятие с регистрации",
                    id: 7,
                    shortName: "doc",
                    nearestDate: 1744710000000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 7,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                },
                {
                    name: "Другие услуги",
                    id: 9,
                    shortName: "doc",
                    nearestDate: 1744710000000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 9,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                },

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
                    name: "Комплексная услуга по газификации",
                    id: 3,
                    shortName: "doc",
                    nearestDate: 1744705200000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 3,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                },
                {
                    name: "Услуги пенсионного обеспечения и социальной защиты (пособия, опека, пенсия и др.)",
                    id: 6,
                    shortName: "doc",
                    nearestDate: 1744705200000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 6,
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
                    name: "Внесудебное банкротство физических лиц",
                    id: 2,
                    shortName: "doc",
                    nearestDate: 1744706400000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 2,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                },
                {
                    name: "МВД. Замена водительского удостоверения",
                    id: 8,
                    shortName: "doc",
                    nearestDate: 1744706400000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 8,
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
                    name: "Комплексная услуга по газификации",
                    id: 3,
                    shortName: "doc",
                    nearestDate: 1744705200000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 3,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                },
                {
                    name: "Школы",
                    id: 5,
                    shortName: "doc",
                    nearestDate: 1744705200000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 5,
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
            ],
            timeZoneId: "Ekaterinburg Standard Time",
            nearestDate: 1744716000000,
            active: false
        },
    ],
}

const resourceOffices: OfficeServerResponse = {
    companyName:'ПМПК Ресурс',
    offices: [
        {
            name: "ПМПК Ресурс",
            address: "СОСТАВ № 1 ЦЕНТРАЛЬНОЙ ПМПК ГБОУ СО «ЦППМСП «Ресурс» (г. Екатеринбург, ул. Машинная 31)",
            city: "Екатеринбург",
            id: "3538314b-16b5-46db-9825-08c536bc6653",
            lines: [
                {
                    name: "Поступление на ВС по контракту / Справка участника СВО и членов его семьи",
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
                },
                {
                    name: "Лагеря",
                    id: 4,
                    shortName: "doc",
                    nearestDate: 1744710000000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 4,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                },
                {
                    name: "Школы",
                    id: 5,
                    shortName: "doc",
                    nearestDate: 1744710000000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 5,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                },
                {
                    name: "МВД. Регистрация/снятие с регистрации",
                    id: 7,
                    shortName: "doc",
                    nearestDate: 1744710000000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 7,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                },
                {
                    name: "Другие услуги",
                    id: 9,
                    shortName: "doc",
                    nearestDate: 1744710000000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 9,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                },

            ],
            timeZoneId: "Ekaterinburg Standard Time",
            nearestDate: 1744705200000,
            active: false
        },
        {
            name: "ПМПК Ресурс",
            address: "СОСТАВ № 5 ЦЕНТРАЛЬНОЙ ПМПК ГБОУ СО «ЦППМСП «Ресурс» (г. Екатеринбург, ул. Титова д. 28)",
            city: "Екатеринбург",
            id: "d81b5e25-b72d-4ae0-b761-0b0b13c46b7a",
            lines: [
                {
                    name: "Комплексная услуга по газификации",
                    id: 3,
                    shortName: "doc",
                    nearestDate: 1744705200000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 3,
                    lineBookingUnavailable: false,
                    smartphoneModeEnabled: false,
                    smartphoneModeEnabledShowAlert: false,
                    positionsShowAlert: false,
                    servicePointsShowAlert: false
                },
                {
                    name: "Услуги пенсионного обеспечения и социальной защиты (пособия, опека, пенсия и др.)",
                    id: 6,
                    shortName: "doc",
                    nearestDate: 1744705200000,
                    notActive: false,
                    lineBookingOpenHours: false,
                    totalWaitingDelayShowAlert: false,
                    serviceId: 6,
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
    ],
}
const mfcServices = {
    lineName: "Физические лица",
    services: [
        {
            id: 1,
            name: "Поступление на ВС по контракту / Справка участника СВО и членов его семьи",
            description: "Поступление на ВС по контракту / Справка участника СВО и членов его семьи",
            officeIds: ["3538314b-16b5-46db-9825-08c536bc6653"]
        },
        {
            id: 2,
            name: "Внесудебное банкротство физических лиц",
            description: "Внесудебное банкротство физических лиц",
            officeIds: ["9e1ffa3d-5d37-4e6a-a776-4a9740627ad2"]
        },
        {
            id: 3,
            name: "Комплексная услуга по газификации",
            description: "Комплексная услуга по газификации",
            officeIds: ["d81b5e25-b72d-4ae0-b761-0b0b13c46b7a", "C961BF59-6ADA-42B9-92F4-8A59D9ECD64B"]
        },
        {
            id: 4,
            name: "Лагеря",
            description: "Лагеря",
            officeIds: ["3538314b-16b5-46db-9825-08c536bc6653"]
        },
        {
            id: 5,
            name: "Школы",
            description: "Школы",
            officeIds: ["3538314b-16b5-46db-9825-08c536bc6653", "C961BF59-6ADA-42B9-92F4-8A59D9ECD64B"]
        },
        {
            id: 6,
            name: "Услуги пенсионного обеспечения и социальной защиты (пособия, опека, пенсия и др.)",
            description: "Услуги пенсионного обеспечения и социальной защиты (пособия, опека, пенсия и др.)",
            officeIds: ["d81b5e25-b72d-4ae0-b761-0b0b13c46b7a"]
        },
        {
            id: 7,
            name: "МВД. Регистрация / снятие с регистрации по месту жительства граждан РФ (прописка) по месту нахождения объекта недвижимости",
            description: "МВД. Регистрация / снятие с регистрации по месту жительства граждан РФ (прописка) по месту нахождения объекта недвижимости",
            officeIds: ["3538314b-16b5-46db-9825-08c536bc6653"]
        },
        {
            id: 8,
            name: "МВД. Замена водительского удостоверения",
            description: "МВД. Замена водительского удостоверения",
            officeIds: ["9e1ffa3d-5d37-4e6a-a776-4a9740627ad2"]
        },
        {
            id: 9,
            name: "Другие услуги",
            description: "Другие услуги",
            officeIds: ["3538314b-16b5-46db-9825-08c536bc6653"]
        },
    ]
}

const timeSlots = {
    "month": "2025-04-17T00:00:00Z",
    "dates": [
        {
            "available": true,
            "date": "2025-04-15T00:00:00Z",
            "from": "2025-04-15T03:40:00Z",
            "to": "2025-04-15T04:20:00Z",
            "description": "Morning slot"
        },
        {
            "available": true,
            "date": "2025-04-15T00:00:00Z",
            "from": "2025-04-15T04:20:00Z",
            "to": "2025-04-15T05:20:00Z",
            "description": "Morning slot"
        },
        {
            "available": true,
            "date": "2025-04-15T00:00:00Z",
            "from": "2025-04-15T08:40:00Z",
            "to": "2025-04-15T09:20:00Z",
            "description": "Morning slot"
        },
        {
            "available": true,
            "date": "2025-04-15T00:00:00Z",
            "from": "2025-04-15T11:00:00Z",
            "to": "2025-04-15T11:40:00Z",
            "description": "Late morning"
        },
        {
            "available": true,
            "date": "2025-04-15T00:00:00Z",
            "from": "2025-04-15T14:20:00Z",
            "to": "2025-04-15T15:00:00Z",
            "description": "Afternoon slot"
        },
        {
            "available": true,
            "date": "2025-04-17T00:00:00Z",
            "from": "2025-04-17T09:20:00Z",
            "to": "2025-04-17T10:00:00Z",
            "description": ""
        },
        {
            "available": true,
            "date": "2025-04-17T00:00:00Z",
            "from": "2025-04-17T10:20:00Z",
            "to": "2025-04-17T11:00:00Z",
            "description": ""
        },
        {
            "available": true,
            "date": "2025-04-17T00:00:00Z",
            "from": "2025-04-17T13:00:00Z",
            "to": "2025-04-17T13:40:00Z",
            "description": "After lunch"
        },
        {
            "available": true,
            "date": "2025-04-17T00:00:00Z",
            "from": "2025-04-17T15:20:00Z",
            "to": "2025-04-17T16:00:00Z",
            "description": "Late afternoon"
        },
        {
            "available": true,
            "date": "2025-04-18T00:00:00Z",
            "from": "2025-04-18T09:00:00Z",
            "to": "2025-04-18T09:40:00Z",
            "description": "Early morning"
        },
        {
            "available": true,
            "date": "2025-04-18T00:00:00Z",
            "from": "2025-04-18T11:20:00Z",
            "to": "2025-04-18T12:00:00Z",
            "description": "Before lunch"
        },
        {
            "available": true,
            "date": "2025-04-18T00:00:00Z",
            "from": "2025-04-18T14:00:00Z",
            "to": "2025-04-18T14:40:00Z",
            "description": ""
        },
        {
            "available": true,
            "date": "2025-04-19T00:00:00Z",
            "from": "2025-04-19T09:00:00Z",
            "to": "2025-04-19T09:40:00Z",
            "description": "Weekend morning"
        },
        {
            "available": true,
            "date": "2025-04-19T00:00:00Z",
            "from": "2025-04-19T12:20:00Z",
            "to": "2025-04-19T13:00:00Z",
            "description": "Weekend noon"
        },
        {
            "available": true,
            "date": "2025-04-19T00:00:00Z",
            "from": "2025-04-19T15:00:00Z",
            "to": "2025-04-19T15:40:00Z",
            "description": "Weekend afternoon"
        },
        {
            "available": true,
            "date": "2025-04-21T00:00:00Z",
            "from": "2025-04-21T09:20:00Z",
            "to": "2025-04-21T10:00:00Z",
            "description": ""
        },
        {
            "available": true,
            "date": "2025-04-21T00:00:00Z",
            "from": "2025-04-21T11:40:00Z",
            "to": "2025-04-21T12:20:00Z",
            "description": "Before lunch"
        },
        {
            "available": true,
            "date": "2025-04-21T00:00:00Z",
            "from": "2025-04-21T14:20:00Z",
            "to": "2025-04-21T15:00:00Z",
            "description": ""
        },
        {
            "available": true,
            "date": "2025-04-21T00:00:00Z",
            "from": "2025-04-21T16:40:00Z",
            "to": "2025-04-21T17:20:00Z",
            "description": "Late day"
        },
        {
            "available": true,
            "date": "2025-04-22T00:00:00Z",
            "from": "2025-04-22T09:00:00Z",
            "to": "2025-04-22T09:40:00Z",
            "description": ""
        },
        {
            "available": true,
            "date": "2025-04-22T00:00:00Z",
            "from": "2025-04-22T12:00:00Z",
            "to": "2025-04-22T12:40:00Z",
            "description": "Midday"
        },
        {
            "available": true,
            "date": "2025-04-22T00:00:00Z",
            "from": "2025-04-22T15:20:00Z",
            "to": "2025-04-22T16:00:00Z",
            "description": ""
        },
        {
            "available": true,
            "date": "2025-04-23T00:00:00Z",
            "from": "2025-04-23T09:00:00Z",
            "to": "2025-04-23T09:40:00Z",
            "description": ""
        },
        {
            "available": true,
            "date": "2025-04-23T00:00:00Z",
            "from": "2025-04-23T11:20:00Z",
            "to": "2025-04-23T12:00:00Z",
            "description": ""
        },
        {
            "available": true,
            "date": "2025-04-23T00:00:00Z",
            "from": "2025-04-23T14:40:00Z",
            "to": "2025-04-23T15:20:00Z",
            "description": ""
        },
        {
            "available": true,
            "date": "2025-04-23T00:00:00Z",
            "from": "2025-04-23T17:00:00Z",
            "to": "2025-04-23T17:40:00Z",
            "description": "Evening slot"
        },
        {
            "available": true,
            "date": "2025-04-24T00:00:00Z",
            "from": "2025-04-24T09:00:00Z",
            "to": "2025-04-24T09:40:00Z",
            "description": ""
        },
        {
            "available": true,
            "date": "2025-04-24T00:00:00Z",
            "from": "2025-04-24T12:20:00Z",
            "to": "2025-04-24T13:00:00Z",
            "description": ""
        },
        {
            "available": true,
            "date": "2025-04-24T00:00:00Z",
            "from": "2025-04-24T15:40:00Z",
            "to": "2025-04-24T16:20:00Z",
            "description": ""
        },
        {
            "available": true,
            "date": "2025-04-25T00:00:00Z",
            "from": "2025-04-25T09:20:00Z",
            "to": "2025-04-25T10:00:00Z",
            "description": ""
        },
        {
            "available": true,
            "date": "2025-04-25T00:00:00Z",
            "from": "2025-04-25T12:40:00Z",
            "to": "2025-04-25T13:20:00Z",
            "description": ""
        },
        {
            "available": true,
            "date": "2025-04-25T00:00:00Z",
            "from": "2025-04-25T16:00:00Z",
            "to": "2025-04-25T16:40:00Z",
            "description": "Friday afternoon"
        }
    ]
}

const getMfcOfficesHandler: HttpHandler = http.get<never, never, OfficeServerResponse>(
  '/api/mfc/offices',
  () => {
    return HttpResponse.json(mfcOffices);
  }
);

const getAllOfficesHandler: HttpHandler = http.get<never, never, OfficeServerResponse[]>(
    '/api/offices',
    () => {
      return HttpResponse.json([mfcOffices, resourceOffices]);
    }
  );
const getServicesHandler: HttpHandler = http.get<never, never, { lineName: string, services: Service[] }>(
  '/api/services',
  () => {
    return HttpResponse.json(mfcServices);
  }
);

const getDatesHandler: HttpHandler = http.get<never, {lineName: string, placeId: string, serviceId: string, participantsNumber: number}, MonthData>(
  '/api/dates',
  () => {
    return HttpResponse.json(timeSlots);
  }
);

const createAppointmentHandler: HttpHandler = http.post<never, Appointment, never>(
    '/api/create-appointment',
    async ({ request }) => {
      try {
        const appointment = await request.json() as Appointment;
        return HttpResponse.json(appointment, { status: 201 });
      } catch (error) {
        return HttpResponse.json(
          { error: 'Invalid appointment data' },
          { status: 400 }
        );
      }
    }
);

export const handlers = [getMfcOfficesHandler, getDatesHandler, createAppointmentHandler, getServicesHandler, getAllOfficesHandler];