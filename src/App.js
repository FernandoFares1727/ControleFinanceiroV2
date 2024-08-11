import './App.css';
import Add from './images/add.svg';
import { useState, useEffect } from 'react';
import Record from './Components/record/index.js';
import createGuid from './extensions/guid.js';
import appKey from './extensions/appKey.js';

function App() {

  const [records, setRecords] = useState([]);

  const loadServerRecords = () => {
    const newRecords = []
    for (let i = 0; i < localStorage.length; i++){
      const key = localStorage.key(i)
      const object = localStorage.getItem(key)

      let parsedObject;
      try {
          parsedObject = JSON.parse(object);
      } catch (e) {
          // Se o valor não for um JSON válido, pule para a próxima iteração
          continue;
      }

      const applicationKey = parsedObject.appKey
      if (applicationKey === undefined || applicationKey !== appKey())
        continue
        
        newRecords.push(        
          {id: parsedObject.id,
          date:parsedObject.date,
          title:parsedObject.title,
          subtitle:parsedObject.subtitle,
          notations: parsedObject.notations}
        ) 
    }
    setRecords(newRecords)
  }

    // Call loadServerRecords on component mount using useEffect
    useEffect(() => {
      loadServerRecords()
    }, []) // Empty dependency array ensures it runs only once on mount

  const addRecord = () => {
    setRecords([...records, { id:createGuid() ,date: Date.now(), title: "Título", subtitle: "Subtítulo", notations:[] }])
  }

  const removeRecord = (id) => {
    setRecords(records.filter(record => record.id !== id));
    localStorage.removeItem(id)
  }

  const sortedRecords = [...records].sort((a, b) => b.date - a.date)

  const handleTitleChange = (id, newTitle) => {
    const updatedRecords = records.map(record => {
      if (record.id === id) {
        record.title = newTitle
        return {...record}
      }
      else {
        return record
      }
    })
    setRecords(updatedRecords)
  }

  const handleSubtitleChange = (id, newSubtitle) => {
    const updatedRecords = records.map(record => {
      if (record.id === id) {
        record.subtitle = newSubtitle
        return {...record}
      }
      else {
        return record
      }
    })
    setRecords(updatedRecords)
  }

  const handleNotationsChange = (id, newNotations) => {
    const updatedRecords = records.map(record => {
      if (record === id) {
        record.notations = newNotations
        return {...record}
      }
      else {
        return record
      }
    })
    setRecords(updatedRecords)
  }

  return (
    <div className="App">
      <header>Controle Financeiro</header>

      <div className='App-Body'>
        <div className='Add-Record-containter'>
          <button onClick={addRecord} className='Add-Record'>
            <img src={Add} alt='Add'/>
          </button>
        </div>

        <div className='Record-Container'>
          {sortedRecords.map(record => (
            <Record 
              key={record.date} 
              date={record.date}
              id={record.id}
              title= {record.title}
              subtitle= {record.subtitle}
              notations={record.notations}
              onDelete={() => removeRecord(record.id)} 
              onTitleChange={(id, newTitle) => handleTitleChange(id, newTitle)}
              onSubtitleChange={(id, newSubtitle) => handleSubtitleChange(id, newSubtitle)}
              onNotationChange={(id, newNotations) => handleNotationsChange(id, newNotations)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
