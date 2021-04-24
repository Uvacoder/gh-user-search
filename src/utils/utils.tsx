export const numberFormatter = (num: number) => {
    const str = num.toString();
    if (num > 999) {
        const res = str.slice(0, -3);
        return res + 'K';
    } else {
        return num;
    }
};