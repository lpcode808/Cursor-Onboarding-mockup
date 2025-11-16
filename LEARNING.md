# Learning Guide: Cursor Onboarding Prototype

Welcome! 👋 This guide will help you understand this project from the ground up, even if you're new to web development.

---

## 🎯 What Is This Project?

This is an **interactive demo website** that teaches developers how to use **Cursor**, an AI-powered code editor.

Think of it like this:
- **Cursor** = A code editor similar to VS Code, but with built-in AI assistance
- **This Project** = A practice simulator where users learn Cursor's features without needing the real app
- **Wizard-of-Oz** = A fancy term meaning "pretend AI" - we hardcode responses instead of using real AI

### Real-World Analogy
Imagine a video game tutorial level:
- The "AI" isn't real - the responses are scripted
- But the experience feels real and teaches users what's possible
- Users can then download the real Cursor app and start using it for actual work

---

## 🏗️ Project Structure: What Goes Where?

```
Cursor-Onboarding-mockup/                    ← Root folder (everything lives here)
├── README.md                                ← Quick start guide
├── CLAUDE.md                                ← Technical guide for developers
├── Cursor-Onboarding-mockup-PRD.md         ← Business requirements document
├── LEARNING.md                              ← You are here!
├── .github/
│   └── workflows/
│       └── deploy.yml                       ← Automatic deployment to GitHub Pages
└── cursor-onboarding/                       ← The actual web app
    ├── package.json                         ← Lists all dependencies (libraries)
    ├── vite.config.js                       ← Build configuration
    ├── index.html                           ← Entry point (first HTML loaded)
    ├── src/
    │   ├── main.jsx                         ← Connects React to HTML
    │   ├── App.jsx                          ← Main component (controls flow)
    │   ├── App.css                          ← Styling for main app
    │   ├── index.css                        ← Global styles
    │   └── components/                      ← Individual screens
    │       ├── WelcomeScreen.jsx            ← Step 0: First screen
    │       ├── Step1MagicMoment.jsx         ← Step 1: Watch AI code
    │       ├── Step2HandsOnPractice.jsx     ← Step 2: Try the chat
    │       ├── Step3FeatureDiscovery.jsx    ← Step 3: Learn features
    │       ├── Step4ConfidenceBuilding.jsx  ← Step 4: Do a challenge
    │       └── CompletionScreen.jsx         ← Step 5: Celebration!
    └── public/                              ← Static files (images, etc)
```

**Key Insight**: Each "screen" or "step" is a separate React component (a reusable piece of UI).

---

## 🔄 How Does the App Work?

### The User Journey (Step-by-Step)

```
User opens website
        ↓
WelcomeScreen (explains what they'll learn)
        ↓
Step1MagicMoment (watches AI generate code with typing animation)
        ↓
Step2HandsOnPractice (tries a chat interface with keyword-based responses)
        ↓
Step3FeatureDiscovery (learns about Cursor features)
        ↓
Step4ConfidenceBuilding (does a coding challenge)
        ↓
CompletionScreen (celebration + download Cursor link)
```

### How State Management Works

In `App.jsx`, there's a `currentStep` variable (using React's `useState` hook) that tracks which screen to show:

```javascript
const [currentStep, setCurrentStep] = useState(0)  // Start at step 0

const handleNext = () => {
  setCurrentStep(prev => prev + 1)  // Move to next step
}
```

When a user clicks "Next" on any screen:
1. The screen calls `onNext()` 
2. This triggers `handleNext()`
3. `currentStep` increases by 1
4. App re-renders the next screen

It's like flipping through pages in a book! 📖

---

## 🎨 Key Concepts to Understand

### 1. React Components

Each screen is a **React Component** - a reusable piece of UI.

**Example Structure:**
```jsx
// Step1MagicMoment.jsx
function Step1MagicMoment({ onNext }) {
  const [stage, setStage] = useState(0)  // Track animation progress
  
  return (
    <div>
      {/* Display content */}
      <button onClick={onNext}>Next</button>
    </div>
  )
}
```

**Key parts:**
- `{ onNext }` = Props (data passed from parent App.jsx)
- `useState(0)` = Local state for this component only
- The `return` statement = What shows on screen

### 2. CSS Animations

The app has smooth animations using CSS:

