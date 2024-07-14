const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const formatterDateTime = new Intl.DateTimeFormat('vi-VN', {
    dateStyle: "short"
})

const formatCurrency = (n: number) => {
    return formatter.format(n);
}

const formatDateTime = (date: Date) => {
    return formatterDateTime.format(date);
}
const formatterDateTimeVN = new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
});
const formatDateTimeVN = (date: Date) => {
    return formatterDateTimeVN.format(date);
}
export {formatCurrency, formatDateTime ,formatDateTimeVN}
