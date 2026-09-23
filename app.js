(() => {
  const items = window.KUNSHAN_ITEMS;
  const categories = window.CATEGORIES;
  const translations = {
    en: {
      title: 'Kunshan Cultural Map', subtitle: 'Explore culture, place by place', search: 'Search culture, places, or stories', categoryHeading: 'Categories', clear: 'Clear',
      discoveries: 'cultural discoveries', surprise: 'Surprise me', mapLabel: 'Kunshan · Cultural discovery', mapHint: 'Drag to explore · Scroll or use controls to zoom',
      mapAria: 'Interactive Kunshan map. Drag and zoom to explore.', zoomIn: 'Zoom in', zoomOut: 'Zoom out', reset: 'Reset map', exploreAria: 'Cultural discovery', languageAria: 'Language',
      filterAria: 'Cultural category filters', listAria: 'Cultural discoveries', routeAria: 'Cultural route planning',
      emptyList: 'No matching discoveries. Try clearing filters or another search.', detailEmptyTitle: 'Start exploring from the map', detailEmpty: 'Select any cultural marker to read its story, see practical information, and add it to your route.',
      practical: 'Practical information', save: '＋ Want to visit', saved: '✓ Added to my list', close: 'Close details', marker: 'View', routeTitle: 'My cultural route',
      savedPlaces: count => `${count} saved place${count === 1 ? '' : 's'}`, routeEmpty: 'Add cultural places with “Want to visit” to create an efficient route.',
      generate: 'Generate cultural route', routeSummary: (stops, minutes) => `Suggested route · ${stops} stops · about ${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}m` : ''}`,
      remove: 'Remove', categories: { places: 'Places', stories: 'Stories', traditions: 'Traditions', food: 'Cultural food', people: 'People' }
    },
    zh: {
      title: '昆山文化地图', subtitle: '一处一处，探索昆山文化', search: '搜索文化、地点或故事', categoryHeading: '文化类别', clear: '清除',
      discoveries: '处文化发现', surprise: '随机发现一处文化', mapLabel: '昆山市 · 文化探索', mapHint: '拖动地图以探索 · 滚轮或按钮缩放',
      mapAria: '昆山交互地图，可拖动和缩放。', zoomIn: '放大地图', zoomOut: '缩小地图', reset: '重置地图', exploreAria: '文化探索', languageAria: '语言',
      filterAria: '文化类别筛选', listAria: '文化发现列表', routeAria: '文化路线规划',
      emptyList: '没有匹配项。试试清除筛选或换一个关键词。', detailEmptyTitle: '从地图开始探索', detailEmpty: '点击任意文化标记，查看故事、实用信息，并将它加入你的行程。',
      practical: '实用信息', save: '＋ 想去这里', saved: '✓ 已加入我的清单', close: '关闭详情', marker: '查看', routeTitle: '我的文化路线',
      savedPlaces: count => `${count} 个想去地点`, routeEmpty: '将文化地点加入“想去这里”，就能生成一条高效路线。',
      generate: '生成文化路线', routeSummary: (stops, minutes) => `建议路线 · ${stops} 站 · 约 ${Math.floor(minutes / 60)} 小时${minutes % 60 ? ` ${minutes % 60} 分钟` : ''}`,
      remove: '移除', categories: { places: '文化地点', stories: '文化故事', traditions: '传统技艺', food: '文化美食', people: '文化人物' }
    }
  };
  const getStoredLanguage = () => { try { return localStorage.getItem('kunshan-map-language'); } catch { return null; } };
  const state = { language: getStoredLanguage() === 'zh' ? 'zh' : 'en', query: '', active: new Set(categories.map(c => c.id)), selected: null, saved: [], route: [] };
  const $ = id => document.getElementById(id);
  const t = () => translations[state.language];
  const field = (item, name) => item[`${name}${state.language === 'zh' ? 'Zh' : 'En'}`];
  const itemName = item => field(item, 'name');
  const itemDescription = item => field(item, 'description');
  const itemInfo = item => field(item, 'info');
  const itemTags = item => field(item, 'tags');
  const KUNSHAN_CENTER = [31.3827, 120.9818];
  const OPENSTREETMAP_TILES = { url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', options: { maxZoom: 19, minZoom: 9, noWrap: true, keepBuffer: 0, updateWhenIdle: true, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' } };
  const map = L.map('mapViewport', { center: KUNSHAN_CENTER, zoom: 11, zoomControl: false, attributionControl: true, preferCanvas: true });
  L.tileLayer(OPENSTREETMAP_TILES.url, OPENSTREETMAP_TILES.options).addTo(map);
  const markerLayer = L.layerGroup().addTo(map);
  let routeLine = null, routeStops = null;
  const filtered = () => items.filter(item => state.active.has(item.category) && [itemName(item), itemDescription(item), ...itemTags(item)].join(' ').toLowerCase().includes(state.query.toLowerCase()));
  const markerIcon = (item, selected = false) => L.divIcon({ className: 'cultural-marker-wrap', html: `<span class="cultural-marker ${selected ? 'is-selected' : ''}" style="--marker:${item.color}" aria-hidden="true"><b>${item.image}</b></span>`, iconSize: selected ? [48, 48] : [40, 40], iconAnchor: selected ? [24, 24] : [20, 20] });
  const distanceKm = (a, b) => { const r = Math.PI / 180, lat = (b.lat - a.lat) * r, lng = (b.lng - a.lng) * r, q = Math.sin(lat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(lng / 2) ** 2; return 6371 * 2 * Math.atan2(Math.sqrt(q), Math.sqrt(1 - q)); };
  function setLanguage(language) {
    state.language = language;
    try { localStorage.setItem('kunshan-map-language', language); } catch {}
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = t().title;
    $('brandTitle').textContent = t().title; $('brandSubtitle').textContent = t().subtitle; $('searchInput').placeholder = t().search;
    $('categoryHeading').textContent = t().categoryHeading; $('clearFilters').textContent = t().clear; $('resultLabel').textContent = t().discoveries; $('surpriseButton').innerHTML = `<span>✦</span> ${t().surprise}`;
    $('mapLabel').innerHTML = `<i></i> ${t().mapLabel}`; $('mapHint').textContent = t().mapHint; $('mapViewport').setAttribute('aria-label', t().mapAria);
    $('zoomIn').setAttribute('aria-label', t().zoomIn); $('zoomOut').setAttribute('aria-label', t().zoomOut); $('resetMap').setAttribute('aria-label', t().reset);
    $('explorePanel').setAttribute('aria-label', t().exploreAria); document.querySelector('.language-toggle').setAttribute('aria-label', t().languageAria); $('categoryFilters').setAttribute('aria-label', t().filterAria); $('itemList').setAttribute('aria-label', t().listAria); $('routePanel').setAttribute('aria-label', t().routeAria);
    document.querySelectorAll('[data-language]').forEach(button => { button.classList.toggle('active', button.dataset.language === language); button.setAttribute('aria-pressed', String(button.dataset.language === language)); });
    refresh(); renderDetails(); renderRoute();
  }
  function renderFilters() { $('categoryFilters').innerHTML = categories.map(c => `<button class="filter ${state.active.has(c.id) ? 'active' : ''}" data-category="${c.id}" style="--category:${c.color}"><span>${c.icon}</span>${t().categories[c.id]}<b>${items.filter(i => i.category === c.id).length}</b></button>`).join(''); }
  function select(id, focus = false) { state.selected = items.find(i => i.id === id) || null; renderDetails(); renderMarkers(); renderList(); if (focus && state.selected) map.flyTo([state.selected.lat, state.selected.lng], Math.max(map.getZoom(), 14), { duration: .65 }); document.querySelector(`.item-card[data-id="${id}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
  function renderList() { const matches = filtered(); $('resultCount').textContent = matches.length; $('itemList').innerHTML = matches.length ? matches.map(i => `<button class="item-card ${state.selected?.id === i.id ? 'selected' : ''}" data-id="${i.id}"><span class="item-icon" style="background:${i.color}18;color:${i.color}">${i.image}</span><span><strong>${itemName(i)}</strong><small>${t().categories[i.category]}</small><em>${itemTags(i).slice(0, 2).join(' · ')}</em></span><i>›</i></button>`).join('') : `<div class="empty">${t().emptyList}</div>`; }
  function renderMarkers() { markerLayer.clearLayers(); filtered().forEach(item => L.marker([item.lat, item.lng], { icon: markerIcon(item, state.selected?.id === item.id), keyboard: true, title: itemName(item), alt: `${t().marker} ${itemName(item)}`, riseOnHover: true }).on('click', () => select(item.id)).addTo(markerLayer)); }
  function renderDetails() {
    const panel = $('detailPanel'), item = state.selected;
    if (!item) { panel.innerHTML = `<div class="detail-empty"><span>⌖</span><h2>${t().detailEmptyTitle}</h2><p>${t().detailEmpty}</p></div>`; return; }
    const saved = state.saved.includes(item.id);
    panel.innerHTML = `<div class="detail-top"><span class="category-chip" style="--category:${item.color}">${t().categories[item.category]}</span><button id="closeDetail" aria-label="${t().close}">×</button></div><div class="detail-hero" style="--hero:${item.color}"><span>${item.image}</span><small>${itemTags(item).join(' · ')}</small></div><div class="detail-content"><h1>${itemName(item)}</h1><p>${itemDescription(item)}</p><div class="practical"><span>◷</span><div><b>${t().practical}</b><small>${itemInfo(item)}</small></div></div><button id="saveButton" class="save-button ${saved ? 'saved' : ''}">${saved ? t().saved : t().save}</button></div>`;
    $('closeDetail')?.addEventListener('click', () => { state.selected = null; renderDetails(); renderMarkers(); renderList(); }); $('saveButton')?.addEventListener('click', () => toggleSave(item.id));
  }
  function toggleSave(id) { const at = state.saved.indexOf(id); if (at >= 0) { state.saved.splice(at, 1); state.route = state.route.filter(x => x !== id); } else state.saved.push(id); renderDetails(); renderRoute(); renderRouteLine(); }
  function renderRoute() {
    const saved = state.saved.map(id => items.find(i => i.id === id)), route = state.route.map(id => items.find(i => i.id === id)), minutes = route.reduce((n, i) => n + i.duration, 0) + Math.max(0, route.length - 1) * 18;
    $('routePanel').innerHTML = `<div class="route-head"><div><span>${t().routeTitle}</span><strong>${t().savedPlaces(saved.length)}</strong></div></div><div class="route-body"><div class="saved-stops">${saved.length ? saved.map((i, n) => `<div class="saved-stop" draggable="true" data-saved="${i.id}"><b>${n + 1}</b><span>${i.image} ${itemName(i)}</span><button data-remove="${i.id}" aria-label="${t().remove} ${itemName(i)}">×</button></div>`).join('') : `<p class="route-empty">${t().routeEmpty}</p>`}</div><button id="generateRoute" class="generate" ${saved.length < 2 ? 'disabled' : ''}>${t().generate} <span>→</span></button>${route.length ? `<div class="route-result"><b>${t().routeSummary(route.length, minutes)}</b><p>${route.map((i, n) => `${n + 1}. ${itemName(i)}`).join('　→　')}</p></div>` : ''}</div>`;
    document.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => toggleSave(button.dataset.remove))); $('generateRoute')?.addEventListener('click', generateRoute);
    let dragging; document.querySelectorAll('[data-saved]').forEach(el => { el.addEventListener('dragstart', () => { dragging = el.dataset.saved; }); el.addEventListener('dragover', event => event.preventDefault()); el.addEventListener('drop', event => { event.preventDefault(); const target = el.dataset.saved, from = state.saved.indexOf(dragging), to = state.saved.indexOf(target); state.saved.splice(from, 1); state.saved.splice(to, 0, dragging); renderRoute(); }); });
  }
  function generateRoute() { const remaining = state.saved.map(id => items.find(i => i.id === id)); if (remaining.length < 2) return; const ordered = [remaining.shift()]; while (remaining.length) { const current = ordered.at(-1); remaining.sort((a, b) => (distanceKm(current, a) + (a.category === current.category ? 5.5 : 0)) - (distanceKm(current, b) + (b.category === current.category ? 5.5 : 0))); ordered.push(remaining.shift()); } state.route = ordered.map(i => i.id); renderRoute(); renderRouteLine(); }
  function renderRouteLine() { routeLine?.remove(); routeStops?.remove(); const route = state.route.map(id => items.find(i => i.id === id)); if (route.length < 2) return; routeLine = L.polyline(route.map(item => [item.lat, item.lng]), { color: '#d94f42', weight: 5, opacity: .88, dashArray: '10 7', lineCap: 'round', lineJoin: 'round' }).addTo(map); routeStops = L.layerGroup(route.map((item, index) => L.marker([item.lat, item.lng], { interactive: false, icon: L.divIcon({ className: 'route-stop-wrap', html: `<span class="route-stop">${index + 1}</span>`, iconSize: [24, 24], iconAnchor: [12, 12] }) }))).addTo(map); }
  function refresh() { renderFilters(); renderList(); renderMarkers(); }
  $('categoryFilters').addEventListener('click', event => { const button = event.target.closest('[data-category]'); if (!button) return; const id = button.dataset.category; state.active.has(id) ? state.active.delete(id) : state.active.add(id); refresh(); });
  $('itemList').addEventListener('click', event => { const button = event.target.closest('[data-id]'); if (button) select(button.dataset.id, true); });
  $('searchInput').addEventListener('input', event => { state.query = event.target.value; refresh(); }); $('clearFilters').addEventListener('click', () => { state.query = ''; $('searchInput').value = ''; state.active = new Set(categories.map(c => c.id)); refresh(); });
  $('surpriseButton').addEventListener('click', () => { const choices = filtered(); if (choices.length) select(choices[Math.floor(Math.random() * choices.length)].id, true); });
  document.querySelector('.language-toggle').addEventListener('click', event => { const button = event.target.closest('[data-language]'); if (button) setLanguage(button.dataset.language); });
  $('zoomIn').onclick = () => map.zoomIn(); $('zoomOut').onclick = () => map.zoomOut(); $('resetMap').onclick = () => map.setView(KUNSHAN_CENTER, 11);
  setLanguage(state.language); requestAnimationFrame(() => map.invalidateSize());
})();
