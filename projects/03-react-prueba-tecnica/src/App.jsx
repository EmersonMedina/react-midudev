import './App.css'
import { useCatImage } from "./hooks/useCatImage"
import { useCatFact } from "./hooks/useCatFact"

const CAT_ENDPOINT_IMAGE_URL = 'https://cataas.com/cat/says/'

export function App () {
    const { fact, refreshFact } = useCatFact()
    const { imageUrl } = useCatImage({ fact })
    
    const handleClick = async () => {
        refreshFact()
    }

    return (
        <main className="main">
            <h1>App de gatitos</h1>

            {
                fact &&  
                <section>
                    <p>{fact}</p>
                    {imageUrl && <img src={imageUrl} alt={`Image extracted using the first word from ${imageUrl} `} />}
                    <button onClick={handleClick}>Get new fact</button>
                </section>

            }

            
        </main>
    )
}
