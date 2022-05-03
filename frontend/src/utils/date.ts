/* eslint-disable prettier/prettier */


export const days = Array.from({ length: 31 }, (_, day) => day + 1);
export const months = Array.from({ length: 12 }, (_, monthNumber) => {
    const date = new Date(0, monthNumber);
    const month = date.toLocaleDateString('pt-br', { month: 'short' }).replace('.', '');
    return month.charAt(0).toUpperCase() + month.slice(1);
});
export const years = Array.from({ length: 150 }, (_, index) => {
    return new Date().getFullYear() - index;
});

export const stringToDate = (date: string) => {
    return new Date(date);
}

export const formatDate = (date: Date | string) => {
    const dt = typeof date === "string" ? stringToDate(date) : date;
    const now = new Date();
    const diffHours = Math.abs(now.getTime() - dt.getTime());

    if (diffHours < 24) {

        return `${diffHours}h`
    }

    const day = dt.getDate().toString().padStart(2, '0');
    const month = (dt.getMonth() + 1).toString().padStart(2, '0');
    const year = dt.getFullYear().toString().slice(2);

    return `${day}/${month}/${year}`
}

