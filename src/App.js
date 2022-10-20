import logo from './logo.svg';
import './App.css';
/* import './header.css'; */
import { useState, useReducer, useEffect } from "react"
import Koulu from './Koulu';
import Luokka from './Luokka';
import Oppilas from './Oppilas';
/* import {useState} from "react"  */
/* import Nappain from './Nappain'; */

let oppilas1 = {nimi:"Olli Oppilas"}

let oppilas2 = {nimi:"Mikko Mallikas"}
let oppilas3 = {nimi:"Kalle Kolmonen"}
let oppilas4 = {nimi:"Aku Ankka"}
let oppilas5 = {nimi:"Hessu Hopo"}

let luokka1 = {nimi:"3A",
              opplaidenMäärä:27,
              oppilaat:[oppilas1, oppilas3]
              }

let luokka2 = {nimi:"2B",
              opplaidenMäärä:24,
              oppilaat:[oppilas2]
              }

let luokka3 ={nimi:"1A",
              oppilaidenmäärä:32,
              oppilaat:[oppilas4]}

let luokka4={nimi:"2A",
              oppilaidenmäärä:31,
              oppilaat:[oppilas5]}

let koulu_ = { oppilaidenMäärä:100,
              nimi:"Kangasalan ala-aste",
              luokat:[luokka1,luokka2]}
              
let koulu2 = { oppilaidenMäärä:300,
               nimi:"Sääksjärven ala-aste",
               luokat:[luokka3,luokka4],
               tallennetaanko: false,
               tietoAlustettu:false}

              function reducer(state, action) {
                switch (action.type) {

                  case 'KOULU_MUUTTUI':
                    console.log(action.payload);
                    const kouluKopio = {...state, tallennetaanko: true};
                    kouluKopio.koulu[action.payload.koulunIndex].nimi = action.payload.nimi;
                    return kouluKopio;

                  case 'OPPILAS_MUUTTUI':
                    console.log('Oppilas muuttuu');
                    console.log(action.payload);
/*                     let nimi = action.payload.nimi; */
                    const oppilasKopio = {...state, tallennetaanko: true};
                    oppilasKopio.koulu[action.payload.koulunIndex].luokat[action.payload.luokanIndex].oppilaat(action.payload.oppilaanIndex).nimi = action.payload.nimi;
                    return oppilasKopio;

                  case 'ALUSTA_DATA':
                    return {...action.payload, tietoAlustettu:true};

                  case 'UPPAA_TILA':
                    return { ...state, tallennetaanko: action.payload };
                    
                  default:
                    throw new Error(
                      'Joko actionia ei ole määritetty tai suoritit jotain uskomatonta'
                    );
                }
              };

              function App() {

                
                  const [koulu, dispatch] = useReducer(reducer, koulu2);

                  useEffect(() => {
                    let kouluData = localStorage.getItem('kouludata')
                    if (kouluData == null) {
                      localStorage.getItem('kouludata', JSON.stringify(koulu2))
                      dispatch({ type:'ALUSTA_DATA', payload: koulu2})
                    } else {
                      dispatch({ type:'ALUSTA_DATA', payload: JSON.parse(kouluData)})
                    }
                  }, [])

                  useEffect(() => {
                    if (koulu.tallennetaanko == true) {
                      localStorage.getItem('kouludata', JSON.stringify(koulu))
                      dispatch({ type:'UPPAA_TILA', payload: false})
                    }
                  })

                  return (
                  <div>
                    { {koulu.tietoAlustettu && <Koulu koulu={koulu} dispatch={dispatch} />} }
                  </div>
                  );
                }

                export default App;
