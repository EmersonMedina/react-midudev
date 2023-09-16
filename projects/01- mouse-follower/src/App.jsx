import { useEffect, useState} from "react"

function App() {

  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})

  useEffect(() => {
    
    const handleMove = (e) => {
      const { clientX, clientY } = e

      setPosition({x: clientX, y: clientY})
    }
    
    if (enabled) {
      window.addEventListener('mousemove', handleMove)
    }

    //cleanup 
    //Cuando el componente se desmonta, remover el evento
    //Cuando cambian las dependencias, antes de ejecutar
    return () => {
      window.removeEventListener('mousemove', handleMove)
    }
  }, [enabled])

  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        { enabled ? "Desactivar" : "Activar"} seguir puntero
      </button>
    </main>
  )
}

export default App
