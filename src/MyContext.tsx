import { createContext, useState, Dispatch, SetStateAction } from "react";
import { UserDatas } from "./components/Form";

type MyContextProviderProps = {
    children: React.ReactNode;   //children aceita qualquer elemento react como filho
};

interface ContextType { //descreve a estrutura do contexto
    contextDatas: UserDatas | null;
    setContextDatas: Dispatch<SetStateAction<UserDatas | null>>; //função que aceita novos estados, semelhante ao useState
}

const defaultContext: ContextType = { //seta valores padrão para o contexto
    contextDatas: null,
    setContextDatas: () => {},
};

export const MyContext = createContext<ContextType>(defaultContext); //cria um contexto com tipo e valor inicial padrão

export const MyContextProvider = ({ //cria o provedor do contexto e define o tipo de children
    children,
}: MyContextProviderProps) => {
    const [contextDatas, setContextDatas] = useState<UserDatas | null>(null)

    return <MyContext.Provider value={{
        contextDatas,
        setContextDatas
    }}>
    {children}
    </MyContext.Provider>
}