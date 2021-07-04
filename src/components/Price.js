import formatToCurrency from 'utils/formatToCurrency'
import * as classnames from 'classnames'

export default function Price({ data, className }) {
  const { price, sale_price } = data

  return sale_price ? (
    <span className={classnames(['flex flex-col ', className])}>
      <p className="text-red-600">{formatToCurrency(sale_price)}</p>
      <p className="text-gray-500 line-through">{formatToCurrency(price)}</p>
    </span>
  ) : (
    <p className={className}>{formatToCurrency(price)}</p>
  )
}
