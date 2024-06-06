import './form.css'
import api from '../../api'
import { useContext ,useEffect, useState } from 'react'
import { MyContext } from '../../MyContext'
import FormModal from '../FormModal'
import Spinner from '../Spinner'
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdArrowBack } from "react-icons/md";
import  Img  from "../../assets/minhafoto.jpg"

export interface UserDatas {
    id: string
    name: string,
    age: string,
    street: string,
    neighborhood: string,
    state: string,
    bio: string,
}

export default function Form() {

    const [load, setLoad] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(true)
    const [fetch, setFetch] = useState<boolean>(true)
    const { contextDatas, setContextDatas } = useContext(MyContext)
    
    useEffect(()=>{
        async function getDatas() {
            await api.get("/user")
            .then((e)=>{
                const userDataFromResponse: UserDatas = e.data.user[0]    
                setContextDatas(userDataFromResponse)
                setLoad(true)
                console.log("rodando")
            })
        }
        
        getDatas()
    }, [fetch, setContextDatas])

    function changeButton() {
        setOpen(!open)

        if (open === false) {
            setFetch(!fetch)
        }
    }

    return (
        <>
            {open ? (
                !load ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <section className="form-body">
                        <button onClick={changeButton}><FaRegPenToSquare /></button>
                        <div className="personal-infos">
                            <img src={Img} alt='foto-de-perfil' />
                            <div className="name-and-age">
                                <p>Nome: {contextDatas?.name}</p>
                                <p>{contextDatas?.age} anos</p>
                            </div>
                        </div>
                        <div className="local-and-bio">
                            <div className="local-infos">
                                <p>Estado: {contextDatas?.state}</p>
                                <p>Bairro: {contextDatas?.neighborhood}</p>
                                <p>Rua: {contextDatas?.street}</p>
                            </div>
                            <div className="bio">
                                <p>{contextDatas?.bio}</p>
                            </div>
                        </div>
                    </section>
                )
            ) : (
                <div className='form-modal-area'>
                    <button onClick={changeButton}>
                        <MdArrowBack />
                    </button>
                    <FormModal />
                </div>
            )}
        </>
    );
}