export const nav = {
    general: {
    index: () => '/' as const,
    selectLocation: () => '/select-location' as const,
    selectOffice: () => '/select-office' as const,
    appointmentDateTime: () => '/appointment-datetime' as const,
    cancelAppointment: () => '/cancel-appointment' as const,
    confirmAppointment: () => '/confirm-appointment' as const,
    appointmentSuccess: () => '/appointment-success' as const,
    enterData: () => '/enter-data' as const,
    },
    mfc: {
        index: () => '/mfc' as const,
        selectLocation: () => '/mfc/select-location' as const,
        selectOffice: () => '/mfc/select-office' as const,
        appointmentDateTime: () => '/mfc/appointment-datetime' as const,
        cancelAppointment: () => '/mfc/cancel-appointment' as const,
        confirmAppointment: () => '/mfc/confirm-appointment' as const,
        appointmentSuccess: () => '/mfc/appointment-success' as const,
        enterData: () => '/mfc/enter-data' as const,
    }
}