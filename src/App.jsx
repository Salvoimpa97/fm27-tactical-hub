import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Activity,
  Users,
  Shield,
  Upload,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Zap,
  Sparkles,
  RefreshCw,
  Award,
  Compass,
  Download,
  ClipboardPaste,
  FileSpreadsheet,
  Plus,
  Trash2,
  X,
  Check,
  Save,
  Sliders,
  UserCheck,
  ArrowLeftRight,
  Search,
  History,
  Target,
  Calendar,
  MessageSquare,
  Crosshair,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// ============================================================================
// 1. DATI DI PARTENZA E MODULI
// ============================================================================

const DEFAULT_SQUAD_DATA = [
  {
    id: '1',
    name: 'Mattia Perin',
    position: 'Por',
    age: 33,
    foot: 'Solo destro',
    number: 1,
    attrs: {
      Passaggi: 7,
      Controllo: 7,
      Tecnica: 7,
      Finalizzazione: 5,
      TiriLontani: 5,
      Dribbling: 5,
      Cross: 5,
      ColpoTesta: 5,
      Contrasti: 5,
      Marcatura: 7,
      Visione: 11,
      Decisioni: 15,
      SenzaPalla: 12,
      Posizione: 14,
      Anticipo: 13,
      Concentrazione: 15,
      Impegno: 2,
      GiocoSquadra: 13,
      SangueFreddo: 12,
      Accelerazione: 11,
      Velocita: 15,
      Agilita: 12,
      Equilibrio: 11,
      Resistenza: 14,
      Forza: 11,
    },
  },
  {
    id: '2',
    name: 'Niccolò Pierozzi',
    position: 'D(D), Est(D)',
    age: 24,
    foot: 'Destro',
    number: 27,
    attrs: {
      Passaggi: 11,
      Controllo: 11,
      Tecnica: 12,
      Finalizzazione: 7,
      TiriLontani: 12,
      Dribbling: 13,
      Cross: 10,
      ColpoTesta: 13,
      Contrasti: 13,
      Marcatura: 14,
      Visione: 12,
      Decisioni: 14,
      SenzaPalla: 13,
      Posizione: 12,
      Anticipo: 13,
      Concentrazione: 12,
      Impegno: 13,
      GiocoSquadra: 12,
      SangueFreddo: 13,
      Accelerazione: 13,
      Velocita: 13,
      Agilita: 13,
      Equilibrio: 13,
      Resistenza: 13,
      Forza: 10,
    },
  },
  {
    id: '3',
    name: 'Mattia Bani',
    position: 'D(C)',
    age: 32,
    foot: 'Solo destro',
    number: 13,
    attrs: {
      Passaggi: 12,
      Controllo: 12,
      Tecnica: 12,
      Finalizzazione: 9,
      TiriLontani: 10,
      Dribbling: 8,
      Cross: 8,
      ColpoTesta: 14,
      Contrasti: 14,
      Marcatura: 14,
      Visione: 8,
      Decisioni: 13,
      SenzaPalla: 12,
      Posizione: 14,
      Anticipo: 15,
      Concentrazione: 14,
      Impegno: 13,
      GiocoSquadra: 10,
      SangueFreddo: 13,
      Accelerazione: 11,
      Velocita: 13,
      Agilita: 11,
      Equilibrio: 13,
      Resistenza: 12,
      Forza: 14,
    },
  },
  {
    id: '4',
    name: 'Pietro Ceccaroni',
    position: 'D(SC)',
    age: 30,
    foot: 'Sinistro',
    number: 32,
    attrs: {
      Passaggi: 12,
      Controllo: 9,
      Tecnica: 10,
      Finalizzazione: 5,
      TiriLontani: 5,
      Dribbling: 6,
      Cross: 8,
      ColpoTesta: 14,
      Contrasti: 14,
      Marcatura: 13,
      Visione: 8,
      Decisioni: 13,
      SenzaPalla: 12,
      Posizione: 13,
      Anticipo: 13,
      Concentrazione: 13,
      Impegno: 13,
      GiocoSquadra: 11,
      SangueFreddo: 13,
      Accelerazione: 12,
      Velocita: 12,
      Agilita: 13,
      Equilibrio: 13,
      Resistenza: 13,
      Forza: 14,
    },
  },
  {
    id: '5',
    name: 'Tommaso Augello',
    position: 'D/Est/C (S)',
    age: 31,
    foot: 'Sinistro',
    number: 3,
    attrs: {
      Passaggi: 13,
      Controllo: 12,
      Tecnica: 13,
      Finalizzazione: 8,
      TiriLontani: 11,
      Dribbling: 13,
      Cross: 14,
      ColpoTesta: 6,
      Contrasti: 13,
      Marcatura: 13,
      Visione: 12,
      Decisioni: 17,
      SenzaPalla: 11,
      Posizione: 13,
      Anticipo: 13,
      Concentrazione: 13,
      Impegno: 14,
      GiocoSquadra: 11,
      SangueFreddo: 13,
      Accelerazione: 13,
      Velocita: 14,
      Agilita: 13,
      Equilibrio: 13,
      Resistenza: 10,
      Forza: 13,
    },
  },
  {
    id: '6',
    name: 'Claudio Gomes',
    position: 'M, C (C)',
    age: 26,
    foot: 'Destro',
    number: 6,
    attrs: {
      Passaggi: 12,
      Controllo: 13,
      Tecnica: 13,
      Finalizzazione: 7,
      TiriLontani: 11,
      Dribbling: 13,
      Cross: 11,
      ColpoTesta: 9,
      Contrasti: 13,
      Marcatura: 11,
      Visione: 12,
      Decisioni: 13,
      SenzaPalla: 12,
      Posizione: 12,
      Anticipo: 13,
      Concentrazione: 12,
      Impegno: 13,
      GiocoSquadra: 12,
      SangueFreddo: 12,
      Accelerazione: 13,
      Velocita: 13,
      Agilita: 14,
      Equilibrio: 13,
      Resistenza: 13,
      Forza: 7,
    },
  },
  {
    id: '7',
    name: 'Nahuel Estévez',
    position: 'M, C (C)',
    age: 30,
    foot: 'Destro',
    number: 24,
    attrs: {
      Passaggi: 13,
      Controllo: 13,
      Tecnica: 13,
      Finalizzazione: 11,
      TiriLontani: 12,
      Dribbling: 12,
      Cross: 10,
      ColpoTesta: 8,
      Contrasti: 13,
      Marcatura: 12,
      Visione: 12,
      Decisioni: 12,
      SenzaPalla: 13,
      Posizione: 12,
      Anticipo: 12,
      Concentrazione: 14,
      Impegno: 12,
      GiocoSquadra: 12,
      SangueFreddo: 13,
      Accelerazione: 13,
      Velocita: 13,
      Agilita: 13,
      Equilibrio: 14,
      Resistenza: 10,
      Forza: 13,
    },
  },
  {
    id: '8',
    name: 'Gabriel Strefezza',
    position: 'C/T (DS)',
    age: 29,
    foot: 'Destro',
    number: 7,
    attrs: {
      Passaggi: 12,
      Controllo: 13,
      Tecnica: 15,
      Finalizzazione: 11,
      TiriLontani: 12,
      Dribbling: 12,
      Cross: 11,
      ColpoTesta: 5,
      Contrasti: 10,
      Marcatura: 9,
      Visione: 12,
      Decisioni: 14,
      SenzaPalla: 14,
      Posizione: 12,
      Anticipo: 11,
      Concentrazione: 9,
      Impegno: 14,
      GiocoSquadra: 12,
      SangueFreddo: 16,
      Accelerazione: 12,
      Velocita: 17,
      Agilita: 16,
      Equilibrio: 13,
      Resistenza: 8,
      Forza: 8,
    },
  },
  {
    id: '9',
    name: 'Filippo Ranocchia',
    position: 'M, C/T (C)',
    age: 25,
    foot: 'Destro',
    number: 10,
    attrs: {
      Passaggi: 13,
      Controllo: 13,
      Tecnica: 13,
      Finalizzazione: 10,
      TiriLontani: 13,
      Dribbling: 12,
      Cross: 12,
      ColpoTesta: 10,
      Contrasti: 12,
      Marcatura: 10,
      Visione: 14,
      Decisioni: 14,
      SenzaPalla: 12,
      Posizione: 14,
      Anticipo: 14,
      Concentrazione: 14,
      Impegno: 13,
      GiocoSquadra: 13,
      SangueFreddo: 13,
      Accelerazione: 12,
      Velocita: 13,
      Agilita: 12,
      Equilibrio: 13,
      Resistenza: 14,
      Forza: 10,
    },
  },
  {
    id: '10',
    name: 'Dominic Vavassori',
    position: 'T(SC), P(C)',
    age: 20,
    foot: 'Destro',
    number: 9,
    attrs: {
      Passaggi: 11,
      Controllo: 13,
      Tecnica: 12,
      Finalizzazione: 13,
      TiriLontani: 11,
      Dribbling: 13,
      Cross: 10,
      ColpoTesta: 8,
      Contrasti: 7,
      Marcatura: 7,
      Visione: 11,
      Decisioni: 14,
      SenzaPalla: 13,
      Posizione: 14,
      Anticipo: 13,
      Concentrazione: 12,
      Impegno: 10,
      GiocoSquadra: 13,
      SangueFreddo: 13,
      Accelerazione: 13,
      Velocita: 13,
      Agilita: 13,
      Equilibrio: 12,
      Resistenza: 14,
      Forza: 8,
    },
  },
  {
    id: '11',
    name: 'Joel Pohjanpalo',
    position: 'P (C)',
    age: 31,
    foot: 'Destro',
    number: 20,
    attrs: {
      Passaggi: 14,
      Controllo: 13,
      Tecnica: 12,
      Finalizzazione: 15,
      TiriLontani: 10,
      Dribbling: 12,
      Cross: 5,
      ColpoTesta: 16,
      Contrasti: 6,
      Marcatura: 4,
      Visione: 12,
      Decisioni: 14,
      SenzaPalla: 16,
      Posizione: 14,
      Anticipo: 15,
      Concentrazione: 15,
      Impegno: 16,
      GiocoSquadra: 14,
      SangueFreddo: 9,
      Accelerazione: 11,
      Velocita: 15,
      Agilita: 11,
      Equilibrio: 14,
      Resistenza: 13,
      Forza: 14,
    },
  },
];

