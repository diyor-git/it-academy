import {useEffect, useRef, useState} from 'react';
//Хук помогающий спрятать элемент если произошел event Click по документу
//Хук используется в ActionMenu.tsx
export default function useComponentVisible(initialIsVisible: boolean) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event: any) => {
        //@ts-ignore
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return {ref, isComponentVisible, setIsComponentVisible};
}