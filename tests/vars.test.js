import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  VARS,
  CATEGORIES,
  findById,
  findBySyntax,
  searchVars,
  filterByCategory,
} from '../src/vars.js';

// ─────────────────────────────────────────────────
// VARS array — data integrity
// ─────────────────────────────────────────────────
describe('VARS array', () => {
  it('has at least 40 entries', () => {
    assert.ok(VARS.length >= 40, `Expected >= 40, got ${VARS.length}`);
  });

  it('all ids are unique', () => {
    const ids = VARS.map(v => v.id);
    const unique = new Set(ids);
    assert.equal(unique.size, ids.length, 'Duplicate ids detected');
  });

  it('all syntaxes are non-empty strings', () => {
    for (const v of VARS) {
      assert.ok(typeof v.syntax === 'string' && v.syntax.length > 0, `${v.id}: invalid syntax`);
    }
  });

  it('every entry has required fields', () => {
    const required = ['id', 'syntax', 'category', 'description', 'example'];
    for (const v of VARS) {
      for (const field of required) {
        assert.ok(field in v, `${v.id} missing field: ${field}`);
      }
    }
  });

  it('every description has ja and en strings', () => {
    for (const v of VARS) {
      assert.ok(typeof v.description.ja === 'string' && v.description.ja.length > 0,
        `${v.id}: missing or empty description.ja`);
      assert.ok(typeof v.description.en === 'string' && v.description.en.length > 0,
        `${v.id}: missing or empty description.en`);
    }
  });

  it('every example is a non-empty string', () => {
    for (const v of VARS) {
      assert.ok(typeof v.example === 'string' && v.example.length > 0,
        `${v.id}: invalid example`);
    }
  });

  it('every category is one of the known category ids', () => {
    const validCats = new Set(CATEGORIES.map(c => c.id));
    for (const v of VARS) {
      assert.ok(validCats.has(v.category), `${v.id}: unknown category "${v.category}"`);
    }
  });
});

// ─────────────────────────────────────────────────
// CATEGORIES array
// ─────────────────────────────────────────────────
describe('CATEGORIES array', () => {
  it('has at least 5 categories', () => {
    assert.ok(CATEGORIES.length >= 5);
  });

  it('includes all expected category ids', () => {
    const ids = CATEGORIES.map(c => c.id);
    for (const expected of ['positional', 'special', 'expansion', 'env', 'array', 'process']) {
      assert.ok(ids.includes(expected), `Missing category: ${expected}`);
    }
  });

  it('every category has ja and en name strings', () => {
    for (const c of CATEGORIES) {
      assert.ok(typeof c.name.ja === 'string' && c.name.ja.length > 0, `${c.id}: missing name.ja`);
      assert.ok(typeof c.name.en === 'string' && c.name.en.length > 0, `${c.id}: missing name.en`);
    }
  });

  it('each VARS category has a corresponding CATEGORY entry', () => {
    const catIds = new Set(CATEGORIES.map(c => c.id));
    for (const v of VARS) {
      assert.ok(catIds.has(v.category), `VARS entry ${v.id} has unmapped category ${v.category}`);
    }
  });
});

// ─────────────────────────────────────────────────
// findById
// ─────────────────────────────────────────────────
describe('findById', () => {
  it('returns the correct entry for "dollar-0"', () => {
    const v = findById('dollar-0');
    assert.ok(v !== null);
    assert.equal(v.syntax, '$0');
  });

  it('returns the correct entry for "dollar-at"', () => {
    const v = findById('dollar-at');
    assert.ok(v !== null);
    assert.equal(v.syntax, '$@');
  });

  it('returns the correct entry for "dollar-question"', () => {
    const v = findById('dollar-question');
    assert.ok(v !== null);
    assert.equal(v.syntax, '$?');
  });

  it('returns null for a non-existent id', () => {
    assert.equal(findById('no-such-id'), null);
  });

  it('returns null for empty string', () => {
    assert.equal(findById(''), null);
  });
});

// ─────────────────────────────────────────────────
// findBySyntax
// ─────────────────────────────────────────────────
describe('findBySyntax', () => {
  it('finds $0 by syntax', () => {
    const v = findBySyntax('$0');
    assert.ok(v !== null);
    assert.equal(v.id, 'dollar-0');
  });

  it('finds $? by syntax', () => {
    const v = findBySyntax('$?');
    assert.ok(v !== null);
    assert.equal(v.id, 'dollar-question');
  });

  it('finds $$ by syntax', () => {
    const v = findBySyntax('$$');
    assert.ok(v !== null);
    assert.equal(v.id, 'dollar-dollar');
  });

  it('finds entry by id via findBySyntax fallback', () => {
    const v = findBySyntax('dollar-at');
    assert.ok(v !== null);
    assert.equal(v.syntax, '$@');
  });

  it('returns null for unknown syntax', () => {
    assert.equal(findBySyntax('$ZZZNOPE'), null);
  });
});

