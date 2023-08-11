class ChatGPT {
  constructor(apiKey, model = 'gpt-3.5-turbo') {
    this.apiKey = apiKey;
    this.model = model;
    this.url = `https://api.openai.com/v1/chat/completions`;
    this.config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      }
    };
    // Added to maintain a conversation history
    this.conversationHistory = [];
  }

  async searchGoogle(query) {
    const apiKey = 'Replace with Your Google Search API make sure you set your settings right';
    const cx = 'Replace';
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

    try {
      const response = await axios.get(url);
      return response.data.items; // Return the search results
    } catch (error) {
      console.error('Error searching Google:', error);
      return []; // Return an empty array in case of an error
    }
  }

  async generateResponse(userMessage, temperature = 0.7) {
    // Add new user message to the conversation history
    this.conversationHistory.push({
      'role': 'user',
      'content': userMessage
    });

    // Prepare messages object for the API
    const messages = [
      {
        'role': 'system',
        'content': 'Replace'
      },
      ...this.conversationHistory // Include conversation history
    ];
    const data = {
      model: this.model,
      messages,
      temperature,
    };

    try {
      const response = await axios.post(this.url, data, this.config);
      // Add AI's message to the conversation history
      this.conversationHistory.push({
        'role': 'assistant',
        'content': response.data.choices[0].message.content.trim()
      });

      const assistantMessage = response.data.choices[0].message.content.trim();

      // Perform Google Search if user message contains 'search:'
      if (userMessage.toLowerCase().startsWith('search:')) {
        const query = userMessage.slice(7).trim();
        const searchResults = await this.searchGoogle(query);

        // Format the search results as part of the AI's response
        let searchResponse = 'Here are some search results:\n';
        searchResults.forEach((result, index) => {
          searchResponse += `${index + 1}. ${result.title}\n${result.snippet}\n${result.link}\n\n`;
        });

        return `${assistantMessage}\n\n${searchResponse}`;
      }

      return assistantMessage;
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      return 'Sorry, an error occurred. Please try again.';
    }
  }
}

const apiKey = 'Replace with your ChatGPT API make sure you have all settings fixed in openai';
const chatGPT = new ChatGPT(apiKey);

const messageInput = document.getElementById('messageInput');
const submitBtn = document.getElementById('submitBtn');
const responseArea = document.getElementById('responseArea');
const loading = document.getElementById('loading');

function sendMessage() {
  const userMessage = messageInput.value;
  if (userMessage) {
    displayResponse(userMessage, 'user');
    messageInput.value = '';
    loading.style.display = 'block';

    chatGPT.generateResponse(userMessage)
      .then(response => {
        displayResponse(response, 'assistant');
        loading.style.display = 'none';
        responseArea.scrollTop = responseArea.scrollHeight;
      })
      .catch(error => {
        console.error(`An error occurred: ${error}`);
        loading.style.display = 'none';
      });
  }
}

submitBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

function displayResponse(response, role) {
  const responseElement = document.createElement('p');
  responseElement.textContent = response;
  responseElement.className = role;
  responseArea.appendChild(responseElement);
}
