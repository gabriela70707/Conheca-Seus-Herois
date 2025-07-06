import { useEffect, useState } from "react";

export function usePersonagens(){
    const [personagens, setPersonagens] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/personagens`)
        .then(res => {
            if(!res.ok) throw new Error("Erro ao buscar personagens");
            return res.json();
        })
        .then(data => {
            setPersonagens(data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }, [])
    return { personagens, loading };
}