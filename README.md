# Story Board Canvas

A browser app for illustrating a story while you tell it. Describe a scene in a chat box and an AI image model draws it. Keep chatting to change the scene, start new scenes, and keep separate boards for different stories.

It's designed for tabletop RPG game masters describing rooms and encounters, and for parents telling bedtime stories.

## Features

- Chat-driven scene descriptions, with each message refining the current image
- Multiple story boards you can create, rename, delete, and switch between
- Art style presets (comic, watercolor, pixel art) that shape the prompt
- Everything saved in the browser with `localStorage`, so there's no server or account

## Running it

It's a static site with no build step. Open `index.html` in a browser, or serve the folder:

```sh
npx serve .
```

Paste an OpenAI API key into the sidebar. The key isn't saved anywhere and is sent only to the OpenAI Images API.

## Design docs

- [`Requirements.md`](Requirements.md): personas, user stories, and functional requirements
- [`ProjectPlan.md`](ProjectPlan.md): architecture, data model, and API integration
- [`DevLog.md`](DevLog.md): development log and assumptions
