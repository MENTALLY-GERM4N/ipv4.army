import { _jsxQ, createContextId, useContext, componentQrl, inlinedQrl, useStore, useLexicalScope, useVisibleTaskQrl, useTaskQrl, useContextProvider, _jsxC, Fragment, Slot } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
const getTheme = (key, fallback) => {
  if (isServer)
    return void 0;
  let theme;
  try {
    theme = localStorage.getItem(key) || void 0;
  } catch (e) {
  }
  return theme || fallback;
};
const getSystemTheme = (mq) => {
  const currMq = mq || window.matchMedia("(prefers-color-scheme: dark)");
  const isDark = currMq.matches;
  const systemTheme = isDark ? "dark" : "light";
  return systemTheme;
};
const disableAnimation = () => {
  const css = document.createElement("style");
  css.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}"));
  document.head.appendChild(css);
  return () => {
    (() => window.getComputedStyle(document.body))();
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
};
const colorSchemes = [
  "light",
  "dark"
];
const ThemeScript = ({ forcedTheme, storageKey, attribute, enableSystem, enableColorScheme, defaultTheme, value, attrs, nonce }) => {
  const defaultSystem = defaultTheme === "system";
  const optimization = (() => {
    if (attribute === "class") {
      const removeClasses = `c.remove(${attrs.map((t) => `'${t}'`).join(",")})`;
      return `var d=document.body,c=d.classList;${removeClasses};`;
    }
    return `var d=document.body,n='${attribute}',s='setAttribute';`;
  })();
  const fallbackColorScheme = (() => {
    if (!enableColorScheme)
      return "";
    const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null;
    if (fallback)
      return `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${defaultTheme}'`;
    return `if(e==='light'||e==='dark')d.style.colorScheme=e`;
  })();
  const updateDOM = (name, literal = false, setColorScheme = true) => {
    const resolvedName = value ? value[name] : name;
    const val = literal ? `${name} || ''` : `'${resolvedName}'`;
    let text = "";
    if (enableColorScheme && setColorScheme && !literal && colorSchemes.includes(name))
      text += `d.style.colorScheme = '${name}';`;
    if (attribute === "class") {
      if (literal || resolvedName)
        text += `(${val}).split(' ').forEach(v => c.add(v))`;
      else
        text += "null";
    } else if (resolvedName)
      text += `d[s](n,${val})`;
    return text;
  };
  const scriptSrc = (() => {
    if (forcedTheme)
      return `!function(){${optimization}${updateDOM(forcedTheme)}}()`;
    if (enableSystem)
      return `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if('system'===e||(!e&&${defaultSystem})){var t='(prefers-color-scheme: dark)',m=window.matchMedia(t);if(m.media!==t||m.matches){${updateDOM("dark")}}else{${updateDOM("light")}}}else if(e){${value ? `var x=${JSON.stringify(value)};` : ""}${updateDOM(value ? "x[e]" : "e", true)}}${!defaultSystem ? `else{${updateDOM(defaultTheme, false, false)}}` : ""}${fallbackColorScheme}}catch(e){}}()`;
    return `!function(){
			console.log(localStorage.getItem('${storageKey}'))
			try{${optimization}var e=localStorage.getItem('${storageKey}');if(e){${value ? `var x=${JSON.stringify(value)};` : ""}${updateDOM(value ? "x[e]" : "e", true)}}else{${updateDOM(defaultTheme, false, false)};}${fallbackColorScheme}}catch(t){}}();`;
  })();
  return /* @__PURE__ */ _jsxQ("script", {
    dangerouslySetInnerHTML: scriptSrc,
    nonce
  }, null, null, 3, "vw_0");
};
const ThemeContext = createContextId("theme-context");
const useTheme = () => useContext(ThemeContext);
const defaultThemes = [
  "light",
  "dark"
];
const ThemeProvider = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(({ forcedTheme, disableTransitionOnChange = false, enableSystem = true, enableColorScheme = true, storageKey = "theme", themes = defaultThemes, defaultTheme = enableSystem ? "system" : "light", attribute = "data-theme", value, nonce }) => {
  const attrs = !value ? themes.flat() : Object.values(value);
  const applyTheme = /* @__PURE__ */ inlinedQrl((theme) => {
    const [attribute2, attrs2, disableTransitionOnChange2, enableSystem2, value2] = useLexicalScope();
    let resolved = theme;
    if (!resolved)
      return;
    if (theme === "system" && enableSystem2)
      resolved = getSystemTheme();
    const computedResolved = Array.isArray(resolved) ? resolved.join(attribute2 === "class" ? " " : "-") : resolved;
    const name = value2 ? value2[computedResolved] : computedResolved;
    disableTransitionOnChange2 && disableAnimation();
    const d = document.body;
    if (attribute2 === "class") {
      d.classList.remove(...attrs2);
      if (name)
        d.classList.add(...name.split(" "));
    } else if (name)
      d.setAttribute(attribute2, name);
    else
      d.removeAttribute(attribute2);
  }, "ThemeProvider_component_applyTheme_EPdB7Q0b7P0", [
    attribute,
    attrs,
    disableTransitionOnChange,
    enableSystem,
    value
  ]);
  const resolvedThemeStore = useStore({
    value: getTheme(storageKey),
    setResolvedTheme: /* @__PURE__ */ inlinedQrl(function(theme) {
      this.value = theme;
    }, "ThemeProvider_component_resolvedThemeStore_useStore_vZSiuGH92Pg")
  });
  const themeStore = useStore({
    theme: getTheme(storageKey, defaultTheme),
    setTheme: /* @__PURE__ */ inlinedQrl(function(theme) {
      const [storageKey2] = useLexicalScope();
      this.theme = theme;
      try {
        localStorage.setItem(storageKey2, Array.isArray(theme) ? theme.join(" ") : theme);
      } catch (e) {
      }
    }, "ThemeProvider_component_themeStore_useStore_Fu8bHerbWbA", [
      storageKey
    ]),
    forcedTheme,
    themes: enableSystem ? Array.isArray(themes[0]) ? [
      ...themes,
      [
        "system"
      ]
    ] : [
      ...themes,
      "system"
    ] : themes,
    systemTheme: enableSystem ? resolvedThemeStore.value : void 0
  });
  useVisibleTaskQrl(/* @__PURE__ */ inlinedQrl(({ cleanup }) => {
    const [applyTheme2, defaultTheme2, enableSystem2, forcedTheme2, resolvedThemeStore2, storageKey2, themeStore2] = useLexicalScope();
    themeStore2.setTheme(getTheme(storageKey2, defaultTheme2));
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaQuery = (e) => {
      const resolved = getSystemTheme(e);
      resolvedThemeStore2.setResolvedTheme(resolved);
      if (themeStore2.theme === "system" && enableSystem2 && !forcedTheme2)
        applyTheme2("system");
    };
    media.addEventListener("change", handleMediaQuery);
    handleMediaQuery(media);
    cleanup(() => media.removeEventListener("change", handleMediaQuery));
  }, "ThemeProvider_component_useVisibleTask_ieJJAAWUpNo", [
    applyTheme,
    defaultTheme,
    enableSystem,
    forcedTheme,
    resolvedThemeStore,
    storageKey,
    themeStore
  ]));
  useVisibleTaskQrl(/* @__PURE__ */ inlinedQrl(({ cleanup }) => {
    const [defaultTheme2, storageKey2, themeStore2] = useLexicalScope();
    const handleStorage = (e) => {
      if (e.key !== storageKey2)
        return;
      const theme = e.newValue || defaultTheme2;
      themeStore2.setTheme(theme);
    };
    window.addEventListener("storage", handleStorage);
    cleanup(() => window.removeEventListener("storage", handleStorage));
  }, "ThemeProvider_component_useVisibleTask_1_6fHr9PMFdz4", [
    defaultTheme,
    storageKey,
    themeStore
  ]));
  useTaskQrl(/* @__PURE__ */ inlinedQrl(({ track }) => {
    const [applyTheme2, forcedTheme2, resolvedThemeStore2, themeStore2] = useLexicalScope();
    track(() => themeStore2.theme || forcedTheme2);
    if (themeStore2.theme !== "system")
      resolvedThemeStore2.setResolvedTheme(themeStore2.theme);
    applyTheme2(forcedTheme2 ?? themeStore2.theme);
  }, "ThemeProvider_component_useTask_msBs9hPn0zc", [
    applyTheme,
    forcedTheme,
    resolvedThemeStore,
    themeStore
  ]));
  useContextProvider(ThemeContext, themeStore);
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: [
      /* @__PURE__ */ _jsxC(ThemeScript, {
        forcedTheme,
        disableTransitionOnChange,
        enableSystem,
        enableColorScheme,
        storageKey,
        themes,
        defaultTheme,
        attribute,
        value,
        attrs,
        nonce
      }, 0, "aZ_0"),
      /* @__PURE__ */ _jsxC(Slot, null, 3, "aZ_1")
    ]
  }, 1, "aZ_2");
}, "ThemeProvider_component_3lWll408wGQ"));
export {
  ThemeProvider,
  useTheme
};
