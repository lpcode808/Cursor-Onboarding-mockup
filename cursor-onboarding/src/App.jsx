import { useState } from 'react'
import './App.css'
import WelcomeScreen from './components/WelcomeScreen'
import Step1MagicMoment from './components/Step1MagicMoment'
import Step2HandsOnPractice from './components/Step2HandsOnPractice'
import Step3FeatureDiscovery from './components/Step3FeatureDiscovery'
import Step4ConfidenceBuilding from './components/Step4ConfidenceBuilding'
import CompletionScreen from './components/CompletionScreen'

function App() {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    setCurrentStep(prev => prev + 1)
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
