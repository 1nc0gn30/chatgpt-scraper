ChatGPT-Scraper

ChatGPT-Scraper is a powerful chatbot tool that leverages OpenAI's GPT models to engage in interactive conversations. What sets this chatbot apart is its ability to scrape the internet, specifically utilizing Google's Custom Search API to fetch search results based on user queries.
Features

    Conversational AI: Engage in dynamic conversations using OpenAI's GPT models.
    Internet Scraping: Search Google directly from the chat interface.
    Conversation History: Maintain a conversation history for context-aware responses.
    Easy Integration: Designed to be integrated into various platforms and applications.

Installation

    Clone the Repository:

    bash

git clone https://github.com/1nc0gn30/chatgpt-scraper.git

Install Dependencies:

bash

    npm install axios

    Set Up API Keys: Make sure to set up your OpenAI API key and Google Custom Search API key in the script.

Usage

    Include the Script: Import the ChatGPT class into your project.
    Create an Instance: Initialize the chatbot with your OpenAI API key.
    Send Messages: Use the generateResponse method to send messages and receive responses.
    Search the Web: Utilize the special 'search:' command to search Google directly from the chat interface.

Example

javascript

const chatGPT = new ChatGPT(apiKey);
chatGPT.generateResponse('Hello, ChatGPT!').then(response => {
  console.log(response); // Output: Hello, User!
});

Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.
License

This project is licensed under the MIT License - see the LICENSE.md file for details.
Support

If you encounter any issues or have questions, please open an issue or contact the maintainer.
