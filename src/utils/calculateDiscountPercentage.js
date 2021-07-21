export default function calculateDiscountPercentage(from, to) {
  return (((from - to) / from) * 100).toFixed()
}
