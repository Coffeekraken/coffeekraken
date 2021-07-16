import {pushScopeId, popScopeId, resolveComponent, openBlock, createBlock, createVNode, renderSlot, Fragment, renderList, toDisplayString, createCommentVNode, withScopeId, createTextVNode, createApp, h} from "vue";
import wrapper from "vue3-webcomponent-wrapper";
import prism from "prismjs";
import __SClipboardCopyComponent from "@coffeekraken/s-clipboard-copy-component";
import __SInterface from "@coffeekraken/s-interface";
import __SComponentUtils, {SComponentUtilsDefaultInterface} from "@coffeekraken/s-component-utils";
Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
      lookbehind: true
    }
  ],
  "keyword": [
    {
      pattern: /((?:^|})\s*)(?:catch|finally)\b/,
      lookbehind: true
    },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: true
    }
  ],
  "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  "number": /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});
Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
Prism.languages.insertBefore("javascript", "keyword", {
  "regex": {
    pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
    lookbehind: true,
    greedy: true,
    inside: {
      "regex-source": {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: true,
        alias: "language-regex",
        inside: Prism.languages.regex
      },
      "regex-flags": /[a-z]+$/,
      "regex-delimiter": /^\/|\/$/
    }
  },
  "function-variable": {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: "function"
  },
  "parameter": [
    {
      pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
      inside: Prism.languages.javascript
    },
    {
      pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    }
  ],
  "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
Prism.languages.insertBefore("javascript", "string", {
  "template-string": {
    pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
    greedy: true,
    inside: {
      "template-punctuation": {
        pattern: /^`|`$/,
        alias: "string"
      },
      "interpolation": {
        pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
        lookbehind: true,
        inside: {
          "interpolation-punctuation": {
            pattern: /^\${|}$/,
            alias: "punctuation"
          },
          rest: Prism.languages.javascript
        }
      },
      "string": /[\s\S]+/
    }
  }
});
if (Prism.languages.markup) {
  Prism.languages.markup.tag.addInlined("script", "javascript");
}
Prism.languages.js = Prism.languages.javascript;
(function(Prism2) {
  var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  Prism2.languages.css = {
    "comment": /\/\*[\s\S]*?\*\//,
    "atrule": {
      pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
      inside: {
        "rule": /^@[\w-]+/,
        "selector-function-argument": {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: true,
          alias: "selector"
        },
        "keyword": {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: true
        }
      }
    },
    "url": {
      pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
      greedy: true,
      inside: {
        "function": /^url/i,
        "punctuation": /^\(|\)$/,
        "string": {
          pattern: RegExp("^" + string.source + "$"),
          alias: "url"
        }
      }
    },
    "selector": RegExp(`[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
    "string": {
      pattern: string,
      greedy: true
    },
    "property": /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
    "important": /!important\b/i,
    "function": /[-a-z0-9]+(?=\()/i,
    "punctuation": /[(){};:,]/
  };
  Prism2.languages.css["atrule"].inside.rest = Prism2.languages.css;
  var markup = Prism2.languages.markup;
  if (markup) {
    markup.tag.addInlined("style", "css");
    Prism2.languages.insertBefore("inside", "attr-value", {
      "style-attr": {
        pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
        lookbehind: true,
        inside: {
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              "style": {
                pattern: /(["'])[\s\S]+(?=["']$)/,
                lookbehind: true,
                alias: "language-css",
                inside: Prism2.languages.css
              },
              "punctuation": [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                /"|'/
              ]
            }
          },
          "attr-name": /^style/i
        }
      }
    }, markup.tag);
  }
})(Prism);
Prism.languages.markup = {
  "comment": /<!--[\s\S]*?-->/,
  "prolog": /<\?[\s\S]+?\?>/,
  "doctype": {
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: true,
    inside: {
      "internal-subset": {
        pattern: /(\[)[\s\S]+(?=\]>$)/,
        lookbehind: true,
        greedy: true,
        inside: null
      },
      "string": {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: true
      },
      "punctuation": /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/,
      "name": /[^\s<>'"]+/
    }
  },
  "cdata": /<!\[CDATA\[[\s\S]*?]]>/i,
  "tag": {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      "tag": {
        pattern: /^<\/?[^\s>\/]+/,
        inside: {
          "punctuation": /^<\/?/,
          "namespace": /^[^\s>\/:]+:/
        }
      },
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          "punctuation": [
            {
              pattern: /^=/,
              alias: "attr-equals"
            },
            /"|'/
          ]
        }
      },
      "punctuation": /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: {
          "namespace": /^[^\s>\/:]+:/
        }
      }
    }
  },
  "entity": [
    {
      pattern: /&[\da-z]{1,8};/i,
      alias: "named-entity"
    },
    /&#x?[\da-f]{1,8};/i
  ]
};
Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism.languages.markup["entity"];
Prism.languages.markup["doctype"].inside["internal-subset"].inside = Prism.languages.markup;
Prism.hooks.add("wrap", function(env) {
  if (env.type === "entity") {
    env.attributes["title"] = env.content.replace(/&amp;/, "&");
  }
});
Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
  value: function addInlined(tagName, lang) {
    var includedCdataInside = {};
    includedCdataInside["language-" + lang] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: true,
      inside: Prism.languages[lang]
    };
    includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
    var inside = {
      "included-cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: includedCdataInside
      }
    };
    inside["language-" + lang] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[lang]
    };
    var def = {};
    def[tagName] = {
      pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
        return tagName;
      }), "i"),
      lookbehind: true,
      greedy: true,
      inside
    };
    Prism.languages.insertBefore("markup", "cdata", def);
  }
});
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;
Prism.languages.xml = Prism.languages.extend("markup", {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;
(function(Prism2) {
  var envVars = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b";
  var commandAfterHeredoc = {
    pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
    lookbehind: true,
    alias: "punctuation",
    inside: null
  };
  var insideString = {
    "bash": commandAfterHeredoc,
    "environment": {
      pattern: RegExp("\\$" + envVars),
      alias: "constant"
    },
    "variable": [
      {
        pattern: /\$?\(\([\s\S]+?\)\)/,
        greedy: true,
        inside: {
          "variable": [
            {
              pattern: /(^\$\(\([\s\S]+)\)\)/,
              lookbehind: true
            },
            /^\$\(\(/
          ],
          "number": /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
          "operator": /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
          "punctuation": /\(\(?|\)\)?|,|;/
        }
      },
      {
        pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
        greedy: true,
        inside: {
          "variable": /^\$\(|^`|\)$|`$/
        }
      },
      {
        pattern: /\$\{[^}]+\}/,
        greedy: true,
        inside: {
          "operator": /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
          "punctuation": /[\[\]]/,
          "environment": {
            pattern: RegExp("(\\{)" + envVars),
            lookbehind: true,
            alias: "constant"
          }
        }
      },
      /\$(?:\w+|[#?*!@$])/
    ],
    "entity": /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/
  };
  Prism2.languages.bash = {
    "shebang": {
      pattern: /^#!\s*\/.*/,
      alias: "important"
    },
    "comment": {
      pattern: /(^|[^"{\\$])#.*/,
      lookbehind: true
    },
    "function-name": [
      {
        pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
        lookbehind: true,
        alias: "function"
      },
      {
        pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/,
        alias: "function"
      }
    ],
    "for-or-select": {
      pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
      alias: "variable",
      lookbehind: true
    },
    "assign-left": {
      pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
      inside: {
        "environment": {
          pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + envVars),
          lookbehind: true,
          alias: "constant"
        }
      },
      alias: "variable",
      lookbehind: true
    },
    "string": [
      {
        pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s[\s\S]*?(?:\r?\n|\r)\2/,
        lookbehind: true,
        greedy: true,
        inside: insideString
      },
      {
        pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
        lookbehind: true,
        greedy: true,
        inside: {
          "bash": commandAfterHeredoc
        }
      },
      {
        pattern: /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|(?!\2)[^\\`$])*\2/,
        lookbehind: true,
        greedy: true,
        inside: insideString
      }
    ],
    "environment": {
      pattern: RegExp("\\$?" + envVars),
      alias: "constant"
    },
    "variable": insideString.variable,
    "function": {
      pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    "keyword": {
      pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    "builtin": {
      pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
      lookbehind: true,
      alias: "class-name"
    },
    "boolean": {
      pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    "file-descriptor": {
      pattern: /\B&\d\b/,
      alias: "important"
    },
    "operator": {
      pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
      inside: {
        "file-descriptor": {
          pattern: /^\d/,
          alias: "important"
        }
      }
    },
    "punctuation": /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
    "number": {
      pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
      lookbehind: true
    }
  };
  commandAfterHeredoc.inside = Prism2.languages.bash;
  var toBeCopied = [
    "comment",
    "function-name",
    "for-or-select",
    "assign-left",
    "string",
    "environment",
    "function",
    "keyword",
    "builtin",
    "boolean",
    "file-descriptor",
    "operator",
    "punctuation",
    "number"
  ];
  var inside = insideString.variable[1].inside;
  for (var i = 0; i < toBeCopied.length; i++) {
    inside[toBeCopied[i]] = Prism2.languages.bash[toBeCopied[i]];
  }
  Prism2.languages.shell = Prism2.languages.bash;
})(Prism);
(function(Prism2) {
  var comment = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/;
  var constant = [
    {
      pattern: /\b(?:false|true)\b/i,
      alias: "boolean"
    },
    /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/,
    /\b(?:null)\b/i
  ];
  var number = /\b0b[01]+\b|\b0x[\da-f]+\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+)(?:e[+-]?\d+)?/i;
  var operator = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/;
  var punctuation = /[{}\[\](),:;]/;
  Prism2.languages.php = {
    "delimiter": {
      pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
      alias: "important"
    },
    "comment": comment,
    "variable": /\$+(?:\w+\b|(?={))/i,
    "package": {
      pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
      lookbehind: true,
      inside: {
        "punctuation": /\\/
      }
    },
    "keyword": [
      {
        pattern: /(\(\s*)\b(?:bool|boolean|int|integer|float|string|object|array)\b(?=\s*\))/i,
        alias: "type-casting",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /([(,?]\s*)\b(?:bool|int|float|string|object|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b(?=\s*\$)/i,
        alias: "type-hint",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /([(,?]\s*[a-z0-9_|]\|\s*)(?:null|false)\b(?=\s*\$)/i,
        alias: "type-hint",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b/i,
        alias: "return-type",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?[a-z0-9_|]\|\s*)(?:null|false)\b/i,
        alias: "return-type",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|iterable|(?:null|false)(?=\s*\|))\b/i,
        alias: "type-declaration",
        greedy: true
      },
      {
        pattern: /(\|\s*)(?:null|false)\b/i,
        alias: "type-declaration",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /\b(?:parent|self|static)(?=\s*::)/i,
        alias: "static-context",
        greedy: true
      },
      /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|match|new|or|parent|print|private|protected|public|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i
    ],
    "argument-name": /\b[a-z_]\w*(?=\s*:(?!:))/i,
    "class-name": [
      {
        pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i,
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i,
        greedy: true
      },
      {
        pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
        alias: "class-name-fully-qualified",
        greedy: true,
        lookbehind: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
        alias: "class-name-fully-qualified",
        greedy: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
        alias: "class-name-fully-qualified",
        greedy: true,
        lookbehind: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /\b[a-z_]\w*(?=\s*\$)/i,
        alias: "type-declaration",
        greedy: true
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
        alias: ["class-name-fully-qualified", "type-declaration"],
        greedy: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /\b[a-z_]\w*(?=\s*::)/i,
        alias: "static-context",
        greedy: true
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
        alias: ["class-name-fully-qualified", "static-context"],
        greedy: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,
        alias: "type-hint",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
        alias: ["class-name-fully-qualified", "type-hint"],
        greedy: true,
        lookbehind: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,
        alias: "return-type",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
        alias: ["class-name-fully-qualified", "return-type"],
        greedy: true,
        lookbehind: true,
        inside: {
          "punctuation": /\\/
        }
      }
    ],
    "constant": constant,
    "function": /\w+\s*(?=\()/,
    "property": {
      pattern: /(->)[\w]+/,
      lookbehind: true
    },
    "number": number,
    "operator": operator,
    "punctuation": punctuation
  };
  var string_interpolation = {
    pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)*)/,
    lookbehind: true,
    inside: Prism2.languages.php
  };
  var string = [
    {
      pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
      alias: "nowdoc-string",
      greedy: true,
      inside: {
        "delimiter": {
          pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
          alias: "symbol",
          inside: {
            "punctuation": /^<<<'?|[';]$/
          }
        }
      }
    },
    {
      pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
      alias: "heredoc-string",
      greedy: true,
      inside: {
        "delimiter": {
          pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
          alias: "symbol",
          inside: {
            "punctuation": /^<<<"?|[";]$/
          }
        },
        "interpolation": string_interpolation
      }
    },
    {
      pattern: /`(?:\\[\s\S]|[^\\`])*`/,
      alias: "backtick-quoted-string",
      greedy: true
    },
    {
      pattern: /'(?:\\[\s\S]|[^\\'])*'/,
      alias: "single-quoted-string",
      greedy: true
    },
    {
      pattern: /"(?:\\[\s\S]|[^\\"])*"/,
      alias: "double-quoted-string",
      greedy: true,
      inside: {
        "interpolation": string_interpolation
      }
    }
  ];
  Prism2.languages.insertBefore("php", "variable", {
    "string": string
  });
  Prism2.languages.insertBefore("php", "variable", {
    "attribute": {
      pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/mi,
      greedy: true,
      inside: {
        "attribute-content": {
          pattern: /^(#\[)[\s\S]+(?=]$)/,
          lookbehind: true,
          inside: {
            "comment": comment,
            "string": string,
            "attribute-class-name": [
              {
                pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
                alias: "class-name",
                greedy: true,
                lookbehind: true
              },
              {
                pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
                alias: [
                  "class-name",
                  "class-name-fully-qualified"
                ],
                greedy: true,
                lookbehind: true,
                inside: {
                  "punctuation": /\\/
                }
              }
            ],
            "constant": constant,
            "number": number,
            "operator": operator,
            "punctuation": punctuation
          }
        },
        "delimiter": {
          pattern: /^#\[|]$/,
          alias: "punctuation"
        }
      }
    }
  });
  Prism2.hooks.add("before-tokenize", function(env) {
    if (!/<\?/.test(env.code)) {
      return;
    }
    var phpPattern = /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/ig;
    Prism2.languages["markup-templating"].buildPlaceholders(env, "php", phpPattern);
  });
  Prism2.hooks.add("after-tokenize", function(env) {
    Prism2.languages["markup-templating"].tokenizePlaceholders(env, "php");
  });
})(Prism);
(function(Prism2) {
  function getPlaceholder(language, index) {
    return "___" + language.toUpperCase() + index + "___";
  }
  Object.defineProperties(Prism2.languages["markup-templating"] = {}, {
    buildPlaceholders: {
      value: function(env, language, placeholderPattern, replaceFilter) {
        if (env.language !== language) {
          return;
        }
        var tokenStack = env.tokenStack = [];
        env.code = env.code.replace(placeholderPattern, function(match) {
          if (typeof replaceFilter === "function" && !replaceFilter(match)) {
            return match;
          }
          var i = tokenStack.length;
          var placeholder;
          while (env.code.indexOf(placeholder = getPlaceholder(language, i)) !== -1)
            ++i;
          tokenStack[i] = match;
          return placeholder;
        });
        env.grammar = Prism2.languages.markup;
      }
    },
    tokenizePlaceholders: {
      value: function(env, language) {
        if (env.language !== language || !env.tokenStack) {
          return;
        }
        env.grammar = Prism2.languages[language];
        var j = 0;
        var keys = Object.keys(env.tokenStack);
        function walkTokens(tokens) {
          for (var i = 0; i < tokens.length; i++) {
            if (j >= keys.length) {
              break;
            }
            var token = tokens[i];
            if (typeof token === "string" || token.content && typeof token.content === "string") {
              var k = keys[j];
              var t = env.tokenStack[k];
              var s = typeof token === "string" ? token : token.content;
              var placeholder = getPlaceholder(language, k);
              var index = s.indexOf(placeholder);
              if (index > -1) {
                ++j;
                var before = s.substring(0, index);
                var middle = new Prism2.Token(language, Prism2.tokenize(t, env.grammar), "language-" + language, t);
                var after = s.substring(index + placeholder.length);
                var replacement = [];
                if (before) {
                  replacement.push.apply(replacement, walkTokens([before]));
                }
                replacement.push(middle);
                if (after) {
                  replacement.push.apply(replacement, walkTokens([after]));
                }
                if (typeof token === "string") {
                  tokens.splice.apply(tokens, [i, 1].concat(replacement));
                } else {
                  token.content = replacement;
                }
              }
            } else if (token.content) {
              walkTokens(token.content);
            }
          }
          return tokens;
        }
        walkTokens(env.tokens);
      }
    }
  });
})(Prism);
class SHighlightJsComponentInterface extends __SInterface {
}
SHighlightJsComponentInterface.definition = {
  ...SComponentUtilsDefaultInterface.definition,
  theme: {
    type: "String",
    default: "https://gitcdn.link/repo/PrismJS/prism-themes/master/themes/prism-nord.css"
  },
  active: {
    type: "String"
  },
  toolbar: {
    type: "Array<String>",
    values: ["copy"],
    default: ["copy"]
  },
  toolbarPosition: {
    type: "String",
    values: ["content", "nav"],
    default: "content"
  },
  defaultStyleClasses: {
    type: "Object",
    default: {
      main: "s-tabs"
    }
  }
};
function whenInViewport(elm, settings = {}) {
  settings = Object.assign({offset: 50}, settings);
  return new Promise((resolve) => {
    const options = {
      root: null,
      rootMargin: `${settings.offset}px`,
      threshold: 1
    };
    function onChange(changes, observer2) {
      changes.forEach((change) => {
        if (change.intersectionRatio > 0) {
          observer2.disconnect();
          resolve(elm);
        }
      });
    }
    const observer = new IntersectionObserver(onChange, options);
    observer.observe(elm);
  });
}
function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
var SCodeExample_vue_vue_type_style_index_0_scoped_true_lang = '\n.s-code-example[data-v-2c5508a7] {  \n        display: block;\n}\n.s-code-example[data-v-2c5508a7][toolbar-position="nav"][data-v-2c5508a7] {\n              position: relative;\n}\n.s-code-example__slot[data-v-2c5508a7] {\n        display: none;\n}\n.s-code-example__nav[data-v-2c5508a7] {\n}\n.s-code-example__tabs[data-v-2c5508a7] {\n        display: flex;\n        list-style: none;\n        border-bottom-left-radius: 0 !important;\n        border-bottom-right-radius: 0 !important;\n}\n.s-code-example__tab[data-v-2c5508a7] {\n}\n.s-code-example__content[data-v-2c5508a7] {\n        overflow: hidden;\n}\n.s-code-example[toolbar-position="content"] .s-code-example__content[data-v-2c5508a7][data-v-2c5508a7] {\n          position: relative;\n}\n.s-code-example__code[data-v-2c5508a7] {\n        display: none;\n        border-top-left-radius: 0 !important;\n        border-top-right-radius: 0 !important;\n        line-height: 0;\n        overflow: hidden;\n}\n.s-code-example__code[data-v-2c5508a7][active][data-v-2c5508a7] {\n          display: block;\n}\n.s-code-example__toolbar[data-v-2c5508a7] {\n        \n        position: absolute;\n        top: var(--s93aeae3f06c, 24px); right: var(--s93aeae3f06c, 24px);\n        z-index: 10;\n}\n.s-code-example__toolbar[data-v-2c5508a7] > *[data-v-2c5508a7] {\n          font-size: 20px;\n          opacity: 0.5;\n}\n.s-code-example__toolbar[data-v-2c5508a7] > *[data-v-2c5508a7][data-v-2c5508a7]:hover {\n            opacity: 1;\n}\ns-code-example[toolbar-position="nav"] .s-code-example__toolbar[data-v-2c5508a7][data-v-2c5508a7] {\n          top: var(--s99674b3ff1e, 12px);\n          right: var(--s99674b3ff1e, 12px);\n}\n';
const _sfc_main = {
  components: {
    SClipboardCopy: __SClipboardCopyComponent
  },
  data() {
    return {
      activeTabId: void 0,
      items: [],
      component: null,
      props: null
    };
  },
  props: [...Object.keys(SHighlightJsComponentInterface.definition)],
  async mounted() {
    this.component = new __SComponentUtils("s-code-example", this.$el, this.$props, {
      interface: SHighlightJsComponentInterface,
      display: "block"
    });
    await wait();
    await whenInViewport(this.component.node);
    this.props = this.component.props;
    this.$copy = this.$refs.copy;
    this.$templates = Array.from(this.$refs.templates.querySelectorAll("textarea,template"));
    this.$templates.forEach(($template) => {
      var _a, _b, _c;
      this.items = [...this.items, {
        id: (_b = (_a = $template.getAttribute("id")) != null ? _a : this.component.getAttributeSafely($template, "language")) != null ? _b : this.component.getAttributeSafely($template, "lang"),
        lang: (_c = this.component.getAttributeSafely($template, "language")) != null ? _c : this.component.getAttributeSafely($template, "lang"),
        code: this.component.getDomPropertySafely($template, "innerHTML")
      }];
      $template.remove();
    });
    if (this.component.props.active) {
      this.setActiveTab(this.component.props.active);
    } else {
      this.setActiveTab(this.items[0].id);
    }
  },
  methods: {
    setActiveTabByTab(e) {
      this.setActiveTab(e.target.id);
    },
    async setActiveTab(id) {
      await wait();
      this.activeTabId = id;
      this.initPrismOnTab(id);
    },
    initPrismOnTab(id) {
      const $content = this.$refs.root.querySelector(`pre#${id} code`);
      if ($content.hasAttribute("inited"))
        return;
      $content.setAttribute("inited", true);
      prism.highlightElement($content);
    },
    copy() {
      const id = this.activeTabId;
      const item = this.items.filter((i) => i.id === id)[0];
      this.$copy.copy(item.code);
    }
  }
};
const _withId = /* @__PURE__ */ withScopeId("data-v-2c5508a7");
pushScopeId("data-v-2c5508a7");
const _hoisted_1 = {ref: "templates"};
const _hoisted_2 = /* @__PURE__ */ createTextVNode("                ");
const _hoisted_3 = /* @__PURE__ */ createTextVNode("\n            ");
popScopeId();
const _sfc_render = /* @__PURE__ */ _withId((_ctx, _cache, $props, $setup, $data, $options) => {
  var _a, _b, _c, _d;
  const _component_s_clipboard_copy = resolveComponent("s-clipboard-copy");
  return openBlock(), createBlock("div", {
    class: (_a = $data.component) == null ? void 0 : _a.className(),
    "toolbar-position": (_b = $data.component) == null ? void 0 : _b.props.toolbarPosition,
    ref: "root"
  }, [
    createVNode("div", _hoisted_1, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 512),
    $data.component ? (openBlock(), createBlock("header", {
      key: 0,
      ref: "header",
      class: $data.component.className("__nav")
    }, [
      createVNode("ol", {
        class: $data.component.className("__tabs", $data.component.props.defaultStyleClasses.main)
      }, [
        (openBlock(true), createBlock(Fragment, null, renderList((_c = $data.items) != null ? _c : [], (item, idx) => {
          return openBlock(), createBlock("li", {
            class: $data.component.className("__tab"),
            id: item.id,
            active: $data.activeTabId === item.id ? true : null,
            onClick: _cache[1] || (_cache[1] = (...args) => $options.setActiveTabByTab && $options.setActiveTabByTab(...args))
          }, toDisplayString(item.lang), 11, ["id", "active"]);
        }), 256))
      ], 2)
    ], 2)) : createCommentVNode("v-if", true),
    $data.component ? (openBlock(), createBlock("div", {
      key: 1,
      class: $data.component.className("__content")
    }, [
      createVNode("div", {
        class: $data.component.className("__toolbar")
      }, [
        createVNode(_component_s_clipboard_copy, {
          ref: "copy",
          onClick: $options.copy
        }, null, 8, ["onClick"])
      ], 2),
      (openBlock(true), createBlock(Fragment, null, renderList((_d = $data.items) != null ? _d : [], (item, idx) => {
        var _a2, _b2;
        return openBlock(), createBlock("pre", {
          class: $data.component.className("__code"),
          id: (_a2 = item.id) != null ? _a2 : item.lang,
          active: $data.activeTabId === ((_b2 = item.id) != null ? _b2 : item.lang) ? true : null
        }, [
          _hoisted_2,
          createVNode("code", {
            class: `language-${item.lang}`
          }, toDisplayString(item.code), 3),
          _hoisted_3
        ], 10, ["id", "active"]);
      }), 256))
    ], 2)) : createCommentVNode("v-if", true)
  ], 10, ["toolbar-position"]);
});
_sfc_main.render = _sfc_render;
_sfc_main.__scopeId = "data-v-2c5508a7";
if (!window.env)
  window.env = {SUGAR: {}};
window.env.SUGAR = JSON.parse('{"ENVIRONMENT":"development"}');
function webcomponent(tagName = "s-code-example") {
  const webComponent = wrapper(_sfc_main, createApp, h);
  window.customElements.define(tagName, webComponent);
}
export default _sfc_main;
export {webcomponent};

                var $style = document.querySelector('style#SCodeExample_vue_vue_type_style_index_0_scoped_true_lang');
                if (!$style) {
                  $style = document.createElement('style');
                  $style.setAttribute('id', 'SCodeExample_vue_vue_type_style_index_0_scoped_true_lang');
                  $style.type = 'text/css';
                  $style.appendChild(document.createTextNode(SCodeExample_vue_vue_type_style_index_0_scoped_true_lang));
                  document.head.appendChild($style);
                }
              