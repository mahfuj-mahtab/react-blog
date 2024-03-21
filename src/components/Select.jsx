import React,{useId} from 'react'

function Select({
    options=[],
    label,
    className='',
    ...props
},ref) {
  return (
    <div>
        {label && <label htmlFor={id} className=''>
            {label}
            
            
            </label>}
            <select name="" id={id} {...props} ref={ref} className={`${className}`}>
                {options?.map((option)=>(
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
    </div>
  )
}

export default React.forwardRef(Select)