export const formatMoney = (num)=>{
    return new Intl.NumberFormat().format(+num)
}