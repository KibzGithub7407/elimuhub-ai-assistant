function loadPrompts(category) {
  fetch(`prompts/${category}.json`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('promptList');
      list.innerHTML = '';
      data.prompts.forEach(p => {
        const btn = document.createElement('div');
        btn.className = 'prompt-btn';
        btn.innerText = p.title;
        btn.onclick = () => {
          document.getElementById('output').value = p.text;
        };
        list.appendChild(btn);
      });
    });
}

function copyToClipboard() {
  const text = document.getElementById('output');
  text.select();
  document.execCommand("copy");
  alert("Prompt copied to clipboard!");
}
