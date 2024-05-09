import './modal.css'
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import  Img  from "../../assets/minhafoto.jpg"

import api from '../../api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


interface UserDatas {
    id: string,
    name: string,
    age: string,
    street: string,
    neighborhood: string,
    state: string,
    bio: string,
}

const dataSchema = z.object({
    name: z.string(),
    age: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    state: z.string(),
    bio: z.string(),
  })

    type DataSchema = z.infer<typeof dataSchema>

    export default function FormModal() {

    const { register, handleSubmit, setValue } = useForm<DataSchema>({
        resolver: zodResolver(dataSchema)
      })
      const [editDatas, setEditDatas] = useState<UserDatas | null>(null)

      useEffect(() => {
        let isMounted = true;
    
        async function getDatas() {
            await api.get("/user")
            .then((e) => {
                const userDataFromResponse: UserDatas = e.data.user[0];
                if (isMounted) {
                    setEditDatas(userDataFromResponse);
                }
            })
        }
    
        getDatas();
    
        if (editDatas && isMounted) {
            setValue("name", editDatas.name ?? "");
            setValue("age", editDatas.age ?? "");
            setValue("street", editDatas.street ?? "");
            setValue("neighborhood", editDatas.neighborhood ?? "");
            setValue("state", editDatas.state ?? "");
            setValue("bio", editDatas.bio ?? "");
            isMounted = false;
        }
  
        return () => {
            isMounted = false;
        };
    }, [editDatas, setValue]);
    
      async function handleSubmitZod(data: DataSchema) {
        const dataSaved = {
            id: editDatas?.id,
            ...data,
        };
        
        await api.put('/update',
        {
            "id": dataSaved.id,
            "name": dataSaved.name,
            "age": parseInt(dataSaved.age),
            "street": dataSaved.street,
            "state": dataSaved.state,
            "neighborhood": dataSaved.neighborhood,
            "bio": dataSaved.bio
        } 

        )
        .then(()=>{
            toast.success('Usuário atualizado com sucesso!')
        })
        .catch(()=>{
            toast.error('Erro ao atualizar usuário')
        });
    }
    
      return (
        <>
          <form className='modal-container' onSubmit={handleSubmit(handleSubmitZod)}>            
            <img src={Img} alt="m de perfil" style={{ width: '100px', height: '100px' }} />
            <label htmlFor='name'>Nome</label>
            <input type="text" id='name' {...register('name')} />
            <label htmlFor='age'>Idade</label>
            <input type="number" id='age'  {...register('age')} />
            <label htmlFor='street'>Rua</label>
            <input type="text" id='street' {...register('street')} />
            <label htmlFor='neighborhood'>Bairro</label>
            <input type="text" id='neighborhood' {...register('neighborhood')} />
            <label htmlFor='state'>Estado</label>
            <input type="text" id='state' {...register('state')} />
            <label htmlFor='bio'>Biografia</label>
            <textarea id='bio' {...register('bio')} />
            <button type="submit">Atualizar</button> 
            </form>
          </> 
      )
}