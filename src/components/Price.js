import formatToCurrency from 'utils/formatToCurrency'
import * as classnames from 'classnames'

export default function Price({ data, className }) {
  const { currency, price, discountedPrice, discount } = data

  return discountedPrice ? (
    <span className={classnames(['flex space-x-2 items-center', className])}>
      <p>
        {currency} {formatToCurrency(discountedPrice)}
      </p>
      <small className="text-gray-500 line-through">
        {currency} {formatToCurrency(price)}
      </small>
      <small className="text-red-500">-{discount}%</small>
    </span>
  ) : (
    <p className={className}>
      {currency} {formatToCurrency(price)}
    </p>
  )
}
