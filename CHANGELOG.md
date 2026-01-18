## v1.0.2 - Leaner Notion automation
Reworded docs and clarified configuration guidance so Instago workflows stay focused on content while dependency helpers track the latest API client releases. Notion token usage now leans on the dedicated environment key and each call reliably reports the `{ ok, data, error }` result structure.

### Changed
- Updated README sections to emphasize the minimal surface area, fresh copy, and the single `env['notion.token']` token source, plus documented the consistent `{ ok, data, error }` return shape.
- Switched `http` and `log` helpers to their latest versions so the module always pulls forward compatible clients without manual dependency pinning.

## v1.0.1 - Stable Notion API helpers
Fresh release of the Notion module that documents the main helpers and reinforces token handling for smoother API calls.

### Added
- Introduced the configure, appendPage, and queryDatabase helpers with env-backed token resolution so Notion requests are easy to reuse.
