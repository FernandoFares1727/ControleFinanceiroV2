import './App.css';
import Add from './images/add.svg';
import Delete from './images/delete.svg';
import Up from './images/up.svg';
import Down from './images/down.svg';
import AddNotation from './images/add-notation.svg';
import Money from './images/money.svg';
import { useState } from 'react';
import Record from './Components/record/index.js';
import createGuid from './extensions/guid.js';

function App() {
  const [records, setRecords] = useState([]);

  const addRecord = () => {
    setRecords([...records, { id:createGuid() ,date: Date.now(), title: "Título", subtitle: "Subtítulo" }])
  }

  const removeRecord = (id) => {
    setRecords(records.filter(record => record.id !== id));
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
              id={record.id}
              title= {record.title}
              subtitle= {record.subtitle}
              deleteIcon={Delete}
              upIcon={Up}
              downIcon={Down}
              addNotation={AddNotation}
              money={Money}
              onDelete={() => removeRecord(record.id)} 
              createGuid={createGuid}
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
