import './CompletionScreen.css'

function CompletionScreen() {
  return (
    <div className="completion-screen">
      <div className="completion-content fade-in">
        <div className="celebration-icon">🎊</div>

        <h1 className="completion-title">
          You're Ready to Code with <span className="gradient-text">Cursor</span>!
        </h1>

        <p className="completion-subtitle">
          Congratulations! You've completed the onboarding and learned the essentials of AI-powered development.
        </p>

        <div className="achievements">
          <h2>What You've Learned:</h2>
          <div className="achievement-grid">
            <div className="achievement-card">
              <div className="achievement-icon">✨</div>
              <h3>AI Code Generation</h3>
              <p>Witnessed production-ready code written in seconds</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">💬</div>
              <h3>Conversational Coding</h3>
              <p>Practiced pair programming with AI assistance</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">⚡</div>
              <h3>Power Features</h3>
              <p>Discovered 5 essential shortcuts and workflows</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">🎯</div>
              <h3>Real-World Debugging</h3>
              <p>Applied AI to solve actual coding challenges</p>
            </div>
          </div>
        </div>

        <div className="quick-reference">
          <h2>⚡ Quick Reference Guide</h2>
          <div className="reference-grid">
            <div className="reference-item">
              <div className="shortcut">Tab</div>
              <div className="shortcut-desc">Accept AI suggestions</div>
            </div>
            <div className="reference-item">
              <div className="shortcut">Cmd+K</div>
              <div className="shortcut-desc">Quick edit selected code</div>
            </div>
            <div className="reference-item">
              <div className="shortcut">Cmd+L</div>
              <div className="shortcut-desc">Open AI chat panel</div>
            </div>
            <div className="reference-item">
              <div className="shortcut">@codebase</div>
              <div className="shortcut-desc">Ask about your entire project</div>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h2>🚀 Ready for the Real Thing?</h2>
          <p>Download Cursor and experience AI-powered development in your actual projects.</p>

          <div className="cta-buttons">
            <a
              href="https://cursor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-large"
            >
              Download Cursor →
            </a>
            <button
              className="btn btn-secondary"
              onClick={() => window.location.reload()}
            >
              Restart Demo
            </button>
          </div>
        </div>

        <div className="testimonial-section">
          <div className="testimonial">
            <p className="quote">
              "Cursor has transformed how I code. What used to take hours now takes minutes.
              The AI truly understands context and helps me write better code faster."
            </p>
            <div className="author">
              <div className="author-avatar">👨‍💻</div>
              <div>
                <strong>Alex Chen</strong>
                <span>Senior Developer</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-note">
          <p>
            This was a proof-of-concept demonstration simulating Cursor's capabilities.
            The actual product offers even more powerful features and seamless integration
            with your development workflow.
          </p>
          <p className="build-info">
            Built with React • Designed for developers new to AI coding
          </p>
        </div>
      </div>
    </div>
  )
}

export default CompletionScreen
