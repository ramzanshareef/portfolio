export function formatDate(dateStr: string | null): string {
    if (!dateStr) return ""; // If dateStr is null or undefined, return an empty string
    const date = new Date(dateStr); // Parse the string into a Date object
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
}