const DEFAULT_MATCH_HISTORY = [
  {
    id: 'pal-fros-1',
    competition: 'Serie B - 1ª Giornata',
    date: '23 Ago 2026',
    stadium: 'Renzo Barbera',
    homeTeam: {
      name: 'Palermo',
      short: 'PAL',
      goals: 2,
      xg: 2.15,
      possession: 58,
      shots: 16,
      shotsOnTarget: 7,
      clearCutChances: 3,
      oppda: 11.2,
      passCompletion: 88,
    },
    awayTeam: {
      name: 'Frosinone',
      short: 'FRO',
      goals: 1,
      xg: 0.85,
      possession: 42,
      shots: 8,
      shotsOnTarget: 3,
      clearCutChances: 1,
      oppda: 16.4,
      passCompletion: 81,
    },
    xgTimeline: [
      { minute: 0, home: 0, away: 0 },
      { minute: 30, home: 0.45, away: 0.3 },
      { minute: 60, home: 1.25, away: 0.85 },
      { minute: 90, home: 2.15, away: 0.85 },
    ],
  },
];

const FORMATION_TEMPLATES = {
  '4-2-3-1 Asimmetrico (FM27)': {
    id: '4-2-3-1',
    name: '4-2-3-1',
    styleLabel: 'Doppia Fase FM27',
    description:
      'Modulo allineato alle nuove nomenclature ufficiali IP e OOP di Football Manager 27.',
    ip: {
      mentality: 'Positiva',
      width: 'Equilibrata',
      passing: 'Equilibrato',
      tempo: 'Equilibrato',
      buildUp: 'Costruzione Corta',
      finalThird: 'Lavora Il Pallone',
    },
    oop: {
      pressingLine: 'Più Alto',
      defensiveLine: 'Equilibrata',
      pressingIntensity: 'Più Intenso',
      counterPress: true,
      tackling: 'Equilibrato',
      preventShortGK: true,
    },
    slots: [
      {
        id: 'gk',
        pos: 'POR',
        ipRole: 'Portiere Di Costruzione',
        ipFocus: 'Difesa',
        oopRole: 'Portiere Libero',
        ipX: 50,
        ipY: 91,
        oopX: 50,
        oopY: 93,
        instructions: ['Passaggi più corti'],
        matchTags: ['POR'],
        keyAttrs: ['Posizione', 'Anticipo', 'Decisioni', 'Passaggi'],
        archetype: 'Portiere Impostatore',
      },
      {
        id: 'dl',
        pos: 'DS',
        ipRole: 'Terzino Bloccato',
        ipFocus: 'Difesa',
        oopRole: 'Terzino Equilibrato',
        ipX: 14,
        ipY: 73,
        oopX: 16,
        oopY: 79,
        instructions: ['Stai più stretto'],
        matchTags: ['D/TF (S)', 'D (S)', 'DS'],
        keyAttrs: ['Marcatura', 'Contrasti', 'Posizione', 'Resistenza'],
        archetype: 'Terzino Bloccato',
      },
      {
        id: 'dcl',
        pos: 'DCS',
        ipRole: 'Difensore Centrale',
        ipFocus: 'Difesa',
        oopRole: 'Difensore Centrale',
        ipX: 36,
        ipY: 77,
        oopX: 38,
        oopY: 81,
        instructions: [],
        matchTags: ['D (C)', 'D (CS)', 'DC'],
        keyAttrs: ['Marcatura', 'Contrasti', 'ColpoTesta', 'Forza'],
        archetype: 'Centrale Fisico',
      },
      {
        id: 'dcr',
        pos: 'DCD',
        ipRole: 'Difensore Centrale',
        ipFocus: 'Difesa',
        oopRole: 'Difensore Centrale',
        ipX: 64,
        ipY: 77,
        oopX: 62,
        oopY: 81,
        instructions: [],
        matchTags: ['D (C)', 'D (DC)', 'DC'],
        keyAttrs: ['Marcatura', 'Contrasti', 'ColpoTesta', 'Forza'],
        archetype: 'Centrale Fisico',
      },
      {
        id: 'dr',
        pos: 'DD',
        ipRole: 'Esterno',
        ipFocus: 'Supporto',
        oopRole: 'Terzino',
        ipX: 83,
        ipY: 73,
        oopX: 84,
        oopY: 79,
        instructions: ['Sovrapponiti'],
        matchTags: ['D (D)', 'D (DC)', 'DD'],
        keyAttrs: ['Accelerazione', 'Velocita', 'Cross', 'Resistenza'],
        archetype: 'Esterno di Spinta',
      },
      {
        id: 'mcl',
        pos: 'MCS',
        ipRole: 'Centrocampista Difensivo',
        ipFocus: 'Difesa',
        oopRole: 'Mediano Di Interdizione',
        ipX: 38,
        ipY: 60,
        oopX: 39,
        oopY: 63,
        instructions: ['Mantieni la posizione'],
        matchTags: ['M', 'M, C (C)', 'MC'],
        keyAttrs: ['Contrasti', 'Posizione', 'Resistenza', 'Impegno'],
        archetype: 'Mediano Incontrista',
      },
      {
        id: 'mcr',
        pos: 'MCD',
        ipRole: 'Regista Arretrato',
        ipFocus: 'Supporto',
        oopRole: 'Mediano Centrale Fisico',
        ipX: 62,
        ipY: 60,
        oopX: 61,
        oopY: 62,
        instructions: ['Prendi più rischi'],
        matchTags: ['C (C)', 'M, C (C)', 'MC'],
        keyAttrs: ['Passaggi', 'Visione', 'Resistenza', 'Decisioni'],
        archetype: 'Centrocampista di Costruzione',
      },
      {
        id: 'aml',
        pos: 'TS',
        ipRole: 'Attaccante Che Si Accentra',
        ipFocus: 'Supporto',
        oopRole: 'Mezzala Di Spinta',
        ipX: 21,
        ipY: 31,
        oopX: 16,
        oopY: 47,
        instructions: ['Taglia dentro con la palla'],
        matchTags: ['T (S)', 'T (DS)', 'TS'],
        keyAttrs: ['Dribbling', 'SenzaPalla', 'Tecnica', 'Agilita'],
        archetype: 'Esterno Invertito',
      },
      {
        id: 'amc',
        pos: 'TC',
        ipRole: 'Centrocampista Offensivo',
        ipFocus: 'Supporto',
        oopRole: 'Centrocampista Offensivo',
        ipX: 50,
        ipY: 33,
        oopX: 50,
        oopY: 43,
        instructions: ['Trova spazi tra le linee'],
        matchTags: ['TC', 'C/TC (C)'],
        keyAttrs: ['Visione', 'Passaggi', 'Tecnica', 'Controllo'],
        archetype: 'Trequartista Creativo',
      },
      {
        id: 'amr',
        pos: 'TD',
        ipRole: 'Attaccante Che Si Accentra',
        ipFocus: 'Supporto',
        oopRole: 'Interno Di Centrocampo',
        ipX: 79,
        ipY: 31,
        oopX: 84,
        oopY: 47,
        instructions: ['Taglia dentro con la palla'],
        matchTags: ['T (D)', 'T (DS)', 'TD'],
        keyAttrs: ['Dribbling', 'Tecnica', 'Agilita', 'Accelerazione'],
        archetype: 'Esterno Invertito',
      },
      {
        id: 'stc',
        pos: 'PC',
        ipRole: 'Centravanti',
        ipFocus: 'Attacco',
        oopRole: 'Centravanti',
        ipX: 50,
        ipY: 14,
        oopX: 50,
        oopY: 24,
        instructions: ['Pericolosità offensiva'],
        matchTags: ['P (C)', 'PC'],
        keyAttrs: ['Finalizzazione', 'ColpoTesta', 'Forza', 'SenzaPalla'],
        archetype: "Centravanti d'Area",
      },
    ],
  },
};

