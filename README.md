# NutriLens AI

NutriLens — AI-Powered Micronutrient Deficiency Screening & Nutrition Recommendation Platform
Build a modern, professional, responsive full-stack web application called “NutriLens”.
1. Project Overview
NutriLens is an AI-powered nutritional screening platform designed to analyze images of visible body parts that may show signs associated with micronutrient deficiencies.
The user uploads an image of a relevant body area, such as:
Eyes
Tongue
Skin
Nails
Hair/scalp
Lips
A trained Machine Learning / Deep Learning CNN model analyzes the uploaded image and predicts the most likely micronutrient deficiency or nutritional condition.
The application then displays:
Predicted micronutrient deficiency
Prediction confidence score
Visual explanation of the prediction
Possible symptoms associated with the deficiency
Recommended food sources
A personalized diet plan
General nutritional recommendations
A clear medical disclaimer recommending professional/laboratory confirmation
The system must NOT claim that an image-based prediction is a confirmed medical diagnosis.
2. Main Goal
Create a website with this workflow:
Home → Learn About Deficiencies → Upload Image → AI Analysis → Prediction Result → Nutrition Recommendation → Diet Plan
The interface should look like a real AI healthcare startup rather than a basic student project.
Use a clean medical + AI visual identity.
Suggested brand style:
Primary: Green
Secondary: Teal
Background: White / very light green
Accent: Soft blue
Text: Dark charcoal
Rounded cards
Subtle shadows
Clean typography
Minimal animations
Professional healthcare aesthetic
3. Website Pages
Home Page
Create a visually impressive landing page.
Hero section:
NutriLens
“See the Signs. Understand the Nutrition. Improve Your Health.”
Subtitle:
“AI-powered visual screening for potential micronutrient deficiencies, combined with personalized nutrition recommendations.”
Add two CTA buttons:
Analyze an Image
Explore Nutrition
Hero visual should show:
AI scanning a human body image
Nutrition/food icons
CNN/AI visualization
Healthy food illustrations
Do not use frightening medical imagery.
4. How NutriLens Works
Create a 4-step section.
Step 1 — Upload
Upload an image of the relevant body area.
Step 2 — AI Analysis
The CNN model analyzes visual patterns in the image.
Step 3 — Screening Result
The system predicts the most likely nutritional deficiency and displays a confidence score.
Step 4 — Nutrition Guidance
The application recommends nutrient-rich foods and generates a personalized diet plan.
Use attractive icons and animations.
5. Micronutrient Information Section
Create cards for different micronutrients.
Examples:
Iron
Vitamin B12
Vitamin D
Vitamin A
Vitamin C
Zinc
Folate
Each card should contain:
Micronutrient name
Main function
Common food sources
Possible deficiency signs
General information
Do not present symptoms as definitive proof of deficiency.
6. AI Image Analysis Page
Create a dedicated page called:
AI Nutritional Screening
At the top display:
“Upload an image for AI-based nutritional screening.”
Add a large drag-and-drop image upload component.
Supported formats:
JPG
JPEG
PNG
WEBP
Show:
Maximum file size: 10 MB
Before upload, allow the user to select:
Body Area
Dropdown:
Eyes
Tongue
Skin
Nails
Hair
Lips
Other
Then provide:
Analyze Image
button.
After uploading:
Display image preview
Show selected body area
Show upload progress
Show AI processing animation
7. AI Processing Screen
Create a visually impressive loading screen.
Example:
Analyzing your image...
Show an animated AI scanning effect.
Stages:
✓ Image received
✓ Image preprocessing
✓ Feature extraction
⟳ CNN analysis
○ Generating nutritional recommendations
Use a progress indicator.
The interface should make it clear that this is an AI screening process.
8. Prediction Result Page
Create a professional results dashboard.
Heading:
NutriLens Screening Result
Display a large result card.
Example:
Possible Nutritional Concern
Iron Deficiency — Screening Result
Confidence:
87%
Use a circular confidence indicator.
Also show:
What the AI Detected
Provide a short explanation of the visual characteristics identified by the model.
Example:
“The model identified visual patterns that are associated with iron-deficiency-related signs.”
Do not say:
“You definitely have iron deficiency.”
Instead say:
“This result indicates a possible association and should be confirmed through appropriate medical evaluation or laboratory testing.”
9. Prediction Visualization
Create a section:
AI Confidence Analysis
Show a horizontal bar chart or circular chart containing predictions such as:
Iron — 87%
Vitamin B12 — 7%
Vitamin A — 3%
Zinc — 2%
Other — 1%
The values should come dynamically from the backend model.
Do not hardcode these values in the final application.
10. Explainable AI Section
Create:
Why Did NutriLens Predict This?
Show an explainability visualization.
If supported by the CNN model, use:
Grad-CAM
Heatmap
Attention map
Display the original uploaded image beside the heatmap.
Caption:
Highlighted regions represent areas that contributed to the model's prediction.
Make it clear that this visualization explains model attention and does not prove a medical condition.
11. Nutritional Recommendation Page
After the prediction, display:
Recommended Nutrient
Example:
Iron
Then show:
Why Iron Matters
Short explanation of iron's role in the body.
Food Sources
Create attractive food cards:
Spinach
Lentils
Chickpeas
Beans
Sesame seeds
Pumpkin seeds
Fortified cereals
Other appropriate nutrient-rich foods
Each food card should contain:
Image
Food name
Nutrient contribution
Approximate serving information where reliable
Avoid making unsupported claims about exact nutrient quantities.
12. Personalized Diet Plan
Create a section:
Your Personalized Nutrition Plan
Before generating the plan, ask the user for:
Age
Gender
Vegetarian / Non-vegetarian
Food preferences
Known food allergies
Daily activity level
Number of meals per day
Dietary restrictions
Preferred cuisine
Then generate:
Breakfast
Recommended meal
Mid-Morning
Recommended food
Lunch
Recommended meal
Evening Snack
Recommended food
Dinner
Recommended meal
Hydration
General hydration recommendation
The diet recommendation should prioritize foods naturally rich in the predicted nutrient.
Include a note:
“This is general nutritional guidance and not a substitute for advice from a registered dietitian or doctor.”
13. User Dashboard
Create a dashboard after login.
Display:
My Nutrition Profile
Name
Age
Dietary preference
Activity level
Allergies
Previous screenings
Screening History
Show previous analyses:
DateBody AreaPredictionConfidence
Allow users to click a previous result.
14. Authentication
Implement:
Sign Up
Login
Logout
Forgot Password
Use secure authentication.
Do not store uploaded medical images permanently unless the user explicitly chooses to save them.
15. Backend Architecture
Build the application using a modular architecture.
Suggested stack:
Frontend
React
TypeScript
Tailwind CSS
React Router
Recharts
Lucide Icons
Backend
Python
FastAPI
AI/ML
Python
TensorFlow / Keras or PyTorch
CNN
Transfer Learning
Potential CNN architectures:
EfficientNet
ResNet
MobileNet
Use transfer learning if the dataset is limited.
Database
Use PostgreSQL.
Store:
User profile
Screening history
Predictions
Confidence scores
Diet recommendations
Do NOT store raw images by default.
16. AI API Architecture
Create an API endpoint:
POST /api/analyze
Input:
image
body_area
optional user information
Backend workflow:
Receive image
Validate file
Resize image
Normalize image
Apply model preprocessing
Pass image through CNN
Generate class probabilities
Determine predicted class
Generate confidence score
Generate explainability heatmap if available
Return prediction
Generate nutrition recommendation
Example response structure:
{
  "prediction": "Iron",
  "confidence": 0.87,
  "screening_message": "Possible iron-related nutritional concern",
  "recommendations": [],
  "heatmap_url": null
}

