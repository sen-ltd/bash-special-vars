# Bash Special Vars — Bash 変数リファレンス

A searchable reference for Bash special variables and parameter expansion. 40+ entries, bilingual (Japanese / English), zero dependencies, no build step.

**Live demo**: https://sen.ltd/portfolio/bash-special-vars/

## Features

- **Special parameters**: `$0`, `$1`–`$9`, `$@`, `$*`, `$#`, `$?`, `$$`, `$!`, `$-`, `$_`
- **Parameter expansion**: `${var:-default}`, `${var:=default}`, `${var:?err}`, `${var:+alt}`, `${var:offset:length}`, `${#var}`, `${var#pattern}`, `${var##pattern}`, `${var%pattern}`, `${var%%pattern}`, `${var/old/new}`, `${var//old/new}`, `${var^^}`, `${var,,}`
- **Environment variables**: `$HOME`, `$PATH`, `$USER`, `$SHELL`, `$PWD`, `$OLDPWD`, `$IFS`, `$PS1`, `$PS2`, `$BASH_VERSION`, `$HOSTNAME`, `$EDITOR`, `$LINENO`, `$FUNCNAME`, `$BASH_SOURCE`
- **Arrays**: `${arr[n]}`, `${arr[@]}`, `${arr[*]}`, `${#arr[@]}`, `${!arr[@]}`, `${arr[@]:offset:length}`, `mapfile`
- **Process info**: `$UID`, `$RANDOM`, `$SECONDS`, `$PPID`, `$BASHPID`
- Search / filter by category
- Dark / light theme
- Bilingual UI (ja / en)
- Expandable detail modal with copy button

## Usage

No build step required. Serve any static HTTP server:

```sh
npm run serve
# → http://localhost:8080
```

Or open `index.html` directly in a browser (ES modules require a server for local dev).

## Development

```sh
npm test   # run tests (Node.js 18+)
```

## Project structure

```
bash-special-vars/
├── index.html       # entry point
├── style.css        # terminal dark/light theme
├── src/
│   ├── main.js      # DOM, search, filter, modal
│   ├── vars.js      # variable data (40+ entries) + helpers
│   └── i18n.js      # ja/en UI strings
├── tests/
│   └── vars.test.js # 15+ tests
├── package.json
└── LICENSE
```

## License

MIT © 2026 SEN LLC (SEN 合同会社)
