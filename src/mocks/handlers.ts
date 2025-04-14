import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/offices', (res) => {
    return HttpResponse.json({ offices: [
        {   
            id: 1,
            name: 'Office 1',
            address: '123 Main St',
            city: 'Anytown',
            state: 'CA',
        },
        {
            id: 2,
            name: 'Office 2',
            address: '456 Main St',
            city: 'Anytown',
            state: 'CA',
        }
    ]});
  }),
];
