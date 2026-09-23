(() => {
  const items = window.KUNSHAN_ITEMS;
  const categories = window.CATEGORIES;
  const KUNSHAN_CENTER = [31.3827, 120.9818];
  const OPENSTREETMAP_TILES = {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: { maxZoom: 19, minZoom: 9, noWrap: true, keepBuffer: 0, updateWhenIdle: true, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }
  };
  const state = { query: '', active: new Set(categories.map(c => c.id)), selected: null, saved: [], route: [] };
  const $ = id => document.getElementById(id);
  const map = L.map('mapViewport', { center: KUNSHAN_CENTER, zoom: 11, zoomControl: false, attributionControl: true, preferCanvas: true });
  L.tileLayer(OPENSTREETMAP_TILES.url, OPENSTREETMAP_TILES.options).addTo(map);
  const markerLayer = L.layerGroup().addTo(map);
  let routeLine = null;
  let routeStops = null;

  const filtered = () => items.filter(i => state.active.has(i.category) && `${i.name} ${i.description} ${i.tags.join(' ')}`.toLowerCase().includes(state.query.toLowerCase()));
  const markerIcon = (item, selected = false) => L.divIcon({ className: 'cultural-marker-wrap', html: `<span class="cultural-marker ${selected ? 'is-selected' : ''}" style="--marker:${item.color}" aria-hidden="true"><b>${item.image}</b></span>`, iconSize: selected ? [48, 48] : [40, 40], iconAnchor: selected ? [24, 24] : [20, 20] });
  const distanceKm = (a, b) => { const r = Math.PI / 180, lat = (b.lat - a.lat) * r, lng = (b.lng - a.lng) * r; const q = Math.sin(lat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(lng / 2) ** 2; return 6371 * 2 * Math.atan2(Math.sqrt(q), Math.sqrt(1 - q)); };

  function renderFilters() { $('categoryFilters').innerHTML = categories.map(c => `<button class="filter ${state.active.has(c.id) ? 'active' : ''}" data-category="${c.id}" style="--category:${c.color}"><span>${c.icon}</span>${c.label}<b>${items.filter(i => i.category === c.id).length}</b></button>`).join(''); }
  function select(id, focus = false) {
    state.selected = items.find(i => i.id === id) || null;
    renderDetails(); renderMarkers(); renderList();
    if (focus && state.selected) map.flyTo([state.selected.lat, state.selected.lng], Math.max(map.getZoom(), 14), { duration: .65 });
    document.querySelector(`.item-card[data-id="${id}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  function renderList() {
    const matches = filtered(); $('resultCount').textContent = matches.length;
    $('itemList').innerHTML = matches.length ? matches.map(i => `<button class="item-card ${state.selected?.id === i.id ? 'selected' : ''}" data-id="${i.id}"><span class="item-icon" style="background:${i.color}18;color:${i.color}">${i.image}</span><span><strong>${i.name}</strong><small>${i.categoryLabel}</small><em>${i.tags.slice(0, 2).join(' · ')}</em></span><i>›</i></button>`).join('') : '<div class="empty">没有匹配项。试试清除筛选或换一个关键词。</div>';
  }
  function renderMarkers() {
    markerLayer.clearLayers();
    filtered().forEach(item => L.marker([item.lat, item.lng], { icon: markerIcon(item, state.selected?.id === item.id), keyboard: true, title: item.name, riseOnHover: true }).on('click', () => select(item.id)).addTo(markerLayer));
  }
  function renderDetails() {
    const panel = $('detailPanel'), item = state.selected;
    if (!item) { panel.innerHTML = '<div class="detail-empty"><span>⌖</span><h2>从地图开始探索</h2><p>点击任意文化标记，查看故事、实用信息，并将它加入你的行程。</p></div>'; return; }
    const saved = state.saved.includes(item.id);
    panel.innerHTML = `<div class="detail-top"><span class="category-chip" style="--category:${item.color}">${item.categoryLabel}</span><button id="closeDetail" aria-label="关闭详情">×</button></div><div class="detail-hero" style="--hero:${item.color}"><span>${item.image}</span><small>${item.tags.join(' · ')}</small></div><div class="detail-content"><h1>${item.name}</h1><p>${item.description}</p><div class="practical"><span>◷</span><div><b>实用信息</b><small>${item.info}</small></div></div><button id="saveButton" class="save-button ${saved ? 'saved' : ''}">${saved ? '✓ 已加入我的清单' : '＋ 想去这里'}</button></div>`;
    $('closeDetail')?.addEventListener('click', () => { state.selected = null; renderDetails(); renderMarkers(); renderList(); });
    $('saveButton')?.addEventListener('click', () => toggleSave(item.id));
  }
  function toggleSave(id) { const at = state.saved.indexOf(id); if (at >= 0) { state.saved.splice(at, 1); state.route = state.route.filter(x => x !== id); } else state.saved.push(id); renderDetails(); renderRoute(); renderRouteLine(); }
  function renderRoute() {
    const saved = state.saved.map(id => items.find(i => i.id === id)), route = state.route.map(id => items.find(i => i.id === id));
    const minutes = route.reduce((n, i) => n + i.duration, 0) + Math.max(0, route.length - 1) * 18;
    $('routePanel').innerHTML = `<div class="route-head"><div><span>我的文化路线</span><strong>${saved.length} 个想去地点</strong></div></div><div class="route-body"><div class="saved-stops">${saved.length ? saved.map((i, n) => `<div class="saved-stop" draggable="true" data-saved="${i.id}"><b>${n + 1}</b><span>${i.image} ${i.name}</span><button data-remove="${i.id}" aria-label="移除${i.name}">×</button></div>`).join('') : '<p class="route-empty">将文化地点加入“想去这里”，就能生成一条高效路线。</p>'}</div><button id="generateRoute" class="generate" ${saved.length < 2 ? 'disabled' : ''}>生成文化路线 <span>→</span></button>${route.length ? `<div class="route-result"><b>建议路线 · ${route.length} 站 · 约 ${Math.floor(minutes / 60)} 小时${minutes % 60 ? ` ${minutes % 60} 分钟` : ''}</b><p>${route.map((i, n) => `${n + 1}. ${i.name}`).join('　→　')}</p></div>` : ''}</div>`;
    document.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => toggleSave(button.dataset.remove)));
    $('generateRoute')?.addEventListener('click', generateRoute);
    let dragging;
    document.querySelectorAll('[data-saved]').forEach(el => { el.addEventListener('dragstart', () => { dragging = el.dataset.saved; }); el.addEventListener('dragover', event => event.preventDefault()); el.addEventListener('drop', event => { event.preventDefault(); const target = el.dataset.saved, from = state.saved.indexOf(dragging), to = state.saved.indexOf(target); state.saved.splice(from, 1); state.saved.splice(to, 0, dragging); renderRoute(); }); });
  }
  function generateRoute() {
    const remaining = state.saved.map(id => items.find(i => i.id === id)); if (remaining.length < 2) return;
    const ordered = [remaining.shift()];
    while (remaining.length) { const current = ordered.at(-1); remaining.sort((a, b) => (distanceKm(current, a) + (a.category === current.category ? 5.5 : 0)) - (distanceKm(current, b) + (b.category === current.category ? 5.5 : 0))); ordered.push(remaining.shift()); }
    state.route = ordered.map(i => i.id); renderRoute(); renderRouteLine();
  }
  function renderRouteLine() {
    routeLine?.remove(); routeStops?.remove();
    const route = state.route.map(id => items.find(i => i.id === id)); if (route.length < 2) return;
    routeLine = L.polyline(route.map(item => [item.lat, item.lng]), { color: '#d94f42', weight: 5, opacity: .88, dashArray: '10 7', lineCap: 'round', lineJoin: 'round' }).addTo(map);
    routeStops = L.layerGroup(route.map((item, index) => L.marker([item.lat, item.lng], { interactive: false, icon: L.divIcon({ className: 'route-stop-wrap', html: `<span class="route-stop">${index + 1}</span>`, iconSize: [24, 24], iconAnchor: [12, 12] }) }))).addTo(map);
  }
  function refresh() { renderFilters(); renderList(); renderMarkers(); }

  $('categoryFilters').addEventListener('click', event => { const button = event.target.closest('[data-category]'); if (!button) return; const id = button.dataset.category; state.active.has(id) ? state.active.delete(id) : state.active.add(id); refresh(); });
  $('itemList').addEventListener('click', event => { const button = event.target.closest('[data-id]'); if (button) select(button.dataset.id, true); });
  $('searchInput').addEventListener('input', event => { state.query = event.target.value; refresh(); });
  $('clearFilters').addEventListener('click', () => { state.query = ''; $('searchInput').value = ''; state.active = new Set(categories.map(c => c.id)); refresh(); });
  $('surpriseButton').addEventListener('click', () => { const choices = filtered(); if (choices.length) select(choices[Math.floor(Math.random() * choices.length)].id, true); });
  $('zoomIn').onclick = () => map.zoomIn(); $('zoomOut').onclick = () => map.zoomOut(); $('resetMap').onclick = () => map.setView(KUNSHAN_CENTER, 11);
  renderDetails(); refresh(); renderRoute(); requestAnimationFrame(() => map.invalidateSize());
})();
