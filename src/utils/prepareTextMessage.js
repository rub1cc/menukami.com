import formatToCurrency from './formatToCurrency'

export default function prepareWAMessage(cart, store, { note, deliveryAddress }) {
  const { name, phone } = store
  const formatText = (item) => {
    let text = `*${item.qty} x ${item.name}*\n`
    if (item.note) {
      text += `_${item.note}_\n`
    }
    text += `Subtotal: ${formatToCurrency(item.subTotal)}`
    return text
  }

  const menuText = cart.map(formatText)
  const totalPrice = cart.reduce((prev, next) => prev + next.subTotal, 0) || 0

  let message = `Halo ${name}, saya ingin pesan:\n`
  message += `---\n`
  message += `${menuText.join('\n\n')}\n`
  message += `---\n`
  message += `*Total:* ${formatToCurrency(totalPrice)}\n`

  if (note) {
    message += `---\n`
    message += `*Note:*\n`
    message += `${note}\n`
  }

  if (store.delivery) {
    message += `---\n`
    message += `*Dikirim ke:*\n`
    message += `${deliveryAddress}\n`
  }

  message += `\nTerima kasih!`

  return `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(message)}`
}
