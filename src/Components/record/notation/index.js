import { useState, useRef } from 'react'
import './style.css'
import deleteIcon from '../../../images/delete.svg'
import money from '../../../images/money.svg'
import valueColor from '../../../extensions/valueColor'

const Notation = (props) => {
  const [date, setDate] = useState(props.date)
  const [description, setDescription] = useState(props.description)
  const [value, setValue] = useState(props.value)

  const descriptionRef = useRef(null)
  const valueRef = useRef(null)

  const onDescriptionChanged = () => {
    if (descriptionRef.current) {
      const newDescription = descriptionRef.current.innerText
      setDescription(newDescription)
      props.onDescriptionChange(props.id, newDescription)
    }
  }

  const onValueChanged = () => {
    if (valueRef.current) {
      const newValue = valueRef.current.innerText.trim() // Trim leading and trailing spaces

      // Allow only numbers, '+' and '-' signs
      const allowedChars = /^[+-.]?\d+$/ // Regular expression for allowed characters
      if (allowedChars.test(newValue)) {
        setValue(newValue)
        valueRef.current.innerText = newValue
        props.onValueChange(props.id, newValue)
      } else {
        valueRef.current.innerText = value
        window.alert(`Invalid input: "${newValue}". Only numbers, '+','-' and '.' are allowed.`)
        // Optional: Reset the value to the previous one
      }
    }
  }

  return (
    <div className='Notation'>
      <span
        contentEditable={true}
        ref={descriptionRef}
        className='Notation-Description'
        onBlur={onDescriptionChanged}
        style={{ whiteSpace: 'pre-wrap' }} // Key change for vertical overflow
      >
        {description}
      </span>
      <div>
        <img src={money} alt='Money' />
        <span
          style={{ color: valueColor(value) }}
          contentEditable={true}
          ref={valueRef}
          className='Notation-Value'
          onBlur={onValueChanged}
        >
          {value}
        </span>
        <button onClick={props.onDelete} className='Notation-Delete'>
          <img src={deleteIcon} alt='Notation-Delete' />
        </button>
      </div>
    </div>
  )
}

export default Notation