// ─────────────────────────────────────────────────
// searchVars
// ─────────────────────────────────────────────────
describe('searchVars', () => {
  it('returns all entries for empty query', () => {
    assert.equal(searchVars('').length, VARS.length);
  });

  it('returns all entries for whitespace-only query', () => {
    assert.equal(searchVars('   ').length, VARS.length);
  });

  it('finds $@ by syntax fragment "@"', () => {
    const results = searchVars('@');
    assert.ok(results.some(v => v.id === 'dollar-at'));
  });

  it('finds $0 by syntax', () => {
    const results = searchVars('$0');
    assert.ok(results.some(v => v.id === 'dollar-0'));
  });

  it('finds $HOME by description keyword "home directory" (en)', () => {
    const results = searchVars('home directory', 'en');
    assert.ok(results.some(v => v.id === 'env-home'));
  });

  it('finds $IFS by description keyword "IFS"', () => {
    const results = searchVars('IFS');
    assert.ok(results.some(v => v.id === 'env-ifs'));
  });

  it('finds $RANDOM by Japanese description keyword "乱数"', () => {
    const results = searchVars('乱数', 'ja');
    assert.ok(results.some(v => v.id === 'proc-random'));
  });

  it('returns empty array for no match', () => {
    const results = searchVars('zzznomatch999xyz');
    assert.equal(results.length, 0);
  });

  it('search is case-insensitive', () => {
    const lower = searchVars('path');
    const upper = searchVars('PATH');
    assert.ok(lower.some(v => v.id === 'env-path'));
    assert.ok(upper.some(v => v.id === 'env-path'));
  });

  it('finds expansion entries by keyword "default"', () => {
    const results = searchVars('default');
    assert.ok(results.length > 0);
    assert.ok(results.some(v => v.category === 'expansion'));
  });

  it('finds array entries by keyword "array"', () => {
    const results = searchVars('array', 'en');
    assert.ok(results.length > 0);
  });
});

// ─────────────────────────────────────────────────
// filterByCategory
// ─────────────────────────────────────────────────
describe('filterByCategory', () => {
  it('filters to positional entries only', () => {
    const results = filterByCategory('positional');
    assert.ok(results.length > 0);
    assert.ok(results.every(v => v.category === 'positional'));
  });

  it('filters to special entries only', () => {
    const results = filterByCategory('special');
    assert.ok(results.length > 0);
    assert.ok(results.every(v => v.category === 'special'));
  });

  it('filters to expansion entries only', () => {
    const results = filterByCategory('expansion');
    assert.ok(results.length > 0);
    assert.ok(results.every(v => v.category === 'expansion'));
  });

  it('filters to env entries only', () => {
    const results = filterByCategory('env');
    assert.ok(results.length > 0);
    assert.ok(results.every(v => v.category === 'env'));
  });

  it('filters to array entries only', () => {
    const results = filterByCategory('array');
    assert.ok(results.length > 0);
    assert.ok(results.every(v => v.category === 'array'));
  });

  it('filters to process entries only', () => {
    const results = filterByCategory('process');
    assert.ok(results.length > 0);
    assert.ok(results.every(v => v.category === 'process'));
  });

  it('returns empty array for unknown category', () => {
    assert.deepEqual(filterByCategory('nonexistent'), []);
  });

  it('all VARS entries are covered by category filters', () => {
    const total = CATEGORIES.reduce((sum, c) => sum + filterByCategory(c.id).length, 0);
    assert.equal(total, VARS.length, 'filterByCategory totals do not match VARS.length');
  });
});

// ─────────────────────────────────────────────────
// Specific well-known entries spot-check
// ─────────────────────────────────────────────────
describe('spot-check specific entries', () => {
  it('$@ is in positional category', () => {
    const v = findById('dollar-at');
    assert.equal(v.category, 'positional');
  });

  it('$? is in special category', () => {
    const v = findById('dollar-question');
    assert.equal(v.category, 'special');
  });

  it('${var:-default} is in expansion category', () => {
    const v = findById('expand-default');
    assert.ok(v !== null, 'expand-default not found');
    assert.equal(v.category, 'expansion');
  });

  it('$HOME is in env category', () => {
    const v = findById('env-home');
    assert.ok(v !== null, 'env-home not found');
    assert.equal(v.category, 'env');
  });

  it('${arr[@]} is in array category', () => {
    const v = findById('array-all-at');
    assert.ok(v !== null, 'array-all-at not found');
    assert.equal(v.category, 'array');
  });

  it('$RANDOM is in process category', () => {
    const v = findById('proc-random');
    assert.ok(v !== null, 'proc-random not found');
    assert.equal(v.category, 'process');
  });
});
