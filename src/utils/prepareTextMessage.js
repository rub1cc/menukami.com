import formatToCurrency from './formatToCurrency'

export default function prepareWAMessage(cart, phone) {
  const formatText = (item) => {
    let text = `*${item.qty}x ${item.name}*\n`
    if (item.note) {
      text += `_${item.note}_\n`
    }
    text += `Subtotal: ${formatToCurrency(item.subTotal)}`
    return text
  }

  const menuText = cart.map(formatText)
  const totalPrice = cart.reduce((prev, next) => prev + next.subTotal, 0) || 0

  let message = `Halo, saya ingin pesan:\n\n`
  message += `${menuText.join('\n\n')}\n\n`
  message += `*Total: ${formatToCurrency(totalPrice)}*\n\n`

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
