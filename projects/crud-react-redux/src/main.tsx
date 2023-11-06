import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import customTheme from './theme.ts'

import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </Provider>
)
