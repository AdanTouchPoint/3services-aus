import React, {useEffect, useState} from 'react'
import Button from "react-bootstrap/cjs/Button";


const List = ({mps, dataUser,  setEmailData,  setShowFindForm, setShowEmailForm, clientId}) => {
    const [tweet, setTweet] = useState(``)
    const fetchData = async () => {
        const requestOptions = {
            method: 'POST',
            redirect: 'follow'
        }
        const data = await fetch(`https://payload-demo-tpm.herokuapp.com/tweets/?clientId=${clientId}`, requestOptions);
        const datos = await data.json()
        //console.log(datos.data, 'datos.data-tweet')
        const textoTweet = datos.data?.docs[0] ? datos.data?.docs[0].Message : ' '
        setTweet(textoTweet)
    }
    
    useEffect(() => {
        fetchData()
        .catch((error)=>console.error(error))
        
        //console.log(tweet, 'tweet state en useeffect')
    },[])
    const tweetText = `.${mps.twitter} ${tweet}`
    //console.log(tweetText)
    const click = e => {
        e.preventDefault()
        setEmailData({
            ...dataUser,
            ...mps
        })
        setShowEmailForm(false)
        setShowFindForm(true)
    }
    return (
        <div className={'buttonsContainer'}>
            <div className={'list-content-location'}>
                <div>
                    <h3 className='capitalize-style'> {mps.name} </h3>
                    {
                        mps.govt_type === "Federal Senators" ? 
                        <p>State: {mps.state ? mps.state: ' ---'}, Postal Code: {mps.labelpostcode}, City: {mps.city ? mps.city : ' ---'}</p> :
                        <p>For: {mps.electorates}, City: {mps.city ? mps.city : ' ---'}, State: {mps.state ? mps.state: ' ---'}</p>
                    }
                    
                </div>
            </div>
            <div className={'buttons'}>
                <div >
                    {
                        mps.twitter && mps.clientId?.plan !== 'basic'?
                        <Button
                            className='list-button'
                            size={'sm'}
                            variant={'dark'}
                            href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                            target={"blank"}
                        >
                            Enviar tweet
                        </Button> :
                        <p className='list-notweeter-text' >No hay Twitter</p>
                    }
                </div>
                <div >
                    {
                        mps.email ?
                            <Button
                                className='list-button'
                                size={'sm'}
                                variant={'dark'}
                                target={"blank"}
                                onClick={click}
                            >
                                Enviar email
                            </Button> :
                            <p className='list-notweeter-text'>No hay Email</p>
                    }
                </div>
                <div >
                    {
                        mps.phone  && mps.clientId?.plan !== 'basic' ?
                            <Button
                                className='list-button'
                                size={'sm'}
                                variant={'dark'}
                                href={`tel:+55${mps.phone}`}
                                target={"blank"}
                            >
                                Llamada
                            </Button> :
                            <p className='list-notweeter-text'>No hay telefono</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default List;


