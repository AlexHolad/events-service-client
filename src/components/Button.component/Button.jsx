import "./Button.css"

const Button = ({action, children, type}) => {
  return (
        <button className="button" onClick={action} type={type ? type : null} >{children}</button>
  )
}

export default Button