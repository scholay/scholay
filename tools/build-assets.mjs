import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('/tmp/scholay-profile');
const assets = path.join(root, 'assets');
fs.mkdirSync(assets, { recursive: true });

const C = {
  light: {
    bg: '#FFFFFF',
    surface: '#FAFAFA',
    muted: '#F5F5F5',
    border: '#E8E8E8',
    borderStrong: '#D8D8D8',
    text: '#111111',
    secondary: '#666666',
    subtle: '#999999',
    shadow: '#11111120',
    chip: '#FFFFFF',
  },
  dark: {
    bg: '#111111',
    surface: '#181818',
    muted: '#1F1F1F',
    border: '#2A2A2A',
    borderStrong: '#3D3D3D',
    text: '#F5F5F5',
    secondary: '#C8C8C8',
    subtle: '#999999',
    shadow: '#00000080',
    chip: '#151515',
  },
  red: '#CC2222',
  green: '#2A7A2A',
  amber: '#D4A017',
  gold: '#DD9D13',
  blue: '#1A56DB',
  black: '#111111',
};

const brandLetters = [
  ['S', C.red],
  ['c', C.green],
  ['h', C.amber],
  ['o', null],
  ['l', C.red],
  ['a', C.green],
  ['y', C.amber],
];

const copy = {
  en: {
    lang: 'English',
    kicker: 'OFFICIAL GITHUB PROFILE',
    heroTitle: 'AI academic workspace',
    heroDesc: 'Search, review, write, and organize research with agent workflows.',
    chips: ['SEARCH', 'REVIEW', 'WRITE', 'LIBRARY'],
    pipelineTitle: 'Research pipeline',
    pipelineSub: 'From question to reusable context',
    pipelineSteps: ['Search', 'Review', 'Write', 'Library'],
    stackLine: 'Go · React · TypeScript · MySQL · Redis · Docker · Agent Bridge',
    productTitle: 'Product system',
    productSub: 'Five research surfaces, one Scholay workspace.',
    products: [
      ['Academic Search', 'Papers, authors, journals, citation context', C.red],
      ['AI Review', 'Structured manuscript and thesis feedback', C.green],
      ['Prism Writing', 'LaTeX-native writing and revision workspace', C.amber],
      ['Research Library', 'Collections, staging areas, notes, reusable context', C.blue],
      ['Agent Workspace', 'Feature-scoped sessions, WS bridge, usage hooks', C.green],
    ],
    workflowTitle: 'Research workflow',
    workflowSub: 'A quiet, focused stack for repeated academic work.',
    workflowSteps: ['Search', 'Understand', 'Review', 'Write', 'Organize'],
    layers: [
      ['Frontend', 'React 19 · Vite · TypeScript · Tailwind', C.red],
      ['Backend', 'Go · Gin · GORM · MySQL · Redis · Nginx', C.green],
      ['Agent Layer', 'Agent bridge · WS tickets · feature sessions', C.amber],
      ['Academic Data', 'Minicod · SEO index · library · staging area', C.blue],
    ],
  },
  zh: {
    lang: '简体中文',
    kicker: 'SCHOLAY 官方 GITHUB 主页',
    heroTitle: 'AI 学术工作台',
    heroDesc: '把检索、审稿、写作与文献管理放进同一个研究流程。',
    chips: ['检索', '审稿', '写作', '文献库'],
    pipelineTitle: '研究流程',
    pipelineSub: '从问题到可复用研究上下文',
    pipelineSteps: ['检索', '审稿', '写作', '文献库'],
    stackLine: 'Go · React · TypeScript · MySQL · Redis · Docker · Agent Bridge',
    productTitle: '产品系统',
    productSub: '五个研究场景，一个 Scholay 工作台。',
    products: [
      ['学术检索', '论文、作者、期刊与引用语境', C.red],
      ['AI 审稿', '结构化稿件、论文与评审反馈', C.green],
      ['Prism 写作', '面向 LaTeX 的写作与修订工作台', C.amber],
      ['文献库', '收藏、暂存区、笔记与可复用上下文', C.blue],
      ['智能体工作区', '按功能隔离的会话、桥接与用量钩子', C.green],
    ],
    workflowTitle: '研究流程',
    workflowSub: '面向高频学术工作的安静技术栈。',
    workflowSteps: ['检索', '理解', '审稿', '写作', '管理'],
    layers: [
      ['前端', 'React 19 · Vite · TypeScript · Tailwind', C.red],
      ['后端', 'Go · Gin · GORM · MySQL · Redis · Nginx', C.green],
      ['智能体层', 'Agent bridge · WS tickets · feature sessions', C.amber],
      ['学术数据', 'Minicod · SEO index · library · staging area', C.blue],
    ],
  },
};

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function svg({ w, h, theme, body }) {
  const t = C[theme];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="${t.shadow}" flood-opacity="1"/>
    </filter>
    <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.bg}"/>
      <stop offset="1" stop-color="${t.surface}"/>
    </linearGradient>
    <style>
      .logo { font-family: "Playfair Display", Georgia, serif; font-weight: 700; }
      .ui { font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .mono { font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace; }
    </style>
  </defs>
  <rect width="${w}" height="${h}" fill="${t.bg}"/>
  ${body(t)}
</svg>
`;
}

function wordmark(x, y, size, theme) {
  const offsets = [0, 0.55, 1.02, 1.6, 2.17, 2.46, 2.98];
  const t = C[theme];
  return `<g>${brandLetters.map(([letter, fill], i) => {
    const color = fill ?? t.text;
    return `<text class="logo" x="${x + offsets[i] * size}" y="${y}" font-size="${size}" fill="${color}">${letter}</text>`;
  }).join('')}</g>`;
}

function brandBar(x, y, w, h = 6, animated = false) {
  const segs = [C.red, C.green, C.amber, C.black, C.red, C.green, C.gold];
  const sw = w / segs.length;
  const clip = `clip-${x}-${y}-${animated ? 'a' : 's'}`;
  return `<g>
    <clipPath id="${clip}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}"/></clipPath>
    <g clip-path="url(#${clip})">
      ${segs.map((fill, i) => `<rect x="${x + i * sw}" y="${y}" width="${sw + 1}" height="${h}" fill="${fill}"/>`).join('')}
      ${animated ? `<rect x="${x - 220}" y="${y}" width="180" height="${h}" rx="${h / 2}" fill="#FFFFFF" opacity="0.42">
        <animate attributeName="x" values="${x - 220};${x + w + 24}" dur="5.6s" repeatCount="indefinite"/>
      </rect>` : ''}
    </g>
  </g>`;
}

function chip(x, y, label, color, t) {
  const width = Math.max(82, [...label].length * 14 + 42);
  return `<g>
    <rect x="${x}" y="${y}" width="${width}" height="30" rx="15" fill="${t.chip}" stroke="${t.border}"/>
    <circle cx="${x + 16}" cy="${y + 15}" r="4" fill="${color}"/>
    <text class="mono" x="${x + 29}" y="${y + 20}" font-size="11" fill="${t.secondary}">${esc(label)}</text>
  </g>`;
}

function wrapText(text, maxChars) {
  const chars = [...text];
  const hasSpace = text.includes(' ');
  if (!hasSpace) {
    const lines = [];
    for (let i = 0; i < chars.length; i += maxChars) lines.push(chars.slice(i, i + maxChars).join(''));
    return lines;
  }

  return text.split(' ').reduce((lines, word) => {
    const last = lines[lines.length - 1] || '';
    if ((last + ' ' + word).trim().length > maxChars) lines.push(word);
    else lines[lines.length - 1] = (last + ' ' + word).trim();
    return lines;
  }, ['']);
}

function multiline({ x, y, text, maxChars, size, fill, lineHeight = 18, weight = 400 }) {
  const lines = wrapText(text, maxChars);
  return `<text class="ui" x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}">
    ${lines.map((line, i) => `<tspan x="${x}" dy="${i ? lineHeight : 0}">${esc(line)}</tspan>`).join('')}
  </text>`;
}

function hero(locale, theme) {
  const c = copy[locale];
  const colors = [C.red, C.green, C.amber, C.blue];
  return svg({
    w: 1280,
    h: 560,
    theme,
    body: (t) => `
      <rect x="38" y="38" width="1204" height="484" rx="8" fill="url(#paper)" stroke="${t.border}" filter="url(#shadow)"/>
      ${brandBar(70, 68, 1140, 8, true)}
      <text class="mono" x="78" y="128" font-size="12" fill="${t.subtle}">${esc(c.kicker)}</text>
      ${wordmark(78, 226, 86, theme)}
      <text class="ui" x="82" y="286" font-size="26" font-weight="700" fill="${t.text}">${esc(c.heroTitle)}</text>
      <text class="ui" x="82" y="330" font-size="17" fill="${t.secondary}">${esc(c.heroDesc)}</text>
      <g transform="translate(82 376)">
        ${c.chips.map((label, i) => chip(i * 112, 0, label, colors[i], t)).join('')}
      </g>
      <g transform="translate(720 116)">
        <rect x="0" y="0" width="418" height="288" rx="8" fill="${t.bg}" stroke="${t.borderStrong}"/>
        ${brandBar(20, 22, 378, 5)}
        <text class="ui" x="32" y="74" font-size="20" font-weight="700" fill="${t.text}">${esc(c.pipelineTitle)}</text>
        <text class="ui" x="32" y="104" font-size="13" fill="${t.secondary}">${esc(c.pipelineSub)}</text>
        <path d="M54 168H358" stroke="${t.borderStrong}" stroke-width="4" stroke-linecap="round"/>
        ${c.pipelineSteps.map((step, i) => {
          const x = 54 + i * 101.33;
          return `<g>
            <circle cx="${x}" cy="168" r="12" fill="${colors[i]}"/>
            <text class="ui" x="${x}" y="212" font-size="13" font-weight="700" fill="${t.text}" text-anchor="middle">${esc(step)}</text>
          </g>`;
        }).join('')}
        <circle cx="54" cy="168" r="7" fill="${C.red}" stroke="${t.bg}" stroke-width="4">
          <animate attributeName="cx" values="54;155.33;256.66;358;54" dur="6.4s" repeatCount="indefinite"/>
          <animate attributeName="fill" values="${C.red};${C.green};${C.amber};${C.blue};${C.red}" dur="6.4s" repeatCount="indefinite"/>
        </circle>
        <path d="M54 252 C 128 229, 190 269, 256 239 S 342 217, 392 245" fill="none" stroke="${C.green}" stroke-width="4" stroke-linecap="round" opacity="0.9"/>
        <circle cx="54" cy="252" r="5" fill="${C.red}"/>
        <circle cx="256" cy="239" r="5" fill="${C.amber}"/>
        <circle cx="392" cy="245" r="5" fill="${C.green}"/>
      </g>
      <text class="mono" x="78" y="466" font-size="12" fill="${t.subtle}">${esc(c.stackLine)}</text>
    `,
  });
}

function capabilities(locale, theme) {
  const c = copy[locale];
  return svg({
    w: 1280,
    h: 430,
    theme,
    body: (t) => `
      <rect x="38" y="36" width="1204" height="358" rx="8" fill="${t.surface}" stroke="${t.border}"/>
      <text class="logo" x="72" y="92" font-size="36" fill="${t.text}">${esc(c.productTitle)}</text>
      <text class="ui" x="74" y="124" font-size="15" fill="${t.secondary}">${esc(c.productSub)}</text>
      ${brandBar(74, 148, 320, 5)}
      ${c.products.map(([title, desc, color], i) => {
        const x = 74 + i * 230;
        return `<g>
          <rect x="${x}" y="190" width="198" height="142" rx="8" fill="${t.bg}" stroke="${t.border}"/>
          <circle cx="${x + 32}" cy="224" r="10" fill="${color}"/>
          ${multiline({ x: x + 54, y: 225, text: title, maxChars: locale === 'zh' ? 8 : 18, size: 14, fill: t.text, lineHeight: 17, weight: 700 })}
          ${multiline({ x: x + 22, y: 278, text: desc, maxChars: locale === 'zh' ? 13 : 24, size: 11, fill: t.secondary, lineHeight: 16 })}
        </g>`;
      }).join('')}
    `,
  });
}

function workflow(locale, theme) {
  const c = copy[locale];
  return svg({
    w: 1280,
    h: 390,
    theme,
    body: (t) => `
      <rect x="38" y="34" width="1204" height="316" rx="8" fill="${t.bg}" stroke="${t.border}"/>
      <text class="logo" x="72" y="88" font-size="34" fill="${t.text}">${esc(c.workflowTitle)}</text>
      <text class="ui" x="74" y="118" font-size="15" fill="${t.secondary}">${esc(c.workflowSub)}</text>
      <g transform="translate(72 156)">
        ${c.workflowSteps.map((step, i) => {
          const x = i * 218;
          return `<g>
            <circle cx="${x + 28}" cy="28" r="24" fill="${[C.red, C.green, C.amber, C.blue, C.green][i]}"/>
            <text class="ui" x="${x + 66}" y="34" font-size="16" font-weight="700" fill="${t.text}">${esc(step)}</text>
            ${i < c.workflowSteps.length - 1 ? `<path d="M${x + 158} 28H${x + 190}" stroke="${t.borderStrong}" stroke-width="2"/>` : ''}
          </g>`;
        }).join('')}
      </g>
      <g transform="translate(72 246)">
        ${c.layers.map(([name, desc, color], i) => {
          const x = i * 292;
          return `<g>
            <rect x="${x}" y="0" width="260" height="64" rx="8" fill="${t.surface}" stroke="${t.border}"/>
            <rect x="${x}" y="0" width="5" height="64" rx="2.5" fill="${color}"/>
            <text class="ui" x="${x + 20}" y="24" font-size="14" font-weight="700" fill="${t.text}">${esc(name)}</text>
            <text class="ui" x="${x + 20}" y="45" font-size="11" fill="${t.secondary}">${esc(desc)}</text>
          </g>`;
        }).join('')}
      </g>
    `,
  });
}

const svgs = {};
for (const locale of ['en', 'zh']) {
  for (const theme of ['light', 'dark']) {
    svgs[`scholay-hero-${locale}-${theme}.svg`] = hero(locale, theme);
    svgs[`scholay-capabilities-${locale}-${theme}.svg`] = capabilities(locale, theme);
    svgs[`scholay-workflow-${locale}-${theme}.svg`] = workflow(locale, theme);
  }
}

for (const [name, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(assets, name), content);
}

console.log(Object.keys(svgs).join('\n'));
