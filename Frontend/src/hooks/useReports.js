export const useReports = () => {

    const BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')

    const downloadCSV = (period = "weekly", type = "full") => {
        window.open(`${BASE}/reports/csv/?period=${period}&type=${type}`, "_blank")
    }

    const downloadPDF = (period = "weekly") => {
        window.open(`${BASE}/reports/pdf/?period=${period}`, "_blank")
    }

    return { downloadCSV, downloadPDF }
}