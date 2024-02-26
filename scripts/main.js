```javascript
let message = [];
let systemprompt = "Hello, I'm your AI assistant. How can I assist you today?";
let userprompt = "";

document.getElementById('sendButton').addEventListener('click', function() {
    userprompt = document.getElementById('inputBox').value;
    document.getElementById('inputBox').value = "";
    document.getElementById('sendButton').disabled = true;

    message.push({"role": "system", "content": systemprompt});
    message.push({"role": "user", "content": userprompt});

    fetch('scripts/openai_api.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: message,
            temperature: 0.2,
            max_tokens: 4000,
            frequency_penalty: 0.9
        }),
    })
    .then(response => response.json())
    .then(data => {
        let gpt_message = data.choices[0].message.content;
        message.push({"role": "assistant", "content": gpt_message});
        document.getElementById('chatHistory').innerHTML += `<p>${gpt_message}</p>`;
        document.getElementById('sendButton').disabled = false;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
```