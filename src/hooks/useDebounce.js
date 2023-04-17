import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value); //delay에 입력된 초수만큼 딜레이됨
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [value, delay])

    return debounceValue
}