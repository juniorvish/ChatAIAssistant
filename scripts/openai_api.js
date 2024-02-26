// Import OpenAI
const openai = require('openai');

// Function to chat with AI
async function chatWithAI(userprompt, systemprompt) {
    let message = [];
    message.push({"role": "system", "content": systemprompt});
    message.push({"role": "user", "content": userprompt});

    let response = await openai.ChatCompletion.create({
        model: "gpt-4",
        messages: message,
        temperature: 0.2,
        max_tokens: 4000,
        frequency_penalty: 0.9
    });

    let gpt_message = response.choices[0].message.content;
    return gpt_message;
}

module.exports = chatWithAI;