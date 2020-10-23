export default function formatToCurrency(number, format = 'id') {
  return {
    id: Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      currencyDisplay: 'code',
      minimumFractionDigits: 0,
    }).format(number),
  }[format]
}
