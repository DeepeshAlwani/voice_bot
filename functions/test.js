// Save this as functions/test.js
exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      message: "Test function is working!",
      received: event.body ? JSON.parse(event.body) : null
    })
  };
};
