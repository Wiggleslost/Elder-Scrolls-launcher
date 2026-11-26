const games = [
  {
    title: "Morrowind",
    year: 2002,
    category: "classic",
    label: "Classic",
    subtitle: "THE ELDER SCROLLS III",
    style: "morrowind",
    mark: "✧",
    appId: "22320",
  },
  {
    title: "Oblivion",
    year: 2006,
    category: "classic",
    label: "Classic",
    subtitle: "THE ELDER SCROLLS IV",
    style: "oblivion",
    mark: "✦",
    appId: "22330",
  },
  {
    title: "Skyrim",
    year: 2011,
    category: "classic",
    label: "Classic",
    subtitle: "THE ELDER SCROLLS V",
    style: "skyrim",
    mark: "ᛟ",
    appId: "72850",
  },
  {
    title: "Skyrim Special Edition",
    year: 2016,
    category: "modern",
    label: "Modern",
    subtitle: "THE ELDER SCROLLS V",
    style: "special-edition",
    mark: "ᛟ",
    appId: "489830",
  },
  {
    title: "The Elder Scrolls Online",
    year: 2014,
    category: "online",
    label: "Online",
    subtitle: "TAMRIEL UNLIMITED",
    style: "eso",
    mark: "✧",
    appId: "306130",
  },
];

const grid = document.querySelector("#game-grid");
const searchInput = document.querySelector("#game-search");
const emptyState = document.querySelector("#empty-state");
const filters = [...document.querySelectorAll(".filter-button")];
const toast = document.querySelector("#toast");
let activeFilter = "all";
let toastTimeout;

function renderGames() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const visibleGames = games.filter((game) => {
    const matchesFilter = activeFilter === "all" || game.category === activeFilter;
    const matchesSearch = `${game.title} ${game.year} ${game.label}`.toLocaleLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  grid.innerHTML = visibleGames.map((game) => `
    <article class="game-card">
      <div class="cover ${game.style}" role="img" aria-label="${game.title} themed artwork">
        <span class="cover-mark" aria-hidden="true">${game.mark}</span>
        <div class="cover-title">${game.title}<small>${game.subtitle}</small></div>
      </div>
      <div class="game-details">
        <div class="game-meta"><span class="game-year">${game.year}</span><span class="game-tag">${game.label}</span></div>
        <h3>${game.title}</h3>
        <div class="card-actions">
          <a class="launch-link" href="steam://run/${game.appId}" aria-label="Launch ${game.title} with Microsoft">
            <span class="steam-symbol" aria-hidden="true">◉</span> Launch with Microsoft (App IDs in development)
          </a>
          <a class="store-link" href="https://store.steampowered.com/app/${game.appId}/" target="_blank" rel="noopener noreferrer">Store page ↗</a>
        </div>
      </div>
    </article>
  `).join("");
  emptyState.hidden = visibleGames.length > 0;
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle("active", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });
    renderGames();
  });
});

searchInput.addEventListener("input", renderGames);

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = "";
    searchInput.blur();
    renderGames();
  }
});

grid.addEventListener("click", (event) => {
  if (event.target.closest(".launch-link")) {
    toast.textContent = "If Steam is installed, it will open this game from your library.";
    toast.classList.add("visible");
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 3500);
  }
});

document.querySelector("#game-count").textContent = String(games.length).padStart(2, "0");
document.querySelector("#nav-count").textContent = String(games.length).padStart(2, "0");
filters[0].querySelector("span").textContent = String(games.length).padStart(2, "0");
renderGames();
