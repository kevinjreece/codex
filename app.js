const boardSelect = document.getElementById('boardSelect');
const newBoardBtn = document.getElementById('newBoard');
const renameBoardBtn = document.getElementById('renameBoard');
const deleteBoardBtn = document.getElementById('deleteBoard');
const styleSelect = document.getElementById('styleSelect');
const apiKeyInput = document.getElementById('apiKey');
const chatDiv = document.getElementById('chat');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const canvasImg = document.getElementById('canvas');

const STYLES = ['Comic', 'Watercolor', 'Pixel'];
let boards = [];
let currentBoard;

function loadBoards() {
  const data = localStorage.getItem('storyboards');
  boards = data ? JSON.parse(data) : [];
}

function saveBoards() {
  localStorage.setItem('storyboards', JSON.stringify(boards));
}

function createBoard(name) {
  const board = { id: Date.now().toString(), name, style: STYLES[0], history: [] };
  boards.push(board);
  saveBoards();
  return board;
}

function deleteBoard(id) {
  boards = boards.filter(b => b.id !== id);
  saveBoards();
}

function populateBoardSelect() {
  boardSelect.innerHTML = '';
  boards.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b.id;
    opt.textContent = b.name;
    boardSelect.appendChild(opt);
  });
}

function populateStyleSelect() {
  styleSelect.innerHTML = '';
  STYLES.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    styleSelect.appendChild(opt);
  });
}

function selectBoard(id) {
  currentBoard = boards.find(b => b.id === id);
  if (!currentBoard) return;
  boardSelect.value = id;
  styleSelect.value = currentBoard.style;
  renderBoard();
}

function renderBoard() {
  chatDiv.innerHTML = '';
  currentBoard.history.forEach(item => {
    const div = document.createElement('div');
    div.className = 'chat-message';
    div.textContent = item.prompt;
    chatDiv.appendChild(div);
  });
  const last = currentBoard.history[currentBoard.history.length - 1];
  canvasImg.src = last && last.imageUrl ? last.imageUrl : '';
}

async function updateImage() {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    alert('API key required');
    return;
  }
  const promptText = currentBoard.history.map(h => h.prompt).join(' ');
  const prompt = `${promptText} in ${currentBoard.style} style`;
  try {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({ prompt, n: 1, size: '512x512' })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || 'Request failed');
    const url = data.data[0].url;
    currentBoard.history[currentBoard.history.length - 1].imageUrl = url;
    canvasImg.src = url;
    saveBoards();
  } catch (err) {
    console.error(err);
    alert('Image generation failed');
  }
}

// Event handlers
newBoardBtn.addEventListener('click', () => {
  const name = prompt('Board name?');
  if (name) {
    const b = createBoard(name);
    populateBoardSelect();
    selectBoard(b.id);
  }
});

renameBoardBtn.addEventListener('click', () => {
  if (!currentBoard) return;
  const name = prompt('Rename board', currentBoard.name);
  if (name) {
    currentBoard.name = name;
    populateBoardSelect();
    boardSelect.value = currentBoard.id;
    saveBoards();
  }
});

deleteBoardBtn.addEventListener('click', () => {
  if (!currentBoard) return;
  if (confirm('Delete current board?')) {
    deleteBoard(currentBoard.id);
    if (boards.length === 0) {
      const b = createBoard('Board 1');
      populateBoardSelect();
      selectBoard(b.id);
    } else {
      populateBoardSelect();
      selectBoard(boards[0].id);
    }
  }
});

boardSelect.addEventListener('change', () => selectBoard(boardSelect.value));

styleSelect.addEventListener('change', () => {
  if (!currentBoard) return;
  currentBoard.style = styleSelect.value;
  saveBoards();
});

chatForm.addEventListener('submit', async e => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = '';
  currentBoard.history.push({ prompt: text, imageUrl: '' });
  renderBoard();
  await updateImage();
});

function init() {
  populateStyleSelect();
  loadBoards();
  if (boards.length === 0) {
    createBoard('Board 1');
  }
  populateBoardSelect();
  selectBoard(boards[0].id);
}

init();
