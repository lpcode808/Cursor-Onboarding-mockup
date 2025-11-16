import { useState, useEffect } from 'react'
import './App.css'
import WelcomeScreen from './components/WelcomeScreen'
import Step1MagicMoment from './components/Step1MagicMoment'
import Step2HandsOnPractice from './components/Step2HandsOnPractice'
import Step3FeatureDiscovery from './components/Step3FeatureDiscovery'
import Step4ConfidenceBuilding from './components/Step4ConfidenceBuilding'
import CompletionScreen from './components/CompletionScreen'

function App() {
  // Load saved progress from localStorage or start at 0
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('cursor-onboarding-step')
    return saved ? parseInt(saved, 10) : 0
  })

  // Save progress to localStorage whenever step changes
  useEffect(() => {
    localStorage.setItem('cursor-onboarding-step', currentStep.toString())
  }, [currentStep])

  const handleNext = () => {
    setCurrentStep(prev => prev + 1)
  }

  const handleReset = () => {
    setCurrentStep(0)
    localStorage.removeItem('cursor-onboarding-step')
    localStorage.removeItem('cursor-onboarding-discovered-features')
  }

  const steps = [
    <WelcomeScreen onNext={handleNext} />,
    <Step1MagicMoment onNext={handleNext} />,
    <Step2HandsOnPractice onNext={handleNext} />,
    <Step3FeatureDiscovery onNext={handleNext} />,
    <Step4ConfidenceBuilding onNext={handleNext} />,
    <CompletionScreen />
  ]

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="app">
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      {steps[currentStep]}
    </div>
  )
}

export default App