// ============================================================================
// 2. FUNZIONI DI CALCOLO E SUPPORTO
// ============================================================================

const avg = (arr) =>
  arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 12;

function checkPositionMatch(playerPos, slotTags) {
  const p = playerPos.toUpperCase().replace(/\s+/g, '');
  return slotTags.some((tag) => {
    if (tag === 'POR' && p.includes('POR')) return true;
    if (tag === 'DC' && (p.includes('D(C)') || p.includes('D(SC)')))
      return true;
    if (
      tag === 'DS' &&
      (p.includes('D(S)') ||
        p.includes('D/TF(S)') ||
        p.includes('D/EST/C(S)') ||
        p.includes('EST(S)'))
    )
      return true;
    if (
      tag === 'DD' &&
      (p.includes('D(D)') ||
        p.includes('D/TF(D)') ||
        p.includes('EST(D)') ||
        p.includes('D(DC)'))
    )
      return true;
    if (
      tag === 'MC' &&
      (p.includes('M(C)') || p.includes('C(C)') || p.includes('M,C(C)'))
    )
      return true;
    if (
      tag === 'TS' &&
      (p.includes('T(S)') || p.includes('EST(S)') || p.includes('(DS)'))
    )
      return true;
    if (
      tag === 'TD' &&
      (p.includes('T(D)') || p.includes('EST(D)') || p.includes('(DS)'))
    )
      return true;
    if (
      tag === 'TC' &&
      (p.includes('T(C)') || p.includes('C/T(C)') || p.includes('T(SC)'))
    )
      return true;
    if (tag === 'PC' && p.includes('P(C)')) return true;
    return false;
  });
}

