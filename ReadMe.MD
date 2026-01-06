# module/notion - V8 module

Organize and track work in Notion without hand-crafting API calls. This module gives you a clean, minimal way to add pages and query databases from your workflows.

It is built to fit naturally into Instago flows, so you can keep step code short and focus on business logic. Learn more at https://instago.ai.

## Technical reference

Exports
- `configure({ token })`
- `appendPage({ databaseId, properties, children? })`
- `queryDatabase({ databaseId, filter?, sorts? })`

Usage
```js
const notion = require('notion@latest');

const token = env['notion.token'] || (env.notion && env.notion.token);
notion.configure({ token });

const created = await notion.appendPage({
  databaseId: env.notionDbId,
  properties: {
    Name: { title: [{ text: { content: 'Weekly update' } }] }
  }
});
```

Configuration
- `configure({ token })` sets the Notion API token used for requests.
- Env (optional): `notion.token` can be used instead of `configure` when desired.
- Returns `{ ok, data, error }` from each API call.

Examples
```js
const notion = require('notion@latest');

// Token can come from env or configure.
const token = env['notion.token'] || (env.notion && env.notion.token);
notion.configure({ token });

const result = await notion.queryDatabase({
  databaseId: env.notionDbId,
  filter: {
    property: 'Status',
    select: { equals: 'Done' }
  },
  sorts: [{ property: 'Created', direction: 'descending' }]
});

if (!result.ok) console.error('notion.queryDatabase failed:', result.error);
```

```js
const notion = require('notion@latest');

const created = await notion.appendPage({
  databaseId: env.notionDbId,
  properties: {
    Name: { title: [{ text: { content: 'Incident follow-up' } }] },
    Priority: { select: { name: 'High' } }
  },
  children: [
    {
      object: 'block',
      type: 'paragraph',
      paragraph: { rich_text: [{ text: { content: 'Summary of actions.' } }] }
    }
  ]
});

if (!created.ok) console.error('notion.appendPage failed:', created.error);
```
