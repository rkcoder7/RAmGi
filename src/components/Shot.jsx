export default function Shot({ children, className = '', dark = false, as: Tag = 'section', ...rest }) {
  return (
    <Tag
      className={`shot relative flex min-h-svh flex-col justify-center px-5 py-24 sm:px-10 ${dark ? 'on-dark' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
