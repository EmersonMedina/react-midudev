import { useEffect, useState } from "react"

const CAT_ENDPOINT_BASE_URL = 'https://cataas.com'

export function useCatImage({ fact }) {

    const [ imageUrl, setImageUrl ] = useState()

    useEffect(() => { 
        if (!fact) return

        const threeFirstWords = fact.split(' ').slice(0, 3).join(' ')

        fetch(`https://cataas.com/cat/says/${threeFirstWords}?json=true`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const { url } = data

                setImageUrl(url)
            }) 

     }, [fact])

     return { imageUrl: `${CAT_ENDPOINT_BASE_URL}${imageUrl}` }
}