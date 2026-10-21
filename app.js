(() => {
  const data = window.KUNSHAN_DATA;
  const items = data.fragments;
  const relations = data.relations;
  const byId = new Map(items.map(item => [item.id, item]));
  const sources = new Map(data.sources.map(source => [source.id, source]));
  const categories = [
    { id: 'Places', color: '#3f6f8c', icon: '⌂' },
    { id: 'Artifacts', color: '#78658e', icon: '◇' },
    { id: 'Food', color: '#b56b68', icon: '◒' },
    { id: 'Traditions', color: '#4e857c', icon: '◎' },
    { id: 'Stories', color: '#6b769c', icon: '✦' }
  ];
  const categoryById = new Map(categories.map(category => [category.id, category]));

  const copy = {
    en: {
      title: 'Kunshan Cultural Map', subtitle: 'Explore culture, place by place',
      search: 'Search names, introductions, or towns', categories: 'Categories', clear: 'Clear', discoveries: 'cultural records', surprise: 'Surprise me', map: 'Map', patterns: 'Patterns',
      mapLabel: 'Kunshan · Cultural discovery', mapHint: 'Select a card or photo marker to explore', empty: 'No matching records. Clear filters or try another search.',
      detailTitle: 'Start exploring from the map', detailEmpty: 'Select a card or photo marker to read its introduction, evidence, and cultural context.',
      practical: 'Location and evidence', source: 'Sources', imageCredit: 'Image credit', imageVerified: 'Record-specific image; reuse terms still apply', imageLikely: 'Source-listed image; subject match not independently checked', imageContext: 'Context image—not evidence of the named item', imageRights: 'Image reuse terms', imageRightsKnown: 'License is named in the credit', imageRightsOwn: 'Team photograph; included with the photographer’s permission', imageRightsReview: 'Permission or reuse terms require confirmation', precision: 'Coordinate precision', related: 'Cultural context', noRelated: 'No documented relation is recorded for this item.',
      save: '＋ Add to route', saved: '✓ Added to route', route: 'My cultural route', savedPlaces: count => `${count} saved stop${count === 1 ? '' : 's'}`,
      routeEmpty: 'Add at least two cultural records to compare route options.', generate: 'Generate route options', remove: 'Remove',
      routeModes: { fastest: 'Fastest', scenic: 'Best for scenery', convenient: 'Most convenient' },
      routeDescriptions: { fastest: 'Orders nearby stops, then follows routable roads for a practical driving sequence.', scenic: 'Prioritizes waterside places and living culture, then follows routable roads.', convenient: 'Groups stops by town and opens each leg in AMap for live public-transport planning.' },
      routeSummary: (count, km, minutes, live) => live ? `${count} stops · ${km} km road-corridor reference · estimated transit ${minutes} min` : `${count} stops · ${km} km by road · about ${minutes} min`,
      routeCaveat: 'Road shape, distance and driving time use the OSRM public routing service when available. Walking, cycling and public-transport times are estimates from road distance; each transit leg includes a 10-minute waiting/transfer allowance. Check actual routes and live times in AMap. Approximate location anchors can affect every result.',
      routeLoading: 'Finding routable roads…', routeFallback: 'Road service unavailable—showing an approximate fallback.', liveDirections: 'Open live directions', transitEstimate: 'estimated', routeSourceRoad: 'Road routing: OSRM', routeSourceTransit: 'Live public transport: AMap',
      journeyEyebrow: 'ROUTE IN PROGRESS', journeyTitle: 'Tracing a route through Kunshan', journeyNote: 'Following roads between cultural places…',
      transport: { walk: 'Walk', cycle: 'Bicycle', transit: 'Public transport', taxi: 'Taxi / car' }, viewSource: 'View source', mapAria: 'Interactive Kunshan map',
      patternsTitle: 'Cultural patterns', patternsIntro: 'Two linked visualization idioms reveal both dataset composition and sourced cultural relationships.',
      chartTitle: 'Idiom 1 · Category distribution', chartHint: 'Compare the five categories. Select a bar to filter every view.',
      networkTitle: 'Idiom 2 · Cultural relationship network', networkHint: 'Select a node to reveal its direct evidence-linked neighborhood. Lines are cultural relations, not roads.',
      networkAria: 'Network of sourced cultural relationships', networkCount: (nodes, edges) => `${nodes} records · ${edges} visible links of ${relations.length} total`,
      taskGuideEyebrow: 'ONE TASK · FIVE LINKED VIEWS', taskGuideTitle: 'Build an evidence-linked cultural route', taskGuideNote: 'Begin with an overview, inspect a documented connection, locate records, read their sources, then compare route heuristics.',
      idioms: { basic: 'Overview', network: 'Connections', spatial: 'Places', interactive: 'Inspect', advanced: 'Compare' },
      idiomNotes: {
        basic: 'Basic overview: compare category counts in this course dataset.', network: 'Network: inspect named, source-linked relationships; layout is not geography.', spatial: 'Spatial view: locate approximate cultural anchors across Kunshan.', interactive: 'Interactive inspection: select a record and read its description, precision and sources.', advanced: 'Advanced comparison: compare three transparent route heuristics against the saved-stop list.'
      },
      basicTag: 'BASIC · OVERVIEW', networkTag: 'NETWORK · DOCUMENTED LINKS',
      basicBoundary: 'Evidence boundary: counts describe this 82-record course dataset, not all cultural heritage in Kunshan.',
      networkBoundary: 'Evidence boundary: a line means one documented relationship in this dataset. Its length and position do not measure distance, strength, or causality.',
      mapBoundary: 'Approximate cultural anchors · not surveyed entrances or live navigation',
      coverage: { records: 'records', relations: 'relationships', sources: 'source collections' },
      visibleLinks: 'Visible relationship evidence', noVisibleLinks: 'No relationship is visible for this selection. Choose another node or clear the filters.', sourceRegisterTitle: 'Source register', sourceRegisterIntro: 'The 13 factual source collections used by this prototype. Status records authority and access—not blanket permission to reuse text or media.', sourceChecked: 'checked 21 Oct 2026',
      compareAll: 'Compare all three heuristics', rule: 'Rule', selectedRoute: 'Selected',
      categoriesNames: { Places: 'Places', Artifacts: 'Artifacts', Food: 'Food', Traditions: 'Traditions', Stories: 'Stories' },
      precisionNames: { 'specific-site': 'Specific site', 'town-area anchor': 'Town area anchor', 'town anchor': 'Town anchor', 'associated-site anchor': 'Associated site anchor', 'district anchor': 'District anchor', 'city anchor': 'City anchor', 'regional food anchor': 'Regional food anchor', 'landscape anchor': 'Landscape anchor', 'village-area anchor': 'Village area anchor', 'city cultural anchor': 'City cultural anchor', 'regional anchor': 'Regional anchor' }
    },
    zh: {
      title: '昆山文化地图', subtitle: '一处一处，探索昆山文化', search: '搜索名称、介绍或乡镇', categories: '文化类别', clear: '清除', discoveries: '条文化记录', surprise: '随机发现一处文化', map: '地图', patterns: '文化关联',
      mapLabel: '昆山市 · 文化探索', mapHint: '点击卡片或图片标记开始探索', empty: '没有匹配项，请清除筛选或更换关键词。',
      detailTitle: '从地图开始探索', detailEmpty: '点击左侧卡片或地图图片标记，查看介绍、证据和文化背景。',
      practical: '位置与证据', source: '资料来源', imageCredit: '图片来源', imageVerified: '该图片对应具体条目；转载仍受原始条款约束', imageLikely: '来源页中的相关图片；尚未逐项独立核对主体', imageContext: '仅为情境图片，不能证明该具体条目', imageRights: '图片使用条件', imageRightsKnown: '署名中已标出许可协议', imageRightsOwn: '团队成员自摄图片；已获拍摄者同意用于本项目', imageRightsReview: '仍需确认转载许可或使用条款', precision: '坐标精度', related: '文化背景', noRelated: '数据集中暂未记录此项目的文化关联。',
      save: '＋ 加入路线', saved: '✓ 已加入路线', route: '我的文化路线', savedPlaces: count => `${count} 个已选站点`,
      routeEmpty: '至少加入两个文化项目，即可比较不同路线。', generate: '生成路线方案', remove: '移除',
      routeModes: { fastest: '最快', scenic: '最适合观景', convenient: '交通最方便' },
      routeDescriptions: { fastest: '先排列相邻站点，再沿可通行道路生成较实用的驾车顺序。', scenic: '优先水乡地点和活态文化，再沿可通行道路连接。', convenient: '先按乡镇分组，并为每一段打开高德实时公共交通规划。' },
      routeSummary: (count, km, minutes, live) => live ? `${count} 站 · 道路走廊参考 ${km} 公里 · 公交预估约 ${minutes} 分钟` : `${count} 站 · 道路距离 ${km} 公里 · 约 ${minutes} 分钟`,
      routeCaveat: '可用时，道路形状、距离和驾车时间来自 OSRM 公共路线服务；步行、骑行和公交时间根据道路距离估算，每段公交另计10分钟候车或换乘缓冲。实际路线和实时用时须在高德地图核对。部分文化地点使用近似坐标，会影响路线结果。',
      routeLoading: '正在查找可通行道路…', routeFallback: '道路服务暂不可用，当前显示近似备用路线。', liveDirections: '打开实时导航', transitEstimate: '预估', routeSourceRoad: '道路规划：OSRM', routeSourceTransit: '实时公交：高德地图',
      journeyEyebrow: '正在生成路线', journeyTitle: '沿着昆山水乡寻找文化路径', journeyNote: '正在连接文化地点与可通行道路…',
      transport: { walk: '步行', cycle: '骑行', transit: '公共交通', taxi: '出租车 / 驾车' }, viewSource: '查看来源', mapAria: '昆山交互地图',
      patternsTitle: '昆山文化模式', patternsIntro: '两个相互联动的可视化 idiom：同时观察数据类别分布和有来源的文化关系。',
      chartTitle: 'Idiom 1 · 类别分布', chartHint: '比较五个文化类别；点击条形可同步筛选地图、列表和网络。',
      networkTitle: 'Idiom 2 · 文化关系网络', networkHint: '点击节点查看有证据支持的直接关联；连线表示文化关系，不表示道路。',
      networkAria: '有来源的昆山文化关系网络', networkCount: (nodes, edges) => `当前 ${nodes} 条记录、${edges} 条连线；全部 ${relations.length} 条`,
      taskGuideEyebrow: '一个任务 · 五个联动视图', taskGuideTitle: '建立一条有证据依据的文化探索路线', taskGuideNote: '先看数据概览，再检查一条有记录的文化关联、定位项目、阅读来源，最后比较路线规则。',
      idioms: { basic: '概览', network: '关联', spatial: '地点', interactive: '查证', advanced: '比较' },
      idiomNotes: {
        basic: '基础概览：比较本课程数据集中的类别数量。', network: '关系网络：查看有来源的命名关系；布局不代表地理位置。', spatial: '空间视图：查看文化项目在昆山的大致位置锚点。', interactive: '交互查证：选择记录，阅读介绍、坐标精度和来源。', advanced: '高级比较：将三种透明的路线规则与已保存站点列表对照。'
      },
      basicTag: '基础 · 数据概览', networkTag: '网络 · 有记录的关联',
      basicBoundary: '证据边界：这些数量只描述本课程整理的 82 条记录，不代表昆山全部文化遗产。',
      networkBoundary: '证据边界：连线只表示数据集中记录的一条关系；线长和位置不表示距离、强度或因果。',
      mapBoundary: '文化位置锚点约值 · 不是测绘入口或实时导航',
      coverage: { records: '条记录', relations: '条文化关联', sources: '组来源资料' },
      visibleLinks: '当前可见的关系证据', noVisibleLinks: '当前选择没有可见关系，请选择其他节点或清除筛选。', sourceRegisterTitle: '信息来源目录', sourceRegisterIntro: '本原型使用的13组事实来源。状态只表示来源权威性与可访问性，不代表其中所有文字或媒体都可自由转载。', sourceChecked: '核查于2026年10月21日',
      compareAll: '比较三种启发式规则', rule: '规则', selectedRoute: '已选择',
      categoriesNames: { Places: '文化地点', Artifacts: '文化物件', Food: '地方美食', Traditions: '传统技艺', Stories: '文化故事' },
      precisionNames: { 'specific-site': '精确地点', 'town-area anchor': '乡镇范围锚点', 'town anchor': '乡镇锚点', 'associated-site anchor': '关联地点锚点', 'district anchor': '区级锚点', 'city anchor': '市级锚点', 'regional food anchor': '区域美食锚点', 'landscape anchor': '景观锚点', 'village-area anchor': '村落范围锚点', 'city cultural anchor': '市级文化锚点', 'regional anchor': '区域锚点' }
    }
  };
  const relationLabelsZh = {
    'Material culture and place': '物质文化与地点', 'Local food and place': '地方食物与地点', 'Living tradition and place': '活态传统与地点', 'Place and documented memory': '地点与历史记忆',
    'Origins and performance tradition': '源流与表演传统', 'From kiln production to museum collection': '从窑业生产到博物馆收藏', 'Food product and brewing practice': '食品与酿造技艺',
    'Food and transmitted story': '食物与流传故事', 'Seasonal crab food culture': '时令蟹食文化', 'Two narratives of Jinxi': '锦溪的两种地方叙事',
    'Object and civic cultural story': '文化物件与城市故事', 'Collection and museum narrative': '馆藏与博物馆叙事', 'Two distinct Kunshan cultural anchors': '两种不同的昆山文化线索'
  };
  const $ = id => document.getElementById(id);
  const queryLanguage = new URLSearchParams(location.search).get('lang');
  const storedLanguage = (() => { try { return localStorage.getItem('kunshan-map-language'); } catch { return null; } })();
  const state = { language: queryLanguage === 'zh' || queryLanguage === 'en' ? queryLanguage : storedLanguage === 'zh' ? 'zh' : 'en', query: '', active: new Set(categories.map(category => category.id)), selected: null, saved: [], routes: {}, routeMode: 'fastest', routeLoading: false, routeError: false, view: 'map', idiom: 'spatial' };
  const t = () => copy[state.language];
  const name = item => state.language === 'zh' ? item.nameZh : item.name;
  const summary = item => state.language === 'zh' ? item.summaryZh : item.summary;
  const precision = item => t().precisionNames[item.locationPrecision] || item.locationPrecision;
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const connected = id => relations.filter(relation => relation.a === id || relation.b === id);
  const relationLabel = relation => state.language === 'zh' ? (relationLabelsZh[relation.label] || relation.label) : relation.label;
  const matches = () => items.filter(item => state.active.has(item.category) && [item.name, item.nameZh, item.summary, item.summaryZh, item.town, item.area].join(' ').toLowerCase().includes(state.query.toLowerCase()));

  const map = L.map('mapViewport', { center: [31.29, 120.94], zoom: 11, zoomControl: false, preferCanvas: true });
  const mapBounds = [[30.90222470517144, 120.41015625], [31.653381399663985, 121.46484375]];
  map.createPane('cachedBase'); map.getPane('cachedBase').style.zIndex = 150;
  const cachedLayers = {
    zh: L.imageOverlay('assets/map/kunshan-osm-z11.jpg', mapBounds, { pane: 'cachedBase', opacity: 1, interactive: false, alt: '昆山中文缓存地图' }),
    en: L.imageOverlay('assets/map/kunshan-english-nolabels-z11.jpg', mapBounds, { pane: 'cachedBase', opacity: 1, interactive: false, alt: 'Cached English-mode road map of Kunshan' })
  };
  const baseLayers = {
    zh: L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', { subdomains: '1234', maxZoom: 18, minZoom: 9, keepBuffer: 1, updateWhenIdle: true, opacity: .88, attribution: '&copy; 高德地图' }),
    en: L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=en&size=1&scale=1&style=8&x={x}&y={y}&z={z}', { subdomains: '1234', maxZoom: 18, minZoom: 9, keepBuffer: 1, updateWhenIdle: true, opacity: 1, attribution: '&copy; AMap' })
  };
  let baseLayer, cachedLayer;
  function setBaseLayer(language) {
    const next = baseLayers[language], nextCached = cachedLayers[language];
    if (baseLayer) map.removeLayer(baseLayer); if (cachedLayer) map.removeLayer(cachedLayer);
    nextCached.addTo(map); next.addTo(map);
    baseLayer = next; cachedLayer = nextCached;
  }
  const markerLayer = L.layerGroup().addTo(map), routeLayer = L.layerGroup().addTo(map);
  function markerIcon(item, selected, count = 1) { return L.divIcon({ className: 'cultural-marker-wrap', html: `<span class="cultural-marker ${selected ? 'is-selected' : ''} ${count > 1 ? 'is-cluster' : ''}" style="--marker:${categoryById.get(item.category).color}"><span class="marker-photo"><img src="${escapeHtml(item.image)}" alt=""></span></span>`, iconSize: [48, 48], iconAnchor: [24, 24] }); }
  const radians = Math.PI / 180;
  function distance(a, b) { const dlat = (b.lat - a.lat) * radians, dlng = (b.lng - a.lng) * radians; const value = Math.sin(dlat / 2) ** 2 + Math.cos(a.lat * radians) * Math.cos(b.lat * radians) * Math.sin(dlng / 2) ** 2; return 6371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value)); }

  function renderFilters() { $('categoryFilters').innerHTML = categories.map(category => `<button type="button" class="filter ${state.active.has(category.id) ? 'active' : ''}" data-category="${category.id}" style="--category:${category.color}" aria-pressed="${state.active.has(category.id)}"><span>${category.icon}</span>${t().categoriesNames[category.id]}<b>${items.filter(item => item.category === category.id).length}</b></button>`).join(''); }
  function renderList() { const found = matches(); $('resultCount').textContent = found.length; $('itemList').innerHTML = found.length ? found.map(item => `<button type="button" class="item-card ${state.selected === item.id ? 'selected' : ''}" data-id="${item.id}"><img class="item-photo" src="${escapeHtml(item.image)}" alt="" loading="lazy"><span><strong>${escapeHtml(name(item))}</strong><small>${t().categoriesNames[item.category]} · ${escapeHtml(item.town)}</small><em>${escapeHtml(precision(item))}</em></span><i>›</i></button>`).join('') : `<div class="empty">${t().empty}</div>`; }
  function renderMarkers() {
    markerLayer.clearLayers();
    const groups = new Map();
    const groupPrecision = map.getZoom() <= 12 ? 1 : 2;
    matches().forEach(item => {
      const key = `${item.lat.toFixed(groupPrecision)}:${item.lng.toFixed(groupPrecision)}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    });
    const expanded = map.getZoom() >= 15;
    groups.forEach(group => {
      const center = { lat: group.reduce((sum, item) => sum + item.lat, 0) / group.length, lng: group.reduce((sum, item) => sum + item.lng, 0) / group.length };
      if (!expanded && group.length > 1) {
        const representative = group.find(item => item.id === state.selected) || group[0];
        L.marker([center.lat, center.lng], { icon: markerIcon(representative, group.some(item => item.id === state.selected), group.length), title: `${name(representative)} +${group.length - 1}`, alt: `${group.length} cultural records`, keyboard: true, riseOnHover: true }).on('click', () => map.flyTo([center.lat, center.lng], 14, { duration: .55 })).addTo(markerLayer);
        return;
      }
      const radius = group.length > 1 ? Math.min(.0032, .0012 + group.length * .00012) : 0;
      group.forEach((item, index) => {
        const angle = group.length > 1 ? 2 * Math.PI * index / group.length : 0;
        const lat = item.lat + Math.sin(angle) * radius;
        const lng = item.lng + Math.cos(angle) * radius / Math.cos(item.lat * radians);
        L.marker([lat, lng], { icon: markerIcon(item, state.selected === item.id), title: name(item), alt: name(item), keyboard: true, riseOnHover: true }).on('click', () => select(item.id)).addTo(markerLayer);
      });
    });
  }
  function contextText(item, relation) { if (state.language === 'en') return relation.summary; const other = byId.get(relation.a === item.id ? relation.b : relation.a); return `${name(item)}与${name(other)}之间记录有“${relationLabel(relation)}”的文化联系；该联系来自所列资料来源。`; }
  function renderDetails() {
    const item = byId.get(state.selected), panel = $('detailPanel');
    if (!item) { panel.innerHTML = `<div class="detail-empty"><span>⌖</span><h2>${t().detailTitle}</h2><p>${t().detailEmpty}</p></div>`; return; }
    const category = categoryById.get(item.category), links = connected(item.id);
    const sourceLinks = item.sourceIds.map(id => sources.get(id)).filter(Boolean).map(source => `<a class="source-link" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(source.publisher)} · ${escapeHtml(source.title)}</span><small>${escapeHtml(source.sourceType || 'Public source')} · ${escapeHtml(source.verificationStatus || t().sourceChecked)}</small></a>`).join('');
    const relationCards = links.length ? links.slice(0, 6).map(relation => { const other = byId.get(relation.a === item.id ? relation.b : relation.a); return `<button type="button" data-related="${other.id}"><strong>${escapeHtml(name(other))}</strong><small>${escapeHtml(relationLabel(relation))}</small><span>${escapeHtml(contextText(item, relation))}</span></button>`; }).join('') : `<p>${t().noRelated}</p>`;
    const role = String(item.imageRole || '');
    const imageStatus = role.startsWith('specific image') ? t().imageVerified : role === 'specific-search result' ? t().imageLikely : t().imageContext;
    const imageVerified = role.startsWith('specific image');
    const commonsLicense = /wikimedia\.org/i.test(item.imageSource || '') && /CC|public domain/i.test(item.imageCredit || '');
    const teamPhoto = /team photograph|photograph by yihong lin/i.test(item.imageCredit || '');
    const rightsKnown = commonsLicense || teamPhoto;
    const rightsText = teamPhoto ? t().imageRightsOwn : commonsLicense ? t().imageRightsKnown : t().imageRightsReview;
    panel.innerHTML = `<div class="detail-top"><span class="category-chip" style="--category:${category.color}">${t().categoriesNames[item.category]}</span><button id="closeDetail" aria-label="Close">×</button></div><div class="detail-hero" style="--hero:${category.color}"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(name(item))}"><small>${escapeHtml(item.area)}</small></div><div class="detail-content"><h1>${escapeHtml(name(item))}</h1><p class="introduction">${escapeHtml(summary(item))}</p><div class="practical"><span>⌖</span><div><b>${t().practical}</b><small>${escapeHtml(item.town)} · ${t().precision}: ${escapeHtml(precision(item))}</small></div></div><div class="evidence"><b>${t().source}</b>${sourceLinks}<small class="image-credit"><b>${t().imageCredit}:</b> <a href="${escapeHtml(item.imageSource)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.imageCredit)}</a></small><small class="image-verification ${imageVerified ? 'verified' : 'review'}">${imageVerified ? '✓' : '!'} ${imageStatus}</small><small class="image-rights ${rightsKnown ? 'known' : 'review'}"><b>${t().imageRights}:</b> ${rightsText}</small></div><div class="relations"><b>${t().related} (${links.length})</b>${relationCards}</div><button id="saveButton" class="save-button ${state.saved.includes(item.id) ? 'saved' : ''}">${state.saved.includes(item.id) ? t().saved : t().save}</button></div>`;
    $('closeDetail').onclick = () => select(null); $('saveButton').onclick = () => toggleSave(item.id); panel.querySelectorAll('[data-related]').forEach(button => { button.onclick = () => select(button.dataset.related, true); });
  }
  function select(id, focus = false) { state.selected = byId.has(id) ? id : null; renderDetails(); renderList(); renderMarkers(); renderPatterns(); if (focus && state.selected) { setView('map'); const item = byId.get(id); map.flyTo([item.lat, item.lng], 14, { duration: .6 }); } }
  function toggleSave(id) { if (!byId.has(id)) return; const index = state.saved.indexOf(id); if (index >= 0) state.saved.splice(index, 1); else state.saved.push(id); state.routes = {}; renderDetails(); renderRoute(); renderRouteLine(); }

  function fastestOrder(selected) { const remaining = [...selected], ordered = [remaining.shift()]; while (remaining.length) { remaining.sort((a, b) => distance(ordered.at(-1), a) - distance(ordered.at(-1), b)); ordered.push(remaining.shift()); } return ordered; }
  function scenicOrder(selected) { const scenicWeight = { Places: .72, Stories: .77, Traditions: .8, Food: .9, Artifacts: .86 }; const remaining = [...selected], ordered = [remaining.shift()]; while (remaining.length) { remaining.sort((a, b) => distance(ordered.at(-1), a) * scenicWeight[a.category] - connected(a.id).length * .08 - (distance(ordered.at(-1), b) * scenicWeight[b.category] - connected(b.id).length * .08)); ordered.push(remaining.shift()); } return ordered; }
  function convenientOrder(selected) { const groups = new Map(); selected.forEach(item => { if (!groups.has(item.town)) groups.set(item.town, []); groups.get(item.town).push(item); }); const remainingGroups = [...groups.values()], ordered = []; while (remainingGroups.length) { const previous = ordered.at(-1); remainingGroups.sort((a, b) => previous ? Math.min(...a.map(item => distance(previous, item))) - Math.min(...b.map(item => distance(previous, item))) : b.length - a.length); const group = remainingGroups.shift(); const startIndex = previous ? group.reduce((best, item, index) => distance(previous, item) < distance(previous, group[best]) ? index : best, 0) : 0; group.unshift(group.splice(startIndex, 1)[0]); ordered.push(...fastestOrder(group)); } return ordered; }
  function transportFor(km, mode) { if (mode === 'convenient') return 'transit'; if (km <= 1.3) return 'walk'; if (km <= 5 && mode !== 'fastest') return 'cycle'; return 'taxi'; }
  function amapRouteUrl(from, to, transport) {
    const mode = { walk: 'walk', cycle: 'ride', transit: 'bus', taxi: 'car' }[transport] || 'car';
    const start = `${from.lng},${from.lat},${name(from)}`, end = `${to.lng},${to.lat},${name(to)}`;
    return `https://uri.amap.com/navigation?from=${encodeURIComponent(start)}&to=${encodeURIComponent(end)}&mode=${mode}&policy=1&src=KunshanCulturalMap&callnative=0`;
  }
  async function fetchRoadRoute(stops) {
    const coordinates = stops.map(item => `${item.lng},${item.lat}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=false`;
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Routing service returned ${response.status}`);
    const payload = await response.json(), result = payload.routes && payload.routes[0];
    if (payload.code !== 'Ok' || !result || !result.geometry || !Array.isArray(result.legs)) throw new Error('No routable road result');
    return { geometry: result.geometry.coordinates.map(point => [point[1], point[0]]), legs: result.legs };
  }
  function fallbackRoad(stops) {
    return { geometry: stops.map(item => [item.lat, item.lng]), legs: stops.slice(1).map((stop, index) => ({ distance: distance(stops[index], stop) * 1000, duration: distance(stops[index], stop) / 26 * 3600 })) };
  }
  async function buildRoute(mode) {
    const selected = state.saved.map(id => byId.get(id)).filter(Boolean);
    if (selected.length < 2) return null;
    const stops = mode === 'scenic' ? scenicOrder(selected) : mode === 'convenient' ? convenientOrder(selected) : fastestOrder(selected);
    let road, fallback = false;
    try { road = await fetchRoadRoute(stops); } catch (error) { road = fallbackRoad(stops); fallback = true; }
    const legs = stops.slice(1).map((stop, index) => {
      const roadLeg = road.legs[index] || fallbackRoad([stops[index], stop]).legs[0];
      const km = roadLeg.distance / 1000, transport = transportFor(km, mode);
      const minutes = transport === 'transit' ? Math.max(10, Math.round(km / 20 * 60 + 10)) : transport === 'taxi' ? Math.max(3, Math.round(roadLeg.duration / 60)) : Math.max(3, Math.round(km / ({ walk: 4.5, cycle: 13 }[transport]) * 60));
      return { from: stops[index], to: stop, km, transport, minutes, url: amapRouteUrl(stops[index], stop, transport) };
    });
    return { mode, stops, legs, geometry: road.geometry, fallback, km: legs.reduce((sum, leg) => sum + leg.km, 0), minutes: legs.reduce((sum, leg) => sum + (leg.minutes || 0), 0) };
  }
  async function generateRoutes() {
    if (state.saved.length < 2 || state.routeLoading) return;
    state.routeLoading = true; state.routeError = false; setRouteAnimation('loading'); renderRoute();
    try {
      const [built] = await Promise.all([Promise.all(['fastest', 'scenic', 'convenient'].map(buildRoute)), new Promise(resolve => setTimeout(resolve, 1150))]);
      ['fastest', 'scenic', 'convenient'].forEach((mode, index) => { state.routes[mode] = built[index]; });
      state.routeError = built.every(route => route && route.fallback);
    } catch (error) { state.routeError = true; }
    finally { state.routeLoading = false; renderRoute(); renderRouteLine(); setRouteAnimation('complete'); }
  }
  function setRouteAnimation(phase) {
    const overlay = $('routeJourneyAnimation'); if (!overlay) return;
    $('journeyEyebrow').textContent = t().journeyEyebrow; $('journeyTitle').textContent = t().journeyTitle; $('journeyNote').textContent = t().journeyNote;
    clearTimeout(setRouteAnimation.timer); overlay.classList.remove('is-loading', 'is-complete');
    if (phase === 'loading') overlay.classList.add('is-loading');
    if (phase === 'complete') { overlay.classList.add('is-complete'); setRouteAnimation.timer = setTimeout(() => overlay.classList.remove('is-complete'), 1000); }
  }
  function renderRoute() {
    const route = state.routes[state.routeMode];
    const modes = ['fastest', 'scenic', 'convenient'].map(mode => `<button type="button" class="route-mode ${state.routeMode === mode ? 'active' : ''}" data-route-mode="${mode}" aria-pressed="${state.routeMode === mode}">${t().routeModes[mode]}</button>`).join('');
    const saved = state.saved.length ? state.saved.map((id, index) => { const item = byId.get(id); return `<div class="saved-stop"><b>${index + 1}</b><img src="${escapeHtml(item.image)}" alt=""><span>${escapeHtml(name(item))}</span><button data-remove="${id}" aria-label="${t().remove} ${escapeHtml(name(item))}">×</button></div>`; }).join('') : `<p class="route-empty">${t().routeEmpty}</p>`;
    const availableRoutes = Object.values(state.routes).filter(Boolean);
    const maxKm = Math.max(1, ...availableRoutes.map(candidate => candidate.km));
    const comparison = availableRoutes.length === 3 ? `<section class="route-comparison" aria-label="${t().compareAll}"><div class="route-comparison-title"><b>${t().compareAll}</b><small>${t().routeCaveat}</small></div><div class="route-comparison-grid">${availableRoutes.map(candidate => `<button type="button" class="route-comparison-card ${candidate.mode === state.routeMode ? 'active' : ''}" data-route-mode="${candidate.mode}" aria-pressed="${candidate.mode === state.routeMode}"><span>${candidate.mode === state.routeMode ? t().selectedRoute : t().rule}</span><strong>${t().routeModes[candidate.mode]}</strong><div class="comparison-bar"><i style="width:${Math.max(8, candidate.km / maxKm * 100)}%"></i></div><b>${candidate.km.toFixed(1)} km</b><small>${t().routeDescriptions[candidate.mode]}</small></button>`).join('')}</div></section>` : '';
    const result = route ? `<div class="route-result"><div class="route-summary"><b>${t().routeSummary(route.stops.length, route.km.toFixed(1), route.minutes, route.mode === 'convenient')}</b><span>${t().routeDescriptions[state.routeMode]}</span>${route.fallback ? `<small class="route-warning">${t().routeFallback}</small>` : ''}</div><div class="route-legs">${route.legs.map((leg, index) => `<div class="route-leg"><b>${index + 1}</b><span>${escapeHtml(name(leg.from))}<i>→</i>${escapeHtml(name(leg.to))}</span><em>${t().transport[leg.transport]} · ${leg.km.toFixed(1)} km · ${leg.transport === 'transit' ? `${t().transitEstimate} ~${leg.minutes} min` : `~${leg.minutes} min`}</em><a href="${escapeHtml(leg.url)}" target="_blank" rel="noopener noreferrer">${t().liveDirections} ↗</a></div>`).join('')}</div><small class="route-caveat">${t().routeCaveat}<br><a href="https://project-osrm.org/docs/v5.24.0/api/#route-service" target="_blank" rel="noopener noreferrer">${t().routeSourceRoad}</a> · <a href="https://lbs.amap.com/api/uri-api/guide/travel/route" target="_blank" rel="noopener noreferrer">${t().routeSourceTransit}</a></small></div>${comparison}` : '';
    const loading = state.routeLoading ? `<div class="route-loading" role="status"><i></i>${t().routeLoading}</div>` : '';
    $('routePanel').innerHTML = `<div class="route-head"><div><span>${t().route}</span><strong>${t().savedPlaces(state.saved.length)}</strong></div><div class="route-modes" role="group">${modes}</div></div><div class="route-body"><div class="saved-stops">${saved}</div><button id="generateRoute" class="generate" ${state.saved.length < 2 || state.routeLoading ? 'disabled' : ''}>${state.routeLoading ? t().routeLoading : `${t().generate} →`}</button>${loading}${result}</div>`;
    $('routePanel').querySelectorAll('[data-remove]').forEach(button => { button.onclick = () => toggleSave(button.dataset.remove); });
    $('routePanel').querySelectorAll('[data-route-mode]').forEach(button => { button.onclick = () => { state.routeMode = button.dataset.routeMode; if (state.saved.length >= 2 && !state.routes[state.routeMode]) generateRoutes(); else { renderRoute(); renderRouteLine(); } }; });
    $('generateRoute').onclick = generateRoutes;
  }
  function renderRouteLine() { routeLayer.clearLayers(); const route = state.routes[state.routeMode]; if (!route) return; const color = { fastest: '#78658e', scenic: '#4e857c', convenient: '#315f7d' }[state.routeMode]; const geometry = route.geometry && route.geometry.length > 1 ? route.geometry : route.stops.map(item => [item.lat, item.lng]); L.polyline(geometry, { color, weight: 5, dashArray: state.routeMode === 'convenient' || route.fallback ? '10 7' : null, opacity: .9 }).addTo(routeLayer); route.stops.forEach((item, index) => L.marker([item.lat, item.lng], { interactive: false, icon: L.divIcon({ className: 'route-stop-wrap', html: `<span class="route-stop" style="--route-color:${color}">${index + 1}</span>`, iconSize: [26, 26], iconAnchor: [13, 13] }) }).addTo(routeLayer)); map.fitBounds(geometry, { padding: [58, 58], maxZoom: 14 }); }

  function networkSubset() { let ids; if (state.selected) ids = [state.selected, ...connected(state.selected).map(relation => relation.a === state.selected ? relation.b : relation.a)].slice(0, 24); else { const degree = new Map(items.map(item => [item.id, connected(item.id).length])); ids = items.filter(item => state.active.has(item.category)).sort((a, b) => degree.get(b.id) - degree.get(a.id)).slice(0, 16).map(item => item.id); } return { ids, edges: relations.filter(relation => ids.includes(relation.a) && ids.includes(relation.b)) }; }
  function renderPatterns() {
    const max = Math.max(...categories.map(category => items.filter(item => item.category === category.id).length));
    $('categoryChart').innerHTML = categories.map(category => { const count = items.filter(item => item.category === category.id).length; return `<button type="button" class="chart-row ${state.active.has(category.id) ? 'active' : ''}" data-chart-category="${category.id}" aria-pressed="${state.active.has(category.id)}"><span>${t().categoriesNames[category.id]}</span><span class="chart-track"><span style="width:${count / max * 100}%;background:${category.color}"></span></span><b>${count}</b></button>`; }).join('');
    const { ids, edges } = networkSubset();
    const positions = new Map();
    if (state.selected && ids.includes(state.selected)) {
      positions.set(state.selected, { x: 300, y: 185 });
      const neighbors = ids.filter(id => id !== state.selected);
      neighbors.forEach((id, index) => positions.set(id, { x: 300 + 235 * Math.cos(2 * Math.PI * index / Math.max(1, neighbors.length) - Math.PI / 2), y: 185 + 142 * Math.sin(2 * Math.PI * index / Math.max(1, neighbors.length) - Math.PI / 2) }));
    } else {
      ids.forEach((id, index) => positions.set(id, { x: 300 + 215 * Math.cos(2 * Math.PI * index / ids.length - Math.PI / 2), y: 190 + 130 * Math.sin(2 * Math.PI * index / ids.length - Math.PI / 2) }));
    }
    $('networkGraph').innerHTML = edges.map(relation => { const a = positions.get(relation.a), b = positions.get(relation.b); return `<line class="network-edge" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"><title>${escapeHtml(relationLabel(relation))}</title></line>`; }).join('') + ids.map(id => { const item = byId.get(id), position = positions.get(id); return `<g class="network-node ${state.selected === id ? 'selected' : ''}" data-node="${id}" tabindex="0" role="button" aria-label="${escapeHtml(name(item))}" transform="translate(${position.x},${position.y})"><defs><clipPath id="clip-${id}"><circle r="19"/></clipPath></defs><circle r="21" fill="${categoryById.get(item.category).color}"/><image href="${escapeHtml(item.image)}" x="-18" y="-18" width="36" height="36" preserveAspectRatio="xMidYMid slice" clip-path="url(#clip-${id})"/><text class="node-label" text-anchor="middle" y="34">${escapeHtml(name(item).slice(0, 13))}</text><title>${escapeHtml(name(item))}</title></g>`; }).join('');
    $('coverageSummary').innerHTML = `<span><b>${items.length}</b>${t().coverage.records}</span><span><b>${relations.length}</b>${t().coverage.relations}</span><span><b>${data.sources.length}</b>${t().coverage.sources}</span>`;
    $('networkLegend').textContent = t().networkCount(ids.length, edges.length);
    $('networkInspector').innerHTML = `<b>${t().visibleLinks}</b>${edges.length ? edges.slice(0, 5).map(relation => { const a = byId.get(relation.a), b = byId.get(relation.b); return `<button type="button" data-evidence-node="${a.id}"><span>${escapeHtml(name(a))}</span><i>— ${escapeHtml(relationLabel(relation))} —</i><span>${escapeHtml(name(b))}</span></button>`; }).join('') : `<p>${t().noVisibleLinks}</p>`}`;
    $('sourceRegisterTitle').textContent = t().sourceRegisterTitle;
    $('sourceRegisterIntro').textContent = t().sourceRegisterIntro;
    $('sourceRegister').innerHTML = data.sources.map(source => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer"><b>${escapeHtml(source.title)}</b><span>${escapeHtml(source.publisher)}</span><small>${escapeHtml(source.sourceType || 'Public source')} · ${escapeHtml(source.verificationStatus || t().sourceChecked)}</small><em>${escapeHtml(source.accessNote || source.scope)}</em></a>`).join('');
  }
  function setView(view) { state.view = view; const visible = view === 'patterns'; $('patternsPanel').hidden = !visible; $('mapViewButton').setAttribute('aria-pressed', String(!visible)); $('patternsViewButton').setAttribute('aria-pressed', String(visible)); if (!visible) requestAnimationFrame(() => map.invalidateSize()); }
  function setIdiom(idiom) {
    state.idiom = idiom;
    document.querySelectorAll('[data-idiom]').forEach(button => button.classList.toggle('active', button.dataset.idiom === idiom));
    $('taskGuideNote').textContent = t().idiomNotes[idiom];
    document.body.dataset.idiom = idiom;
    if (idiom === 'basic' || idiom === 'network') {
      setView('patterns');
      if (idiom === 'network' && !state.selected) {
        const defaultNode = [...items].sort((a, b) => connected(b.id).length - connected(a.id).length)[0];
        if (defaultNode) select(defaultNode.id);
      }
      document.querySelectorAll('[data-pattern-card]').forEach(card => card.classList.toggle('is-focus', card.dataset.patternCard === idiom));
    } else {
      setView('map');
      if (idiom === 'interactive' && !state.selected) {
        const first = matches()[0];
        if (first) select(first.id, true);
      }
    }
    $('interactionStatus').textContent = t().idiomNotes[idiom];
  }
  function refresh() { renderFilters(); renderList(); renderMarkers(); renderPatterns(); }
  function setLanguage(language) {
    state.language = language; setBaseLayer(language); try { localStorage.setItem('kunshan-map-language', language); } catch {}
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'; document.title = t().title; $('brandTitle').textContent = t().title; $('brandSubtitle').textContent = t().subtitle; $('searchInput').placeholder = t().search; $('categoryHeading').textContent = t().categories; $('clearFilters').textContent = t().clear; $('resultLabel').textContent = t().discoveries; $('surpriseButton').innerHTML = `<span>✦</span> ${t().surprise}`; $('mapLabel').innerHTML = `<i></i> ${t().mapLabel}`; $('mapHint').textContent = t().mapHint; $('mapViewport').setAttribute('aria-label', t().mapAria); $('mapViewButton').textContent = t().map; $('patternsViewButton').textContent = t().patterns; $('patternsTitle').textContent = t().patternsTitle; $('patternsIntro').textContent = t().patternsIntro; $('chartTitle').textContent = t().chartTitle; $('chartHint').textContent = t().chartHint; $('networkTitle').textContent = t().networkTitle; $('networkHint').textContent = t().networkHint; $('networkGraph').setAttribute('aria-label', t().networkAria);
    $('taskGuideEyebrow').textContent = t().taskGuideEyebrow; $('taskGuideTitle').textContent = t().taskGuideTitle; $('taskGuideNote').textContent = t().idiomNotes[state.idiom] || t().taskGuideNote;
    $('idiomBasic').textContent = t().idioms.basic; $('idiomNetwork').textContent = t().idioms.network; $('idiomSpatial').textContent = t().idioms.spatial; $('idiomInteractive').textContent = t().idioms.interactive; $('idiomAdvanced').textContent = t().idioms.advanced;
    $('basicTag').textContent = t().basicTag; $('networkTag').textContent = t().networkTag; $('basicBoundary').textContent = t().basicBoundary; $('networkBoundary').textContent = t().networkBoundary; $('mapBoundary').textContent = t().mapBoundary;
    document.querySelectorAll('[data-language]').forEach(button => { button.classList.toggle('active', button.dataset.language === language); button.setAttribute('aria-pressed', String(button.dataset.language === language)); }); refresh(); renderDetails(); renderRoute();
  }
  $('categoryFilters').onclick = event => { const button = event.target.closest('[data-category]'); if (!button) return; state.active.has(button.dataset.category) ? state.active.delete(button.dataset.category) : state.active.add(button.dataset.category); refresh(); };
  $('categoryChart').onclick = event => { const button = event.target.closest('[data-chart-category]'); if (!button) return; const id = button.dataset.chartCategory; state.active = new Set(state.active.size === 1 && state.active.has(id) ? categories.map(category => category.id) : [id]); refresh(); };
  $('itemList').onclick = event => { const button = event.target.closest('[data-id]'); if (button) select(button.dataset.id, true); };
  $('networkGraph').onclick = event => { const node = event.target.closest('[data-node]'); if (node) select(node.dataset.node); };
  $('networkGraph').onkeydown = event => { if (event.key === 'Enter' || event.key === ' ') { const node = event.target.closest('[data-node]'); if (node) { event.preventDefault(); select(node.dataset.node); } } };
  $('networkInspector').onclick = event => { const button = event.target.closest('[data-evidence-node]'); if (button) select(button.dataset.evidenceNode); };
  $('searchInput').oninput = event => { state.query = event.target.value; refresh(); };
  $('clearFilters').onclick = () => { state.query = ''; $('searchInput').value = ''; state.active = new Set(categories.map(category => category.id)); refresh(); };
  $('surpriseButton').onclick = () => { const found = matches(); if (found.length) select(found[Math.floor(Math.random() * found.length)].id, true); };
  document.querySelector('.language-toggle').onclick = event => { const button = event.target.closest('[data-language]'); if (button) setLanguage(button.dataset.language); };
  $('mapViewButton').onclick = () => setIdiom('spatial'); $('patternsViewButton').onclick = () => setIdiom('basic'); $('zoomIn').onclick = () => map.zoomIn(); $('zoomOut').onclick = () => map.zoomOut(); $('resetMap').onclick = () => map.setView([31.29, 120.94], 11);
  document.querySelector('.idiom-rail').onclick = event => { const button = event.target.closest('[data-idiom]'); if (button) setIdiom(button.dataset.idiom); };
  map.on('zoomend', renderMarkers);
  setLanguage(state.language);
  if (new URLSearchParams(location.search).get('view') === 'patterns') setView('patterns');
  requestAnimationFrame(() => map.invalidateSize());
  if (new URLSearchParams(location.search).has('smoke')) setTimeout(() => { const output = document.createElement('output'); output.id = 'smoke-test-result'; output.hidden = true; document.body.appendChild(output); try { ['zhouzhuang_town', 'jinxi_town', 'qiandeng_town'].forEach(toggleSave); generateRoutes(); setLanguage('zh'); const valid = items.length === 82 && document.querySelectorAll('.item-photo').length > 0 && document.querySelectorAll('[data-idiom]').length === 5 && document.querySelectorAll('.route-mode').length === 3 && Object.keys(state.routes).length === 3 && $('patternsPanel'); if (!valid) throw new Error('Expected bilingual records, five linked views, and route comparisons were not rendered'); output.dataset.status = 'pass'; output.textContent = 'PASS: 82 records · bilingual interface · five linked views · three route heuristics'; } catch (error) { output.dataset.status = 'fail'; output.textContent = `FAIL: ${error.message}`; } }, 250);
})();
