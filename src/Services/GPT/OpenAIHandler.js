const { Configuration, OpenAIApi } = require("openai");

class OpenAIHandler {
  constructor(key) {
    this.configuration = new Configuration({
      apiKey: key,
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  async getChatResponse(message) {
    try {
      const originalHeaders = this.configuration.baseOptions.headers;
      delete this.configuration.baseOptions.headers["User-Agent"];

      const response = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      
      this.configuration.baseOptions.headers = originalHeaders;

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI API Error:", error);
      return "Error generating response";
    }
  }
}

module.exports = OpenAIHandler;
