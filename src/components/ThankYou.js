import React, {useState, useEffect} from 'react'
import Button from "react-bootstrap/cjs/Button";


const ThankYou = ({showThankYou, setShowFindForm, setShowThankYou, clientId}) => {
    
    const [typData, setTypData] = useState({})
    const fetchData = async () => {
        const requestOptions = {
            method: 'POST',
            redirect: 'follow'
        }
        const data = await fetch(`https://payload-demo-tpm.herokuapp.com/typ-content/?clientId=${clientId}`, requestOptions);
        const datos = await data.json()
        //console.log(datos.data, 'datos.data-typ')
        setTypData(datos)
    }
    
    useEffect(() => {
        fetchData()
        .catch((error)=>console.error(error))
        
        //console.log(typData)
    },[])
    const click = e => {
        e.preventDefault()
        setShowThankYou(true)
        setShowFindForm(false)
    }
    return (
        <div hidden={showThankYou} className={'container typ-container'}>
            <form onSubmit={click}>
                <div className='typ-content'>
                    <h3>{typData.data?.docs[0] ? typData.data?.docs[0].thankYouMessage : 'Please type a thank you message on the dashboard'}</h3>
                    <h5>{typData.data?.docs[0] ? typData.data?.docs[0].secondThankYouMessage : 'Please type something on the dashboard' }</h5>
                    <Button
                        type={'submit'}
                        onClick={click}
                        variant={'dark'}
                        className="capitalize-style">
                        {typData.data?.docs[0] ? typData.data?.docs[0].repeatButtonTyp : 'Please type something on the dashboard'}
                    </Button>
                </div>
            </form>
        </div>


    )
}

export default ThankYou;