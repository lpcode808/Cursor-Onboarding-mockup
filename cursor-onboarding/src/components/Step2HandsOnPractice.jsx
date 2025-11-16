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
  const [copiedIndex, setCopiedIndex] = useState(null)

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

    if (lowerInput.includes('debug') || lowerInput.includes('error') || lowerInput.includes('fix')) {
      return {
        content: "Let me help you debug! Here's a function with comprehensive error handling:",
        code: `function processUserData(user) {
  // Validate input
  if (!user) {
    throw new Error('User object is required');
  }

  if (!user.email || !user.name) {
    throw new Error('User must have email and name');
  }

  // Process with error handling
  try {
    const normalized = {
      name: user.name.trim(),
      email: user.email.toLowerCase(),
      createdAt: new Date().toISOString()
    };

    console.log('User processed:', normalized);
    return normalized;
  } catch (error) {
    console.error('Processing failed:', error);
    throw error;
  }
}`,
        explanation: "Good debugging includes validation, clear error messages, and try-catch blocks. This helps you identify issues quickly."
      }
    }

    if (lowerInput.includes('test') || lowerInput.includes('unit')) {
      return {
        content: "Great! Here's how to write a simple unit test:",
        code: `// Function to test
function add(a, b) {
  return a + b;
}

// Test cases
function testAdd() {
  console.assert(add(2, 3) === 5, 'Should add positive numbers');
  console.assert(add(-1, 1) === 0, 'Should handle negative numbers');
  console.assert(add(0, 0) === 0, 'Should handle zeros');
  console.log('✅ All tests passed!');
}

// Run tests
testAdd();

// Or with Jest/Vitest:
describe('add function', () => {
  test('adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });
});`,
        explanation: "Testing ensures your code works as expected. Start simple with console.assert, then graduate to testing frameworks like Jest or Vitest."
      }
    }

    if (lowerInput.includes('refactor') || lowerInput.includes('improve') || lowerInput.includes('clean')) {
      return {
        content: "I'll show you a refactoring example - transforming messy code into clean code:",
        code: `// Before: Nested and hard to read
function getUserStatus(user) {
  if (user) {
    if (user.active) {
      if (user.verified) {
        return 'active-verified';
      } else {
        return 'active-unverified';
      }
    } else {
      return 'inactive';
    }
  } else {
    return 'no-user';
  }
}

// After: Clean and readable
function getUserStatus(user) {
  if (!user) return 'no-user';
  if (!user.active) return 'inactive';
  return user.verified ? 'active-verified' : 'active-unverified';
}`,
        explanation: "Refactoring improves code readability without changing functionality. Use early returns, avoid deep nesting, and choose descriptive names."
      }
    }

    if (lowerInput.includes('database') || lowerInput.includes('sql') || lowerInput.includes('query')) {
      return {
        content: "Here's a safe database query pattern with parameterization:",
        code: `// Using parameterized queries (prevents SQL injection)
async function getUserByEmail(email) {
  const query = \`
    SELECT id, name, email, created_at
    FROM users
    WHERE email = $1
    LIMIT 1
  \`;

  try {
    const result = await db.query(query, [email]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Database query failed:', error);
    throw new Error('Failed to fetch user');
  }
}

// Usage:
const user = await getUserByEmail('user@example.com');
if (user) {
  console.log('Found user:', user);
}`,
        explanation: "Always use parameterized queries ($1, $2, etc.) instead of string concatenation. This prevents SQL injection attacks and handles escaping automatically."
      }
    }

    if (lowerInput.includes('component') || lowerInput.includes('react')) {
      return {
        content: "Let me create a React component with hooks and best practices:",
        code: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}`,
        explanation: "This component demonstrates React hooks (useState, useEffect), async data fetching, loading states, and error handling - all essential patterns."
      }
    }

    // Default helpful response
    return {
      content: "I can help with that! For this demo, try asking me about:",
      suggestions: [
        "- Email validation",
        "- Sorting arrays",
        "- Fetching data from APIs",
        "- Debugging and error handling",
        "- Writing unit tests",
        "- Refactoring code",
        "- Database queries",
        "- Creating React components"
      ]
    }
  }

  const handleCopyCode = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
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
                          <button
                            className="copy-btn"
                            onClick={() => handleCopyCode(msg.code, idx)}
                          >
                            {copiedIndex === idx ? '✓ Copied!' : 'Copy'}
                          </button>
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
