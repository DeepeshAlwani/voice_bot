const { OpenAI } = require('openai');

exports.handler = async function(event, context) {
  // Enhanced CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };
  
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Preflight call successful' })
    };
  }
  
  try {
    // Log the incoming request for debugging
    console.log('Request body:', event.body);
    
    // Parse request body
    const data = JSON.parse(event.body);
    const question = data.question || '';
    const apiKey = data.api_key || '';
    
    if (!apiKey) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ answer: 'Error: No API key provided. Please provide your OpenAI API key.' })
      };
    }
    
    if (!question) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ answer: "I didn't catch your question. Could you please repeat it?" })
      };
    }
    
    // Initialize OpenAI with the provided API key
    const openai = new OpenAI({ apiKey });
    
    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are a job candidate being interviewed for a position in the AI Agent Team at Home.LLC. Answer as if you are in a job interview, showcasing your skills, experience, and personality."},
        {"role": "user", "content": question}
      ],
      max_tokens: 150,
      temperature: 0.7,
    });
    
    const answer = response.choices[0].message.content.trim();
    console.log('OpenAI response:', answer);
    
    // Return the response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ answer })
    };
    
  } catch (error) {
    console.error('Error:', error);
    
    // More detailed error response
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        answer: `I apologize, but I encountered an error: ${error.message}`,
        error: error.message,
        stack: error.stack
      })
    };
  }
};
