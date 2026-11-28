const overlay = document.querySelector("#menu-overlay");
const search = document.querySelector("#command-search");
const list = document.querySelector("#command-list");
const opener = document.querySelector("#open-menu");
const status = document.querySelector("#action-status");
const heading = document.querySelector("#preview-heading");
const message = document.querySelector("#preview-message");
const card = document.querySelector("#preview-card");
let previousFocus = null;
let activeIndex = 0;
let visibleCommands = [];

const commands = [
  { id: "welcome", group: "Workspace", title: "Show welcome message", detail: "Reset the preview card", icon: "✳", keywords: "home start", run: () => { heading.textContent = "Ready when you are"; message.textContent = "Open the menu to run an action."; } },
  { id: "theme", group: "Appearance", title: "Toggle color theme", detail: "Switch between light and dark", icon: "◐", keywords: "dark light appearance", run: () => document.body.classList.toggle("dark") },
  { id: "highlight", group: "Workspace", title: "Highlight preview", detail: "Give the preview a little focus", icon: "✧", keywords: "focus accent", run: () => { card.style.borderColor = "var(--accent)"; card.style.boxShadow = "0 0 0 3px color-mix(in srgb,var(--accent) 12%,transparent)"; } },
  { id: "clear", group: "Workspace", title: "Clear highlight", detail: "Restore the preview card", icon: "□", keywords: "reset remove", run: () => { card.style.borderColor = ""; card.style.boxShadow = ""; } },
  { id: "about", group: "Help", title: "About this demo", detail: "Show the component's interaction model", icon: "i", keywords: "help accessibility keyboard", run: () => { heading.textContent = "Keyboard-first by design"; message.textContent = "Search, arrow-key navigation, Enter to run, Escape to close."; } }
];

function openMenu() {
  if (!overlay.hidden) return;
  previousFocus = document.activeElement;
  overlay.hidden = false;
  search.value = "";
  activeIndex = 0;
  renderCommands();
  search.focus();
}
function closeMenu() {
  if (overlay.hidden) return;
  overlay.hidden = true;
  if (previousFocus instanceof HTMLElement) previousFocus.focus();
}
function filtered() {
  const query = search.value.trim().toLocaleLowerCase();
  return commands.filter(command => [command.title, command.detail, command.group, command.keywords].join(" ").toLocaleLowerCase().includes(query));
}
function renderCommands() {
  visibleCommands = filtered();
  activeIndex = Math.min(activeIndex, Math.max(0, visibleCommands.length - 1));
  list.replaceChildren();
  if (!visibleCommands.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "No matching commands";
    list.append(empty);
    return;
  }
  let lastGroup = "";
  visibleCommands.forEach((command, index) => {
    if (command.group !== lastGroup) {
      const label = document.createElement("div");
      label.className = "group-label";
      label.textContent = command.group;
      label.id = "command-group-" + index;
      list.append(label);
      lastGroup = command.group;
    }
    const option = document.createElement("button");
    option.type = "button";
    option.className = "command-option";
    option.id = "command-option-" + index;
    option.role = "option";
    option.setAttribute("aria-selected", String(index === activeIndex));
    option.setAttribute("aria-labelledby", "command-title-" + index);
    option.setAttribute("aria-describedby", "command-detail-" + index);
    const glyph = document.createElement("span");
    glyph.className = "glyph";
    glyph.setAttribute("aria-hidden", "true");
    glyph.textContent = command.icon;
    const copy = document.createElement("span");
    copy.className = "copy";
    const title = document.createElement("strong");
    title.id = "command-title-" + index;
    title.textContent = command.title;
    const detail = document.createElement("small");
    detail.id = "command-detail-" + index;
    detail.textContent = command.detail;
    copy.append(title, detail);
    option.append(glyph, copy);
    option.addEventListener("click", () => runCommand(index));
    list.append(option);
  });
  list.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
}
function moveSelection(delta) {
  if (!visibleCommands.length) return;
  activeIndex = (activeIndex + delta + visibleCommands.length) % visibleCommands.length;
  renderCommands();
}
function runCommand(index) {
  const command = visibleCommands[index];
  if (!command) return;
  command.run();
  status.textContent = "Ran: " + command.title;
  closeMenu();
}
opener.addEventListener("click", openMenu);
search.addEventListener("input", () => { activeIndex = 0; renderCommands(); });
search.addEventListener("keydown", event => {
  if (event.key === "ArrowDown") { event.preventDefault(); moveSelection(1); }
  if (event.key === "ArrowUp") { event.preventDefault(); moveSelection(-1); }
  if (event.key === "Enter") { event.preventDefault(); runCommand(activeIndex); }
  if (event.key === "Escape") { event.preventDefault(); closeMenu(); }
  if (event.key === "Home" && visibleCommands.length) { event.preventDefault(); activeIndex = 0; renderCommands(); }
  if (event.key === "End" && visibleCommands.length) { event.preventDefault(); activeIndex = visibleCommands.length - 1; renderCommands(); }
});
document.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openMenu();
  }
  if (event.key === "Escape" && !overlay.hidden) closeMenu();
});
overlay.addEventListener("pointerdown", event => { if (event.target === overlay) closeMenu(); });
