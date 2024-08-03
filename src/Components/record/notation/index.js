import { useState,useRef } from 'react'
import './style.css'

const Notation = (props) => {

    const[date,setDate] = useState(props.date)
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
            const newValue = valueRef.current.innerText
            setValue(newValue)
            props.onValueChange(props.id, newValue)
        }
    }

    return(<div className='Notation'>
        <span contentEditable={true} ref={descriptionRef} className='Notation-Description' onBlur={onDescriptionChanged}>{description}</span>
        <div>
            <img src={props.money} alt='Money'/>
            <span style={{color: props.valueColor(value)}} contentEditable={true} ref={valueRef} className='Notation-Value' onBlur={onValueChanged}>{value}</span>
            <button onClick={props.onDelete} className='Notation-Delete'>
                <img src={props.delete} alt='Notation-Delete'/>
            </button>
        </div>
    </div>)
}

export default Notation