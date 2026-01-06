// notion@1.0.0 — Notion API helper
// API:
// - configure({ token })
// - appendPage({ databaseId, properties, children? })
// - queryDatabase({ databaseId, filter?, sorts? })

(function(){
  const httpx = require('http@1.0.0');
  const log = require('log@1.0.0').create('notion');

  const cfg = { token: null, api: 'https://api.notion.com/v1', version: '2022-06-28' };
  function configure(opts){ if (opts && opts.token) cfg.token = String(opts.token); }
  function auth(){ return cfg.token || sys.env.get('notion.token') || null; }
  function hdr(){ const t = auth(); if (!t) return null; return { 'Authorization': 'Bearer ' + t, 'Notion-Version': cfg.version, 'Content-Type': 'application/json' }; }

  async function appendPage({ databaseId, properties, children }){
    try {
      const h = hdr(); if (!h) return { ok:false, error:'notion: missing token' };
      const url = cfg.api + '/pages';
      const bodyObj = { parent: { database_id: String(databaseId||'') }, properties: (properties||{}) };
      if (Array.isArray(children)) bodyObj.children = children;
      const r = await httpx.json({ url, method:'POST', headers: h, bodyObj });
      return { ok:true, data: r && (r.json||r.raw) };
    } catch (e){ log.error('appendPage:error', e && (e.message||e)); return { ok:false, error: (e && (e.message||String(e))) || 'unknown' }; }
  }

  async function queryDatabase({ databaseId, filter, sorts }){
    try {
      const h = hdr(); if (!h) return { ok:false, error:'notion: missing token' };
      const url = cfg.api + '/databases/' + encodeURIComponent(databaseId) + '/query';
      const bodyObj = {}; if (filter) bodyObj.filter = filter; if (sorts) bodyObj.sorts = sorts;
      const r = await httpx.json({ url, method:'POST', headers: h, bodyObj });
      return { ok:true, data: r && (r.json||r.raw) };
    } catch (e){ log.error('queryDatabase:error', e && (e.message||e)); return { ok:false, error: (e && (e.message||String(e))) || 'unknown' }; }
  }

  module.exports = { configure, appendPage, queryDatabase };
})();
