import * as classnames from 'classnames'

export default function FloatingButton({ children, onClick, disabled }) {
  return (
    <button
      className={'fixed bottom-0 inset-x-0 mb-4 max-w-md mx-auto'}
      disabled={disabled}
      onClick={onClick}
    >
      <div
        className={classnames([
          'flex rounded-lg text-white text-center p-4 justify-between mx-4',
          disabled ? 'bg-orange-300' : 'bg-orange-500',
        ])}
      >
        {children}
      </div>
    </button>
  )
}
