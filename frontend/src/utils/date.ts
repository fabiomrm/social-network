export const days = Array.from({ length: 31 }, (_, day) => day + 1);
export const months = Array.from({ length: 12 }, (_, monthNumber) => {
    const date = new Date(0, monthNumber);
    const month = date
        .toLocaleDateString("pt-br", { month: "short" })
        .replace(".", "");
    return month.charAt(0).toUpperCase() + month.slice(1);
});
export const years = Array.from({ length: 150 }, (_, index) => {
    return new Date().getFullYear() - index;
});