import { useState, useEffect, Dispatch, SetStateAction } from 'react';

const useStateWithLS = <Type, >(LsKey: string, defaultValue: Type): [Type, Dispatch<SetStateAction<Type>>] => {
    const currentLSvalue = localStorage.getItem(LsKey)

    const [value, setValue] = useState<Type>(
        currentLSvalue ? JSON.parse(currentLSvalue) : defaultValue
    );

    useEffect(() => {
        value && localStorage.setItem(LsKey, JSON.stringify(value));
    }, [value, LsKey]);

    return [value, setValue];
}

export default useStateWithLS;