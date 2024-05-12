import { j as jsx, e as _renderSSR, f as _pauseFromContexts, F as Fragment, s as setPlatform, c as componentQrl, i as inlinedQrl, d as _jsxQ, g as _wrapSignal, h as _jsxBranch, u as useServerData, k as useContext, b as _jsxC, l as SkipRender, m as useStylesQrl, n as useStore, o as _weakSerialize, p as useSignal, q as useContextProvider, r as useTaskQrl, S as Slot, t as getPlatform, w as noSerialize, x as createContextId, y as useLexicalScope, z as getLocale, A as withLocale, B as _fnSignal, C as _jsxS } from "./q-C5aHNK9h.js";
/**
 * @license
 * @builder.io/qwik/server 1.5.4
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var SYNC_QRL = "<sync>";
function createPlatform(opts, resolvedManifest) {
  const mapper = resolvedManifest == null ? void 0 : resolvedManifest.mapper;
  const mapperFn = opts.symbolMapper ? opts.symbolMapper : (symbolName) => {
    var _a;
    if (mapper) {
      const hash = getSymbolHash(symbolName);
      const result = mapper[hash];
      if (!result) {
        if (hash === SYNC_QRL) {
          return [hash, ""];
        }
        const isRegistered = (_a = globalThis.__qwik_reg_symbols) == null ? void 0 : _a.has(hash);
        if (isRegistered) {
          return [symbolName, "_"];
        }
        console.error("Cannot resolve symbol", symbolName, "in", mapper);
      }
      return result;
    }
  };
  const serverPlatform = {
    isServer: true,
    async importSymbol(_containerEl, url, symbolName) {
      var _a;
      const hash = getSymbolHash(symbolName);
      const regSym = (_a = globalThis.__qwik_reg_symbols) == null ? void 0 : _a.get(hash);
      if (regSym) {
        return regSym;
      }
      let modulePath = String(url);
      if (!modulePath.endsWith(".js")) {
        modulePath += ".js";
      }
      const module = __require(modulePath);
      if (!(symbolName in module)) {
        throw new Error(`Q-ERROR: missing symbol '${symbolName}' in module '${modulePath}'.`);
      }
      return module[symbolName];
    },
    raf: () => {
      console.error("server can not rerender");
      return Promise.resolve();
    },
    nextTick: (fn) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fn());
        });
      });
    },
    chunkForSymbol(symbolName) {
      return mapperFn(symbolName, mapper);
    }
  };
  return serverPlatform;
}
async function setServerPlatform(opts, manifest2) {
  const platform = createPlatform(opts, manifest2);
  setPlatform(platform);
}
var getSymbolHash = (symbolName) => {
  const index = symbolName.lastIndexOf("_");
  if (index > -1) {
    return symbolName.slice(index + 1);
  }
  return symbolName;
};
function createTimer() {
  if (typeof performance === "undefined") {
    return () => 0;
  }
  const start = performance.now();
  return () => {
    const end = performance.now();
    const delta = end - start;
    return delta / 1e6;
  };
}
function getBuildBase(opts) {
  let base = opts.base;
  if (typeof opts.base === "function") {
    base = opts.base(opts);
  }
  if (typeof base === "string") {
    if (!base.endsWith("/")) {
      base += "/";
    }
    return base;
  }
  return "/build/";
}
var QWIK_LOADER_DEFAULT_MINIFIED = '((e,t)=>{const n="__q_context__",o=window,s=new Set,a="replace",i="forEach",r="target",c="getAttribute",l="isConnected",p="qvisible",f="_qwikjson_",u=t=>e.querySelectorAll(t),b=e=>e&&"function"==typeof e.then,d=(e,t,n=t.type)=>{u("[on"+e+"\\\\:"+n+"]")[i]((o=>m(o,e,t,n)))},w=t=>{if(void 0===t[f]){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===n[c]("type")){t[f]=JSON.parse(n.textContent[a](/\\\\x3C(\\/?script)/gi,"<$1"));break}n=n.previousElementSibling}}},y=(e,t)=>new CustomEvent(e,{detail:t}),m=async(t,o,s,i=s.type)=>{const r="on"+o+":"+i;t.hasAttribute("preventdefault:"+i)&&s.preventDefault();const p=t._qc_,f=p&&p.li.filter((e=>e[0]===r));if(f&&f.length>0){for(const e of f){const n=e[1].getFn([t,s],(()=>t[l]))(s,t),o=s.cancelBubble;b(n)&&await n,o&&s.stopPropagation()}return}const u=t[c](r);if(u){const o=t.closest("[q\\\\:container]"),i=new URL(o[c]("q:base"),e.baseURI);for(const r of u.split("\\n")){const c=new URL(r,i),p=c.hash[a](/^#?([^?[|]*).*$/,"$1")||"default",f=performance.now();let u;const d=r.startsWith("#");if(d)u=(o.qFuncs||[])[Number.parseInt(p)];else{const e=import(c.href.split("#")[0]);w(o),u=(await e)[p]}const y=e[n];if(t[l])try{e[n]=[t,s,c],d||q("qsymbol",{symbol:p,element:t,reqTime:f});const o=u(s,t);b(o)&&await o}finally{e[n]=y}}}},q=(t,n)=>{e.dispatchEvent(y(t,n))},v=e=>e[a](/([A-Z])/g,(e=>"-"+e.toLowerCase())),h=async e=>{let t=v(e.type),n=e[r];for(d("-document",e,t);n&&n[c];){const o=m(n,"",e,t);let s=e.cancelBubble;b(o)&&await o,s=s||e.cancelBubble||n.hasAttribute("stoppropagation:"+e.type),n=e.bubbles&&!0!==s?n.parentElement:null}},g=e=>{d("-window",e,v(e.type))},_=()=>{var n;const a=e.readyState;if(!t&&("interactive"==a||"complete"==a)&&(t=1,q("qinit"),(null!=(n=o.requestIdleCallback)?n:o.setTimeout).bind(o)((()=>q("qidle"))),s.has(p))){const e=u("[on\\\\:"+p+"]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n[r]),m(n[r],"",y(p,n)))}));e[i]((e=>t.observe(e)))}},C=(e,t,n,o=!1)=>e.addEventListener(t,n,{capture:o,passive:!1}),E=t=>{for(const n of t)s.has(n)||(C(e,n,h,!0),C(o,n,g,!0),s.add(n))};if(!(n in e)){e[n]=0;const t=o.qwikevents;Array.isArray(t)&&E(t),o.qwikevents={push:(...e)=>E(e)},C(e,"readystatechange",_),_()}})(document)';
var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n    ((doc, hasInitialized) => {\n        const Q_CONTEXT = "__q_context__";\n        const win = window;\n        const events =  new Set;\n        const querySelectorAll = query => doc.querySelectorAll(query);\n        const isPromise = promise => promise && "function" == typeof promise.then;\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((el => dispatch(el, infix, ev, type)));\n        };\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === script.getAttribute("type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/gi, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = "on" + onPrefix + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const relevantListeners = ctx && ctx.li.filter((li => li[0] === attrName));\n            if (relevantListeners && relevantListeners.length > 0) {\n                for (const listener of relevantListeners) {\n                    const results = listener[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                    const cancelBubble = ev.cancelBubble;\n                    isPromise(results) && await results;\n                    cancelBubble && ev.stopPropagation();\n                }\n                return;\n            }\n            const attrValue = element.getAttribute(attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]");\n                const base = new URL(container.getAttribute("q:base"), doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const symbolName = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    let handler;\n                    const isSync = qrl.startsWith("#");\n                    if (isSync) {\n                        handler = (container.qFuncs || [])[Number.parseInt(symbolName)];\n                    } else {\n                        const module = import(\n                                                url.href.split("#")[0]);\n                        resolveContainer(container);\n                        handler = (await module)[symbolName];\n                    }\n                    const previousCtx = doc[Q_CONTEXT];\n                    if (element.isConnected) {\n                        try {\n                            doc[Q_CONTEXT] = [ element, ev, url ];\n                            isSync || emitEvent("qsymbol", {\n                                symbol: symbolName,\n                                element: element,\n                                reqTime: reqTime\n                            });\n                            const results = handler(ev, element);\n                            isPromise(results) && await results;\n                        } finally {\n                            doc[Q_CONTEXT] = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                const results = dispatch(element, "", ev, type);\n                let cancelBubble = ev.cancelBubble;\n                isPromise(results) && await results;\n                cancelBubble = cancelBubble || ev.cancelBubble || element.hasAttribute("stoppropagation:" + ev.type);\n                element = ev.bubbles && !0 !== cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const push = eventNames => {\n            for (const eventName of eventNames) {\n                if (!events.has(eventName)) {\n                    addEventListener(doc, eventName, processDocumentEvent, !0);\n                    addEventListener(win, eventName, processWindowEvent, !0);\n                    events.add(eventName);\n                }\n            }\n        };\n        if (!(Q_CONTEXT in doc)) {\n            doc[Q_CONTEXT] = 0;\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && push(qwikevents);\n            win.qwikevents = {\n                push: (...e) => push(e)\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})()';
function getQwikLoaderScript(opts = {}) {
  return opts.debug ? QWIK_LOADER_DEFAULT_DEBUG : QWIK_LOADER_DEFAULT_MINIFIED;
}
function getPrefetchResources(snapshotResult, opts, resolvedManifest) {
  if (!resolvedManifest) {
    return [];
  }
  const prefetchStrategy = opts.prefetchStrategy;
  const buildBase = getBuildBase(opts);
  if (prefetchStrategy !== null) {
    if (!prefetchStrategy || !prefetchStrategy.symbolsToPrefetch || prefetchStrategy.symbolsToPrefetch === "auto") {
      return getAutoPrefetch(snapshotResult, resolvedManifest, buildBase);
    }
    if (typeof prefetchStrategy.symbolsToPrefetch === "function") {
      try {
        return prefetchStrategy.symbolsToPrefetch({ manifest: resolvedManifest.manifest });
      } catch (e) {
        console.error("getPrefetchUrls, symbolsToPrefetch()", e);
      }
    }
  }
  return [];
}
function getAutoPrefetch(snapshotResult, resolvedManifest, buildBase) {
  const prefetchResources = [];
  const qrls = snapshotResult == null ? void 0 : snapshotResult.qrls;
  const { mapper, manifest: manifest2 } = resolvedManifest;
  const urls = /* @__PURE__ */ new Map();
  if (Array.isArray(qrls)) {
    for (const obj of qrls) {
      const qrlSymbolName = obj.getHash();
      const resolvedSymbol = mapper[qrlSymbolName];
      if (resolvedSymbol) {
        addBundle(manifest2, urls, prefetchResources, buildBase, resolvedSymbol[1]);
      }
    }
  }
  return prefetchResources;
}
function addBundle(manifest2, urls, prefetchResources, buildBase, bundleFileName) {
  const url = buildBase + bundleFileName;
  let prefetchResource = urls.get(url);
  if (!prefetchResource) {
    prefetchResource = {
      url,
      imports: []
    };
    urls.set(url, prefetchResource);
    const bundle = manifest2.bundles[bundleFileName];
    if (bundle) {
      if (Array.isArray(bundle.imports)) {
        for (const importedFilename of bundle.imports) {
          addBundle(manifest2, urls, prefetchResource.imports, buildBase, importedFilename);
        }
      }
    }
  }
  prefetchResources.push(prefetchResource);
}
function getValidManifest(manifest2) {
  if (manifest2 != null && manifest2.mapping != null && typeof manifest2.mapping === "object" && manifest2.symbols != null && typeof manifest2.symbols === "object" && manifest2.bundles != null && typeof manifest2.bundles === "object") {
    return manifest2;
  }
  return void 0;
}
function workerFetchScript() {
  const fetch = `Promise.all(e.data.map(u=>fetch(u))).finally(()=>{setTimeout(postMessage({}),9999)})`;
  const workerBody = `onmessage=(e)=>{${fetch}}`;
  const blob = `new Blob(['${workerBody}'],{type:"text/javascript"})`;
  const url = `URL.createObjectURL(${blob})`;
  let s = `const w=new Worker(${url});`;
  s += `w.postMessage(u.map(u=>new URL(u,origin)+''));`;
  s += `w.onmessage=()=>{w.terminate()};`;
  return s;
}
function prefetchUrlsEventScript(prefetchResources) {
  const data = {
    bundles: flattenPrefetchResources(prefetchResources).map((u) => u.split("/").pop())
  };
  return `document.dispatchEvent(new CustomEvent("qprefetch",{detail:${JSON.stringify(data)}}))`;
}
function flattenPrefetchResources(prefetchResources) {
  const urls = [];
  const addPrefetchResource = (prefetchResources2) => {
    if (Array.isArray(prefetchResources2)) {
      for (const prefetchResource of prefetchResources2) {
        if (!urls.includes(prefetchResource.url)) {
          urls.push(prefetchResource.url);
          addPrefetchResource(prefetchResource.imports);
        }
      }
    }
  };
  addPrefetchResource(prefetchResources);
  return urls;
}
function getMostReferenced(prefetchResources) {
  const common = /* @__PURE__ */ new Map();
  let total = 0;
  const addPrefetchResource = (prefetchResources2, visited2) => {
    if (Array.isArray(prefetchResources2)) {
      for (const prefetchResource of prefetchResources2) {
        const count = common.get(prefetchResource.url) || 0;
        common.set(prefetchResource.url, count + 1);
        total++;
        if (!visited2.has(prefetchResource.url)) {
          visited2.add(prefetchResource.url);
          addPrefetchResource(prefetchResource.imports, visited2);
        }
      }
    }
  };
  const visited = /* @__PURE__ */ new Set();
  for (const resource of prefetchResources) {
    visited.clear();
    addPrefetchResource(resource.imports, visited);
  }
  const threshold = total / common.size * 2;
  const urls = Array.from(common.entries());
  urls.sort((a, b) => b[1] - a[1]);
  return urls.slice(0, 5).filter((e) => e[1] > threshold).map((e) => e[0]);
}
function applyPrefetchImplementation(prefetchStrategy, prefetchResources, nonce) {
  const prefetchImpl = normalizePrefetchImplementation(prefetchStrategy == null ? void 0 : prefetchStrategy.implementation);
  const prefetchNodes = [];
  if (prefetchImpl.prefetchEvent === "always") {
    prefetchUrlsEvent(prefetchNodes, prefetchResources, nonce);
  }
  if (prefetchImpl.linkInsert === "html-append") {
    linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl);
  }
  if (prefetchImpl.linkInsert === "js-append") {
    linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl, nonce);
  } else if (prefetchImpl.workerFetchInsert === "always") {
    workerFetchImplementation(prefetchNodes, prefetchResources, nonce);
  }
  if (prefetchNodes.length > 0) {
    return jsx(Fragment, { children: prefetchNodes });
  }
  return null;
}
function prefetchUrlsEvent(prefetchNodes, prefetchResources, nonce) {
  const mostReferenced = getMostReferenced(prefetchResources);
  for (const url of mostReferenced) {
    prefetchNodes.push(
      jsx("link", {
        rel: "modulepreload",
        href: url,
        nonce
      })
    );
  }
  prefetchNodes.push(
    jsx("script", {
      "q:type": "prefetch-bundles",
      dangerouslySetInnerHTML: prefetchUrlsEventScript(prefetchResources) + `;document.dispatchEvent(new CustomEvent('qprefetch', {detail:{links: [location.pathname]}}))`,
      nonce
    })
  );
}
function linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl) {
  const urls = flattenPrefetchResources(prefetchResources);
  const rel = prefetchImpl.linkRel || "prefetch";
  for (const url of urls) {
    const attributes = {};
    attributes["href"] = url;
    attributes["rel"] = rel;
    if (rel === "prefetch" || rel === "preload") {
      if (url.endsWith(".js")) {
        attributes["as"] = "script";
      }
    }
    prefetchNodes.push(jsx("link", attributes));
  }
}
function linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl, nonce) {
  const rel = prefetchImpl.linkRel || "prefetch";
  let s = ``;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `let supportsLinkRel = true;`;
  }
  s += `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s += `u.map((u,i)=>{`;
  s += `const l=document.createElement('link');`;
  s += `l.setAttribute("href",u);`;
  s += `l.setAttribute("rel","${rel}");`;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `if(i===0){`;
    s += `try{`;
    s += `supportsLinkRel=l.relList.supports("${rel}");`;
    s += `}catch(e){}`;
    s += `}`;
  }
  s += `document.body.appendChild(l);`;
  s += `});`;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `if(!supportsLinkRel){`;
    s += workerFetchScript();
    s += `}`;
  }
  if (prefetchImpl.workerFetchInsert === "always") {
    s += workerFetchScript();
  }
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      "q:type": "link-js",
      dangerouslySetInnerHTML: s,
      nonce
    })
  );
}
function workerFetchImplementation(prefetchNodes, prefetchResources, nonce) {
  let s = `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s += workerFetchScript();
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      "q:type": "prefetch-worker",
      dangerouslySetInnerHTML: s,
      nonce
    })
  );
}
function normalizePrefetchImplementation(input) {
  return { ...PrefetchImplementationDefault, ...input };
}
var PrefetchImplementationDefault = {
  linkInsert: null,
  linkRel: null,
  workerFetchInsert: null,
  prefetchEvent: "always"
};
var DOCTYPE = "<!DOCTYPE html>";
async function renderToStream(rootNode, opts) {
  var _a, _b, _c;
  let stream = opts.stream;
  let bufferSize = 0;
  let totalSize = 0;
  let networkFlushes = 0;
  let firstFlushTime = 0;
  let buffer = "";
  let snapshotResult;
  const inOrderStreaming = ((_a = opts.streaming) == null ? void 0 : _a.inOrder) ?? {
    strategy: "auto",
    maximunInitialChunk: 5e4,
    maximunChunk: 3e4
  };
  const containerTagName = opts.containerTagName ?? "html";
  const containerAttributes = opts.containerAttributes ?? {};
  const nativeStream = stream;
  const firstFlushTimer = createTimer();
  const buildBase = getBuildBase(opts);
  const resolvedManifest = resolveManifest(opts.manifest);
  function flush() {
    if (buffer) {
      nativeStream.write(buffer);
      buffer = "";
      bufferSize = 0;
      networkFlushes++;
      if (networkFlushes === 1) {
        firstFlushTime = firstFlushTimer();
      }
    }
  }
  function enqueue(chunk) {
    const len = chunk.length;
    bufferSize += len;
    totalSize += len;
    buffer += chunk;
  }
  switch (inOrderStreaming.strategy) {
    case "disabled":
      stream = {
        write: enqueue
      };
      break;
    case "direct":
      stream = nativeStream;
      break;
    case "auto":
      let count = 0;
      let forceFlush = false;
      const minimunChunkSize = inOrderStreaming.maximunChunk ?? 0;
      const initialChunkSize = inOrderStreaming.maximunInitialChunk ?? 0;
      stream = {
        write(chunk) {
          if (chunk === "<!--qkssr-f-->") {
            forceFlush || (forceFlush = true);
          } else if (chunk === "<!--qkssr-pu-->") {
            count++;
          } else if (chunk === "<!--qkssr-po-->") {
            count--;
          } else {
            enqueue(chunk);
          }
          const chunkSize = networkFlushes === 0 ? initialChunkSize : minimunChunkSize;
          if (count === 0 && (forceFlush || bufferSize >= chunkSize)) {
            forceFlush = false;
            flush();
          }
        }
      };
      break;
  }
  if (containerTagName === "html") {
    stream.write(DOCTYPE);
  } else {
    stream.write("<!--cq-->");
    if (opts.qwikLoader) {
      if (opts.qwikLoader.include === void 0) {
        opts.qwikLoader.include = "never";
      }
      if (opts.qwikLoader.position === void 0) {
        opts.qwikLoader.position = "bottom";
      }
    } else {
      opts.qwikLoader = {
        include: "never"
      };
    }
    if (!opts.qwikPrefetchServiceWorker) {
      opts.qwikPrefetchServiceWorker = {};
    }
    if (!opts.qwikPrefetchServiceWorker.include) {
      opts.qwikPrefetchServiceWorker.include = false;
    }
    if (!opts.qwikPrefetchServiceWorker.position) {
      opts.qwikPrefetchServiceWorker.position = "top";
    }
  }
  if (!opts.manifest) {
    console.warn(
      `Missing client manifest, loading symbols in the client might 404. Please ensure the client build has run and generated the manifest for the server build.`
    );
  }
  await setServerPlatform(opts, resolvedManifest);
  const injections = resolvedManifest == null ? void 0 : resolvedManifest.manifest.injections;
  const beforeContent = injections ? injections.map((injection) => jsx(injection.tag, injection.attributes ?? {})) : [];
  const includeMode = ((_b = opts.qwikLoader) == null ? void 0 : _b.include) ?? "auto";
  const positionMode = ((_c = opts.qwikLoader) == null ? void 0 : _c.position) ?? "bottom";
  if (positionMode === "top" && includeMode !== "never") {
    const qwikLoaderScript = getQwikLoaderScript({
      debug: opts.debug
    });
    beforeContent.push(
      jsx("script", {
        id: "qwikloader",
        dangerouslySetInnerHTML: qwikLoaderScript
      })
    );
    beforeContent.push(
      jsx("script", {
        dangerouslySetInnerHTML: `window.qwikevents.push('click')`
      })
    );
  }
  const renderTimer = createTimer();
  const renderSymbols = [];
  let renderTime = 0;
  let snapshotTime = 0;
  await _renderSSR(rootNode, {
    stream,
    containerTagName,
    containerAttributes,
    serverData: opts.serverData,
    base: buildBase,
    beforeContent,
    beforeClose: async (contexts, containerState, _dynamic, textNodes) => {
      var _a2, _b2, _c2, _d, _e;
      renderTime = renderTimer();
      const snapshotTimer = createTimer();
      snapshotResult = await _pauseFromContexts(contexts, containerState, void 0, textNodes);
      const children = [];
      if (opts.prefetchStrategy !== null) {
        const prefetchResources = getPrefetchResources(snapshotResult, opts, resolvedManifest);
        if (prefetchResources.length > 0) {
          const prefetchImpl = applyPrefetchImplementation(
            opts.prefetchStrategy,
            prefetchResources,
            (_a2 = opts.serverData) == null ? void 0 : _a2.nonce
          );
          if (prefetchImpl) {
            children.push(prefetchImpl);
          }
        }
      }
      const jsonData = JSON.stringify(snapshotResult.state, void 0, void 0);
      children.push(
        jsx("script", {
          type: "qwik/json",
          dangerouslySetInnerHTML: escapeText(jsonData),
          nonce: (_b2 = opts.serverData) == null ? void 0 : _b2.nonce
        })
      );
      if (snapshotResult.funcs.length > 0) {
        children.push(
          jsx("script", {
            "q:func": "qwik/json",
            dangerouslySetInnerHTML: serializeFunctions(snapshotResult.funcs),
            nonce: (_c2 = opts.serverData) == null ? void 0 : _c2.nonce
          })
        );
      }
      const needLoader = !snapshotResult || snapshotResult.mode !== "static";
      const includeLoader = includeMode === "always" || includeMode === "auto" && needLoader;
      if (includeLoader) {
        const qwikLoaderScript = getQwikLoaderScript({
          debug: opts.debug
        });
        children.push(
          jsx("script", {
            id: "qwikloader",
            dangerouslySetInnerHTML: qwikLoaderScript,
            nonce: (_d = opts.serverData) == null ? void 0 : _d.nonce
          })
        );
      }
      const extraListeners = Array.from(containerState.$events$, (s) => JSON.stringify(s));
      if (extraListeners.length > 0) {
        const content = (includeLoader ? `window.qwikevents` : `(window.qwikevents||=[])`) + `.push(${extraListeners.join(", ")})`;
        children.push(
          jsx("script", {
            dangerouslySetInnerHTML: content,
            nonce: (_e = opts.serverData) == null ? void 0 : _e.nonce
          })
        );
      }
      collectRenderSymbols(renderSymbols, contexts);
      snapshotTime = snapshotTimer();
      return jsx(Fragment, { children });
    },
    manifestHash: (resolvedManifest == null ? void 0 : resolvedManifest.manifest.manifestHash) || "dev"
  });
  if (containerTagName !== "html") {
    stream.write("<!--/cq-->");
  }
  flush();
  const isDynamic = snapshotResult.resources.some((r) => r._cache !== Infinity);
  const result = {
    prefetchResources: void 0,
    snapshotResult,
    flushes: networkFlushes,
    manifest: resolvedManifest == null ? void 0 : resolvedManifest.manifest,
    size: totalSize,
    isStatic: !isDynamic,
    timing: {
      render: renderTime,
      snapshot: snapshotTime,
      firstFlush: firstFlushTime
    },
    _symbols: renderSymbols
  };
  return result;
}
function resolveManifest(manifest2) {
  if (!manifest2) {
    return void 0;
  }
  if ("mapper" in manifest2) {
    return manifest2;
  }
  manifest2 = getValidManifest(manifest2);
  if (manifest2) {
    const mapper = {};
    Object.entries(manifest2.mapping).forEach(([key, value]) => {
      mapper[getSymbolHash(key)] = [key, value];
    });
    return {
      mapper,
      manifest: manifest2
    };
  }
  return void 0;
}
var escapeText = (str) => {
  return str.replace(/<(\/?script)/gi, "\\x3C$1");
};
function collectRenderSymbols(renderSymbols, elements) {
  var _a;
  for (const ctx of elements) {
    const symbol = (_a = ctx.$componentQrl$) == null ? void 0 : _a.getSymbol();
    if (symbol && !renderSymbols.includes(symbol)) {
      renderSymbols.push(symbol);
    }
  }
}
var Q_FUNCS_PREFIX = 'document.currentScript.closest("[q\\\\:container]").qFuncs=';
function serializeFunctions(funcs) {
  return Q_FUNCS_PREFIX + `[${funcs.join(",\n")}]`;
}
async function setServerPlatform2(manifest2) {
  const platform = createPlatform({ manifest: manifest2 }, resolveManifest(manifest2));
  setPlatform(platform);
}
const manifest = { "manifestHash": "m2lrxb", "symbols": { "s_02wMImzEAbk": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityProvider_component_useTask", "canonicalFilename": "s_02wmimzeabk", "hash": "02wMImzEAbk", "ctxKind": "function", "ctxName": "useTask$", "captures": true, "parent": "s_TxCFOy819ag", "loc": [27214, 36399] }, "s_0vphQYqOdZI": { "origin": "components/router-head/router-head.tsx", "displayName": "RouterHead_component", "canonicalFilename": "s_0vphqyqodzi", "hash": "0vphQYqOdZI", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [243, 2190] }, "s_8gdLBszqbaM": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component", "canonicalFilename": "s_8gdlbszqbam", "hash": "8gdLBszqbaM", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [38383, 41043] }, "s_B0lqk5IDDy4": { "origin": "routes/index.tsx", "displayName": "routes_component", "canonicalFilename": "s_b0lqk5iddy4", "hash": "B0lqk5IDDy4", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [134, 274] }, "s_Nk9PlpjQm9Y": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "GetForm_component", "canonicalFilename": "s_nk9plpjqm9y", "hash": "Nk9PlpjQm9Y", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [51429, 52966] }, "s_TxCFOy819ag": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityProvider_component", "canonicalFilename": "s_txcfoy819ag", "hash": "TxCFOy819ag", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [23777, 36686] }, "s_VKFlAWJuVm8": { "origin": "routes/layout.tsx", "displayName": "layout_component", "canonicalFilename": "s_vkflawjuvm8", "hash": "VKFlAWJuVm8", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [582, 610] }, "s_WmYC5H00wtI": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityMockProvider_component", "canonicalFilename": "s_wmyc5h00wti", "hash": "WmYC5H00wtI", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [36970, 38264] }, "s_e0ssiDXoeAM": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "RouterOutlet_component", "canonicalFilename": "s_e0ssidxoeam", "hash": "e0ssiDXoeAM", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [7828, 8542] }, "s_tntnak2DhJ8": { "origin": "root.tsx", "displayName": "root_component", "canonicalFilename": "s_tntnak2dhj8", "hash": "tntnak2DhJ8", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [268, 793] }, "s_RPDJAz33WLA": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityProvider_component_useStyles", "canonicalFilename": "s_rpdjaz33wla", "hash": "RPDJAz33WLA", "ctxKind": "function", "ctxName": "useStyles$", "captures": false, "parent": "s_TxCFOy819ag", "loc": [23832, 23866] }, "s_A5bZC7WO00A": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "routeActionQrl_action_submit", "canonicalFilename": "s_a5bzc7wo00a", "hash": "A5bZC7WO00A", "ctxKind": "function", "ctxName": "submit", "captures": true, "parent": null, "loc": [42089, 43723] }, "s_DyVc0YBIqQU": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "spa_init", "canonicalFilename": "s_dyvc0ybiqqu", "hash": "DyVc0YBIqQU", "ctxKind": "function", "ctxName": "spaInit", "captures": false, "parent": null, "loc": [1366, 6841] }, "s_wOIPfiQ04l4": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "serverQrl_stuff", "canonicalFilename": "s_woipfiq04l4", "hash": "wOIPfiQ04l4", "ctxKind": "function", "ctxName": "stuff", "captures": true, "parent": null, "loc": [47029, 49225] }, "s_BUbtvTyvVRE": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityMockProvider_component_goto", "canonicalFilename": "s_bubtvtyvvre", "hash": "BUbtvTyvVRE", "ctxKind": "function", "ctxName": "goto", "captures": false, "parent": "s_WmYC5H00wtI", "loc": [37385, 37463] }, "s_Osdg8FnYTw4": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_handlePrefetch", "canonicalFilename": "s_osdg8fnytw4", "hash": "Osdg8FnYTw4", "ctxKind": "function", "ctxName": "handlePrefetch", "captures": false, "parent": "s_8gdLBszqbaM", "loc": [39083, 39414] }, "s_fX0bDjeJa0E": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityProvider_component_goto", "canonicalFilename": "s_fx0bdjeja0e", "hash": "fX0bDjeJa0E", "ctxKind": "function", "ctxName": "goto", "captures": true, "parent": "s_TxCFOy819ag", "loc": [25175, 26602] }, "s_p9MSze0ojs4": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "GetForm_component_form_onSubmit", "canonicalFilename": "s_p9msze0ojs4", "hash": "p9MSze0ojs4", "ctxKind": "function", "ctxName": "_jsxS", "captures": true, "parent": "s_Nk9PlpjQm9Y", "loc": [51917, 52614] }, "s_pIf0khHUxfY": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_handleClick", "canonicalFilename": "s_pif0khhuxfy", "hash": "pIf0khHUxfY", "ctxKind": "function", "ctxName": "handleClick", "captures": true, "parent": "s_8gdLBszqbaM", "loc": [39841, 40361] } }, "mapping": { "s_02wMImzEAbk": "q-DBxlTu8s.js", "s_0vphQYqOdZI": "q-BnZJyKb0.js", "s_8gdLBszqbaM": "q-ISv5xoGQ.js", "s_B0lqk5IDDy4": "q-B515ON7r.js", "s_Nk9PlpjQm9Y": "q-DFDMq149.js", "s_TxCFOy819ag": "q-DBxlTu8s.js", "s_VKFlAWJuVm8": "q-CeQXlYfU.js", "s_WmYC5H00wtI": "q-BpbNyL75.js", "s_e0ssiDXoeAM": "q-C7FeHMco.js", "s_tntnak2DhJ8": "q-CVC9sZUL.js", "s_RPDJAz33WLA": "q-DBxlTu8s.js", "s_A5bZC7WO00A": "q-Dh-ORAqq.js", "s_DyVc0YBIqQU": "q-D3WBTSLL.js", "s_wOIPfiQ04l4": "q-BFII2VcP.js", "s_BUbtvTyvVRE": "q-BpbNyL75.js", "s_Osdg8FnYTw4": "q-ISv5xoGQ.js", "s_fX0bDjeJa0E": "q-DBxlTu8s.js", "s_p9MSze0ojs4": "q-DFDMq149.js", "s_pIf0khHUxfY": "q-ISv5xoGQ.js" }, "bundles": { "q-B515ON7r.js": { "size": 241, "imports": ["q-CE6eVvCa.js"], "origins": ["src/entry_routes.js", "src/s_b0lqk5iddy4.js"], "symbols": ["s_B0lqk5IDDy4"] }, "q-BFII2VcP.js": { "size": 914, "imports": ["q-CE6eVvCa.js", "q-sC_EQEhx.js", "q-uemlvruI.js"], "origins": ["src/entry_serverQrl.js", "src/s_woipfiq04l4.js"], "symbols": ["s_wOIPfiQ04l4"] }, "q-BnZJyKb0.js": { "size": 1941, "imports": ["q-CE6eVvCa.js", "q-sC_EQEhx.js", "q-uemlvruI.js"], "origins": ["src/entry_RouterHead.js", "src/s_0vphqyqodzi.js"], "symbols": ["s_0vphQYqOdZI"] }, "q-BpbNyL75.js": { "size": 845, "imports": ["q-CE6eVvCa.js", "q-sC_EQEhx.js", "q-uemlvruI.js"], "origins": ["src/entry_QwikCityMockProvider.js", "src/s_bubtvtyvvre.js", "src/s_wmyc5h00wti.js"], "symbols": ["s_BUbtvTyvVRE", "s_WmYC5H00wtI"] }, "q-Bq36Wx9q.js": { "size": 2539, "origins": ["node_modules/@builder.io/qwik-city/service-worker.mjs", "src/routes/service-worker.ts"] }, "q-C7FeHMco.js": { "size": 491, "imports": ["q-CE6eVvCa.js", "q-sC_EQEhx.js", "q-uemlvruI.js"], "origins": ["src/entry_RouterOutlet.js", "src/s_e0ssidxoeam.js"], "symbols": ["s_e0ssiDXoeAM"] }, "q-CE6eVvCa.js": { "size": 63450, "origins": ["@builder.io/qwik/build", "node_modules/@builder.io/qwik/core.prod.mjs"] }, "q-CEKgxynt.js": { "size": 171, "imports": ["q-CE6eVvCa.js", "q-uemlvruI.js"], "dynamicImports": ["q-CVC9sZUL.js"], "origins": ["src/global.css", "src/root.tsx"] }, "q-CeQXlYfU.js": { "size": 102, "imports": ["q-CE6eVvCa.js"], "origins": ["src/entry_layout.js", "src/s_vkflawjuvm8.js"], "symbols": ["s_VKFlAWJuVm8"] }, "q-CVC9sZUL.js": { "size": 507, "imports": ["q-CE6eVvCa.js", "q-sC_EQEhx.js", "q-uemlvruI.js"], "dynamicImports": ["q-BnZJyKb0.js"], "origins": ["src/components/router-head/router-head.tsx", "src/entry_root.js", "src/s_tntnak2dhj8.js"], "symbols": ["s_tntnak2DhJ8"] }, "q-D3WBTSLL.js": { "size": 2280, "origins": ["src/entry_spaInit.js", "src/s_dyvc0ybiqqu.js"], "symbols": ["s_DyVc0YBIqQU"] }, "q-DaOq052w.js": { "size": 269, "imports": ["q-CE6eVvCa.js", "q-uemlvruI.js"], "dynamicImports": ["q-B515ON7r.js"], "origins": ["src/routes/index.tsx"] }, "q-DBxlTu8s.js": { "size": 5680, "imports": ["q-CE6eVvCa.js", "q-sC_EQEhx.js", "q-uemlvruI.js"], "dynamicImports": ["q-DaOq052w.js", "q-DWlU1J-M.js", "q-jMD-pBAc.js"], "origins": ["@qwik-city-plan", "src/entry_QwikCityProvider.js", "src/s_02wmimzeabk.js", "src/s_fx0bdjeja0e.js", "src/s_rpdjaz33wla.js", "src/s_txcfoy819ag.js"], "symbols": ["s_02wMImzEAbk", "s_fX0bDjeJa0E", "s_RPDJAz33WLA", "s_TxCFOy819ag"] }, "q-DFDMq149.js": { "size": 1191, "imports": ["q-CE6eVvCa.js", "q-sC_EQEhx.js", "q-uemlvruI.js"], "origins": ["src/entry_GetForm.js", "src/s_nk9plpjqm9y.js", "src/s_p9msze0ojs4.js"], "symbols": ["s_Nk9PlpjQm9Y", "s_p9MSze0ojs4"] }, "q-Dh-ORAqq.js": { "size": 751, "imports": ["q-CE6eVvCa.js"], "origins": ["src/entry_routeActionQrl.js", "src/s_a5bzc7wo00a.js"], "symbols": ["s_A5bZC7WO00A"] }, "q-DWlU1J-M.js": { "size": 274, "imports": ["q-CE6eVvCa.js", "q-uemlvruI.js"], "dynamicImports": ["q-CeQXlYfU.js"], "origins": ["src/routes/layout.tsx"] }, "q-ISv5xoGQ.js": { "size": 1519, "imports": ["q-CE6eVvCa.js", "q-sC_EQEhx.js", "q-uemlvruI.js"], "origins": ["src/entry_Link.js", "src/s_8gdlbszqbam.js", "src/s_osdg8fnytw4.js", "src/s_pif0khhuxfy.js"], "symbols": ["s_8gdLBszqbaM", "s_Osdg8FnYTw4", "s_pIf0khHUxfY"] }, "q-jMD-pBAc.js": { "size": 125, "imports": ["q-uemlvruI.js"], "dynamicImports": ["q-Bq36Wx9q.js"], "origins": ["@qwik-city-entries"] }, "q-sC_EQEhx.js": { "size": 7834, "imports": ["q-CE6eVvCa.js", "q-uemlvruI.js"], "dynamicImports": ["q-C7FeHMco.js", "q-D3WBTSLL.js", "q-DBxlTu8s.js"], "origins": ["@qwik-city-sw-register", "node_modules/@builder.io/qwik-city/index.qwik.mjs"] }, "q-uemlvruI.js": { "size": 1077 } }, "injections": [{ "tag": "style", "location": "head", "attributes": { "data-src": "/build/q-BnQkWCdx.css", "dangerouslySetInnerHTML": "html,body{color-scheme:dark;background-color:#000;color:#dedede;margin:0;width:100%;height:100%;align-content:center;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-align:center;font-family:system-ui}\n" } }], "version": "1", "options": { "target": "client", "buildMode": "production", "entryStrategy": { "type": "smart" } }, "platform": { "qwik": "1.5.4", "vite": "", "rollup": "4.17.2", "env": "node", "os": "linux", "node": "21.7.3" } };
const swRegister = '((i,r,a,o)=>{a=e=>{const t=document.querySelector("[q\\\\:base]");t&&r.active&&r.active.postMessage({type:"qprefetch",base:t.getAttribute("q:base"),...e})},document.addEventListener("qprefetch",e=>{const t=e.detail;r?a(t):i.push(t)}),"serviceWorker"in navigator?navigator.serviceWorker.register("/service-worker.js").then(e=>{o=()=>{r=e,i.forEach(a),a({bundles:i})},e.installing?e.installing.addEventListener("statechange",t=>{t.target.state=="activated"&&o()}):e.active&&o()}).catch(e=>console.error(e)):console.log("Service worker not supported in this browser.")})([])';
const RouteStateContext = /* @__PURE__ */ createContextId("qc-s");
const ContentContext = /* @__PURE__ */ createContextId("qc-c");
const ContentInternalContext = /* @__PURE__ */ createContextId("qc-ic");
const DocumentHeadContext = /* @__PURE__ */ createContextId("qc-h");
const RouteLocationContext = /* @__PURE__ */ createContextId("qc-l");
const RouteNavigateContext = /* @__PURE__ */ createContextId("qc-n");
const RouteActionContext = /* @__PURE__ */ createContextId("qc-a");
const RouteInternalContext = /* @__PURE__ */ createContextId("qc-ir");
const s_DyVc0YBIqQU = (currentScript) => {
  const win = window;
  const currentPath = location.pathname + location.search;
  const spa = "_qCitySPA";
  const historyPatch = "_qCityHistoryPatch";
  const bootstrap = "_qCityBootstrap";
  const initPopstate = "_qCityInitPopstate";
  const initAnchors = "_qCityInitAnchors";
  const initVisibility = "_qCityInitVisibility";
  const initScroll = "_qCityInitScroll";
  const scrollEnabled = "_qCityScrollEnabled";
  const debounceTimeout = "_qCityScrollDebounce";
  const scrollHistory = "_qCityScroll";
  const checkAndScroll = (scrollState) => {
    if (scrollState)
      win.scrollTo(scrollState.x, scrollState.y);
  };
  const currentScrollState2 = () => {
    const elm = document.documentElement;
    return {
      x: elm.scrollLeft,
      y: elm.scrollTop,
      w: Math.max(elm.scrollWidth, elm.clientWidth),
      h: Math.max(elm.scrollHeight, elm.clientHeight)
    };
  };
  const saveScrollState = (scrollState) => {
    const state = history.state || {};
    state[scrollHistory] = scrollState || currentScrollState2();
    history.replaceState(state, "");
  };
  if (!win[spa] && !win[initPopstate] && !win[initAnchors] && !win[initVisibility] && !win[initScroll]) {
    saveScrollState();
    win[initPopstate] = () => {
      var _a;
      if (win[spa])
        return;
      win[scrollEnabled] = false;
      clearTimeout(win[debounceTimeout]);
      if (currentPath !== location.pathname + location.search) {
        const container = currentScript.closest("[q\\:container]");
        const link = container.querySelector("a[q\\:link]");
        if (link) {
          const container2 = link.closest("[q\\:container]");
          const bootstrapLink = link.cloneNode();
          bootstrapLink.setAttribute("q:nbs", "");
          bootstrapLink.style.display = "none";
          container2.appendChild(bootstrapLink);
          win[bootstrap] = bootstrapLink;
          bootstrapLink.click();
        } else
          location.reload();
      } else if (history.scrollRestoration === "manual") {
        const scrollState = (_a = history.state) == null ? void 0 : _a[scrollHistory];
        checkAndScroll(scrollState);
        win[scrollEnabled] = true;
      }
    };
    if (!win[historyPatch]) {
      win[historyPatch] = true;
      const pushState = history.pushState;
      const replaceState = history.replaceState;
      const prepareState = (state) => {
        if (state === null || typeof state === "undefined")
          state = {};
        else if ((state == null ? void 0 : state.constructor) !== Object)
          state = {
            _data: state
          };
        state._qCityScroll = state._qCityScroll || currentScrollState2();
        return state;
      };
      history.pushState = (state, title, url) => {
        state = prepareState(state);
        return pushState.call(history, state, title, url);
      };
      history.replaceState = (state, title, url) => {
        state = prepareState(state);
        return replaceState.call(history, state, title, url);
      };
    }
    win[initAnchors] = (event) => {
      if (win[spa] || event.defaultPrevented)
        return;
      const target = event.target.closest("a[href]");
      if (target && !target.hasAttribute("preventdefault:click")) {
        const href = target.getAttribute("href");
        const prev = new URL(location.href);
        const dest = new URL(href, prev);
        const sameOrigin = dest.origin === prev.origin;
        const samePath = dest.pathname + dest.search === prev.pathname + prev.search;
        if (sameOrigin && samePath) {
          event.preventDefault();
          if (dest.href !== prev.href)
            history.pushState(null, "", dest);
          if (!dest.hash) {
            if (dest.href.endsWith("#"))
              window.scrollTo(0, 0);
            else {
              win[scrollEnabled] = false;
              clearTimeout(win[debounceTimeout]);
              saveScrollState({
                ...currentScrollState2(),
                x: 0,
                y: 0
              });
              location.reload();
            }
          } else {
            const elmId = dest.hash.slice(1);
            const elm = document.getElementById(elmId);
            if (elm)
              elm.scrollIntoView();
          }
        }
      }
    };
    win[initVisibility] = () => {
      if (!win[spa] && win[scrollEnabled] && document.visibilityState === "hidden")
        saveScrollState();
    };
    win[initScroll] = () => {
      if (win[spa] || !win[scrollEnabled])
        return;
      clearTimeout(win[debounceTimeout]);
      win[debounceTimeout] = setTimeout(() => {
        saveScrollState();
        win[debounceTimeout] = void 0;
      }, 200);
    };
    win[scrollEnabled] = true;
    setTimeout(() => {
      addEventListener("popstate", win[initPopstate]);
      addEventListener("scroll", win[initScroll], {
        passive: true
      });
      document.body.addEventListener("click", win[initAnchors]);
      if (!win.navigation)
        document.addEventListener("visibilitychange", win[initVisibility], {
          passive: true
        });
    }, 0);
  }
};
const spaInit = /* @__PURE__ */ inlinedQrl(s_DyVc0YBIqQU, "s_DyVc0YBIqQU");
const shim = () => {
  {
    const [symbol, bundle] = getPlatform().chunkForSymbol(spaInit.getSymbol(), null);
    return `(${shim$1.toString()})('${bundle}','${symbol}');`;
  }
};
const shim$1 = async (path, symbol) => {
  var _a;
  if (!window._qcs && history.scrollRestoration === "manual") {
    window._qcs = true;
    const scrollState = (_a = history.state) == null ? void 0 : _a._qCityScroll;
    if (scrollState)
      window.scrollTo(scrollState.x, scrollState.y);
    const currentScript = document.currentScript;
    const container = currentScript.closest("[q\\:container]");
    const base = new URL(container.getAttribute("q:base"), document.baseURI);
    const url = new URL(path, base);
    (await import(url.href))[symbol](currentScript);
  }
};
const s_e0ssiDXoeAM = () => {
  const shimScript = shim();
  _jsxBranch();
  const nonce = useServerData("nonce");
  const context = useContext(ContentInternalContext);
  if (context.value && context.value.length > 0) {
    const contentsLen = context.value.length;
    let cmp = null;
    for (let i = contentsLen - 1; i >= 0; i--)
      if (context.value[i].default)
        cmp = _jsxC(context.value[i].default, {
          children: cmp
        }, 1, "zl_0");
    return /* @__PURE__ */ _jsxC(Fragment, {
      children: [
        cmp,
        /* @__PURE__ */ _jsxQ("script", {
          dangerouslySetInnerHTML: shimScript
        }, {
          nonce
        }, null, 3, null)
      ]
    }, 1, "zl_1");
  }
  return SkipRender;
};
const RouterOutlet = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_e0ssiDXoeAM, "s_e0ssiDXoeAM"));
const toUrl = (url, baseUrl) => new URL(url, baseUrl.href);
const isSameOrigin = (a, b) => a.origin === b.origin;
const withSlash = (path) => path.endsWith("/") ? path : path + "/";
const isSamePathname = ({ pathname: a }, { pathname: b }) => {
  const lDiff = Math.abs(a.length - b.length);
  return lDiff === 0 ? a === b : lDiff === 1 && withSlash(a) === withSlash(b);
};
const isSameSearchQuery = (a, b) => a.search === b.search;
const isSamePath = (a, b) => isSameSearchQuery(a, b) && isSamePathname(a, b);
const isPromise = (value) => {
  return value && typeof value.then === "function";
};
const resolveHead = (endpoint, routeLocation, contentModules, locale) => {
  const head = createDocumentHead();
  const getData = (loaderOrAction) => {
    const id = loaderOrAction.__id;
    if (loaderOrAction.__brand === "server_loader") {
      if (!(id in endpoint.loaders))
        throw new Error("You can not get the returned data of a loader that has not been executed for this request.");
    }
    const data = endpoint.loaders[id];
    if (isPromise(data))
      throw new Error("Loaders returning a promise can not be resolved for the head function.");
    return data;
  };
  const headProps = {
    head,
    withLocale: (fn) => withLocale(locale, fn),
    resolveValue: getData,
    ...routeLocation
  };
  for (let i = contentModules.length - 1; i >= 0; i--) {
    const contentModuleHead = contentModules[i] && contentModules[i].head;
    if (contentModuleHead) {
      if (typeof contentModuleHead === "function")
        resolveDocumentHead(head, withLocale(locale, () => contentModuleHead(headProps)));
      else if (typeof contentModuleHead === "object")
        resolveDocumentHead(head, contentModuleHead);
    }
  }
  return headProps.head;
};
const resolveDocumentHead = (resolvedHead, updatedHead) => {
  if (typeof updatedHead.title === "string")
    resolvedHead.title = updatedHead.title;
  mergeArray(resolvedHead.meta, updatedHead.meta);
  mergeArray(resolvedHead.links, updatedHead.links);
  mergeArray(resolvedHead.styles, updatedHead.styles);
  mergeArray(resolvedHead.scripts, updatedHead.scripts);
  Object.assign(resolvedHead.frontmatter, updatedHead.frontmatter);
};
const mergeArray = (existingArr, newArr) => {
  if (Array.isArray(newArr))
    for (const newItem of newArr) {
      if (typeof newItem.key === "string") {
        const existingIndex = existingArr.findIndex((i) => i.key === newItem.key);
        if (existingIndex > -1) {
          existingArr[existingIndex] = newItem;
          continue;
        }
      }
      existingArr.push(newItem);
    }
};
const createDocumentHead = () => ({
  title: "",
  meta: [],
  links: [],
  styles: [],
  scripts: [],
  frontmatter: {}
});
let Char;
(function(Char2) {
  Char2[Char2["EOL"] = 0] = "EOL";
  Char2[Char2["OPEN_BRACKET"] = 91] = "OPEN_BRACKET";
  Char2[Char2["CLOSE_BRACKET"] = 93] = "CLOSE_BRACKET";
  Char2[Char2["DOT"] = 46] = "DOT";
  Char2[Char2["SLASH"] = 47] = "SLASH";
})(Char || (Char = {}));
const useDocumentHead = () => useContext(DocumentHeadContext);
const useLocation = () => useContext(RouteLocationContext);
const useQwikCityEnv = () => noSerialize(useServerData("qwikcity"));
const s_RPDJAz33WLA = `:root{view-transition-name:none}`;
const s_fX0bDjeJa0E = async (path, opt) => {
  const [actionState2, navResolver2, routeInternal2, routeLocation2] = useLexicalScope();
  const { type = "link", forceReload = path === void 0, replaceState = false, scroll = true } = typeof opt === "object" ? opt : {
    forceReload: opt
  };
  const lastDest = routeInternal2.value.dest;
  const dest = path === void 0 ? lastDest : toUrl(path, routeLocation2.url);
  if (!isSameOrigin(dest, lastDest))
    return;
  if (!forceReload && isSamePath(dest, lastDest))
    return;
  routeInternal2.value = {
    type,
    dest,
    forceReload,
    replaceState,
    scroll
  };
  actionState2.value = void 0;
  routeLocation2.isNavigating = true;
  return new Promise((resolve) => {
    navResolver2.r = resolve;
  });
};
const s_02wMImzEAbk = ({ track }) => {
  const [actionState2, content2, contentInternal2, documentHead2, env2, goto2, loaderState2, navResolver2, props2, routeInternal2, routeLocation2] = useLexicalScope();
  async function run() {
    const [navigation, action] = track(() => [
      routeInternal2.value,
      actionState2.value
    ]);
    const locale = getLocale("");
    const prevUrl = routeLocation2.url;
    const navType = action ? "form" : navigation.type;
    navigation.replaceState;
    let trackUrl;
    let clientPageData;
    let loadedRoute = null;
    trackUrl = new URL(navigation.dest, routeLocation2.url);
    loadedRoute = env2.loadedRoute;
    clientPageData = env2.response;
    if (loadedRoute) {
      const [routeName, params, mods, menu] = loadedRoute;
      const contentModules = mods;
      const pageModule = contentModules[contentModules.length - 1];
      routeLocation2.prevUrl = prevUrl;
      routeLocation2.url = trackUrl;
      routeLocation2.params = {
        ...params
      };
      routeInternal2.untrackedValue = {
        type: navType,
        dest: trackUrl
      };
      const resolvedHead = resolveHead(clientPageData, routeLocation2, contentModules, locale);
      content2.headings = pageModule.headings;
      content2.menu = menu;
      contentInternal2.value = noSerialize(contentModules);
      documentHead2.links = resolvedHead.links;
      documentHead2.meta = resolvedHead.meta;
      documentHead2.styles = resolvedHead.styles;
      documentHead2.scripts = resolvedHead.scripts;
      documentHead2.title = resolvedHead.title;
      documentHead2.frontmatter = resolvedHead.frontmatter;
    }
  }
  const promise = run();
  return promise;
};
const s_TxCFOy819ag = (props) => {
  useStylesQrl(/* @__PURE__ */ inlinedQrl(s_RPDJAz33WLA, "s_RPDJAz33WLA"));
  const env = useQwikCityEnv();
  if (!(env == null ? void 0 : env.params))
    throw new Error(`Missing Qwik City Env Data for help visit https://github.com/QwikDev/qwik/issues/6237`);
  const urlEnv = useServerData("url");
  if (!urlEnv)
    throw new Error(`Missing Qwik URL Env Data`);
  const url = new URL(urlEnv);
  const routeLocation = useStore({
    url,
    params: env.params,
    isNavigating: false,
    prevUrl: void 0
  }, {
    deep: false
  });
  const navResolver = {};
  const loaderState = _weakSerialize(useStore(env.response.loaders, {
    deep: false
  }));
  const routeInternal = useSignal({
    type: "initial",
    dest: url,
    forceReload: false,
    replaceState: false,
    scroll: true
  });
  const documentHead = useStore(createDocumentHead);
  const content = useStore({
    headings: void 0,
    menu: void 0
  });
  const contentInternal = useSignal();
  const currentActionId = env.response.action;
  const currentAction = currentActionId ? env.response.loaders[currentActionId] : void 0;
  const actionState = useSignal(currentAction ? {
    id: currentActionId,
    data: env.response.formData,
    output: {
      result: currentAction,
      status: env.response.status
    }
  } : void 0);
  const goto = /* @__PURE__ */ inlinedQrl(s_fX0bDjeJa0E, "s_fX0bDjeJa0E", [
    actionState,
    navResolver,
    routeInternal,
    routeLocation
  ]);
  useContextProvider(ContentContext, content);
  useContextProvider(ContentInternalContext, contentInternal);
  useContextProvider(DocumentHeadContext, documentHead);
  useContextProvider(RouteLocationContext, routeLocation);
  useContextProvider(RouteNavigateContext, goto);
  useContextProvider(RouteStateContext, loaderState);
  useContextProvider(RouteActionContext, actionState);
  useContextProvider(RouteInternalContext, routeInternal);
  useTaskQrl(/* @__PURE__ */ inlinedQrl(s_02wMImzEAbk, "s_02wMImzEAbk", [
    actionState,
    content,
    contentInternal,
    documentHead,
    env,
    goto,
    loaderState,
    navResolver,
    props,
    routeInternal,
    routeLocation
  ]));
  return /* @__PURE__ */ _jsxC(Slot, null, 3, "qY_0");
};
const QwikCityProvider = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_TxCFOy819ag, "s_TxCFOy819ag"));
const ServiceWorkerRegister = (props) => _jsxQ("script", {
  nonce: _wrapSignal(props, "nonce")
}, {
  dangerouslySetInnerHTML: swRegister
}, null, 3, "1Z_0");
const s_0vphQYqOdZI = () => {
  const head = useDocumentHead();
  const loc = useLocation();
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: [
      /* @__PURE__ */ _jsxQ("title", null, null, head.title, 1, null),
      /* @__PURE__ */ _jsxQ("link", null, {
        rel: "canonical",
        href: _fnSignal((p0) => p0.url.href, [
          loc
        ], "p0.url.href")
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("meta", null, {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("link", null, {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/icons/apple-touch-icon.png"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("link", null, {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/icons/favicon-32x32.png"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("link", null, {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/icons/favicon-16x16.png"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("link", null, {
        rel: "manifest",
        href: "/icons/site.webmanifest"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("link", null, {
        rel: "mask-icon",
        href: "/icons/safari-pinned-tab.svg"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("meta", null, {
        name: "msapplication-TileColor",
        content: "#000000"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("meta", null, {
        name: "theme-color",
        content: "#000000"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("meta", null, {
        property: "og:title",
        content: "Unstream"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("meta", null, {
        name: "twitter:title",
        content: "Unstream"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("meta", null, {
        property: "og:description",
        content: "A self taught fullstack developer, with a love of backends."
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("meta", null, {
        name: "description",
        content: "A self taught fullstack developer, with a love of backends."
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("meta", null, {
        property: "twitter:description",
        content: "A self taught fullstack developer, with a love of backends."
      }, null, 3, null),
      head.meta.map((m) => /* @__PURE__ */ _jsxS("meta", {
        ...m
      }, null, 0, m.key)),
      head.links.map((l) => /* @__PURE__ */ _jsxS("link", {
        ...l
      }, null, 0, l.key)),
      head.styles.map((s) => {
        var _a;
        return /* @__PURE__ */ _jsxS("style", {
          ...s.props,
          ...((_a = s.props) == null ? void 0 : _a.dangerouslySetInnerHTML) ? {} : {
            dangerouslySetInnerHTML: s.style
          }
        }, null, 0, s.key);
      }),
      head.scripts.map((s) => {
        var _a;
        return /* @__PURE__ */ _jsxS("script", {
          ...s.props,
          ...((_a = s.props) == null ? void 0 : _a.dangerouslySetInnerHTML) ? {} : {
            dangerouslySetInnerHTML: s.script
          }
        }, null, 0, s.key);
      })
    ]
  }, 1, "0D_0");
};
const RouterHead = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_0vphQYqOdZI, "s_0vphQYqOdZI"));
const s_tntnak2DhJ8 = () => {
  return /* @__PURE__ */ _jsxC(QwikCityProvider, {
    children: [
      /* @__PURE__ */ _jsxQ("head", null, null, [
        /* @__PURE__ */ _jsxQ("meta", null, {
          charSet: "utf-8"
        }, null, 3, null),
        /* @__PURE__ */ _jsxQ("link", null, {
          rel: "manifest",
          href: "/manifest.json"
        }, null, 3, null),
        /* @__PURE__ */ _jsxC(RouterHead, null, 3, "vp_0")
      ], 1, null),
      /* @__PURE__ */ _jsxQ("body", null, {
        lang: "en"
      }, [
        /* @__PURE__ */ _jsxC(RouterOutlet, null, 3, "vp_1"),
        /* @__PURE__ */ _jsxC(ServiceWorkerRegister, null, 3, "vp_2")
      ], 1, null)
    ]
  }, 1, "vp_3");
};
const Root = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_tntnak2DhJ8, "s_tntnak2DhJ8"));
function render(opts) {
  return renderToStream(/* @__PURE__ */ _jsxC(Root, null, 3, "Qb_0"), {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: "en-us",
      ...opts.containerAttributes
    },
    serverData: {
      ...opts.serverData
    }
  });
}
export {
  manifest as m,
  render as r,
  setServerPlatform2 as s
};
