# Story Board Canvas App - Project Plan

## Architecture Overview
The application will be a static front‑end web app comprised of HTML, CSS, and JavaScript. All state is stored client‑side using `localStorage`. AI image generation is performed through calls to an external API (e.g., OpenAI Images). There is no back‑end component.

### Components
1. **HTML Structure** (`index.html`)
   - Sidebar for selecting/creating boards and styles.
   - Main area split into chat panel and image canvas.
2. **Stylesheet** (`styles.css`)
   - Provides responsive layout using flexbox.
3. **JavaScript Logic** (`app.js`)
   - Manages boards, scenes, API interaction, and UI updates.

### Data Model
```javascript
Board {
  id: string,
  name: string,
  style: string,
  history: [
    { prompt: string, imageUrl: string }
  ]
}
```
Boards are persisted under `localStorage['storyboards']` as an array.

### External API Integration
- Use `fetch` to call OpenAI Image API `https://api.openai.com/v1/images/generations`.
- Request body includes:
  - `prompt`: concatenated history plus new user text and style.
  - `size`: "512x512".
- API key supplied via text field; stored in memory only.
- On success, update board history and display image. On failure, show error message.

## Implementation Steps
1. **Scaffold Files**
   - Create `index.html`, `styles.css`, `app.js` with basic layout.
2. **Board Storage Module**
   - Functions to load, save, create, delete boards in `localStorage`.
3. **UI for Board Management**
   - Dropdown or sidebar to select board and button to create new.
4. **Chat Interface**
   - Message list and input form. Handle submit via Enter or button.
   - Append messages to board history (text only).
5. **AI Image Generation**
   - Function `generateImage(prompt, style)` that calls external API using provided key.
   - Update canvas with returned image.
6. **Style Selection**
   - Dropdown with preset styles (e.g., "Comic", "Watercolor", "Pixel").
   - Selected style stored on board and appended to prompt.
7. **Persistence**
   - Auto‑save boards after each update.
8. **API Key Input**
   - Simple field to store key in memory; not persisted.
9. **Final Polish**
   - Responsive styling.
   - Error handling for missing key or API failures.
10. **Testing / Verification**
    - Manual run in browser ensuring board creation, scene updates, and style changes work.

