import './form.css'
import api from '../../api'
import { useEffect, useState } from 'react'
import FormModal from '../FormModal'
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdArrowBack } from "react-icons/md";
import  Img  from "../../assets/minhafoto.jpg"


export interface UserDatas {
    name: string,
    age: number,
    street: string,
    neighborhood: string,
    state: string,
    bio: string,
}

export default function Form() {

    const [datas, setDatas] = useState<UserDatas | null>(null)
    const [open, setOpen] = useState<boolean>(true)
    
    useEffect(()=>{
        async function getDatas() {
            await api.get("/user")
            .then((e)=>{
                const userDataFromResponse: UserDatas = e.data.user[0]    
                setDatas(userDataFromResponse)
            })
        }
        
        getDatas()
    }, [open])

    function changeButton() {
        setOpen(!open)
    }

    return(
        <>
        {open ? 
        <section className="form-body">
            <button onClick={changeButton}><FaRegPenToSquare /></button>
            <div className="personal-infos">
                <img src={Img} alt='foto-de-perfil' />
                <div className="name-and-age">
                    <p>Nome: {datas?.name}</p>
                    <p>{datas?.age} anos</p>
                </div>
            </div>
            <div className="local-and-bio">
                <div className="local-infos">
                    <p>Estado: {datas?.state}</p>
                    <p>Bairro: {datas?.neighborhood}</p>
                    <p>Rua: {datas?.street}</p>
                </div>
                <div className="bio">
                    <p>{datas?.bio}</p>
                </div>
            </div>
        </section>
        :
        <div className='form-modal-area'>
        <button onClick={changeButton}>
            <MdArrowBack />
        </button>
        <FormModal />
        </div>
            
    }
        </>
    )
}