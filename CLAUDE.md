# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive wizard-of-oz proof-of-concept demonstrating an onboarding experience for Cursor AI IDE. The prototype simulates AI-powered development workflows through hardcoded responses and scripted interactions, allowing new users to experience Cursor's capabilities without real AI integration.

**Key Context**: This is a demonstration/prototype project, NOT production software. It uses pre-scripted responses to simulate AI interactions for UX research and design validation.

## Development Commands

All commands must be run from the `cursor-onboarding/` directory:

```bash
# Navigate to app directory
cd cursor-onboarding

# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Architecture Overview

### Wizard-of-Oz Pattern

The core architectural principle is **wizard-of-oz simulation**: all "AI" responses are hardcoded and triggered by keyword detection, not actual AI. This creates a controlled, reproducible demo experience.

**Critical Implementation Details**:
- **Step2HandsOnPractice.jsx**: Contains `getAIResponse()` function with keyword-based response logic
- **Step1MagicMoment.jsx**: Uses preset `generatedCode` string with typing animation effects
- All AI interactions are theatrical simulations with programmed delays and animations

### Step-Based Flow Architecture

The app uses a linear step progression managed by `App.jsx`:

```
WelcomeScreen → Step1MagicMoment → Step2HandsOnPractice →
Step3FeatureDiscovery → Step4ConfidenceBuilding → CompletionScreen
```

**State Management**: Simple parent-child prop passing with `currentStep` state in `App.jsx`. Each step receives an `onNext` callback to advance the flow.

**Progress Tracking**: Progress bar calculated as `((currentStep + 1) / steps.length) * 100` in App.jsx:26

### Component Structure

Each step is a self-contained component with:
- Dedicated JSX file with component logic
- Dedicated CSS file with scoped styles
- Internal state management (using `useState`) for animations and interactions
- No shared state between components (each step resets when visited)

### Animation System

Components use a multi-stage animation approach:

1. **CSS-based animations**: `.fade-in`, `.slide-in` classes in component CSS files
2. **JavaScript-controlled timing**: `useEffect` hooks trigger stage transitions
3. **Simulated delays**: `setTimeout` calls create realistic "AI thinking" pauses (800ms in Step2HandsOnPractice.jsx:99)

**Example Pattern** (Step1MagicMoment.jsx):
- Stage 0: Introduction panel
- Stage 1: Typing animation (20ms intervals, advances by 3 characters)
- Stage 2: Success panel with stats

## Key Design Patterns

### Typing Effect Implementation

The code generation demo uses a character-by-character typing simulation:

```javascript
// Step1MagicMoment.jsx:54-66
// Advances currentIndex by 3 chars every 20ms
// Uses slice(0, currentIndex) to create progressive reveal
```

### Keyword-Based Response System

Step2HandsOnPractice.jsx:16-87 contains the response logic:
- Checks `lowerInput.includes()` for trigger keywords
- Returns objects with `{ content, code, explanation }` structure
- Falls back to suggestion list if no keywords match

**Extendable Pattern**: To add new interactions, add new conditional blocks in `getAIResponse()` with corresponding response objects.

## Deployment Configuration

**GitHub Pages Setup**:
- Base path configured in `vite.config.js:7` as `/Cursor-Onboarding-mockup/`
- This matches the GitHub repository name for proper asset loading
- GitHub Actions workflow in `.github/workflows/` handles automated deployment

**Important**: If repository is renamed or moved to different hosting, update the `base` value in vite.config.js.

## Styling Architecture

**Technology**: Pure CSS3 with CSS custom properties (variables)
**Pattern**: Component-scoped stylesheets (one CSS file per component)

**Brand Colors** (from design system):
- Cyan-to-purple gradients: Cursor's signature visual style
- Orange accents: Call-to-action elements
- Dark theme: Professional development tool aesthetic

**Animation Principles**:
- Smooth transitions for professional polish
- Realistic timing (not too fast/slow)
- Micro-interactions on hover states

## Content Modification

### Adding New AI Responses

Edit `Step2HandsOnPractice.jsx` function `getAIResponse()`:

```javascript
if (lowerInput.includes('your-keyword')) {
  return {
    content: "Response description",
    code: `// Your code example`,
    explanation: "Why this works..."
  }
}
```

### Modifying Code Generation Demo

Edit `Step1MagicMoment.jsx` constants:
- `userPrompt` (line 9): The user's request text
- `generatedCode` (lines 11-49): The code that gets "typed out"

### Adjusting Animation Timing

Key timing values to modify:
- **Typing speed**: `interval: 20` and `currentIndex += 3` in Step1MagicMoment.jsx:58-62
- **AI thinking delay**: `setTimeout(..., 800)` in Step2HandsOnPractice.jsx:99
- **Stage transition delays**: Various `setTimeout` calls in component `useEffect` hooks

## Testing Considerations

**Manual Testing Focus Areas**:
1. Step progression flow (all 6 screens)
2. Animation smoothness and timing
3. Keyword detection in Step 2 chat interface
4. Responsive design on different screen sizes
5. Browser compatibility (Chrome, Firefox, Safari)

**No Automated Tests**: This is a proof-of-concept prototype without test infrastructure.

## Educational Context

This project demonstrates UX design for developer tools and onboarding experiences. The wizard-of-oz approach allows rapid iteration on user experience without backend infrastructure.

**Learning Objectives** (from README.md:73-79):
- Understanding AI-assisted code generation
- Effective AI communication patterns
- Cursor IDE keyboard shortcuts
- Debugging with AI assistance
- Value proposition of AI-powered development

## Limitations & Future Enhancements

**Current Limitations**:
- Only "New to AI Coding" pathway implemented
- Limited keyword vocabulary in chat simulation
- No actual code execution or validation
- Single-language support (English)
- Desktop-focused responsive design

**Documented Enhancement Ideas** (README.md:105-112):
- Additional user pathways (Experienced Developer, Team Evaluation)
- More coding challenge scenarios
- Multi-language internationalization
- Analytics integration
- User feedback collection system
- Video demonstration integration
