/**
 * Bash special variables and parameter expansion data.
 * Sources: Bash Reference Manual (https://www.gnu.org/software/bash/manual/)
 */

export const CATEGORIES = [
  { id: 'positional', name: { ja: '位置パラメータ', en: 'Positional Parameters' } },
  { id: 'special',   name: { ja: '特殊パラメータ', en: 'Special Parameters' } },
  { id: 'expansion', name: { ja: 'パラメータ展開', en: 'Parameter Expansion' } },
  { id: 'env',       name: { ja: '環境変数',       en: 'Environment Variables' } },
  { id: 'array',     name: { ja: '配列',           en: 'Arrays' } },
  { id: 'process',   name: { ja: 'プロセス情報',   en: 'Process Info' } },
];

export const VARS = [
  // ── Positional Parameters ──────────────────────────────────────
  {
    id: 'dollar-0',
    syntax: '$0',
    category: 'positional',
    description: {
      en: 'Name of the shell or shell script.',
      ja: 'シェルまたはシェルスクリプトの名前。',
    },
    example: 'echo $0',
    exampleOutput: '/bin/bash  # or  ./script.sh',
    notes: {
      en: 'In a function, $0 is still the script name, not the function name.',
      ja: '関数内でも $0 はスクリプト名。関数名ではない。',
    },
  },
  {
    id: 'dollar-1',
    syntax: '$1 … $9',
    category: 'positional',
    description: {
      en: 'The first through ninth positional arguments passed to the script or function.',
      ja: 'スクリプトや関数に渡された 1〜9 番目の引数。',
    },
    example: '#!/bin/bash\necho "First arg: $1"\necho "Second arg: $2"',
    exampleOutput: '# bash script.sh hello world\nFirst arg: hello\nSecond arg: world',
    notes: {
      en: 'For 10th argument and beyond use ${10}, ${11}, …',
      ja: '10 番目以降は ${10}, ${11}, … のように中括弧が必要。',
    },
  },
  {
    id: 'dollar-at',
    syntax: '$@',
    category: 'positional',
    description: {
      en: 'All positional parameters as separate quoted strings.',
      ja: '全ての位置パラメータを別々のクォート文字列として展開する。',
    },
    example: 'for arg in "$@"; do\n  echo "$arg"\ndone',
    exampleOutput: '# bash script.sh "hello world" foo\nhello world\nfoo',
    notes: {
      en: '"$@" expands to "$1" "$2" … — always quote it in loops to preserve spaces.',
      ja: '"$@" は "$1" "$2" … に展開。スペースを保持するため常にクォートして使う。',
    },
  },
  {
    id: 'dollar-star',
    syntax: '$*',
    category: 'positional',
    description: {
      en: 'All positional parameters as a single string, joined by the first character of IFS.',
      ja: '全ての位置パラメータを IFS の最初の文字で結合した1つの文字列として展開する。',
    },
    example: 'echo "$*"',
    exampleOutput: '# bash script.sh hello world\nhello world',
    notes: {
      en: 'Unquoted, $* and $@ behave the same. Quoted, "$*" concatenates, "$@" separates.',
      ja: 'クォートなしでは $* と $@ は同じ動作。クォート付きでは "$*" は結合、"$@" は分割。',
    },
  },
  {
    id: 'dollar-hash',
    syntax: '$#',
    category: 'positional',
    description: {
      en: 'Number of positional parameters.',
      ja: '位置パラメータの個数。',
    },
    example: 'echo "Argument count: $#"',
    exampleOutput: '# bash script.sh a b c\nArgument count: 3',
    notes: {
      en: '$0 (script name) is NOT counted.',
      ja: '$0（スクリプト名）はカウントされない。',
    },
  },

  // ── Special Parameters ──────────────────────────────────────
  {
    id: 'dollar-question',
    syntax: '$?',
    category: 'special',
    description: {
      en: 'Exit status of the most recently executed foreground command.',
      ja: '直前に実行されたフォアグラウンドコマンドの終了ステータス。',
    },
    example: 'ls /nonexistent; echo "Exit: $?"',
    exampleOutput: 'ls: /nonexistent: No such file or directory\nExit: 2',
    notes: {
      en: '0 = success, non-zero = failure. Always check $? before running another command that overwrites it.',
      ja: '0 = 成功、0 以外 = 失敗。次のコマンドが上書きするので早めに確認すること。',
    },
  },
  {
    id: 'dollar-dollar',
    syntax: '$$',
    category: 'special',
    description: {
      en: 'Process ID (PID) of the current shell.',
      ja: '現在のシェルのプロセス ID（PID）。',
    },
    example: 'echo "Shell PID: $$"\nTMPFILE="/tmp/myapp_$$.tmp"',
    exampleOutput: 'Shell PID: 12345',
    notes: {
      en: 'Commonly used to create unique temporary file names.',
      ja: 'ユニークな一時ファイル名の生成によく使われる。',
    },
  },
  {
    id: 'dollar-exclamation',
    syntax: '$!',
    category: 'special',
    description: {
      en: 'PID of the most recently backgrounded command.',
      ja: '最後にバックグラウンドで実行したコマンドの PID。',
    },
    example: 'sleep 60 &\necho "Background PID: $!"',
    exampleOutput: 'Background PID: 12346',
    notes: {
      en: 'Use with wait $! to wait for a specific background job.',
      ja: 'wait $! で特定のバックグラウンドジョブを待機できる。',
    },
  },
  {
    id: 'dollar-dash',
    syntax: '$-',
    category: 'special',
    description: {
      en: 'Current option flags set for the shell (from set or shell startup).',
      ja: 'シェルに設定されているオプションフラグ（set コマンドや起動時に設定されたもの）。',
    },
    example: 'echo $-',
    exampleOutput: 'himBHs  # depends on shell config',
    notes: {
      en: 'Common flags: h=hashall, i=interactive, m=monitor (job control), x=xtrace.',
      ja: '主なフラグ: h=ハッシュ, i=対話的, m=ジョブ制御, x=トレース。',
    },
  },
  {
    id: 'dollar-underscore',
    syntax: '$_',
    category: 'special',
    description: {
      en: 'Last argument of the previous command.',
      ja: '直前のコマンドの最後の引数。',
    },
    example: 'mkdir -p /tmp/testdir\ncd $_',
    exampleOutput: '# now in /tmp/testdir',
    notes: {
      en: 'Also set to the path of the script when Bash starts.',
      ja: 'Bash 起動時にはスクリプトのパスにも設定される。',
    },
  },

  // ── Parameter Expansion ──────────────────────────────────────
  {
    id: 'expand-basic',
    syntax: '${var}',
    category: 'expansion',
    description: {
      en: 'Basic parameter expansion — equivalent to $var but unambiguous.',
      ja: '基本的なパラメータ展開。$var と同じだが明確に区切れる。',
    },
    example: 'name="world"\necho "Hello, ${name}!"',
    exampleOutput: 'Hello, world!',
    notes: {
      en: 'Required when the variable name is immediately followed by alphanumeric characters.',
      ja: '変数名の直後に英数字が続くときに中括弧が必要。',
    },
  },
  {
    id: 'expand-default',
    syntax: '${var:-default}',
    category: 'expansion',
    description: {
      en: 'Use default value if var is unset or empty.',
      ja: 'var が未設定または空の場合にデフォルト値を使う。',
    },
    example: 'echo "${NAME:-Guest}"',
    exampleOutput: 'Guest  # if NAME is unset',
    notes: {
      en: 'Does NOT set var to the default — it only substitutes for this expansion.',
      ja: 'var はセットされない。この展開のみデフォルト値に置き換わる。',
    },
  },
  {
    id: 'expand-assign',
    syntax: '${var:=default}',
    category: 'expansion',
    description: {
      en: 'Assign default to var if var is unset or empty, then expand.',
      ja: 'var が未設定または空の場合、デフォルト値を代入してから展開する。',
    },
    example: 'echo "${TMPDIR:=/tmp}"\necho $TMPDIR',
    exampleOutput: '/tmp\n/tmp',
    notes: {
      en: 'Unlike :-, this actually sets the variable. Cannot be used with positional parameters.',
      ja: ':-と異なり、変数が実際にセットされる。位置パラメータには使えない。',
    },
  },
  {
    id: 'expand-error',
    syntax: '${var:?err}',
    category: 'expansion',
    description: {
      en: 'Display error message and exit if var is unset or empty.',
      ja: 'var が未設定または空の場合、エラーメッセージを表示してスクリプトを終了する。',
    },
    example: '#!/bin/bash\nset -u\necho "${REQUIRED_VAR:?Variable REQUIRED_VAR is not set}"',
    exampleOutput: 'bash: REQUIRED_VAR: Variable REQUIRED_VAR is not set',
    notes: {
      en: 'Useful for enforcing required variables at the start of a script.',
      ja: 'スクリプト冒頭で必須変数の確認に便利。',
    },
  },
  {
    id: 'expand-alternate',
    syntax: '${var:+alt}',
    category: 'expansion',
    description: {
      en: 'Use alternate value if var IS set and non-empty.',
      ja: 'var がセットされていて空でない場合に代替値を使う。',
    },
    example: 'DEBUG=1\necho "${DEBUG:+--verbose}"',
    exampleOutput: '--verbose',
    notes: {
      en: 'Opposite of :-. Useful for passing optional flags when a variable is set.',
      ja: ':-の逆。変数がセットされているときのみフラグを渡す用途に便利。',
    },
  },
  {
    id: 'expand-length',
    syntax: '${#var}',
    category: 'expansion',
    description: {
      en: 'Length of the value of var (number of characters).',
      ja: 'var の値の長さ（文字数）。',
    },
    example: 'str="hello"\necho ${#str}',
    exampleOutput: '5',
    notes: {
      en: 'For arrays, ${#arr[@]} gives the number of elements.',
      ja: '配列の場合、${#arr[@]} は要素数を返す。',
    },
  },
  {
    id: 'expand-substring',
    syntax: '${var:offset:length}',
    category: 'expansion',
    description: {
      en: 'Substring of var starting at offset, with optional length.',
      ja: 'var の offset 文字目から length 文字分の部分文字列。',
    },
    example: 'str="Hello, World"\necho ${str:7:5}',
    exampleOutput: 'World',
    notes: {
      en: 'Offset is zero-based. Negative offset counts from end: ${var: -3} (note the space).',
      ja: 'オフセットは 0 始まり。負のオフセットは末尾から: ${var: -3}（スペースが必要）。',
    },
  },
  {
    id: 'expand-strip-prefix',
    syntax: '${var#pattern}',
    category: 'expansion',
    description: {
      en: 'Remove shortest matching pattern from the beginning of var.',
      ja: 'var の先頭から最短マッチするパターンを削除する。',
    },
    example: 'path="/usr/local/bin/bash"\necho ${path#*/}',
    exampleOutput: 'usr/local/bin/bash',
    notes: {
      en: 'Uses glob patterns. Use ## for longest (greedy) match.',
      ja: 'グロブパターンを使用。## で最長（貪欲）マッチになる。',
    },
  },
  {
    id: 'expand-strip-prefix-greedy',
    syntax: '${var##pattern}',
    category: 'expansion',
    description: {
      en: 'Remove longest matching pattern from the beginning of var.',
      ja: 'var の先頭から最長マッチするパターンを削除する。',
    },
    example: 'path="/usr/local/bin/bash"\necho ${path##*/}',
    exampleOutput: 'bash',
    notes: {
      en: 'Useful for extracting basenames: file=$(basename $path) ← equivalent.',
      ja: 'ファイル名取得に便利: basename の代替として使える。',
    },
  },
  {
    id: 'expand-strip-suffix',
    syntax: '${var%pattern}',
    category: 'expansion',
    description: {
      en: 'Remove shortest matching pattern from the end of var.',
      ja: 'var の末尾から最短マッチするパターンを削除する。',
    },
    example: 'file="archive.tar.gz"\necho ${file%.*}',
    exampleOutput: 'archive.tar',
    notes: {
      en: 'Use %% for longest (greedy) match from the end.',
      ja: '%% で末尾からの最長（貪欲）マッチになる。',
    },
  },
  {
    id: 'expand-strip-suffix-greedy',
    syntax: '${var%%pattern}',
    category: 'expansion',
    description: {
      en: 'Remove longest matching pattern from the end of var.',
      ja: 'var の末尾から最長マッチするパターンを削除する。',
    },
    example: 'file="archive.tar.gz"\necho ${file%%.*}',
    exampleOutput: 'archive',
    notes: {
      en: 'Combines well with # and ## for complex filename manipulation.',
      ja: '# や ## と組み合わせて複雑なファイル名操作に使える。',
    },
  },
  {
    id: 'expand-replace',
    syntax: '${var/old/new}',
    category: 'expansion',
    description: {
      en: 'Replace first occurrence of old with new in var.',
      ja: 'var 内の old の最初の出現を new に置換する。',
    },
    example: 'str="foo bar foo"\necho ${str/foo/baz}',
    exampleOutput: 'baz bar foo',
    notes: {
      en: 'old is a glob pattern. Use // for global replace.',
      ja: 'old はグロブパターン。// で全置換になる。',
    },
  },
  {
    id: 'expand-replace-all',
    syntax: '${var//old/new}',
    category: 'expansion',
    description: {
      en: 'Replace all occurrences of old with new in var.',
      ja: 'var 内の old の全出現を new に置換する。',
    },
    example: 'str="foo bar foo"\necho ${str//foo/baz}',
    exampleOutput: 'baz bar baz',
    notes: {
      en: 'To delete a pattern, omit new: ${var//pattern/}',
      ja: 'パターンを削除するには new を省略: ${var//pattern/}',
    },
  },
  {
    id: 'expand-uppercase',
    syntax: '${var^^}',
    category: 'expansion',
    description: {
      en: 'Convert all characters of var to uppercase (Bash 4.0+).',
      ja: 'var の全文字を大文字に変換する（Bash 4.0 以降）。',
    },
    example: 'str="hello world"\necho ${str^^}',
    exampleOutput: 'HELLO WORLD',
    notes: {
      en: 'Use ${var^} to uppercase only the first character.',
      ja: '${var^} で最初の文字のみ大文字にできる。',
    },
  },
  {
    id: 'expand-lowercase',
    syntax: '${var,,}',
    category: 'expansion',
    description: {
      en: 'Convert all characters of var to lowercase (Bash 4.0+).',
      ja: 'var の全文字を小文字に変換する（Bash 4.0 以降）。',
    },
    example: 'str="HELLO WORLD"\necho ${str,,}',
    exampleOutput: 'hello world',
    notes: {
      en: 'Use ${var,} to lowercase only the first character.',
      ja: '${var,} で最初の文字のみ小文字にできる。',
    },
  },

  // ── Environment Variables ──────────────────────────────────────
  {
    id: 'env-home',
    syntax: '$HOME',
    category: 'env',
    description: {
      en: 'Home directory of the current user.',
      ja: '現在のユーザーのホームディレクトリ。',
    },
    example: 'echo $HOME\ncd $HOME  # equivalent to cd ~',
    exampleOutput: '/home/alice',
    notes: {
      en: '~ in paths expands to $HOME.',
      ja: 'パス中の ~ は $HOME に展開される。',
    },
  },
  {
    id: 'env-path',
    syntax: '$PATH',
    category: 'env',
    description: {
      en: 'Colon-separated list of directories searched for commands.',
      ja: 'コマンドを検索するディレクトリのコロン区切りリスト。',
    },
    example: 'echo $PATH\nexport PATH="$HOME/.local/bin:$PATH"',
    exampleOutput: '/usr/local/bin:/usr/bin:/bin',
    notes: {
      en: 'Prepend to PATH to give your scripts priority over system commands.',
      ja: 'PATH の先頭に追加するとシステムコマンドより自分のスクリプトが優先される。',
    },
  },
  {
    id: 'env-user',
    syntax: '$USER',
    category: 'env',
    description: {
      en: 'Username of the current user.',
      ja: '現在のユーザーのユーザー名。',
    },
    example: 'echo "Logged in as: $USER"',
    exampleOutput: 'Logged in as: alice',
    notes: {
      en: 'Set by the login process. $LOGNAME is equivalent on many systems.',
      ja: 'ログインプロセスによって設定される。多くのシステムで $LOGNAME と同等。',
    },
  },
  {
    id: 'env-shell',
    syntax: '$SHELL',
    category: 'env',
    description: {
      en: "Path to the current user's login shell.",
      ja: '現在のユーザーのログインシェルのパス。',
    },
    example: 'echo $SHELL',
    exampleOutput: '/bin/bash',
    notes: {
      en: 'This reflects the login shell, not the shell currently running the script.',
      ja: 'スクリプトを実行中のシェルではなく、ログインシェルを反映する。',
    },
  },
  {
    id: 'env-pwd',
    syntax: '$PWD',
    category: 'env',
    description: {
      en: 'Current working directory.',
      ja: '現在の作業ディレクトリ。',
    },
    example: 'echo $PWD  # equivalent to $(pwd)',
    exampleOutput: '/home/alice/projects',
    notes: {
      en: 'Updated automatically when cd changes directory.',
      ja: 'cd でディレクトリを変更すると自動的に更新される。',
    },
  },
  {
    id: 'env-oldpwd',
    syntax: '$OLDPWD',
    category: 'env',
    description: {
      en: 'Previous working directory (before the last cd).',
      ja: '直前の作業ディレクトリ（最後の cd 前のディレクトリ）。',
    },
    example: 'cd /tmp\ncd /var\necho $OLDPWD\ncd -  # go back',
    exampleOutput: '/tmp',
    notes: {
      en: 'cd - changes to $OLDPWD.',
      ja: 'cd - で $OLDPWD に戻ることができる。',
    },
  },
  {
    id: 'env-ifs',
    syntax: '$IFS',
    category: 'env',
    description: {
      en: 'Internal Field Separator — used by word splitting. Default is space, tab, newline.',
      ja: '内部フィールドセパレータ。単語分割に使用。デフォルトはスペース・タブ・改行。',
    },
    example: 'IFS=:\nread -ra parts <<< "$PATH"\necho "${parts[0]}"',
    exampleOutput: '/usr/local/bin',
    notes: {
      en: 'Changing IFS affects read, for loops, and array assignment. Always restore afterwards.',
      ja: 'IFS の変更は read、for ループ、配列代入に影響する。使用後は元に戻すこと。',
    },
  },
  {
    id: 'env-ps1',
    syntax: '$PS1',
    category: 'env',
    description: {
      en: 'Primary prompt string displayed before each command.',
      ja: 'コマンド入力前に表示されるプライマリプロンプト文字列。',
    },
    example: 'export PS1="[\\u@\\h \\W]\\$ "',
    exampleOutput: '[alice@myhost projects]$ ',
    notes: {
      en: 'Special escape sequences: \\u=user, \\h=hostname, \\W=basename of cwd, \\$=prompt char.',
      ja: 'エスケープ: \\u=ユーザー, \\h=ホスト名, \\W=作業ディレクトリの basename, \\$=プロンプト文字。',
    },
  },
  {
    id: 'env-ps2',
    syntax: '$PS2',
    category: 'env',
    description: {
      en: 'Secondary prompt string displayed for multi-line command continuation.',
      ja: '複数行コマンドの継続入力時に表示されるセカンダリプロンプト文字列。',
    },
    example: 'export PS2="> "',
    exampleOutput: '> ',
    notes: {
      en: 'Default is "> ". Shown when a command needs more input (e.g., after | or unclosed quote).',
      ja: 'デフォルトは "> "。| や閉じていないクォートの後など続きが必要な場合に表示される。',
    },
  },
  {
    id: 'env-bash-version',
    syntax: '$BASH_VERSION',
    category: 'env',
    description: {
      en: 'Version string of the running Bash instance.',
      ja: '実行中の Bash のバージョン文字列。',
    },
    example: 'echo $BASH_VERSION',
    exampleOutput: '5.2.15(1)-release',
    notes: {
      en: 'See also $BASH_VERSINFO (an array of version components).',
      ja: '配列形式のバージョン情報には $BASH_VERSINFO も使える。',
    },
  },
  {
    id: 'env-hostname',
    syntax: '$HOSTNAME',
    category: 'env',
    description: {
      en: 'Hostname of the machine.',
      ja: 'マシンのホスト名。',
    },
    example: 'echo $HOSTNAME',
    exampleOutput: 'myserver.example.com',
    notes: {
      en: 'Set automatically by Bash. Not exported by default — use $(hostname) in sub-shells.',
      ja: 'Bash が自動設定する。デフォルトでは export されないため、サブシェルでは $(hostname) を使う。',
    },
  },
  {
    id: 'env-editor',
    syntax: '$EDITOR',
    category: 'env',
    description: {
      en: 'Preferred text editor for command-line programs.',
      ja: 'コマンドラインプログラムが使う優先テキストエディタ。',
    },
    example: 'export EDITOR=vim\ngit commit  # opens vim',
    exampleOutput: '',
    notes: {
      en: 'Also see $VISUAL (preferred for full-screen editors). Many programs prefer VISUAL > EDITOR.',
      ja: '$VISUAL（フルスクリーンエディタ向け）も参照。多くのプログラムは VISUAL > EDITOR の順で確認する。',
    },
  },
  {
    id: 'env-lineno',
    syntax: '$LINENO',
    category: 'env',
    description: {
      en: 'Current line number in the script or shell function.',
      ja: 'スクリプトまたはシェル関数の現在の行番号。',
    },
    example: 'echo "Running line $LINENO"',
    exampleOutput: 'Running line 42',
    notes: {
      en: 'Useful for error messages to indicate where a failure occurred.',
      ja: 'エラーメッセージでどこで失敗したかを示すのに便利。',
    },
  },
  {
    id: 'env-funcname',
    syntax: '$FUNCNAME',
    category: 'env',
    description: {
      en: 'Array of function names in the current call stack.',
      ja: '現在のコールスタック内の関数名の配列。',
    },
    example: 'function greet() {\n  echo "In function: ${FUNCNAME[0]}"\n}\ngreet',
    exampleOutput: 'In function: greet',
    notes: {
      en: 'FUNCNAME[0] is the current function, FUNCNAME[1] is the caller, etc.',
      ja: 'FUNCNAME[0] が現在の関数、FUNCNAME[1] が呼び出し元など。',
    },
  },
  {
    id: 'env-bash-source',
    syntax: '$BASH_SOURCE',
    category: 'env',
    description: {
      en: 'Array of source filenames corresponding to FUNCNAME entries.',
      ja: 'FUNCNAME の各エントリに対応するソースファイル名の配列。',
    },
    example: 'echo "${BASH_SOURCE[0]}"',
    exampleOutput: './myscript.sh',
    notes: {
      en: 'Use to get the directory of the current script: DIR=$(dirname "${BASH_SOURCE[0]}")',
      ja: 'スクリプト自身のディレクトリ取得に使う: DIR=$(dirname "${BASH_SOURCE[0]}")',
    },
  },

  // ── Process Info ──────────────────────────────────────
  {
    id: 'proc-uid',
    syntax: '$UID',
    category: 'process',
    description: {
      en: 'Numeric user ID of the current user (read-only).',
      ja: '現在のユーザーの数値ユーザー ID（読み取り専用）。',
    },
    example: 'if [[ $UID -eq 0 ]]; then\n  echo "Running as root"\nfi',
    exampleOutput: '# outputs "Running as root" if root',
    notes: {
      en: 'Root has UID 0. Equivalent to $(id -u) but without a subprocess.',
      ja: 'root の UID は 0。サブプロセスなしで $(id -u) と同等。',
    },
  },
  {
    id: 'proc-random',
    syntax: '$RANDOM',
    category: 'process',
    description: {
      en: 'A pseudo-random integer between 0 and 32767, regenerated each read.',
      ja: '0〜32767 の疑似乱数整数。参照するたびに新しい値が生成される。',
    },
    example: 'echo $RANDOM\necho $((RANDOM % 100))  # 0-99',
    exampleOutput: '17394\n42',
    notes: {
      en: 'Not cryptographically secure. Seed with RANDOM=seed for reproducibility.',
      ja: '暗号論的に安全ではない。再現性が必要なら RANDOM=シード で初期化できる。',
    },
  },
  {
    id: 'proc-seconds',
    syntax: '$SECONDS',
    category: 'process',
    description: {
      en: 'Number of seconds since the shell was started.',
      ja: 'シェルが起動してからの経過秒数。',
    },
    example: 'START=$SECONDS\nsleep 3\necho "Elapsed: $((SECONDS - START))s"',
    exampleOutput: 'Elapsed: 3s',
    notes: {
      en: 'Can be reset: SECONDS=0 restarts the counter.',
      ja: 'リセット可能: SECONDS=0 でカウンターをリセットできる。',
    },
  },
  {
    id: 'proc-ppid',
    syntax: '$PPID',
    category: 'process',
    description: {
      en: 'Process ID of the parent process.',
      ja: '親プロセスのプロセス ID。',
    },
    example: 'echo "Parent PID: $PPID"',
    exampleOutput: 'Parent PID: 11111',
    notes: {
      en: 'Useful when a script needs to know who launched it.',
      ja: '誰がスクリプトを起動したか知りたいときに便利。',
    },
  },
  {
    id: 'proc-bash-pid',
    syntax: '$BASHPID',
    category: 'process',
    description: {
      en: 'PID of the current Bash process (differs from $$ in subshells).',
      ja: '現在の Bash プロセスの PID（サブシェルでは $$ と異なる）。',
    },
    example: '(echo "Subshell PID: $BASHPID, Shell PID: $$")',
    exampleOutput: 'Subshell PID: 22222, Shell PID: 11111',
    notes: {
      en: '$$ always shows the top-level shell PID; $BASHPID shows the actual current process PID.',
      ja: '$$ はトップレベルシェルの PID を常に示す。$BASHPID は実際の現在プロセス PID を示す。',
    },
  },

  // ── Arrays ──────────────────────────────────────
  {
    id: 'array-element',
    syntax: '${arr[n]}',
    category: 'array',
    description: {
      en: 'Get element at index n of array arr.',
      ja: '配列 arr のインデックス n の要素を取得する。',
    },
    example: 'fruits=("apple" "banana" "cherry")\necho ${fruits[1]}',
    exampleOutput: 'banana',
    notes: {
      en: 'Arrays are zero-indexed. ${arr[-1]} accesses the last element (Bash 4.1+).',
      ja: '配列は 0 始まり。${arr[-1]} で最後の要素にアクセスできる（Bash 4.1 以降）。',
    },
  },
  {
    id: 'array-all-at',
    syntax: '${arr[@]}',
    category: 'array',
    description: {
      en: 'All elements of array arr as separate words.',
      ja: '配列 arr の全要素を個別の単語として展開する。',
    },
    example: 'fruits=("apple" "banana" "cherry")\nfor f in "${fruits[@]}"; do echo "$f"; done',
    exampleOutput: 'apple\nbanana\ncherry',
    notes: {
      en: 'Always quote: "${arr[@]}" to handle elements with spaces correctly.',
      ja: 'スペースを含む要素を正しく扱うには "${arr[@]}" とクォートすること。',
    },
  },
  {
    id: 'array-all-star',
    syntax: '${arr[*]}',
    category: 'array',
    description: {
      en: 'All elements of array arr as a single IFS-joined string.',
      ja: '配列 arr の全要素を IFS で結合した1つの文字列として展開する。',
    },
    example: 'IFS=,\nfruits=("apple" "banana" "cherry")\necho "${fruits[*]}"',
    exampleOutput: 'apple,banana,cherry',
    notes: {
      en: '"${arr[*]}" joins with first IFS char. Prefer ${arr[@]} for loops.',
      ja: '"${arr[*]}" は IFS の最初の文字で結合する。ループには ${arr[@]} を使うこと。',
    },
  },
  {
    id: 'array-length',
    syntax: '${#arr[@]}',
    category: 'array',
    description: {
      en: 'Number of elements in array arr.',
      ja: '配列 arr の要素数。',
    },
    example: 'fruits=("apple" "banana" "cherry")\necho ${#fruits[@]}',
    exampleOutput: '3',
    notes: {
      en: 'Works for both indexed and associative arrays.',
      ja: 'インデックス配列・連想配列の両方に使える。',
    },
  },
  {
    id: 'array-indices',
    syntax: '${!arr[@]}',
    category: 'array',
    description: {
      en: 'All indices (keys) of array arr.',
      ja: '配列 arr の全インデックス（キー）を展開する。',
    },
    example: 'declare -A map=([foo]=1 [bar]=2)\nfor key in "${!map[@]}"; do echo "$key=${map[$key]}"; done',
    exampleOutput: 'foo=1\nbar=2',
    notes: {
      en: 'Essential for iterating over associative arrays.',
      ja: '連想配列を反復処理するのに必須。',
    },
  },
  {
    id: 'array-slice',
    syntax: '${arr[@]:offset:length}',
    category: 'array',
    description: {
      en: 'Slice of array arr starting at offset, with optional length.',
      ja: '配列 arr の offset から length 個の要素を取り出す。',
    },
    example: 'nums=(10 20 30 40 50)\necho "${nums[@]:1:3}"',
    exampleOutput: '20 30 40',
    notes: {
      en: 'Negative offset is supported in Bash 4.2+.',
      ja: '負のオフセットは Bash 4.2 以降でサポート。',
    },
  },
  {
    id: 'array-mapfile',
    syntax: 'mapfile / readarray',
    category: 'array',
    description: {
      en: 'Read lines from stdin (or a file) into an indexed array.',
      ja: '標準入力（またはファイル）の各行をインデックス配列に読み込む。',
    },
    example: 'mapfile -t lines < /etc/hosts\necho "${#lines[@]} lines read"',
    exampleOutput: '8 lines read',
    notes: {
      en: '-t strips trailing newlines. readarray is a synonym for mapfile.',
      ja: '-t で末尾の改行を除去する。readarray は mapfile の別名。',
    },
  },
];

