const axios = require('axios');

// Function to handle Instagram webhook events
const webhookHandler = async (req, res) => {
    try {
        const body = req.body;
        console.log("Received webhook body:", body);

        // Check if the event is from Instagram
        if (body.object === 'instagram') {
            body.entry.forEach(entry => {
                const comment = entry.changes[0].value;
                const commentText = comment.text.toLowerCase(); // Use 'message' for comment text
                const commentId = comment.id;
                const userId = comment.from.id; // Use the user's ID for replies

                // If the comment contains "price please", send a private reply
                if (commentText.includes('price please')) {
                    sendPrivateReply(userId, 'The price is $100. Please contact us for more details.');
                    replyingToComment(commentId, 'The price is $100. Please contact us for more details.');
                }
            });

            // Send acknowledgment to Instagram
            res.status(200).send('EVENT_RECEIVED');
        } else {
            // If it's not from Instagram, send 404
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).send('Error');
    }
};

// Function to send a private reply
const sendPrivateReply = async (userId, messageText) => {
    const accessToken = process.env.PAGE_ACCESS_TOKEN;
    const url = `https://graph.facebook.com/v20.0/me/messages?access_token=${accessToken}`;

    const maxRetries = 3; // Maximum number of retries
    let retryCount = 0;

    while (retryCount < maxRetries) {
        try {
            const response = await axios.post(url, null, {
                params: {
                    recipient: JSON.stringify({ id: userId }),
                    message: JSON.stringify({ text: messageText }),
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                console.log('Message sent successfully:', response.data);
                return; // Exit on successful message send
            }
        } catch (error) {
            const statusCode = error.response ? error.response.status : null;
            const errorMessage = error.response ? error.response.data : error.message;

            console.error(`Error sending message to user ${userId}:`, errorMessage);

            // Handle specific error scenarios
            if (statusCode === 429) {
                console.warn(`Rate limit reached. Retrying in ${Math.pow(2, retryCount)} seconds...`);
                await sleep(Math.pow(2, retryCount) * 1000); // Exponential backoff
            } else if (statusCode === 200 || statusCode === 403) {
                console.warn(`Message was not delivered to user ${userId} due to privacy settings.`);
                return; // Exit as there's no point in retrying for privacy settings
            } else {
                console.error(`An unexpected error occurred: ${errorMessage}`);
                break; // Exit loop for other errors
            }
        }
        retryCount++;
    }

    console.error(`Failed to send message to user ${userId} after ${maxRetries} attempts.`);
};

// Function to send a direct message in response to a comment
const replyingToComment = async (commentId, message) => {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  
    // Correct Instagram Graph API endpoint for replying to a comment
    const url = `https://graph.facebook.com/v20.0/${commentId}/replies?access_token=${accessToken}`;
  
    try {
        const response = await axios.post(url, {
            message: message // Pass the message directly as a body parameter
        });
  
        if (response.status === 200) {
            console.log(`Message sent successfully to comment: ${commentId}`);
        }
    } catch (error) {
        console.error(`Error sending message to comment ${commentId}:`, error.response ? error.response.data : error.message);
    }
  
  };

// Utility function to sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = webhookHandler;
