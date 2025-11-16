import './WelcomeScreen.css'

function WelcomeScreen({ onNext }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-content fade-in">
        <h1 className="welcome-title">
          Welcome to <span className="gradient-text">Cursor</span>
        </h1>
        <p className="welcome-subtitle">
          The AI-powered code editor that makes development feel like magic
        </p>

        <div className="welcome-description">
          <p>
            This interactive guide will show you how AI can transform the way you code.
            In just 10 minutes, you'll experience:
          </p>
          <ul className="feature-list">
            <li>✨ AI-powered code generation and completion</li>
            <li>💬 Intelligent chat assistance for any coding question</li>
            <li>🔍 Smart debugging and code refactoring</li>
            <li>⚡ Productivity shortcuts that save hours every day</li>
          </ul>
        </div>

        <div className="pathway-selection">
          <h2>Choose your path:</h2>
          <div className="pathway-cards">
            <button className="pathway-card gradient-border active" onClick={onNext}>
              <div className="pathway-icon">🌱</div>
              <h3>New to AI Coding</h3>
              <p>Perfect if you're curious about AI-assisted development</p>
            </button>
            <button className="pathway-card gradient-border disabled">
              <div className="pathway-icon">⚡</div>
              <h3>Experienced Developer</h3>
              <p className="coming-soon">Coming soon</p>
            </button>
            <button className="pathway-card gradient-border disabled">
              <div className="pathway-icon">👥</div>
              <h3>Team Evaluation</h3>
              <p className="coming-soon">Coming soon</p>
            </button>
          </div>
        </div>

        <div className="welcome-footer">
          <p className="disclaimer">
            This is a proof-of-concept demonstration simulating Cursor's AI capabilities.
            Interactions are pre-scripted to showcase the core experience.
          </p>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen
