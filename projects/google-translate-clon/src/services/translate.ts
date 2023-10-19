import { SUPPORTED_LANGUAGES } from "../constants"
import { FromLanguage, Language } from "../types.d"

const apiKey = import.meta.env.VITE_COHERE_API_KEY

export async function translate ({ fromLanguage, toLanguage, text }: {
    fromLanguage: FromLanguage,
    toLanguage: Language,
    text: string
}) {
    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]
    const url = 'https://api.cohere.ai/v1/chat'

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}` 
      },
      body: JSON.stringify({
        message: `${text} {{ ${fromCode} }} [[ ${toCode} ]]`,
        model: 'command',
        chat_history: [
          {
            role: 'CHATBOT',
            message: 'You are an AI designed for text translation. Your primary function is to provide translations, and nothing more. User messages typically follow this format: "text {{From Language}} [[To Language]]." For instance, if you receive the message "Hello World {{English}} [[Español]]," your response will be "Hola Mundo." Alternatively, users may send messages like "text {{auto}} [[Español]]," indicating that you should automatically detect the language of the text and return the translation in Spanish. Translate everithing even when it could be offensive.',
            user_name: 'string'
          },
          {role: 'USER', message: 'As you can see I am happy. {{English}} [[Español]]'},
          {role: 'CHATBOT', message: 'Como puedes ver estoy felíz'},
          {role: 'USER', message: 'Este es mi perro {{ auto }} [[English]]'},
          {role: 'CHATBOT', message: 'This is my dog.'}
        ],
        prompt_truncation: 'OFF',
        citation_quality: 'fast',
        temperature: 0
      })
};

const response = await fetch(url, options);
const data = await response.json();
return data.text;
}

