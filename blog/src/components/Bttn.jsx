import React from 'react'

function Bttn({
    text,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = '',
    ...props
}) {
  return (
    <button type={type} className={`px-4 py-2 hover:bg-sky-800 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {text}
    </button>
  )
}

export default Bttn