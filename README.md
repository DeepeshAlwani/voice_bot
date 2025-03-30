# Home.LLC Voice Bot Interview

A web-based interview bot that responds to voice questions as if it's a job candidate interviewing for a position in the AI Agent Team at Home.LLC.

## Features

- Voice recognition for asking interview questions
- OpenAI GPT-3.5 Turbo powered responses
- Text-to-speech output for interview answers
- Local and cloud deployment options
- Client-side API key management (no keys stored on server)

## Live Demo

You can try the live demo here: [https://your-github-username.github.io/home-llc-interview-bot](https://your-github-username.github.io/home-llc-interview-bot)

**Note:** You'll need to provide your own OpenAI API key to use the demo.

## Setup & Deployment Options

### Option 1: Local Development

1. Clone this repository:
   ```
   git clone https://github.com/your-username/home-llc-interview-bot.git
   cd home-llc-interview-bot
   ```

2. Install the required Python packages:
   ```
   pip install flask flask-cors openai
   ```

3. Run the Flask server:
   ```
   python app.py
   ```

4. Open `http://127.0.0.1:5000` in your browser.

5. Enter your OpenAI API key when prompted, then start asking interview questions.

### Option 2: GitHub Pages + Netlify Functions

This approach allows for serverless deployment:

1. Fork this repository on GitHub.

2. Sign up for [Netlify](https://netlify.com) if you don't have an account.

3. From your Netlify dashboard, choose "New site from Git" and select your GitHub repository.

4. Netlify will automatically detect the netlify.toml configuration and deploy the site.

5. Your interview bot will be available at the Netlify URL provided.

### Option 3: Direct GitHub Pages Deployment (Frontend Only)

If you don't want to set up Netlify Functions, you can deploy just the frontend to GitHub Pages:

1. Go to your repository settings on GitHub.

2. Scroll down to "GitHub Pages" section.

3. Choose "main" branch as the source and click Save.

4. Your site will be published at `https://your-username.github.io/home-llc-interview-bot`.

**Note:** With this method, users will need to run the backend locally to interact with the OpenAI API.

## Usage Instructions

1. Click "Show API Key Settings" and enter your OpenAI API key. This key is stored only in your browser's local storage and never sent to our servers.

2. Click "Start Interview Question" and ask your question when prompted.

3. Wait for the AI to process your question and provide a spoken response.

4. The response will be displayed on screen and read aloud using text-to-speech.

## Design Decisions & Approach

### Frontend

- Simple, clean interface using vanilla HTML, CSS, and JavaScript
- Web Speech API for voice recognition and text-to-speech
- Local storage for client-side API key management
- Responsive design for mobile and desktop use

### Backend

- Flask server for local development
- Netlify Functions for serverless deployment
- OpenAI GPT-3.5 Turbo for natural language responses
- System prompt customized for job interview responses

### Security

- API keys are managed client-side and never stored on the server
- CORS enabled for secure cross-origin requests
- Error handling with helpful user feedback

## Customization

### Changing the Interview Context

To modify the interview context, edit the system prompt in either `app.py` (for local development) or `functions/chat.js` (for Netlify deployment):

```python
# In app.py
{"role": "system", "content": "Your custom prompt here..."}
```

```javascript
// In functions/chat.js
{"role": "system", "content": "Your custom prompt here..."}
```

### Modifying the UI

The UI elements can be customized by editing the HTML and CSS in `index.html`.

## Troubleshooting

- **Speech recognition not working**: Make sure you're using a compatible browser (Chrome, Edge, or Safari) and have granted microphone permissions.
- **API key errors**: Verify your OpenAI API key is correct and has sufficient credits.
- **CORS issues**: If running locally, make sure the Flask server is running and CORS is properly configured.
- **Deployment issues**: Check Netlify deployment logs for any errors.

## License

[MIT License](LICENSE)