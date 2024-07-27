
// css files

import './App.css';

// image files

import Add from './images/add.svg'

function App() {
  return (
    <div className="App">
      <header>Controle Financeiro</header>

      <div className='App-Body'>
        <div className='Add-Record-containter'>
          <button className='Add-Record'>
            <img src={Add} alt='Add'/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
