import formatToCurrency from 'utils/formatToCurrency'
import * as classnames from 'classnames'

export default function Price({ data, className }) {
  const { price, sale } = data

  return sale ? (
    <span className={classnames(['flex space-x-2 items-center', className])}>
      <p>{formatToCurrency(sale)}</p>
      <small className="text-gray-500 line-through">{formatToCurrency(price)}</small>
    </span>
  ) : (
    <p className={className}>{formatToCurrency(price)}</p>
  )
}
