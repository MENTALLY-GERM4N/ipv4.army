import { c as componentQrl, i as inlinedQrl, b as _jsxC, S as Slot, d as _jsxQ, F as Fragment } from "./q-C5aHNK9h.js";
const onGet = async ({ cacheControl }) => {
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 604800,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5
  });
};
const s_VKFlAWJuVm8 = () => {
  return /* @__PURE__ */ _jsxC(Slot, null, 3, "yB_0");
};
const layout = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_VKFlAWJuVm8, "s_VKFlAWJuVm8"));
const Layout_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: layout,
  onGet
}, Symbol.toStringTag, { value: "Module" }));
const s_B0lqk5IDDy4 = () => {
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: [
      /* @__PURE__ */ _jsxQ("h1", null, null, "Unstream.", 3, null),
      /* @__PURE__ */ _jsxQ("h3", null, null, "A self taught fullstack developer, with a love of backends.", 3, null)
    ]
  }, 3, "i8_0");
};
const index = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_B0lqk5IDDy4, "s_B0lqk5IDDy4"));
const head = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description"
    }
  ]
};
const IndexRoute = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index,
  head
}, Symbol.toStringTag, { value: "Module" }));
const serverPlugins = [];
const Layout = () => Layout_;
const routes = [
  ["/", [Layout, () => IndexRoute], "/", ["q-DWlU1J-M.js", "q-DaOq052w.js"]]
];
const menus = [];
const trailingSlash = true;
const basePathname = "/";
const cacheModules = true;
const qwikCityPlan = { routes, serverPlugins, menus, trailingSlash, basePathname, cacheModules };
export {
  basePathname,
  cacheModules,
  qwikCityPlan as default,
  menus,
  routes,
  serverPlugins,
  trailingSlash
};
