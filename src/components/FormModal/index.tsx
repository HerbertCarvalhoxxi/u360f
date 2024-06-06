import './modal.css'
import { useForm } from "react-hook-form"
import { useEffect, useContext } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import  Img  from "../../assets/minhafoto.jpg"

import api from '../../api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from '../../MyContext'

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
      const { contextDatas } = useContext(MyContext)

      useEffect(() => {
            setValue("name", contextDatas?.name ?? "");
            setValue("age", contextDatas?.age ?? "");
            setValue("street", contextDatas?.street ?? "");
            setValue("neighborhood", contextDatas?.neighborhood ?? "");
            setValue("state", contextDatas?.state ?? "");
            setValue("bio", contextDatas?.bio ?? "");
            console.log("rodando 2")
    }, [contextDatas ,setValue]);
    
      async function handleSubmitZod(data: DataSchema) {
        const dataSaved = {
            id: contextDatas?.id,
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
            <img src={Img} alt="foto de perfil" style={{ width: '100px', height: '100px' }} />
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