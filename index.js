const express = require('express');
const { handler } = require('./controller'); // Main handler for incoming requests
const { axiosInstance } = require('./controller/lib/axios'); // Axios setup for Telegram API
const app = express();

// Retrieve environment variables
const port = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN; // Set this in your environment variables (e.g., Heroku config)
const HEROKU_APP_NAME = process.env.HEROKU_APP_NAME; // Set this to your Heroku app name

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Telegram Bot!');
});

// Route to handle Telegram webhook updates

app.post(`/bot${BOT_TOKEN}`, async (req, res) => {
  try {
    // Pass the request to the handler for processing
    const response = await handler(req.body);
    res.send(response || 'OK');
  } catch (error) {
    console.error('Error handling Telegram webhook:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Default route for other GET and POST requests
app.get('*', async (req, res) => {
  try {
    res.send(await handler(req));
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.post('*', async (req, res) => {
  try {
    res.send(await handler(req));
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// Start the server and set up Telegram webhook
app.listen(port, async (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }

  console.log(`Server is running at port ${port}`);

  // Set Telegram webhook when the server starts
  const webhookUrl = `https://${HEROKU_APP_NAME}.herokuapp.com/bot${BOT_TOKEN}`;
  try {
    const response = await axiosInstance.get(`setWebhook`, {
      params: { url: webhookUrl },
    });
    console.log('Webhook set successfully:', response.data);
  } catch (error) {
    console.error(
      'Error setting webhook:',
      error.response?.data || error.message
    );
  }
});
