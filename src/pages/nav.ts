export const nav = {
    general: {
    index: () => '/' as const,
    selectLocation: () => '/general/select-location' as const,
    selectOffice: () => '/general/select-office' as const,
    appointmentDateTime: () => '/general/appointment-datetime' as const,
    cancelAppointment: () => '/general/cancel-appointment' as const,
    confirmAppointment: () => '/general/confirm-appointment' as const,
    appointmentSuccess: () => '/general/appointment-success' as const,
    enterData: () => '/general/enter-data' as const,
    },
    mfc: {
        index: () => '/mfc/home' as const,
        selectQueue: () => '/mfc' as const,
        selectLocation: () => '/mfc/select-location' as const,
        selectOffice: () => '/mfc/select-office' as const,
        appointmentDateTime: () => '/mfc/appointment-datetime' as const,
        cancelAppointment: () => '/mfc/cancel-appointment' as const,
        confirmAppointment: () => '/mfc/confirm-appointment' as const,
        appointmentSuccess: () => '/mfc/appointment-success' as const,
        enterData: () => '/mfc/enter-data' as const,
    },
    uni: {
        index: () => '/uni' as const,
        selectOffice: () => '/uni/select-service' as const,
        appointmentDateTime: () => '/uni/appointment-datetime' as const,
        cancelAppointment: () => '/uni/cancel-appointment' as const,
        confirmAppointment: () => '/uni/confirm-appointment' as const,
        appointmentSuccess: () => '/uni/appointment-success' as const,
        enterData: () => '/uni/enter-data' as const,
    }
}