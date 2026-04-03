/* ── Theme ─────────────────────────────────────────────── */
  const themeBtn = document.getElementById('themeBtn');
  let dark = false;
  themeBtn.addEventListener('click', () => {
    dark = !dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
    themeBtn.textContent = dark ? '☀️' : '🌙';
  });

  /* ── Language ───────────────────────────────────────────── */
  function setLang(lang) {
    document.body.setAttribute('data-lang', lang);
    document.getElementById('btnEN').classList.toggle('active', lang === 'en');
    document.getElementById('btnZH').classList.toggle('active', lang === 'zh');
    document.getElementById('btnEN').setAttribute('aria-pressed', lang === 'en');
    document.getElementById('btnZH').setAttribute('aria-pressed', lang === 'zh');
  }

  /* ── Nav ────────────────────────────────────────────────── */
  const menuBtn    = document.getElementById('menuBtn');
  const sideNav    = document.getElementById('sideNav');
  const navOverlay = document.getElementById('navOverlay');
  let navOpen = false;

  menuBtn.addEventListener('click', () => {
    navOpen = !navOpen;
    sideNav.classList.toggle('open', navOpen);
    navOverlay.classList.toggle('visible', navOpen);
    menuBtn.classList.toggle('open', navOpen);
    menuBtn.setAttribute('aria-expanded', navOpen);
  });

  function closeNav() {
    navOpen = false;
    sideNav.classList.remove('open');
    navOverlay.classList.remove('visible');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', false);
  }

  function navClick(el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    if (window.innerWidth < 900) closeNav();
  }

  /* ── Section Collapse ───────────────────────────────────── */
  function toggleSection(header) {
    header.closest('.section-card').classList.toggle('collapsed');
  }

  /* ── Escape to close nav / modal ───────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (navOpen) closeNav();
      closeMember();
    }
  });

  /* ── Member Modal ───────────────────────────────────────── */
  const members = {
    'May':      { id: '學號待填', chapters: 'Section X',       note: '', photo: '' },
    'Atherine': { id: '學號待填', chapters: 'Section X',       note: '', photo: '' },
    'Fanny':    { id: '學號待填', chapters: 'Section X',       note: '', photo: '' },
    'Allen':    { id: '學號待填', chapters: 'Section X',       note: '', photo: '' },
    'Wesley':   { id: '學號待填', chapters: 'Section X',       note: '', photo: '' },
    'Datou':    { id: '111212011', chapters: 'Product Portfolios', note: '', photo: 'images/members/datou.png' },
  };

  // 雙語 label 對照
  const modalLabels = {
    id:       { en: '🎓 Student ID', zh: '🎓 學號' },
    chapters: { en: '📋 Responsible Sections', zh: '📋 負責章節' },
    note:     { en: '📝 Note', zh: '📝 備註' },
  };

  function openMember(name) {
    const m    = members[name];
    const lang = document.body.getAttribute('data-lang') || 'en';
    const L    = (key) => modalLabels[key][lang];

    // Avatar: 若有照片路徑用圖片，否則用首字母
    const avatarHTML = m.photo
      ? `<img src="${m.photo}" alt="${name}" class="member-avatar-img" />`
      : `<div class="member-avatar">${name.charAt(0).toUpperCase()}</div>`;

    document.getElementById('modalContent').innerHTML = `
      ${avatarHTML}
      <div class="member-modal-name">${name}</div>
      <div class="member-row">
        <span class="member-row-label">${L('id')}</span>
        <span>${m.id}</span>
      </div>
      <div class="member-row">
        <span class="member-row-label">${L('chapters')}</span>
        <span>${m.chapters}</span>
      </div>
      ${m.note ? `<div class="member-row">
        <span class="member-row-label">${L('note')}</span>
        <span>${m.note}</span>
      </div>` : ''}
    `;
    document.getElementById('memberModal').style.display = 'flex';
  }

  function closeMember() {
    document.getElementById('memberModal').style.display = 'none';
  }

  // 點 Modal 背景也能關閉
  document.getElementById('memberModal').addEventListener('click', function(e) {
    if (e.target === this) closeMember();
  });

  /* ── Portfolio Modal ────────────────────────────────────── */
  const portfolioData = {
    system: {
      en: {
        title: 'System Business Group',
        badge: '💻',
        desc: 'Laptops, desktop PCs, smartphones, and other complete system products — the largest revenue contributor for ASUS.',
        products: ['Laptops (ROG, Zenbook, Vivobook, ProArt)', 'Desktop PCs & All-in-One PCs', 'Smartphones (ZenFone)', 'ROG Ally handheld gaming'],
        revenue: [['2021','64%'],['2022','67%'],['2023','63%'],['2024','60%'],['2025','52%']],
        insight: 'Although share is gradually declining, System Business remains the backbone. The 2024–2025 launch of AI-integrated Copilot+ PCs marks a pivotal shift from traditional hardware toward generative AI devices.',
      },
      zh: {
        title: '系統產品事業群',
        badge: '💻',
        desc: '包含筆記型電腦、桌上型電腦、智慧型手機等完整系統產品，為華碩最大的營收來源。',
        products: ['筆記型電腦（ROG、Zenbook、Vivobook、ProArt）', '桌上型電腦與一體機', '智慧型手機（ZenFone）', 'ROG Ally 掌上型電玩'],
        revenue: [['2021','64%'],['2022','67%'],['2023','63%'],['2024','60%'],['2025','52%']],
        insight: '雖然佔比逐漸下降，但系統產品仍是華碩的業務骨幹。2024–2025年推出 AI 整合 Copilot+ PC，標誌著從傳統硬體轉向生成式 AI 設備的關鍵轉型。',
      }
    },
    platform: {
      en: {
        title: 'Open Platform Business Group',
        badge: '🖥️',
        desc: 'Motherboards, graphics cards, monitors, routers, and server components — serving enthusiasts, professionals, and enterprise clients.',
        products: ['Motherboards (ROG, ProArt, TUF, Prime)', 'Graphics Cards (ROG STRIX, TUF, Dual)', 'Monitors (ROG, ProArt, ZenScreen)', 'Routers (ROG Rapture, ZenWiFi)', 'Server components'],
        revenue: [['2021','34%'],['2022','32%'],['2023','36%'],['2024','38%'],['2025','28%']],
        insight: 'Revenue share fluctuates with component market cycles. Multi-phase power motherboards and high-end 3D graphics cards are key differentiators. AI-integrated motherboards are the next frontier.',
      },
      zh: {
        title: '開放式平台事業群',
        badge: '🖥️',
        desc: '主機板、顯示卡、螢幕、路由器及伺服器等零組件產品，服務玩家、專業創作者與企業客戶。',
        products: ['主機板（ROG、ProArt、TUF、Prime系列）', '顯示卡（ROG STRIX、TUF、Dual系列）', '螢幕（ROG、ProArt、TUF、ZenScreen）', '路由器（ROG Rapture、ZenWiFi）', '伺服器零組件'],
        revenue: [['2021','34%'],['2022','32%'],['2023','36%'],['2024','38%'],['2025','28%']],
        insight: '營收佔比隨零組件市場週期波動。多相供電主機板與高階3D顯示卡是主要差異化產品。AI 整合主機板是下一個發展前沿。',
      }
    },
    isg: {
      en: {
        title: 'ISG — Infrastructure Solutions Group',
        badge: '🖧',
        desc: 'AI servers, liquid-cooled supercomputers, and high-scalability infrastructure for cloud and edge computing.',
        products: ['AI GPU Servers', 'Liquid-cooled AI Supercomputers', 'High-scalability Rack Servers', 'Edge Computing Solutions', 'Cloud Infrastructure'],
        revenue: [['2021','—'],['2022','—'],['2023','—'],['2024','—'],['2025','18%']],
        insight: "ISG is ASUS's fastest-growing engine. AI server revenue surged over 50% in 2023. Formally separated as a standalone segment in 2025, it now represents 18% of total net sales — reflecting the explosive global demand for AI infrastructure.",
      },
      zh: {
        title: 'ISG — 基礎設施解決方案事業群',
        badge: '🖧',
        desc: 'AI 伺服器、液冷超級電腦，以及用於雲端與邊緣運算的高擴展性基礎設施。',
        products: ['AI GPU 伺服器', '液冷 AI 超級電腦', '高擴展性機架式伺服器', '邊緣運算解決方案', '雲端基礎設施'],
        revenue: [['2021','—'],['2022','—'],['2023','—'],['2024','—'],['2025','18%']],
        insight: 'ISG 是華碩成長最快的業務引擎。AI 伺服器營收於2023年年增逾50%。2025年正式獨立為單一報告分部，佔總淨營收18%，反映全球對 AI 基礎設施的爆發性需求。',
      }
    },
    aiot: {
      en: {
        title: 'AIoT — Smart Solutions Group',
        badge: '🤖',
        desc: 'AI-powered solutions for smart manufacturing, smart healthcare, and smart retail.',
        products: ['Smart Manufacturing (IIoT gateways, edge AI)', 'Smart Healthcare (AI diagnostics, monitoring)', 'Smart Retail (AI vision, inventory)', 'Industrial Edge Computing', 'AIoT Platform & Software'],
        revenue: [['2021','—'],['2022','—'],['2023','—'],['2024','2%'],['2025','2%']],
        insight: "Although AIoT currently represents a small share, it is a strategic priority aligned with ASUS's sustainability and ESG goals. The integration of AI at the edge positions ASUS in the growing industrial digitalization market.",
      },
      zh: {
        title: 'AIoT — 智慧解決方案事業群',
        badge: '🤖',
        desc: '應用於智慧製造、智慧醫療與智慧零售的 AI 解決方案，連結邊緣設備與雲端智能。',
        products: ['智慧製造（IIoT 閘道器、邊緣 AI）', '智慧醫療（AI 診斷、監測）', '智慧零售（AI 視覺、庫存管理）', '工業邊緣運算', 'AIoT 平台與軟體'],
        revenue: [['2021','—'],['2022','—'],['2023','—'],['2024','2%'],['2025','2%']],
        insight: '雖然 AIoT 目前佔比較小，但為華碩永續與 ESG 策略的重點方向。透過在邊緣端導入 AI，華碩進入快速成長的工業數位化市場。',
      }
    }
  };

  function openPortfolio(key) {
    const lang = document.body.getAttribute('data-lang') || 'en';
    const d = portfolioData[key][lang];

    const revenueRows = d.revenue.map(([yr, pct]) =>
      `<tr><td>${yr}</td><td>
        <div class="pp-bar-cell">
          ${pct !== '—'
            ? `<div class="pp-bar" style="width:${pct};background:var(--asus-blue)"></div><span>${pct}</span>`
            : `<span style="color:var(--text-label)">—</span>`}
        </div>
      </td></tr>`
    ).join('');

    const productItems = d.products.map(p => `<li>${p}</li>`).join('');

    document.getElementById('portfolioContent').innerHTML = `
      <div class="pp-modal-header">
        <span class="pp-modal-icon">${d.badge}</span>
        <h2 class="pp-modal-title">${d.title}</h2>
      </div>
      <p class="pp-modal-desc">${d.desc}</p>
      <div class="pp-modal-grid">
        <div>
          <h4 class="pp-modal-section-title">
            ${lang === 'en' ? '📦 Key Products' : '📦 主要產品'}
          </h4>
          <ul class="pp-modal-list">${productItems}</ul>
        </div>
        <div>
          <h4 class="pp-modal-section-title">
            ${lang === 'en' ? '📊 Revenue Share by Year' : '📊 歷年營收佔比'}
          </h4>
          <table class="pp-modal-rev-table">
            <thead><tr>
              <th>${lang === 'en' ? 'Year' : '年度'}</th>
              <th>${lang === 'en' ? 'Net Sales %' : '淨營收佔比'}</th>
            </tr></thead>
            <tbody>${revenueRows}</tbody>
          </table>
        </div>
      </div>
      <div class="pp-modal-insight">
        <span class="pp-modal-insight-icon">💡</span>
        <p>${d.insight}</p>
      </div>
    `;
    document.getElementById('portfolioModal').style.display = 'flex';
  }

  function closePortfolio(e) {
    if (e === null || e.target === document.getElementById('portfolioModal')) {
      document.getElementById('portfolioModal').style.display = 'none';
    }
  }
