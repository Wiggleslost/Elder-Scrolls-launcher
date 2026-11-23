# Elder Scrolls Library

A lightweight browser-based launcher for Elder Scrolls games available on Steam. Browse the catalog, search or filter by era, and open a game's Steam launch link or store page.

## Run

Open `index.html` in a modern browser, or open `launcher/index.html` directly. No installation or build step is required.

## Host on thelderscrolls.net

Publish `index.html`, `app.js`, `styles.css`, and the `launcher` directory to the site's document root, preserving their paths. Configure the web server to serve `launcher/index.html` for `/launcher/`. The launcher will then be available at `https://thelderscrolls.net/launcher/`; the root `index.html` redirects to the same launcher. If the domain already has a home page, keep that page instead of replacing it and link to `/launcher/`.

The domain owner must configure DNS, HTTPS, and hosting separately; this repository does not deploy or configure the domain. Browsers may ask permission to open Steam when a player selects a launch link.

## Limitations

This is a static launcher and does not install games, detect local installations, or connect to a Steam account. Launch links use Steam's `steam://run/<app-id>` protocol, so Steam must be installed and the game must be in your library. The catalog currently includes Morrowind, Oblivion, Skyrim, Skyrim Special Edition, and The Elder Scrolls Online.
