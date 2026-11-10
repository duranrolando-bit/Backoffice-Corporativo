(() => {
  const iconPaths = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7H9v7H4a1 1 0 0 1-1-1z"/><path d="M9 21v-7h6v7"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.07 0l3-3A5 5 0 0 0 13 2.93l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3A5 5 0 0 0 11 21.07l1.71-1.71"/>',
    sim: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8v4H8zM8 14h2m4 0h2m-8 4h2m4 0h2"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11"/><path d="m9 12 2 2 4-4"/>',
    receipt: '<path d="M4 2v20l4-2 4 2 4-2 4 2V2l-4 2-4-2-4 2z"/><path d="M8 10h8M8 14h6"/>',
    note: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8m-8 4h8"/>',
    close: '<path d="M9 10h6m-6 4h6m-6 4h6"/><path d="M5 3h14v18l-3-2-4 2-4-2-3 2z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
    key: '<circle cx="8" cy="15" r="5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
    template: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    collapse: '<path d="m15 18-6-6 6-6"/><path d="M4 4v16"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    moon: '<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.note}</svg>`;
  const groups = [
    { label: 'General', items: [{ label: 'Inicio', file: 'index.html', icon: 'home' }] },
    { label: 'Operación', submenu: true, items: [{ label: 'Directorio de Posventas', file: 'directorio_posventas.html', icon: 'users' }, { label: 'Enlaces', file: 'enlaces.html', icon: 'link' }] },
    { label: 'Gestión de líneas', submenu: true, items: [{ label: 'Reemplazo de SIM', file: 'reemplazo_sim.html', icon: 'sim' }, { label: 'Códigos de país', file: 'codigos_pais.html', icon: 'globe' }] },
    { label: 'Herramientas', submenu: true, items: [{ label: 'Firma de reporte de robo', file: 'firmador_automatico_robo.html', icon: 'shield' }, { label: 'Facturas', file: 'facturas.html', icon: 'receipt' }, { label: 'Cierres QF', file: 'cierres.html', icon: 'close' }, { label: 'Plantillas QF', file: 'plantillas.html', icon: 'template' }, { label: 'Bloc de notas', file: 'bloc.html', icon: 'note' }, { label: 'Credenciales', file: 'credenciales.html', icon: 'key' }] }
  ];
  const safeGet = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const safeSet = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  const setTheme = theme => {
    document.documentElement.dataset.theme = theme;
    safeSet('bo-theme', theme);
    const button = document.querySelector('.bo-theme-toggle');
    if (button) {
      const dark = theme === 'dark';
      button.innerHTML = `${icon(dark ? 'sun' : 'moon')}<span class="bo-theme-text">${dark ? 'Modo claro' : 'Modo oscuro'}</span>`;
      button.setAttribute('aria-label', dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }
  };
  const theme = safeGet('bo-theme');
  setTheme(theme === 'dark' || theme === 'light' ? theme : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const normalizedPath = window.location.pathname.split('/').pop() || 'index.html';
  const savedCollapsed = safeGet('bo-sidebar-collapsed') === 'true';
  document.body.classList.add('bo-sidebar-page');
  if (savedCollapsed && matchMedia('(min-width: 761px)').matches) document.body.classList.add('bo-sidebar-collapsed');
  const sidebar = document.createElement('aside');
  sidebar.id = 'bo-sidebar';
  sidebar.setAttribute('aria-label', 'Navegación principal');
  sidebar.innerHTML = `<div class="bo-brand-row"><a class="bo-brand-mark" href="index.html" aria-label="Backoffice, ir al inicio" style="text-decoration:none">BC</a><div class="bo-brand-copy"><span class="bo-brand-name">Backoffice</span><span class="bo-brand-caption">CORPORATIVO · EL SALVADOR</span></div><button class="bo-toggle" type="button" aria-label="Contraer menú" title="Contraer menú">${icon('collapse')}</button></div><div class="bo-sidebar-rule"></div><nav class="bo-nav" aria-label="Secciones">${groups.map((group,index) => {
    const entries = group.items.map(item => {
      const active = normalizedPath.toLowerCase() === item.file.toLowerCase();
      return `<a class="${group.submenu ? 'bo-sub-link' : 'bo-nav-link'}" href="${item.file}" ${active ? 'aria-current="page"' : ''} title="${item.label}">${icon(item.icon)}<span class="bo-nav-text">${item.label}</span></a>`;
    }).join('');
    if (!group.submenu) return `<div class="bo-section"><p class="bo-nav-label">${group.label}</p>${entries}</div>`;
    const expanded = group.items.some(item => normalizedPath.toLowerCase() === item.file.toLowerCase());
    const id = `bo-submenu-${index}`;
    return `<div class="bo-section"><button class="bo-group-toggle" type="button" aria-expanded="${expanded}" aria-controls="${id}">${icon(group.items[0].icon)}<span class="bo-nav-text">${group.label}</span>${icon('chevron').replace('<svg ', '<svg class="bo-chevron" ')}</button><div class="bo-submenu" id="${id}" ${expanded ? '' : 'hidden'}>${entries}</div></div>`;
  }).join('')}</nav><div class="bo-sidebar-settings"><button class="bo-theme-toggle" type="button">${icon('moon')}<span class="bo-theme-text">Modo oscuro</span></button></div><div class="bo-sidebar-footer">Herramientas de atención corporativa</div>`;
  const mobileToggle = document.createElement('button');
  mobileToggle.id = 'bo-mobile-toggle';
  mobileToggle.type = 'button';
  mobileToggle.setAttribute('aria-label', 'Abrir menú de navegación');
  mobileToggle.setAttribute('aria-expanded', 'false');
  mobileToggle.innerHTML = icon('menu');
  const backdrop = document.createElement('div');
  backdrop.id = 'bo-sidebar-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.prepend(backdrop);
  document.body.prepend(sidebar);
  document.body.prepend(mobileToggle);
  sidebar.querySelector('.bo-toggle').addEventListener('click', () => {
    document.body.classList.add('bo-sidebar-collapsed');
    safeSet('bo-sidebar-collapsed', 'true');
  });
  sidebar.querySelector('.bo-theme-toggle').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
  mobileToggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('bo-sidebar-open');
    mobileToggle.setAttribute('aria-expanded', String(open));
  });
  const closeMobile = () => { document.body.classList.remove('bo-sidebar-open'); mobileToggle.setAttribute('aria-expanded', 'false'); };
  backdrop.addEventListener('click', closeMobile);
  sidebar.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobile));
  sidebar.querySelectorAll('.bo-group-toggle').forEach(button => button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    document.getElementById(button.getAttribute('aria-controls')).hidden = expanded;
  }));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMobile(); });
  matchMedia('(min-width: 761px)').addEventListener('change', event => { if (!event.matches) document.body.classList.remove('bo-sidebar-collapsed'); closeMobile(); });
})();
