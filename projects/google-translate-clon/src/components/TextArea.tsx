import { Form } from "react-bootstrap"
import { SectionType } from "../types.d"

interface Props { 
    type: SectionType,
    loading?: boolean, 
    onChange: (value: string) => void, 
    value: string 
}
const commonStyles = { border: 0,  height: '200px', resize: 'none' } 
const getPlaceholder = ({type, loading}: { type: SectionType, loading?: boolean}) => {
    if (type === SectionType.From) return 'Introducir texto'
    if (loading) return 'Cargando...'
    return 'Traducción'
}
export const TextArea = ({ loading, value, type, onChange}: Props) => {
    const styles = type === SectionType.From 
        ?  commonStyles
        : { ...commonStyles }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    return (
        <Form.Control 
            autoFocus={type === SectionType.From}
            as='textarea'
            disabled={ type === SectionType.To }
            placeholder={getPlaceholder({ type, loading })}
            style={styles as React.CSSProperties}
            value={value}
            onChange={handleChange}
        />
    )
}