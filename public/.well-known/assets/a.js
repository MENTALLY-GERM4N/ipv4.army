!(function () {
    "use strict";
    var a = window.location,
        r = window.document;
    function t(t, e) {
        if (
            window._phantom ||
            window.__nightmare ||
            window.navigator.webdriver ||
            window.Cypress ||
            /^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(
                a.hostname
            ) ||
            "file:" === a.protocol
        )
            return;
        var n = {},
            i =
                ((n.n = t),
                    (n.u = a.href),
                    (n.d = "wont.stream"),
                    (n.r = r.referrer || null),
                    new XMLHttpRequest());
        i.open("POST", "https://a.wont.stream/api/event", !0),
            i.setRequestHeader("Content-Type", "text/plain"),
            i.send(JSON.stringify(n));
    }
    var e = (window.a && window.a.q) || [];
    window.a = t;
    for (var n, i = 0; i < e.length; i++) t.apply(this, e[i]);
    function p() {
        n !== a.pathname && ((n = a.pathname), t("pageview"));
    }
    var c,
        w = window.history;
    w.pushState &&
        ((c = w.pushState),
            (w.pushState = function () {
                c.apply(this, arguments), p();
            }),
            window.addEventListener("popstate", p)),
        "prerender" === r.visibilityState
            ? r.addEventListener("visibilitychange", function () {
                n || "visible" !== r.visibilityState || p();
            })
            : p();
})();