function evaluateFormationFit(template, squadData) {
  const usedIds = new Set();
  const priorityOrder = [...template.slots].sort((a, b) =>
    a.pos === 'POR' ? 0 : a.pos === 'TC' ? 1 : 2
  );
  const assignmentsMap = {};

  priorityOrder.forEach((slot) => {
    let bestPlayer = null;
    let bestScore = -1;
    let isNaturalPos = false;
    const baseSlotTag = slot.pos
      .replace(/DCS|DCD/, 'DC')
      .replace(/MCS|MCD/, 'MC');

    squadData.forEach((player) => {
      if (usedIds.has(player.id)) return;
      if (slot.pos === 'POR' && !player.position.toUpperCase().includes('POR'))
        return;
      if (slot.pos !== 'POR' && player.position.toUpperCase().includes('POR'))
        return;

      const naturalMatch = checkPositionMatch(player.position, [baseSlotTag]);
      const attrAvg = avg(
        slot.keyAttrs.map((k) => Number(player.attrs?.[k] ?? 11))
      );
      const basePct = Math.min(99, Math.round((attrAvg / 16.2) * 100));

      const effectiveScore = naturalMatch ? basePct : Math.round(basePct * 0.6);

      if (effectiveScore > bestScore) {
        bestScore = effectiveScore;
        bestPlayer = player;
        isNaturalPos = naturalMatch;
      }
    });

    if (bestPlayer && (isNaturalPos || bestScore >= 55)) {
      usedIds.add(bestPlayer.id);
      assignmentsMap[slot.id] = {
        slot,
        player: bestPlayer,
        fitScore: bestScore,
        isNaturalPos,
        status: !isNaturalPos ? 'missing' : bestScore < 79 ? 'upgrade' : 'ok',
      };
    } else {
      assignmentsMap[slot.id] = {
        slot,
        player: null,
        fitScore: 0,
        isNaturalPos: false,
        status: 'missing',
      };
    }
  });

  const slotAssignments = template.slots.map((s) => assignmentsMap[s.id]);
  const totalFit = Math.round(avg(slotAssignments.map((a) => a.fitScore)));
  const missingOrWeak = slotAssignments.filter((a) => a.status !== 'ok');

  return { template, totalFit, slotAssignments, missingOrWeak };
}

