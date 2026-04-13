/**
 * i18n strings for UI labels (ja/en).
 */

export const UI = {
  ja: {
    title: 'Bash 変数リファレンス',
    subtitle: '特殊変数・パラメータ展開の完全ガイド',
    searchPlaceholder: '変数名または説明で検索（例: $@, default, 配列）',
    filterAll: 'すべて',
    filterPositional: '位置パラメータ',
    filterSpecial: '特殊パラメータ',
    filterExpansion: 'パラメータ展開',
    filterEnv: '環境変数',
    filterArray: '配列',
    filterProcess: 'プロセス情報',
    labelSyntax: '構文',
    labelCategory: 'カテゴリ',
    labelDescription: '説明',
    labelExample: '使用例',
    labelOutput: '出力',
    labelNotes: 'メモ',
    noResults: '一致する変数が見つかりません',
    varCount: '件',
    closeModal: '閉じる',
    themeToggle: 'テーマ切替',
    langToggle: 'EN',
    modalTitle: '変数の詳細',
    copyBtn: 'コピー',
    copied: 'コピー済',
  },
  en: {
    title: 'Bash Special Vars',
    subtitle: 'Complete guide to special variables and parameter expansion',
    searchPlaceholder: 'Search by name or description (e.g. $@, default, array)',
    filterAll: 'All',
    filterPositional: 'Positional',
    filterSpecial: 'Special',
    filterExpansion: 'Expansion',
    filterEnv: 'Environment',
    filterArray: 'Arrays',
    filterProcess: 'Process',
    labelSyntax: 'Syntax',
    labelCategory: 'Category',
    labelDescription: 'Description',
    labelExample: 'Example',
    labelOutput: 'Output',
    labelNotes: 'Notes',
    noResults: 'No variables match your search',
    varCount: 'entries',
    closeModal: 'Close',
    themeToggle: 'Theme',
    langToggle: 'JA',
    modalTitle: 'Variable Details',
    copyBtn: 'Copy',
    copied: 'Copied',
  },
};

/**
 * Get the UI string set for a given language code.
 * Falls back to 'en' for unknown codes.
 * @param {string} lang - 'ja' or 'en'
 * @returns {object}
 */
export function getStrings(lang) {
  return UI[lang] ?? UI.en;
}

/**
 * Toggle between 'ja' and 'en'.
 * @param {string} current
 * @returns {string}
 */
export function toggleLang(current) {
  return current === 'ja' ? 'en' : 'ja';
}
