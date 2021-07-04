export default function formatToCurrency(number, format = 'id') {
  return {
    id: Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number),
  }[format]
}
