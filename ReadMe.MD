# module/notion - V8 module

Bring Notion updates into your workflows without juggling manual requests. This module keeps the surface area small so you can focus on the content you want to publish.

It is designed for Instago automations; learn more at https://instago.ai.

## Technical reference

Exports
- `configure({ token })`
- `appendPage({ databaseId, properties, children? })`
- `queryDatabase({ databaseId, filter?, sorts? })`

Usage
```js
const notion = require('notion@latest');

const token = env['notion.token'];
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
- Env (optional): `notion.token` can be used instead of `configure`.
- Each call returns `{ ok, data, error }`.

Examples
```js
const notion = require('notion@latest');

// Token can come from env or configure.
const token = env['notion.token'];
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
