function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatMoney(money) {
    return `$${numberWithCommas(money)}`
}
export default formatMoney