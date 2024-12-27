import React from 'react'

function Bttn({
    text,
    type = "button",
    bgColor = "",
    textColor = "text-black",
    className = '',
    ...props
}) {
  return (
    <button type={type} className={`px-4 py-2 hover:bg-teal-500 border border-black rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {text}
    </button>
  )
}

export default Bttn