import logo from './logo.svg';
import './App.css';
import Luokka from './Luokka';

const Oppilas = (props) => {
  return (
    <div>
      <div>{props.oppilas.nimi}
       <input type="text" onChange={(event)=>
        {props.dispatch({type:"OPPILAS_MUUTTUI",
        payload:
          {
          nimi:event.target.value,
          oppilaanIndex:props.oppilaanIndex,
          koulunIndex:props.koulunIndex,
          luokanIndex:props.luokanIndex}
          })}}  value = {props.oppilas.nimi}/>
  
      </div>
      <div>{props.tieto2}
      </div>
    </div>
  );
}

export default Oppilas;