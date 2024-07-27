import './style.css';
import { useState } from 'react';

const Record = (props) => {

    const [title, setTitle] = useState(props.title)
    const [subtitle, setSubtitle] = useState(props.subtitle)

    return (
        <div className="Record">
            <div className='Record-Description'>
                <span onChange={(event) => setTitle(event.target.value)} className='Titulo' contentEditable={true}>{title}</span>
                <span onChange={(event) => setSubtitle(event.target.value)} className='Subtitulo' contentEditable={true}>{subtitle}</span>
            </div>
            <button onClick={props.onDelete}>
                <img src={props.deleteIcon} alt='delete'/>
            </button>
        </div>
    );
}

export default Record;
