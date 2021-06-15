import { useState, useEffect } from 'react';

const useStateWithLS = (LsKey, defaultValue) => {
    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem(LsKey)) || defaultValue
    );

    useEffect(() => {
        value && localStorage.setItem(LsKey, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}

export default useStateWithLS;