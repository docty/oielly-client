import { createContext, useContext, useState } from 'react';
import { IProduct, IUserContext } from '../interface/type';

const UserContext = createContext<IUserContext>({} as IUserContext);


export const Standard = ({children}: any) => { 

    
    const [state, dispatch] = useState<IProduct[]>([]);
     
    return(
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    );
}

export const useAuth = () => {
    const {state, dispatch} = useContext<any>(UserContext);
    return [state, dispatch];
}




