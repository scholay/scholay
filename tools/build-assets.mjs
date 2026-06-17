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
  redDark: '#D83333',
  green: '#2A7A2A',
  greenDark: '#45D145',
  amber: '#D4A017',
  gold: '#DD9D13',
  blue: '#1A56DB',
};

const word = [
  ['S', C.red],
  ['c', C.green],
  ['h', C.amber],
  ['o', null],
  ['l', C.red],
  ['a', C.green],
  ['y', C.amber],
];

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
  <rect width="${w}" height="${h}" rx="0" fill="${t.bg}"/>
  ${body(t)}
</svg>
`;
}

function wordmark(x, y, size, theme) {
  const offsets = [0, 0.55, 1.02, 1.6, 2.17, 2.46, 2.98];
  const t = C[theme];
  const parts = word.map(([letter, fill], i) => {
    const color = fill ?? t.text;
    return `<text class="logo" x="${x + offsets[i] * size}" y="${y}" font-size="${size}" fill="${color}">${letter}</text>`;
  });
  return `<g>${parts.join('')}</g>`;
}

function brandBar(x, y, w, h = 6) {
  const segs = [C.red, C.green, C.amber, '#111111', C.red, C.green, C.gold];
  const sw = w / segs.length;
  return `<g clip-path="url(#clip-${x}-${y})">
    <clipPath id="clip-${x}-${y}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}"/></clipPath>
    ${segs.map((fill, i) => `<rect x="${x + i * sw}" y="${y}" width="${sw + 1}" height="${h}" fill="${fill}"/>`).join('')}
  </g>`;
}

function chip(x, y, label, color, t) {
  return `<g>
    <rect x="${x}" y="${y}" width="${label.length * 9 + 34}" height="28" rx="14" fill="${t.chip}" stroke="${t.border}"/>
    <circle cx="${x + 15}" cy="${y + 14}" r="4" fill="${color}"/>
    <text class="mono" x="${x + 27}" y="${y + 18}" font-size="11" fill="${t.secondary}">${label}</text>
  </g>`;
}

function hero(theme) {
  return svg({
    w: 1280,
    h: 560,
    theme,
    body: (t) => `
      <rect x="38" y="38" width="1204" height="484" rx="8" fill="url(#paper)" stroke="${t.border}" filter="url(#shadow)"/>
      ${brandBar(70, 68, 1140, 8)}
      <text class="mono" x="78" y="128" font-size="12" fill="${t.subtle}">OFFICIAL GITHUB PROFILE</text>
      ${wordmark(78, 226, 86, theme)}
      <text class="ui" x="82" y="282" font-size="24" font-weight="600" fill="${t.text}">AI academic workspace</text>
      <text class="ui" x="82" y="322" font-size="17" fill="${t.secondary}">Search, review, write, and organize research with agent-native workflows.</text>
      <g transform="translate(82 365)">
        ${chip(0, 0, 'SEARCH', C.red, t)}
        ${chip(110, 0, 'REVIEW', C.green, t)}
        ${chip(220, 0, 'PRISM', C.amber, t)}
        ${chip(322, 0, 'LIBRARY', C.blue, t)}
      </g>
      <g transform="translate(720 116)">
        <rect x="0" y="0" width="418" height="288" rx="8" fill="${t.bg}" stroke="${t.borderStrong}"/>
        ${brandBar(20, 22, 378, 5)}
        <rect x="30" y="58" width="182" height="18" rx="4" fill="${t.muted}"/>
        <rect x="30" y="92" width="354" height="1" fill="${t.border}"/>
        <rect x="30" y="122" width="140" height="120" rx="6" fill="${t.surface}" stroke="${t.border}"/>
        <rect x="190" y="122" width="194" height="38" rx="6" fill="${t.surface}" stroke="${t.border}"/>
        <rect x="190" y="176" width="194" height="66" rx="6" fill="${t.surface}" stroke="${t.border}"/>
        <circle cx="64" cy="157" r="17" fill="${C.red}"/>
        <path d="M57 157h14M64 150v14" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
        <text class="ui" x="92" y="164" font-size="15" font-weight="700" fill="${t.text}">Paper intelligence</text>
        <text class="ui" x="204" y="146" font-size="13" fill="${t.secondary}">Peer review agent</text>
        <text class="ui" x="204" y="203" font-size="13" fill="${t.secondary}">LaTeX writing context</text>
        <path d="M52 273 C 128 250, 190 290, 256 260 S 342 238, 392 266" fill="none" stroke="${C.green}" stroke-width="4" stroke-linecap="round"/>
        <circle cx="52" cy="273" r="5" fill="${C.red}"/>
        <circle cx="256" cy="260" r="5" fill="${C.amber}"/>
        <circle cx="392" cy="266" r="5" fill="${C.green}"/>
      </g>
      <text class="mono" x="78" y="466" font-size="12" fill="${t.subtle}">Go · React · TypeScript · MySQL · Redis · Docker · Agent Bridge</text>
    `,
  });
}

function capabilities(theme) {
  const items = [
    ['Academic Search', 'Papers, authors, journals, citation context', C.red],
    ['AI Review', 'Structured manuscript and thesis feedback', C.green],
    ['Prism Writing', 'LaTeX-native writing and revision workspace', C.amber],
    ['Research Library', 'Collections, staging areas, notes, reusable context', C.blue],
    ['Agent Workspace', 'Feature-scoped sessions, WS bridge, usage hooks', C.green],
  ];
  return svg({
    w: 1280,
    h: 430,
    theme,
    body: (t) => `
      <rect x="38" y="36" width="1204" height="358" rx="8" fill="${t.surface}" stroke="${t.border}"/>
      <text class="logo" x="72" y="92" font-size="36" fill="${t.text}">Product system</text>
      <text class="ui" x="74" y="124" font-size="15" fill="${t.secondary}">Five research surfaces, one Scholay workspace.</text>
      ${brandBar(74, 148, 320, 5)}
      ${items.map(([title, desc, color], i) => {
        const x = 74 + i * 230;
        return `<g>
          <rect x="${x}" y="190" width="198" height="142" rx="8" fill="${t.bg}" stroke="${t.border}"/>
          <circle cx="${x + 32}" cy="224" r="10" fill="${color}"/>
          <text class="ui" x="${x + 54}" y="230" font-size="15" font-weight="700" fill="${t.text}">${title}</text>
          <text class="ui" x="${x + 22}" y="270" font-size="12" fill="${t.secondary}">
            ${desc.split(' ').reduce((lines, word) => {
              const last = lines[lines.length - 1] || '';
              if ((last + ' ' + word).trim().length > 24) lines.push(word);
              else lines[lines.length - 1] = (last + ' ' + word).trim();
              return lines;
            }, ['']).map((line, idx) => `<tspan x="${x + 22}" dy="${idx ? 18 : 0}">${line}</tspan>`).join('')}
          </text>
        </g>`;
      }).join('')}
    `,
  });
}

function workflow(theme) {
  const layers = [
    ['Frontend', 'React 19 · Vite · TypeScript · Tailwind · shadcn', C.red],
    ['Backend', 'Go · Gin · GORM · MySQL · Redis · Nginx', C.green],
    ['Agent Layer', 'Agent bridge · WebSocket tickets · feature sessions', C.amber],
    ['Academic Data', 'Minicod · SEO index · library · staging area', C.blue],
  ];
  const steps = ['Search', 'Understand', 'Review', 'Write', 'Organize'];
  return svg({
    w: 1280,
    h: 390,
    theme,
    body: (t) => `
      <rect x="38" y="34" width="1204" height="316" rx="8" fill="${t.bg}" stroke="${t.border}"/>
      <text class="logo" x="72" y="88" font-size="34" fill="${t.text}">Research workflow</text>
      <text class="ui" x="74" y="118" font-size="15" fill="${t.secondary}">A quiet, focused stack for repeated academic work.</text>
      <g transform="translate(72 156)">
        ${steps.map((step, i) => {
          const x = i * 218;
          return `<g>
            <circle cx="${x + 28}" cy="28" r="24" fill="${[C.red, C.green, C.amber, C.blue, C.green][i]}"/>
            <text class="ui" x="${x + 66}" y="34" font-size="16" font-weight="700" fill="${t.text}">${step}</text>
            ${i < steps.length - 1 ? `<path d="M${x + 158} 28H${x + 190}" stroke="${t.borderStrong}" stroke-width="2"/>` : ''}
          </g>`;
        }).join('')}
      </g>
      <g transform="translate(72 246)">
        ${layers.map(([name, desc, color], i) => {
          const x = i * 292;
          return `<g>
            <rect x="${x}" y="0" width="260" height="64" rx="8" fill="${t.surface}" stroke="${t.border}"/>
            <rect x="${x}" y="0" width="5" height="64" rx="2.5" fill="${color}"/>
            <text class="ui" x="${x + 20}" y="24" font-size="14" font-weight="700" fill="${t.text}">${name}</text>
            <text class="ui" x="${x + 20}" y="45" font-size="11" fill="${t.secondary}">${desc}</text>
          </g>`;
        }).join('')}
      </g>
    `,
  });
}

const svgs = {
  'scholay-hero-light.svg': hero('light'),
  'scholay-hero-dark.svg': hero('dark'),
  'scholay-capabilities-light.svg': capabilities('light'),
  'scholay-capabilities-dark.svg': capabilities('dark'),
  'scholay-workflow-light.svg': workflow('light'),
  'scholay-workflow-dark.svg': workflow('dark'),
};

for (const [name, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(assets, name), content);
}

console.log(Object.keys(svgs).join('\n'));