function computePlayerDNA(attrs) {
  const a = (k) => Number(attrs[k] || 11);
  const playmaking = avg([a('Visione'), a('Passaggi'), a('Tecnica')]);
  const finishing = avg([a('Finalizzazione'), a('Freddezza'), a('SenzaPalla')]);
  const defending = avg([a('Contrasti'), a('Marcatura'), a('Posizione')]);
  const athletic = avg([a('Accelerazione'), a('Velocita'), a('Resistenza')]);

  if (playmaking >= 14)
    return {
      title: 'Regista Creativo',
      desc: 'Genio della palla, vede linee di passaggio che altri non notano.',
    };
  if (finishing >= 14)
    return {
      title: 'Finalizzatore',
      desc: 'Spietato in area, ottima intelligenza offensiva e freddezza.',
    };
  if (defending >= 14)
    return {
      title: 'Muro Difensivo',
      desc: "Concentrazione e tempismo perfetti. Supera l'avversario mentalmente.",
    };
  if (athletic >= 14)
    return {
      title: 'Treno Atletico',
      desc: "Fisicamente dominante, strappi in velocità e polmoni d'acciaio.",
    };
  return {
    title: 'Equilibrato',
    desc: 'Giocatore bilanciato, utile in tutte le fasi senza picchi estremi.',
  };
}

function normalizeTactic(saved) {
  if (!saved || !saved.ip || !saved.oop || !Array.isArray(saved.players)) {
    return createTacticFromTemplate(
      '4-2-3-1 Asimmetrico (FM27)',
      DEFAULT_SQUAD_DATA
    );
  }
  return {
    ...saved,
    players: saved.players.map((p) => ({
      ...p,
      instructions: Array.isArray(p.instructions) ? p.instructions : [],
    })),
  };
}

function createTacticFromTemplate(templateId, squadData = []) {
  const tpl =
    FORMATION_TEMPLATES[templateId] ||
    FORMATION_TEMPLATES['4-2-3-1 Asimmetrico (FM27)'];
  const evaluation = evaluateFormationFit(tpl, squadData);
  return {
    formation: tpl.id,
    ip: { ...tpl.ip },
    oop: { ...tpl.oop },
    players: tpl.slots.map((slot) => {
      const matched = evaluation.slotAssignments.find(
        (a) => a.slot.id === slot.id
      )?.player;
      return {
        id: slot.id,
        pos: slot.pos,
        name: matched
          ? matched.name.split(' ').pop()
          : slot.archetype.split(' ')[0],
        ipRole: slot.ipRole,
        ipFocus: slot.ipFocus,
        oopRole: slot.oopRole,
        ipX: slot.ipX,
        ipY: slot.ipY,
        oopX: slot.oopX,
        oopY: slot.oopY,
        instructions: [...slot.instructions],
      };
    }),
  };
}

function getCounterTacticAdvice(myFormation, oppFormation) {
  const advice = [];
  const myMid = myFormation.includes('4-2-3-1') ? 2 : 3;
  const oppMid =
    oppFormation.includes('4-3-3') || oppFormation.includes('3-5-2') ? 3 : 2;

  if (myMid < oppMid)
    advice.push({
      title: 'Inferiorità a Centrocampo',
      desc: `Loro hanno ${oppMid} centrocampisti puri contro i tuoi ${myMid}. Arretra il Trequartista o imposta esterni di supporto.`,
    });
  else if (myMid > oppMid)
    advice.push({
      title: 'Dominio Centrale',
      desc: `Hai superiorità in mezzo (${myMid} vs ${oppMid}). Sfrutta i passaggi corti centrali per eludere la pressione.`,
    });

  if (oppFormation.startsWith('3') || oppFormation.startsWith('5'))
    advice.push({
      title: 'Vulnerabilità sui Lati',
      desc: "L'avversario gioca a 3. Metti ampiezza 'Più Larga' e sovrapponi i terzini.",
    });
  else if (oppFormation === '4-4-2')
    advice.push({
      title: 'Linee Piatte (4-4-2)',
      desc: 'Il Trequartista troverà praterie tra la loro difesa e il centrocampo.',
    });

  if (advice.length === 0)
    advice.push({
      title: 'Moduli Speculari',
      desc: 'La partita si deciderà sui duelli individuali.',
    });
  return advice;
}

