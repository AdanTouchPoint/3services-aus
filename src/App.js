import React,{useState, useEffect} from 'react'
import MainForm from "./components/MainForm";
//require('dotenv').config()
function App() {
    const [emailData, setEmailData] = useState({
        userName: ''
    })
    const [dataUser, setDataUser] = useState({
        userName: '',
        postcode: '',
        emailUser: '',
        subject:'',//'The Subject Line is Pre-Filled and can be Edited',
        text:'',//'Users will see a pre-filled email and can edit it before sending. If the system administrator prefers, subject line and/or body text can made uneditable.'
        state:''
    })
    const [mp, setMp] = useState([])
    const [senator, setSenator] = useState([])
    const [states, setStates] = useState([])
    const [clientId] = useState('63eeadb6349fdc3da0069046')
   // const adanCID ='636dadcf2626f92aade6664a'
    const fetchData = async () => {
        const requestOptions = {
            method: 'POST',
            redirect: 'follow'
        }
        const data = await fetch(`https://payload-demo-tpm.herokuapp.com/emails-content/?clientId=${clientId}`, requestOptions);
        const datos = await data.json()
        //console.log(datos.data, 'datos.data-email')
        const payload = datos.data.docs[0].content;
    if (payload.length > 0) {
      const txt = payload.map((el) => {
        //console.log(el.children[0].text);
        return el.children[0].text + `\n`;
      });
      let sub = datos.data.docs[0].subject;
      dataUser.text =
        txt.length > 0
          ? txt.join(" ").replace(/#/g, " ")
          : "Introduzca un texto sugerido";
      dataUser.subject =
        sub.length > 0 ? sub : "Por favor introduzca un asunto del correos";
      //console.log();
      //console.log(txt);
      return txt;
    }
    }
   /* const representativesBatch = async () => {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        const data = await fetch(
          `https://payload-demo-tpm.herokuapp.com/all-representatives/?clientId=${clientId}`,
          requestOptions
        );
        const datos = await data.json();
    const payload = datos.data
    const states = payload.map( el => {
    return  el.state
    } )
    const uniq = new Set(states)
          setStates([...uniq]);
          //console.log(uniq, "states");
      };*/
    
    useEffect(() => {
        fetchData()
        .catch((error)=>console.error(error))
//console.log(dataUser)
    },[])
    
    

    return(
        <MainForm
            setEmailData={setEmailData}
            emailData={emailData}
            dataUser={dataUser}
            setDataUser={setDataUser}
            mp={mp}
            setMp={setMp}
            senator={senator}
            setSenator={setSenator}
            clientId={clientId}
            states={states}
        />
    )

}

export default App;
