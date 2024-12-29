import React from 'react'

function Bttn({
    text,
    type = "button",
    bgColor = "",
    textColor = "text-white",
    className = '',
    ...props
}) {
  return (
    <button type={type} className={`px-4 py-2 hover:bg-teal-500 border border-white rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {text}
    </button>
  )
}

export default Bttn