The model output must be treated as a screening prediction rather than a diagnosis.
17. Machine Learning Model Integration
Create a separate ML service/module.
Expected pipeline:
Image
→ Preprocessing
→ CNN
→ Feature Extraction
→ Classification
→ Probability Distribution
→ Predicted Nutrient
→ Recommendation Engine
Use a trained model file such as:
nutrilens_model.keras
or
nutrilens_model.pt
Do not create a fake AI prediction.
If the actual trained model is not available yet, create a clearly separated mock/demo mode so that the frontend can be developed without pretending that the predictions are medically validated.
The architecture should make it easy to replace the demo model with the real trained CNN later.
18. Recommendation Engine
Create a nutrient-to-food mapping system.
Example:
Iron → spinach, lentils, chickpeas, beans, sesame, pumpkin seeds, fortified foods
Vitamin B12 → eggs, dairy, fortified foods, appropriate animal-based foods
Vitamin A → carrots, sweet potato, leafy greens, pumpkin
Vitamin C → citrus fruits, guava, bell peppers, amla
Zinc → legumes, seeds, nuts, whole grains
Folate → leafy greens, legumes, avocado, fortified foods
Recommendations should be generated based on the predicted nutrient and user dietary preferences.
19. Safety & Medical Disclaimer
Add a disclaimer throughout the application.
Use wording similar to:
“NutriLens is an AI-based nutritional screening and educational tool. Its predictions are not medical diagnoses. Visual signs can have multiple causes, and nutritional deficiencies should be confirmed through appropriate clinical assessment and laboratory testing. Consult a qualified healthcare professional before making significant dietary or medical decisions.”
Do not use language that guarantees diagnosis or treatment.
20. Privacy
Create a privacy-focused design.
Include:
Secure image upload
HTTPS-ready architecture
Input validation
File type validation
File size validation
No unnecessary image storage
User-controlled deletion
Secure authentication
Minimal collection of personal information
Add:
Delete My Data
button in account settings.
21. Navigation
Navbar:
NutriLens
Home
How It Works
Micronutrients
AI Screening
My Dashboard
About
Login
Primary CTA:
Analyze Image
22. Footer
Include:
NutriLens
“AI-powered nutritional screening and personalized nutrition guidance.”
Links:
About
How It Works
Privacy
Terms
Medical Disclaimer
Contact
23. UI/UX Requirements
Make the website:
Fully responsive
Mobile friendly
Desktop friendly
Accessible
Fast loading
Clean
Professional
Modern
Easy for non-technical users
Use subtle animations:
Fade-in
Slide-up
Hover effects
Upload animation
AI scanning animation
Progress indicators
Avoid excessive animations.
24. Important Technical Requirement
The project should be structured so that the AI model is independent from the frontend.
Architecture:
Frontend
↓
FastAPI Backend
↓
ML Inference Service
↓
CNN Model
↓
Prediction
↓
Recommendation Engine
↓
Frontend Result Dashboard
Create clean folders such as:
nutrilens/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── assets/
│
├── backend/
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── database/
│   └── main.py
│
├── ml/
│   ├── model/
│   ├── preprocessing/
│   ├── inference/
│   └── explainability/
│
└── README.md

25. Landing Page Tagline
Use:
NutriLens
“AI-Powered Nutritional Screening, Made Simple.”
Supporting text:
“Upload a relevant image, explore potential micronutrient concerns, and receive personalized nutrition guidance.”
CTA:
Start AI Screening
Secondary CTA:
Learn How It Works
26. Project Presentation
Make the website suitable for:
College project demonstration
Hackathons
Resume portfolio
GitHub
LinkedIn
AI/ML project showcase
The final interface should look like a real startup MVP rather than a simple college CRUD website.
Most importantly, do not fabricate medical accuracy or pretend that a non-existent trained CNN model is functioning. Clearly separate demo functionality from the real ML inference pipeline.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://nutrilense-ai-scan.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/15425019-07f7-4a1f-97d1-b3432f2f04fa).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