```css
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

This makes things appear smoothly instead of "pop" into view.

### 3. Wizard-of-Oz Responses

In `Step2HandsOnPractice.jsx`, there's a function that creates fake AI responses:

```javascript
function getAIResponse(userInput) {
  const lowerInput = userInput.toLowerCase()
  
  if (lowerInput.includes('hello')) {
    return {
      content: "Hi! Ready to code?",
      code: `console.log('Hello world')`,
      explanation: "This prints to the console."
    }
  }
  
  return { content: "Try asking about code!" }
}
```

**How it works:**
1. User types something
2. Function checks if keywords match
3. Returns a pre-written response
4. No real AI involved!

---

## 🛠️ How to Make Changes

### Scenario 1: Change a Welcome Message

Find: `cursor-onboarding/src/components/WelcomeScreen.jsx`

Change the text in the JSX:
```jsx
<h1>Welcome to Cursor!</h1>  ← Change this text
```

### Scenario 2: Add a New Chat Response

Find: `cursor-onboarding/src/components/Step2HandsOnPractice.jsx`

Add a new condition in the `getAIResponse()` function:
```javascript
if (lowerInput.includes('your-keyword')) {
  return {
    content: "Your response here",
    code: `your code example`,
    explanation: "Why this works..."
  }
}
```

### Scenario 3: Change Colors

Find: `cursor-onboarding/src/App.css` or component CSS files

Look for colors and change them:
```css
background: linear-gradient(135deg, #00d4ff, #7c3aed);  ← Cyan to purple
```

---

## 🚀 Running the Project

### Local Development (Your Computer)

```bash
# Navigate to the app folder
cd cursor-onboarding

# Install dependencies (do this once)
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

While `npm run dev` is running:
- Changes you make are **instantly visible** (hot reload!)
- Great for testing and debugging
- Only works on your computer

### Building for Production

```bash
cd cursor-onboarding
npm run build
```

This:
- Compresses the code
- Optimizes images
- Creates a `dist/` folder with the final website
- Ready to deploy to GitHub Pages!

---

## 📤 Deployment to GitHub Pages

### What Happens Automatically

1. **You make changes** → `git add`, `git commit`, `git push`
2. **GitHub sees the push** → Triggers `.github/workflows/deploy.yml`
3. **GitHub Actions:**
   - Checks out your code
   - Runs `npm install`
   - Runs `npm run build`
   - Uploads `dist/` folder to GitHub Pages
4. **Website updates** → Live at `https://lpcode808.github.io/Cursor-Onboarding-mockup/`

### What You Need to Do

✅ Change something in the code
✅ Commit: `git commit -m "your message"`
✅ Push: `git push origin your-branch-name`

That's it! GitHub Actions handles the rest. ✨

### Checking Deployment Status

1. Go to your GitHub repo
2. Click **Actions** tab
3. Look for "Deploy to GitHub Pages"
4. See if it's ✅ (success) or ❌ (failed)
5. If failed, click the workflow to see error details

---

## 🎓 Important React Concepts

### useState Hook

Used to add state (memory) to a component:

```javascript
const [count, setCount] = useState(0)

// count = current value
// setCount = function to update it
// 0 = starting value
```

### useEffect Hook

Runs code when component loads or when dependencies change:

```javascript
useEffect(() => {
  // This runs when component loads
  console.log("Component mounted!")
  
  // Useful for animations, timers, API calls
}, []) // Empty array = run once on load
```

### Props vs State

| Props | State |
|-------|-------|
| Data from parent | Data in component |
| Read-only | Can be modified |
| Like function parameters | Like local variables |
| `<Child prop={value} />` | `const [value, setValue] = useState()` |

---

## 🧪 Testing Your Changes

### Quick Testing (Local)

```bash
cd cursor-onboarding
npm run dev
```

1. Open `http://localhost:5173`
2. Test the flow by clicking "Next"
3. Check for visual bugs or typos
4. Open browser DevTools (F12) to check for errors

### Testing on GitHub Pages

1. Make changes locally ✅
2. Commit and push ✅
3. Wait 1-2 minutes for deployment
4. Visit the live URL
5. Test in different browsers (Chrome, Firefox, Safari)

---

## 🐛 Common Issues & Fixes

### "npm install" fails
- **Cause**: Node.js not installed or outdated
- **Fix**: Download Node.js 20+ from nodejs.org

### "Port 5173 already in use"
- **Cause**: Another app is using that port
- **Fix**: Run `npm run dev` in a different terminal or kill the process

### Changes not showing on GitHub Pages
- **Cause**: Workflow failed or GitHub Pages not configured for GitHub Actions
- **Fix**: 
  1. Check Actions tab for errors
  2. Go to Settings → Pages
  3. Make sure "Source" is set to "GitHub Actions"

### Styling looks broken
- **Cause**: CSS file not imported
- **Fix**: Check the top of the component for `import './ComponentName.css'`

---

## 📚 Learning Resources

### React
- [React Official Docs](https://react.dev) - Start with "Learn"
- [useState in 100 seconds](https://www.youtube.com/results?search_query=react+usestate+100+seconds)

### Vite
- [Vite Guide](https://vitejs.dev/guide/) - Build tool documentation
- [Why Vite is fast](https://vitejs.dev/guide/why.html)

### CSS Animations
- [CSS Animations on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Easy animation examples](https://www.w3schools.com/css/css3_animations.asp)

### GitHub & Git
- [Git Basics](https://github.com/git-tips/tips) - Common commands
- [GitHub Pages Guide](https://pages.github.com/)

---

## ✅ Next Steps

1. **Run it locally**: `npm install && npm run dev`
2. **Explore the components**: Read through each `.jsx` file
3. **Make a small change**: Edit text in WelcomeScreen.jsx
4. **Commit and push**: Practice the git workflow
5. **Watch it deploy**: See GitHub Actions in action
6. **Break things**: Experiment! That's how you learn! 🎉

---

## 💡 Pro Tips

- **Use browser DevTools** (F12) to debug JavaScript
- **Check the browser console** for error messages
- **Use `console.log()`** to debug values
- **Read error messages carefully** - they usually tell you what's wrong
- **Take breaks** - debugging gets easier with fresh eyes

---

## 🎯 Summary

This project teaches both:
1. **Users** (who take the onboarding): How to use Cursor AI
2. **Developers** (who maintain this code): React, Vite, GitHub workflow

The architecture is intentionally simple for learning:
- No databases
- No backend servers
- No authentication
- Just React components showing different screens

You now know enough to modify this project and understand how it works! 🚀

---

**Questions?** Check the files mentioned in this guide or read the comments in the code. Good luck! 🎉