// ============================================================================
// 3. APP PRINCIPALE CON INTEGRAZIONE CLOUDFLARE AI
// ============================================================================

export default function App() {
  const [activeTab, setActiveTab] = useState('tactic');

  const [matchHistory, setMatchHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('fm27_match_history');
      return saved ? JSON.parse(saved) : DEFAULT_MATCH_HISTORY;
    } catch {
      return DEFAULT_MATCH_HISTORY;
    }
  });
  const [squadData, setSquadData] = useState(() => {
    try {
      const saved = localStorage.getItem('fm27_squad_data');
      return saved ? JSON.parse(saved) : DEFAULT_SQUAD_DATA;
    } catch {
      return DEFAULT_SQUAD_DATA;
    }
  });
  const [tactic, setTactic] = useState(() => {
    try {
      const saved = localStorage.getItem('fm27_tactic_data');
      return saved
        ? normalizeTactic(JSON.parse(saved))
        : createTacticFromTemplate(
            '4-2-3-1 Asimmetrico (FM27)',
            DEFAULT_SQUAD_DATA
          );
    } catch {
      return createTacticFromTemplate(
        '4-2-3-1 Asimmetrico (FM27)',
        DEFAULT_SQUAD_DATA
      );
    }
  });

  const [mediaBoards, setMediaBoards] = useState([]);
  const [opponentFormation, setOpponentFormation] = useState('4-4-2');
  const [aiLoading, setAiLoading] = useState(null); // ID dell'immagine in elaborazione

  useEffect(() => {
    localStorage.setItem('fm27_match_history', JSON.stringify(matchHistory));
  }, [matchHistory]);
  useEffect(() => {
    localStorage.setItem('fm27_squad_data', JSON.stringify(squadData));
  }, [squadData]);
  useEffect(() => {
    localStorage.setItem('fm27_tactic_data', JSON.stringify(tactic));
  }, [tactic]);

  const [selectedPitchSlot, setSelectedPitchSlot] = useState('amc');
  const [pitchPhase, setPitchPhase] = useState('ip');
  const [tacticSidebarTab, setTacticSidebarTab] = useState('media');

  const tacticalDiagnostics = useMemo(() => {
    const warnings = [];
    let score = 100;
    const restDefencePlayers = tactic.players.filter(
      (p) => p.ipFocus === 'Difesa'
    );
    const holdingFullBacks = tactic.players.filter((p) =>
      p.ipRole.includes('Bloccato')
    );

    if (restDefencePlayers.length < 4) {
      score -= 20;
      warnings.push({
        phase: 'In Possesso',
        severity: 'critical',
        title: 'Rest Defence Inesistente',
        detail: `La struttura a ${restDefencePlayers.length} in preventiva è un suicidio. Lascia almeno 4 uomini a schermo.`,
      });
    }
    if (
      holdingFullBacks.length > 0 &&
      tactic.players.find((p) => p.pos === 'MCD' || p.pos === 'MCS')
        ?.ipFocus === 'Attacco'
    ) {
      score -= 10;
      warnings.push({
        phase: 'Transizione (Dif)',
        severity: 'medium',
        title: 'Terzino Bloccato Isolato',
        detail:
          'Con la patch 27.1 il Terzino Bloccato esce forte. Se il mediano attacca, lascerà un buco.',
      });
    }

    if (
      tactic.oop.pressingLine.includes('Alto') &&
      tactic.oop.defensiveLine.includes('Bassa')
    ) {
      score -= 25;
      warnings.push({
        phase: 'Non In Possesso',
        severity: 'critical',
        title: 'Squadra Spezzata',
        detail:
          'Pressing e linea difensiva scollati. Crei un buco di 40 metri.',
      });
    }
    return { score: Math.min(100, Math.max(0, score)), warnings };
  }, [tactic]);

  const handleSelectFormation = (formationKey) => {
    const newTactic = createTacticFromTemplate(formationKey, squadData);
    setTactic(newTactic);
    setSelectedPitchSlot(newTactic.players[0]?.id || 'gk');
  };

  const selectedSlotObj =
    tactic.players.find((p) => p.id === selectedPitchSlot) || tactic.players[0];
  const updatePitchPlayer = (field, value) =>
    setTactic((prev) => ({
      ...prev,
      players: prev.players.map((p) =>
        p.id === selectedPitchSlot ? { ...p, [field]: value } : p
      ),
    }));

  const onFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const objectUrl = URL.createObjectURL(file);
        setMediaBoards((prev) => [...prev, { id: Date.now(), url: objectUrl }]);
      }
    }
  };

  // --- MOTORE CLOUDFLARE AI ---
  const analyzeImageWithAI = async (mediaObj) => {
    setAiLoading(mediaObj.id);
    try {
      // Converte Blob URL a Base64
      const response = await fetch(mediaObj.url);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const workerUrl = 'https://fm27-scout-ai.salvoimpa88.workers.dev/';
          const workerResp = await fetch(workerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: reader.result }),
          });

          if (!workerResp.ok) {
            const errText = await workerResp.text();
            throw new Error(errText);
          }

          const newPlayer = await workerResp.json();
          newPlayer.id = 'ai-' + Date.now();
          if (!newPlayer.name)
            newPlayer.name = 'Scouting ' + Date.now().toString().slice(-4);

          // Inietta in Rosa
          setSquadData((prev) => [...prev, newPlayer]);
          alert(
            `✅ SCANSIONE COMPLETATA!\n\nIl giocatore ${newPlayer.name} è stato aggiunto automaticamente alla tua Rosa con tutti gli attributi.`
          );
        } catch (e) {
          alert('❌ ERRORE SERVER AI:\n' + e.message);
        } finally {
          setAiLoading(null);
        }
      };

      reader.readAsDataURL(blob);
    } catch (err) {
      alert('❌ ERRORE LETTURA IMMAGINE:\n' + err.message);
      setAiLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-lg font-bold text-white">
                  FM27 Tactical Hub
                </h1>
                <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  AI VISION ATTIVA
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Match Analyst • IP/OOP Diagnostica • Cloudflare Engine
              </p>
            </div>
          </div>
          <nav className="flex items-center bg-slate-950/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('squad')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                activeTab === 'squad'
                  ? 'bg-purple-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" /> Rosa ({squadData.length})
            </button>
            <button
              onClick={() => setActiveTab('tactic')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                activeTab === 'tactic'
                  ? 'bg-purple-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" /> Tattica & Lavagna AI
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 py-6 space-y-6">
        {/* TAB ROSA */}
        {activeTab === 'squad' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <h2 className="text-sm font-bold text-white mb-4">
                Elenco Rosa ({squadData.length})
              </h2>
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
                {squadData.map((player) => (
                  <div
                    key={player.id}
                    className="w-full p-3 rounded-xl border bg-slate-950/60 border-slate-800/80 text-slate-300 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-white">
                        {player.name}{' '}
                        {player.id.startsWith('ai-') && (
                          <span className="text-[10px] text-purple-400 ml-1">
                            (AI Scanned)
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {player.position}
                      </p>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      #{player.number || '-'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-8 p-10 text-center text-slate-500 flex flex-col items-center">
              <Users className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg font-bold">
                Qui trovi tutti i giocatori caricati.
              </p>
              <p className="text-sm mt-2">
                Ogni volta che analizzi uno screenshot con l'IA, il giocatore
                apparirà in questa lista automaticamente.
              </p>
            </div>
          </div>
        )}

        {/* TAB TATTICA E LAVAGNA MEDIA AI */}
        {activeTab === 'tactic' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* SINISTRA: CAMPO TATTICO */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex justify-between">
                <select
                  value={tactic.formation}
                  onChange={(e) => handleSelectFormation(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-purple-500/40 text-xs font-black text-purple-400 truncate max-w-[150px]"
                >
                  {Object.keys(FORMATION_TEMPLATES).map((fKey) => (
                    <option key={fKey} value={fKey}>
                      {fKey}
                    </option>
                  ))}
                </select>
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setPitchPhase('ip')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                      pitchPhase === 'ip'
                        ? 'bg-purple-500 text-slate-950'
                        : 'text-slate-400'
                    }`}
                  >
                    IP
                  </button>
                  <button
                    onClick={() => setPitchPhase('oop')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                      pitchPhase === 'oop'
                        ? 'bg-sky-500 text-slate-950'
                        : 'text-slate-400'
                    }`}
                  >
                    OOP
                  </button>
                </div>
              </div>

              <div
                className={`relative w-full h-[550px] rounded-2xl border-2 overflow-hidden shadow-2xl transition-colors duration-300 ${
                  pitchPhase === 'oop'
                    ? 'bg-gradient-to-b from-slate-900 via-purple-950/90 to-slate-950 border-sky-500/40'
                    : 'bg-gradient-to-b from-purple-950 via-purple-900/90 to-purple-950 border-purple-600/50'
                }`}
              >
                {tactic.players.map((p) => {
                  const isSel = p.id === selectedPitchSlot;
                  const activeX = pitchPhase === 'oop' ? p.oopX : p.ipX;
                  const activeY = pitchPhase === 'oop' ? p.oopY : p.ipY;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedPitchSlot(p.id);
                        setTacticSidebarTab('player');
                      }}
                      style={{ left: `${activeX}%`, top: `${activeY}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-300 ${
                        isSel ? 'scale-110 z-20' : 'hover:scale-105 z-10'
                      }`}
                    >
                      <div
                        className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-black text-slate-950 ${
                          pitchPhase === 'oop'
                            ? 'bg-sky-400 border-sky-200'
                            : p.ipFocus === 'Attacco'
                            ? 'bg-red-500 border-red-300'
                            : p.ipFocus === 'Supporto'
                            ? 'bg-purple-400 border-purple-200'
                            : 'bg-sky-400 border-sky-200'
                        }`}
                      >
                        {p.pos}
                      </div>
                      <div className="mt-1 px-2 py-0.5 rounded bg-slate-950/90 border border-slate-700 text-center max-w-[130px]">
                        <p className="text-[11px] font-bold text-white truncate">
                          {p.name}
                        </p>
                        <p className="text-[9px] text-slate-300 truncate">
                          {pitchPhase === 'oop' ? p.oopRole : p.ipRole}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DESTRA: ISTRUZIONI E LAVAGNA MEDIA AI */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              <div className="grid grid-cols-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setTacticSidebarTab('player')}
                  className={`py-2 text-xs font-bold rounded-lg ${
                    tacticSidebarTab === 'player'
                      ? 'bg-purple-500 text-slate-950'
                      : 'text-slate-400'
                  }`}
                >
                  Diagnostica Tattica
                </button>
                <button
                  onClick={() => setTacticSidebarTab('media')}
                  className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 ${
                    tacticSidebarTab === 'media'
                      ? 'bg-purple-500 text-slate-950'
                      : 'text-slate-400'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" /> Lavagna AI (Drag&Drop)
                </button>
              </div>

              {/* EDITOR ISTRUZIONI */}
              {tacticSidebarTab === 'player' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold uppercase text-purple-400">
                          Posizione {selectedSlotObj.pos}
                        </span>
                        <h3 className="text-base font-black text-white">
                          {selectedSlotObj.name}
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <div>
                        <label className="text-[11px] font-semibold text-purple-400 block mb-1">
                          Ruolo IP
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={selectedSlotObj.ipRole}
                            onChange={(e) =>
                              updatePitchPlayer('ipRole', e.target.value)
                            }
                            className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-900 text-xs text-white"
                          />
                          <select
                            value={selectedSlotObj.ipFocus}
                            onChange={(e) =>
                              updatePitchPlayer('ipFocus', e.target.value)
                            }
                            className="w-24 px-2.5 py-1.5 rounded-lg bg-slate-900 text-xs text-white"
                          >
                            <option>Difesa</option>
                            <option>Supporto</option>
                            <option>Attacco</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-sky-400 block mb-1">
                          Ruolo OOP
                        </label>
                        <input
                          type="text"
                          value={selectedSlotObj.oopRole}
                          onChange={(e) =>
                            updatePitchPlayer('oopRole', e.target.value)
                          }
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* DIAGNOSTICA COMPATTATA */}
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 flex justify-between items-center">
                      <span className="text-xs font-bold text-purple-400">
                        Punteggio Tattica ME 27.1
                      </span>
                      <span className="text-2xl font-black text-white">
                        {tacticalDiagnostics.score}/100
                      </span>
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {tacticalDiagnostics.warnings.length === 0 ? (
                        <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/50 text-purple-400 text-sm font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" /> Perfetto
                          Equilibrio!
                        </div>
                      ) : (
                        tacticalDiagnostics.warnings.map((w, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl text-xs border ${
                              w.severity === 'critical'
                                ? 'bg-red-950/40 border-red-500/50'
                                : 'bg-amber-950/40 border-amber-500/50'
                            }`}
                          >
                            <p
                              className={`font-bold ${
                                w.severity === 'critical'
                                  ? 'text-red-300'
                                  : 'text-amber-300'
                              }`}
                            >
                              {w.title}
                            </p>
                            <p className="text-[11px] text-slate-300 mt-1">
                              {w.detail}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* LAVAGNA AI (SCREENSHOT DRAG & DROP + INIEZIONE CLOUDFLARE) */}
              {tacticSidebarTab === 'media' && (
                <div className="h-[600px] flex flex-col bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden relative">
                  <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> Cloudflare AI Scanner
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Incolla (CTRL+V) o trascina qui lo screenshot del
                        profilo di un giocatore di FM27.
                      </p>
                    </div>
                    {mediaBoards.length > 0 && (
                      <button
                        onClick={() => setMediaBoards([])}
                        className="px-3 py-1.5 bg-red-950/50 text-red-400 hover:bg-red-900/50 rounded-lg text-xs font-bold transition"
                      >
                        Svuota Lavagna
                      </button>
                    )}
                  </div>

                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onFileDrop}
                    className={`flex-1 overflow-auto p-4 flex gap-4 bg-slate-900/50 ${
                      mediaBoards.length === 0
                        ? 'items-center justify-center border-2 border-dashed border-slate-700 m-4 rounded-xl'
                        : 'items-start flex-wrap'
                    }`}
                  >
                    {mediaBoards.length === 0 ? (
                      <div className="text-center text-slate-500">
                        <Upload className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm font-bold text-slate-300">
                          Trascina e Rilascia Screenshot
                        </p>
                        <p className="text-xs mt-1">
                          L'Intelligenza Artificiale estrarrà i valori e li
                          inserirà in Rosa
                        </p>
                      </div>
                    ) : (
                      mediaBoards.map((media, i) => (
                        <div
                          key={media.id}
                          className="relative group w-[350px] rounded-xl overflow-hidden border border-slate-700 shadow-xl bg-black"
                        >
                          <img
                            src={media.url}
                            alt={`Screenshot ${i}`}
                            className="w-full h-auto max-h-[300px] object-cover opacity-80"
                          />

                          {/* PULSANTE MAGICO AI */}
                          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3">
                            <button
                              onClick={() => analyzeImageWithAI(media)}
                              disabled={aiLoading === media.id}
                              className={`w-full py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition ${
                                aiLoading === media.id
                                  ? 'bg-slate-800 text-slate-400'
                                  : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                              }`}
                            >
                              {aiLoading === media.id ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                              ) : (
                                <Sparkles className="w-4 h-4" />
                              )}
                              {aiLoading === media.id
                                ? 'Analisi Cloudflare in corso...'
                                : 'Estrai e Salva in Rosa'}
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              setMediaBoards(
                                mediaBoards.filter((m) => m.id !== media.id)
                              )
                            }
                            className="absolute top-2 right-2 p-1.5 bg-black/80 text-white hover:bg-red-500 rounded-md opacity-0 group-hover:opacity-100 transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
