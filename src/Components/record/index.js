import './style.css';
import { useState, useRef,useEffect } from 'react';
import Notation from './notation/index.js';
import appKey from '../../extensions/appKey.js';

const Record = (props) => {

    const[date,setDate] = useState(props.date)
    const [title, setTitle] = useState(props.title)
    const [subtitle, setSubtitle] = useState(props.subtitle)

    const titleRef = useRef(null)
    const subtitleRef = useRef(null)

    const onTitleChanged = () => {
        if (titleRef.current) {
            const newTitle = titleRef.current.innerText
            setTitle(newTitle)
            props.onTitleChange(props.id, newTitle)
        }
    }

    const onSubtitleChanged = () => {
        if (subtitleRef.current){
            const newSubtitle = subtitleRef.current.innerText
            setSubtitle(newSubtitle)
            props.onSubtitleChange(props.id, newSubtitle)
        }
    }

    const [notationsEnabled, setNotationsEnabled] = useState(false)

    const notationsIcon = () => {
        return notationsEnabled 
            ? props.upIcon
            : props.downIcon
    }

    const showNotations = () => {
        setNotationsEnabled(!notationsEnabled)
    }

    const [notations, setNotations] = useState([])

    // Calculate the total value efficiently using a reducer function
    const calculateTotalValue = () => {
        const total = notations.reduce((acc, notation) => acc + parseFloat(notation.value), 0)
        return total 
    }

    const [totalValue,setTotalValue] = useState(calculateTotalValue())

    useEffect(() => {
        const serverNotations = props.notations
        let totalServerValue = 0
        const newNotations = [] // Create an empty array to store new notations
      
        if (serverNotations) { // Check if notations are provided in props
          serverNotations.forEach((serverNotation) => {
            totalServerValue += parseFloat(serverNotation.value);
            newNotations.push({
              id: serverNotation.id,
              date: serverNotation.date,
              description: serverNotation.description,
              value: serverNotation.value,
            })
          })
        }
      
        // Update notations state after processing all server notations
        setNotations(newNotations)
        setTotalValue(parseFloat(totalServerValue))
    }, []);
      

    const addNotation = () => {
        setNotations([...notations, { id:props.createGuid() ,date: Date.now(), description: "Descrição", value: 0 }])
    }
        
    const removeNotation = (id) => {
        const notation = notations.find(notation => notation.id === id)
        setNotations(notations.filter(notation => notation.id !== id))
        setTotalValue(totalValue - notation.value)
    }
        
    const sortedNotations = [...notations].sort((a, b) => b.date - a.date)

    const valueColor = (value) => {
        if (value == 0)
            return "#000000"
        else if (value < 0)
            return "#FF033E"
        return "#6D9406"
    }

    const handleNotationDescriptionChange = (id, newDescription) => {
        const updatedNotations = notations.map(notation => {
            if (notation.id === id){
                notation.description = newDescription
                return { ...notation} 
            }
            else {
                return notation
            }
        })
        setNotations(updatedNotations)
        props.onNotationChange(id, updatedNotations)
    }

    const handleNotationValueChange = (id,newValue) => {
        const updatedNotations = notations.map(notation => {
          if (notation.id === id) { // Check if it's the updated notation
            notation.value = newValue
            return { ...notation} // Update the value property
          } else {
            return notation
          }
        })
        setNotations(updatedNotations)
        setTotalValue(calculateTotalValue(updatedNotations)) // Recalculate total value
        props.onNotationChange(updatedNotations)
    }     
    
    const saveRecord = () => {
        var json = JSON.stringify({
            appKey: appKey(),
            id: props.id,
            date: date,
            title: title,
            subtitle: subtitle,
            notations:notations
        })
        localStorage.setItem(props.id, json)
    }

    return (
        <div className="Record">
            <button onClick={saveRecord} className='Record-Save'>
                <img src={props.save} alt='Save'/>
            </button>
            <div className='Record-Header'>
                <div className='Record-Description'>
                    <span ref={titleRef} onBlur={onTitleChanged} className='Titulo' contentEditable={true}>{title}</span>
                    <span ref={subtitleRef} onBlur={onSubtitleChanged} className='Subtitulo' contentEditable={true}>{subtitle}</span>
                </div>
                <button onClick={props.onDelete}>
                    <img src={props.deleteIcon} alt='delete'/>
                </button>
            </div>
            <button onClick={showNotations} className='Record-Notations'>
                <img src={notationsIcon()} alt='Show Notations'/>
            </button>
            {notationsEnabled && (
                <div className='Notation-Container'>
                    <hr />
                    <div onClick={addNotation} className='Add-Notation-Conatiner'>
                        <button className='Add-Notation'>
                            <img src={props.addNotation} alt='Add Notation'/>
                        </button>
                    </div>
                    {sortedNotations.length > 0 && ( // Check if sortedNotations has elements
                    <div className="Notation-Total-Value">
                        <img src={props.money} alt='Money'/>
                        <span style={{color: valueColor(totalValue)}}>{totalValue}</span>
                    </div>
                    )}
                    <div className='Notation-Body'>
                    {sortedNotations.map(notation => (
                      <Notation
                        key={notation.date}
                        date={notation.date}
                        id={notation.id}
                        description= {notation.description}
                        value={notation.value}
                        delete={props.deleteIcon}
                        money={props.money}
                        valueColor={valueColor}
                        onDelete={() => removeNotation(notation.id)}
                        onDescriptionChange={(id, newDescription) => handleNotationDescriptionChange(id, newDescription)}
                        onValueChange={(id, newValue) => handleNotationValueChange(id, newValue)}
                      />
                    ))
                    }
                    </div>
                </div>
            )
            }
        </div>
    );
}

export default Record;
