import "./App.css"
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack  } from "react-bootstrap";
import { useDebounce } from "./hooks/useDebounce";
import { useStore } from "./hooks/useStore";
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from "./constants";
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from "./components/icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { SectionType } from "./types.d";
import { TextArea } from "./components/TextArea";
import { useEffect } from "react";
import { translate } from "./services/translate";
import { ToastContainer, toast } from 'react-toastify';
function App() {
  const { loading, fromLanguage, toLanguage, setToLanguage, interchangeLanguages, setFromLanguage, setFromText, setResult, fromText, result} = useStore()

  const debouncedFromText = useDebounce(fromText)
  const handleClipboard = () => {
    navigator.clipboard.writeText(result)
    const notify = () => toast("🦖 Translation copied to clipboard!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    notify()
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }


  useEffect(() => {
    if ( debouncedFromText === '') return
    translate({fromLanguage, toLanguage, text: debouncedFromText}).then((result) => {
      if (result == null) return //compara si es null o undefined ( usando typescript )
      setResult(result)
    }).catch(() => { setResult('Error') })
  }
  ,[debouncedFromText, fromLanguage, toLanguage])

  return (
    <Container fluid>
      <ToastContainer />
      <h2 className="text-center">Google Translate Clone</h2>
      <Row data-bs-theme="dark"> 
        <Col> 
          <Stack gap={2}>
            <LanguageSelector 
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea 
              value={fromText}
              type={SectionType.From}
              onChange={setFromText}
              loading={loading}
            />
          </Stack>          
        </Col>
        <Col xs="auto"> 
          <Button variant="link" disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcon/>
          </Button>
        </Col>
        <Col> 
          <Stack gap={2}>
            <LanguageSelector 
              type={SectionType.To} 
              value={toLanguage} 
              onChange={setToLanguage}
            />
            <div style={{ position: 'relative'}}>
            <TextArea
              loading={loading}
              type={SectionType.To}
              value={result}
              onChange={setResult}
            />

            <div style={{ position: 'absolute', left:0, bottom: 0, display: 'flex' }}>
              <Button 
                variant="link" 
                onClick={handleClipboard}
                disabled={fromText === ''}
              >
                <ClipboardIcon/>
              </Button>
              <Button 
                variant="link" 
                onClick={handleSpeak}
                disabled={result === ''}
              >
                <SpeakerIcon/>
              </Button>
            </div>
            </div>
        </Stack>

        </Col>
      </Row>
    </Container>
  );
}

export default App;
