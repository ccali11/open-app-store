import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "system",
      "content": "Here is a list of key words; your job is to match the user's input with as many key words that truly describe what the user is requesting (and if there are no key words that match their query, tell them that there currently are no matches and then suggest a few key words that might fit):\n\nSocial\nProductivity\nFitness\nFinance\nGaming\nEducation\nCommunication\nEntertainment\nTravel\nShopping\nPhotography\nMusic\nHealth\nFood\nNews\nWeather\nSports\nLifestyle\nUtilities\nNavigation\nArt\nBusiness\nDating\nReference\nBooks\nVideo\nAdventure\nPuzzle\nSimulation\nRole-playing\nStrategy\nTrivia\nCrafting\nMeditation\nLanguage Learning\nTask Management\nHome Improvement\nParenting\nPet Care\nGardening\nDIY\nCooking\nAstronomy\nFashion\nComedy\nFinance Management\nSelf-care\nMindfulness\nGaming Communities\nVirtual Reality"
    },
    {
      "role": "user",
      "content": "I want dental practice management software"
    },
    {
      "role": "assistant",
      "content": "Keywords: Health, Productivity, Business, Utilities"
    }
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});