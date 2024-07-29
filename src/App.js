import './App.css';
import Add from './images/add.svg';
import Delete from './images/delete.svg';
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
              onDelete={() => removeRecord(record.id)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
