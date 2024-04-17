export function formatDate(dateStr: string | null): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function formatDateForExperience(dateStr: string | null): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
}