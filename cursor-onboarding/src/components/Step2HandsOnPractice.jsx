import { useState } from 'react'
import './Step2HandsOnPractice.css'

function Step2HandsOnPractice({ onNext }) {
  const [userInput, setUserInput] = useState('')
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "Hi! I'm your AI coding assistant. Let's practice together. Try asking me to help you write a function. For example: 'Write a function to validate an email address'"
    }
  ])
  const [showHint, setShowHint] = useState(true)
  const [completed, setCompleted] = useState(false)

  // Wizard-of-Oz: Hardcoded responses based on keywords
  const getAIResponse = (input) => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes('email') && lowerInput.includes('validat')) {
      return {
        content: "Great! Here's an email validation function with regex:",
        code: `function validateEmail(email) {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}

// Usage:
console.log(validateEmail('user@example.com')); // true
console.log(validateEmail('invalid-email')); // false`,
        explanation: "This function uses a regular expression to check if the email has a valid format. It ensures there's text before and after the @ symbol, and a domain extension."
      }
    }

    if (lowerInput.includes('sort') || lowerInput.includes('array')) {
      return {
        content: "I'll help you sort an array:",
        code: `function sortArray(arr, ascending = true) {
  return [...arr].sort((a, b) => {
    return ascending ? a - b : b - a;
  });
}

// Usage:
const numbers = [5, 2, 8, 1, 9];
console.log(sortArray(numbers)); // [1, 2, 5, 8, 9]
console.log(sortArray(numbers, false)); // [9, 8, 5, 2, 1]`,
        explanation: "This function creates a copy of the array and sorts it. The second parameter lets you choose ascending or descending order."
      }
    }

    if (lowerInput.includes('fetch') || lowerInput.includes('api') || lowerInput.includes('data')) {
      return {
        content: "Here's a clean way to fetch data from an API:",
        code: `async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Usage:
const result = await fetchData('https://api.example.com/data');
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}`,
        explanation: "This async function handles API calls with proper error handling. It returns a consistent response format whether the request succeeds or fails."
      }
    }

    // Default helpful response
    return {
      content: "I can help with that! For this demo, try asking me about:",
      suggestions: [
        "- Email validation",
        "- Sorting arrays",
        "- Fetching data from APIs"
      ]
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userInput.trim()) return

    // Add user message
    const newMessages = [...messages, { type: 'user', content: userInput }]
    setMessages(newMessages)
    setShowHint(false)

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = getAIResponse(userInput)
      setMessages([...newMessages, { type: 'ai', ...response }])

      // Check if they completed a valid task
      if (response.code) {
        setTimeout(() => setCompleted(true), 1000)
      }
    }, 800)

    setUserInput('')
  }

  return (
    <div className="step2-container">
      <div className="step-header fade-in">
        <h1>💬 Your Turn: Chat with AI</h1>
        <p>Experience AI-assisted coding through conversation</p>
      </div>

      <div className="practice-layout">
        <div className="instructions-panel">
          <h3>🎯 Your Task</h3>
          <p>Ask the AI to help you write a function. Try to be specific about what you want!</p>

          {showHint && (
            <div className="hint-box fade-in">
              <div className="hint-icon">💡</div>
              <div>
                <strong>Try asking:</strong>
                <ul>
                  <li>"Write a function to validate an email address"</li>
                  <li>"Help me sort an array of numbers"</li>
                  <li>"Show me how to fetch data from an API"</li>
                </ul>
              </div>
            </div>
          )}

          {completed && (
            <div className="completion-box fade-in">
              <div className="completion-icon">🎉</div>
              <div>
                <strong>Excellent!</strong>
                <p>You just experienced AI pair programming. Notice how the AI:</p>
                <ul>
                  <li>✓ Understood your intent</li>
                  <li>✓ Wrote clean, working code</li>
                  <li>✓ Explained the solution</li>
                  <li>✓ Included usage examples</li>
                </ul>
                <button className="btn btn-primary" onClick={onNext}>
                  Continue to Feature Tour →
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="chat-interface">
          <div className="chat-container">
            <div className="messages-area">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.type}-msg slide-in`}>
                  <div className="message-avatar">
                    {msg.type === 'ai' ? '🤖' : '👤'}
                  </div>
                  <div className="message-content">
                    <p>{msg.content}</p>
                    {msg.code && (
                      <div className="code-block">
                        <div className="code-header">
                          <span>Generated Code</span>
                          <button className="copy-btn">Copy</button>
                        </div>
                        <pre><code>{msg.code}</code></pre>
                      </div>
                    )}
                    {msg.explanation && (
                      <div className="explanation">
                        <strong>Explanation:</strong> {msg.explanation}
                      </div>
                    )}
                    {msg.suggestions && (
                      <div className="suggestions">
                        {msg.suggestions.map((sugg, i) => (
                          <div key={i}>{sugg}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form className="chat-input-area" onSubmit={handleSubmit}>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask AI to help you write code..."
                className="chat-input"
              />
              <button type="submit" className="send-btn">
                Send →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step2HandsOnPractice
