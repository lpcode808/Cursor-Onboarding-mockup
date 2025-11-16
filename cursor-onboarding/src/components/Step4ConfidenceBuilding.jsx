import { useState } from 'react'
import './Step4ConfidenceBuilding.css'

function Step4ConfidenceBuilding({ onNext }) {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [userSolution, setUserSolution] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [completed, setCompleted] = useState(false)

  const challenges = [
    {
      title: 'Debug a React Hook',
      scenario: 'This component has a bug - the counter decreases instead of increases. How would you ask AI to fix it?',
      code: `function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count - 1); // Bug: should be +1
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}`,
      hint: 'Try: "Fix the increment function - it should increase the count, not decrease it"',
      expectedKeywords: ['fix', 'increment', 'increase'],
      aiResponse: 'I found the issue! The increment function uses count - 1 instead of count + 1. Here\'s the fix:',
      fixedCode: `const increment = () => {
  setCount(count + 1); // Fixed!
};`
    }
  ]

  const challenge = challenges[currentChallenge]

  const handleSolutionSubmit = (e) => {
    e.preventDefault()
    if (!userSolution.trim()) return

    // Simple keyword matching for demo
    const hasKeywords = challenge.expectedKeywords.some(keyword =>
      userSolution.toLowerCase().includes(keyword)
    )

    if (hasKeywords || userSolution.length > 10) {
      setCompleted(true)
    } else {
      setShowHint(true)
    }
  }

  return (
    <div className="step4-container">
      <div className="step-header fade-in">
        <h1>🎯 Final Challenge: Debug with Confidence</h1>
        <p>Apply what you've learned to solve a real coding problem</p>
      </div>

      <div className="challenge-layout">
        <div className="challenge-brief">
          <div className="challenge-badge">Challenge {currentChallenge + 1}</div>
          <h2>{challenge.title}</h2>
          <p className="scenario">{challenge.scenario}</p>

          <div className="buggy-code">
            <div className="code-header">
              <span>🐛 Buggy Code</span>
            </div>
            <pre className="code-display">
              <code>{challenge.code}</code>
            </pre>
          </div>

          {!completed && (
            <>
              <div className="task-prompt">
                <h3>Your Task:</h3>
                <p>Type what you would ask the AI to fix this bug</p>
              </div>

              <form onSubmit={handleSolutionSubmit} className="solution-form">
                <textarea
                  value={userSolution}
                  onChange={(e) => setUserSolution(e.target.value)}
                  placeholder="Type your question to AI here... (e.g., 'Fix the bug in the increment function')"
                  className="solution-input"
                  rows="3"
                />
                <button type="submit" className="btn btn-primary">
                  Ask AI →
                </button>
              </form>

              {showHint && (
                <div className="hint-box fade-in">
                  <div className="hint-icon">💡</div>
                  <div>
                    <strong>Hint:</strong>
                    <p>{challenge.hint}</p>
                  </div>
                </div>
              )}
            </>
          )}

          {completed && (
            <div className="ai-response-panel fade-in">
              <div className="ai-header">
                <div className="ai-avatar-large">🤖</div>
                <div>
                  <strong>AI Assistant</strong>
                  <p>Analyzed your code</p>
                </div>
              </div>

              <div className="ai-explanation">
                <p>{challenge.aiResponse}</p>
              </div>

              <div className="fixed-code">
                <div className="code-header">
                  <span>✅ Fixed Code</span>
                  <span className="success-badge">Problem Solved!</span>
                </div>
                <pre className="code-display">
                  <code>{challenge.fixedCode}</code>
                </pre>
              </div>

              <div className="success-message">
                <div className="success-icon">🎉</div>
                <h3>Excellent Work!</h3>
                <p>
                  You successfully identified the problem and knew how to ask AI for help.
                  This is exactly how you'll use Cursor in real development!
                </p>
                <button className="btn btn-primary" onClick={onNext}>
                  Complete Onboarding →
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="tips-panel">
          <h3>💪 Confidence Tips</h3>
          <div className="tip-card">
            <div className="tip-icon">🎯</div>
            <div className="tip-content">
              <h4>Be Specific</h4>
              <p>Describe what's wrong and what you want instead</p>
            </div>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🔍</div>
            <div className="tip-content">
              <h4>Provide Context</h4>
              <p>Mention the function or component name</p>
            </div>
          </div>
          <div className="tip-card">
            <div className="tip-icon">💬</div>
            <div className="tip-content">
              <h4>Conversational Style</h4>
              <p>Talk to AI like a pair programmer</p>
            </div>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🔄</div>
            <div className="tip-content">
              <h4>Iterate Freely</h4>
              <p>Don't worry about perfect prompts - AI understands!</p>
            </div>
          </div>

          <div className="encouragement-box">
            <p>
              <strong>Remember:</strong> You don't need to be an AI expert.
              Just describe the problem like you would to a colleague!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step4ConfidenceBuilding
