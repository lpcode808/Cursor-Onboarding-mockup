import { useState, useEffect } from 'react'
import './Step1MagicMoment.css'

function Step1MagicMoment({ onNext }) {
  const [stage, setStage] = useState(0)
  const [typedCode, setTypedCode] = useState('')
  const [showContinue, setShowContinue] = useState(false)

  const userPrompt = "Create a React component that fetches and displays user data from an API with loading and error states"

  const generatedCode = `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!user) return null;

  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

export default UserProfile;`

  useEffect(() => {
    if (stage === 1) {
      // Simulate typing effect
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex <= generatedCode.length) {
          setTypedCode(generatedCode.slice(0, currentIndex))
          currentIndex += 3
        } else {
          clearInterval(typingInterval)
          setTimeout(() => setStage(2), 500)
        }
      }, 20)

      return () => clearInterval(typingInterval)
    }
  }, [stage])

  useEffect(() => {
    if (stage === 2) {
      setTimeout(() => setShowContinue(true), 1000)
    }
  }, [stage])

  return (
    <div className="step1-container">
      <div className="step-header fade-in">
        <h1>✨ The AI Magic Moment</h1>
        <p>Watch AI write production-ready code in seconds</p>
      </div>

      <div className="demo-container">
        {stage === 0 && (
          <div className="intro-panel fade-in">
            <h2>Imagine this common scenario:</h2>
            <p>You need to create a React component to fetch and display user data. Typically, you'd spend 10-15 minutes writing boilerplate code, handling edge cases, and debugging.</p>
            <p className="highlight">With Cursor's AI, watch what happens...</p>
            <button className="btn btn-primary" onClick={() => setStage(1)}>
              See the Magic ✨
            </button>
          </div>
        )}

        {stage >= 1 && (
          <div className="editor-simulation fade-in">
            <div className="editor-header">
              <div className="editor-tabs">
                <div className="tab active">UserProfile.jsx</div>
              </div>
              <div className="editor-controls">
                <span className="ai-badge">AI Generating...</span>
              </div>
            </div>

            <div className="editor-split">
              <div className="chat-panel">
                <div className="chat-header">
                  <span className="chat-icon">💬</span>
                  <span>AI Assistant</span>
                </div>
                <div className="chat-messages">
                  <div className="user-message">
                    {userPrompt}
                  </div>
                  {stage >= 2 && (
                    <div className="ai-message slide-in">
                      <div className="ai-avatar">🤖</div>
                      <div className="ai-content">
                        <p>I've created a UserProfile component with:</p>
                        <ul>
                          <li>✓ Async data fetching with error handling</li>
                          <li>✓ Loading state management</li>
                          <li>✓ Clean error messages</li>
                          <li>✓ Responsive user display</li>
                        </ul>
                        <p className="ai-tip">
                          <strong>Tip:</strong> You can customize the API endpoint or add more fields as needed!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="code-panel">
                <div className="code-header">
                  <span>Generated Code</span>
                  <div className="code-actions">
                    <button className="action-btn">Accept</button>
                    <button className="action-btn">Reject</button>
                  </div>
                </div>
                <pre className="code-display">
                  <code>{typedCode}</code>
                  <span className="cursor-blink">|</span>
                </pre>
              </div>
            </div>
          </div>
        )}

        {stage === 2 && showContinue && (
          <div className="success-panel fade-in">
            <div className="success-message">
              <div className="success-icon">🎉</div>
              <h3>Production-Ready Code in 15 Seconds!</h3>
              <p>
                What you just witnessed would typically take 10-15 minutes to write manually.
                Cursor's AI understood the context, implemented best practices, and handled edge cases automatically.
              </p>
              <div className="stats">
                <div className="stat">
                  <div className="stat-value">15s</div>
                  <div className="stat-label">Generation Time</div>
                </div>
                <div className="stat">
                  <div className="stat-value">40</div>
                  <div className="stat-label">Lines of Code</div>
                </div>
                <div className="stat">
                  <div className="stat-value">100%</div>
                  <div className="stat-label">Best Practices</div>
                </div>
              </div>
              <button className="btn btn-primary" onClick={onNext}>
                Try It Yourself →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Step1MagicMoment