// ── Lookup helpers ──────────────────────────────────────────────

/**
 * Find a variable entry by its id.
 * @param {string} id
 * @returns {object|null}
 */
export function findById(id) {
  return VARS.find(v => v.id === id) ?? null;
}

/**
 * Find a variable by its syntax string or id.
 * Examples: findBySyntax('$0') or findBySyntax('dollar-0')
 * @param {string} syntax
 * @returns {object|null}
 */
export function findBySyntax(syntax) {
  const lower = syntax.toLowerCase();
  return (
    VARS.find(v => v.syntax === syntax) ??
    VARS.find(v => v.id === lower) ??
    null
  );
}

/**
 * Search VARS by query string against syntax, id, and descriptions.
 * @param {string} query
 * @param {'ja'|'en'} [lang='en']
 * @returns {object[]}
 */
export function searchVars(query, lang = 'en') {
  const q = query.trim().toLowerCase();
  if (!q) return VARS.slice();
  return VARS.filter(v => {
    return (
      v.syntax.toLowerCase().includes(q) ||
      v.id.toLowerCase().includes(q) ||
      v.description.en.toLowerCase().includes(q) ||
      v.description.ja.includes(q) ||
      (v.notes && (v.notes.en.toLowerCase().includes(q) || v.notes.ja.includes(q))) ||
      v.example.toLowerCase().includes(q) ||
      (v.exampleOutput && v.exampleOutput.toLowerCase().includes(q))
    );
  });
}

/**
 * Filter VARS by category id.
 * @param {string} category
 * @returns {object[]}
 */
export function filterByCategory(category) {
  return VARS.filter(v => v.category === category);
}
