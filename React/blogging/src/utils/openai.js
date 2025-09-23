import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: import.meta.env.VITE_REACT_APP_API_KEY_GPT,
    dangerouslyAllowBrowser: true
})
export default openai;