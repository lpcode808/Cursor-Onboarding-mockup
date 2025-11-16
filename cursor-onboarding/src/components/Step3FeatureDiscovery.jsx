import { useState, useEffect } from 'react'
import './Step3FeatureDiscovery.css'

function Step3FeatureDiscovery({ onNext }) {
  const [activeFeature, setActiveFeature] = useState(null)

  // Load discovered features from localStorage
  const [discoveredFeatures, setDiscoveredFeatures] = useState(() => {
    const saved = localStorage.getItem('cursor-onboarding-discovered-features')
    return saved ? JSON.parse(saved) : []
  })

  // Save discovered features to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cursor-onboarding-discovered-features', JSON.stringify(discoveredFeatures))
  }, [discoveredFeatures])

  const features = [
    {
      id: 'tab-completion',
      icon: '⚡',
      title: 'Tab to Accept',
      description: 'AI suggests code as you type. Just press Tab to accept the suggestion.',
      demo: 'As you type "function calculate", AI predicts the entire function signature and implementation.',
      shortcut: 'Tab',
      position: { top: '25%', left: '60%' }
    },
    {
      id: 'cmd-k',
      icon: '🎯',
      title: 'Cmd+K Quick Edit',
      description: 'Select code and press Cmd+K to ask AI to modify it instantly.',
      demo: 'Select a function, press Cmd+K, and ask "add error handling" - done!',
      shortcut: 'Cmd+K / Ctrl+K',
      position: { top: '45%', left: '55%' }
    },
    {
      id: 'chat-panel',
      icon: '💬',
      title: 'Cmd+L Chat',
      description: 'Open the AI chat panel to have conversations about your code.',
      demo: 'Ask questions about your codebase, request explanations, or get coding help.',
      shortcut: 'Cmd+L / Ctrl+L',
      position: { top: '30%', left: '15%' }
    },
    {
      id: 'codebase-answers',
      icon: '📚',
      title: 'Codebase Answers',
      description: 'AI understands your entire codebase and can answer questions about it.',
      demo: '"Where is user authentication handled?" - AI searches your entire project.',
      shortcut: '@codebase in chat',
      position: { top: '60%', left: '20%' }
    },
    {
      id: 'multi-file',
      icon: '📁',
      title: 'Multi-file Edit',
      description: 'Make coordinated changes across multiple files simultaneously.',
      demo: 'Rename a component and update all imports automatically across your project.',
      shortcut: 'Works automatically',
      position: { top: '70%', left: '65%' }
    }
  ]

  const handleFeatureClick = (feature) => {
    setActiveFeature(feature)
    if (!discoveredFeatures.includes(feature.id)) {
      setDiscoveredFeatures([...discoveredFeatures, feature.id])
    }
  }

  const allDiscovered = discoveredFeatures.length === features.length

  return (
    <div className="step3-container">
      <div className="step-header fade-in">
        <h1>🔍 Discover Cursor's Superpowers</h1>
        <p>Click each hotspot to learn about powerful features</p>
        <div className="discovery-progress">
          <div className="progress-text">
            Discovered: {discoveredFeatures.length} / {features.length}
          </div>
          <div className="progress-dots">
            {features.map((f) => (
              <div
                key={f.id}
                className={`dot ${discoveredFeatures.includes(f.id) ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="discovery-layout">
        <div className="editor-mockup">
          <div className="mockup-header">
            <div className="mockup-traffic-lights">
              <span className="light red"></span>
              <span className="light yellow"></span>
              <span className="light green"></span>
            </div>
            <div className="mockup-title">Cursor Editor</div>
          </div>

          <div className="mockup-body">
            <div className="mockup-sidebar">
              <div className="sidebar-item">📁 src</div>
              <div className="sidebar-item indent">📄 App.jsx</div>
              <div className="sidebar-item indent">📄 utils.js</div>
              <div className="sidebar-item">📁 components</div>
            </div>

            <div className="mockup-editor">
              <div className="editor-tabs">
                <div className="editor-tab active">App.jsx</div>
                <div className="editor-tab">utils.js</div>
              </div>
              <div className="editor-content">
                <div className="code-line">
                  <span className="line-number">1</span>
                  <span className="code">import React from 'react'</span>
                </div>
                <div className="code-line">
                  <span className="line-number">2</span>
                  <span className="code"></span>
                </div>
                <div className="code-line">
                  <span className="line-number">3</span>
                  <span className="code">function App() {'{'}</span>
                </div>
                <div className="code-line">
                  <span className="line-number">4</span>
                  <span className="code">  return &lt;div&gt;Hello&lt;/div&gt;</span>
                </div>
                <div className="code-line">
                  <span className="line-number">5</span>
                  <span className="code">{'}'}</span>
                </div>
              </div>
            </div>

            <div className="mockup-chat">
              <div className="chat-title">💬 AI Chat</div>
              <div className="chat-message">Ready to help!</div>
            </div>
          </div>

          {/* Feature hotspots */}
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`feature-hotspot ${discoveredFeatures.includes(feature.id) ? 'discovered' : ''}`}
              style={feature.position}
              onClick={() => handleFeatureClick(feature)}
            >
              <div className="hotspot-pulse"></div>
              <div className="hotspot-icon">{feature.icon}</div>
            </div>
          ))}
        </div>

        {activeFeature && (
          <div className="feature-detail slide-in">
            <div className="feature-detail-header">
              <div className="feature-icon-large">{activeFeature.icon}</div>
              <div>
                <h3>{activeFeature.title}</h3>
                <div className="shortcut-badge">{activeFeature.shortcut}</div>
              </div>
            </div>
            <p className="feature-description">{activeFeature.description}</p>
            <div className="feature-demo">
              <strong>Example:</strong>
              <p>{activeFeature.demo}</p>
            </div>
            <button
              className="btn-secondary"
              onClick={() => setActiveFeature(null)}
            >
              Got it!
            </button>
          </div>
        )}

        {!activeFeature && allDiscovered && (
          <div className="completion-panel fade-in">
            <div className="completion-content">
              <div className="completion-icon">🎉</div>
              <h3>You've Discovered All Features!</h3>
              <p>
                You now know the essential Cursor shortcuts that will 10x your productivity.
                Let's put them into practice!
              </p>
              <button className="btn btn-primary" onClick={onNext}>
                Final Challenge →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Step3FeatureDiscovery
