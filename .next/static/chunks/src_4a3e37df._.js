(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/lib/api.ts
__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
// Konfigurasi baseURL dari environment variables
const baseURL = ("TURBOPACK compile-time value", "http://localhost:5000/api") || 'http://localhost:5000/api';
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    // Izinkan pengiriman credentials/cookie untuk refresh token
    withCredentials: true
});
// Request Interceptor: Otomatis tambahkan Authorization header jika token ada
api.interceptors.request.use((config)=>{
    // Di sisi client, token biasanya disimpan di localStorage / Context / Zustand
    if ("TURBOPACK compile-time truthy", 1) {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = "Bearer ".concat(token);
        }
    }
    return config;
}, (error)=>Promise.reject(error));
// Response Interceptor: Otomatis handle 401 dan coba refresh token
api.interceptors.response.use((response)=>response, async (error)=>{
    var _error_response;
    const originalRequest = error.config;
    // Jika error 401 (Unauthorized) dan request belum pernah di-retry
    if (((_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status) === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            // Coba panggil endpoint refresh token
            // Refresh token otomatis dikirim via HttpOnly cookie
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(baseURL, "/auth/refresh"), {}, {
                withCredentials: true
            });
            if (res.data.success && res.data.data.accessToken) {
                // Update token baru di localStorage
                if ("TURBOPACK compile-time truthy", 1) {
                    localStorage.setItem('accessToken', res.data.data.accessToken);
                }
                // Retry request yang gagal dengan token baru
                originalRequest.headers.Authorization = "Bearer ".concat(res.data.data.accessToken);
                return api(originalRequest);
            }
        } catch (refreshError) {
            // Refresh token gagal/expired -> paksa logout
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.removeItem('accessToken');
            // Optional: Redirect ke halaman login jika butuh
            // window.location.href = '/auth/login';
            }
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/auth/signup/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SigninPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function SigninPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        email: "",
        password: "",
        phonenumber: ""
    });
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/auth/register", {
                name: form.name,
                email: form.email,
                password: form.password,
                phoneNumber: form.phonenumber
            });
            if (res.data.success) {
                router.push("/auth/signin");
            }
        } catch (err) {
            var _err_response_data, _err_response;
            setError(((_err_response = err.response) === null || _err_response === void 0 ? void 0 : (_err_response_data = _err_response.data) === null || _err_response_data === void 0 ? void 0 : _err_response_data.message) || "Signup gagal");
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-8/12 w-full flex-col items-center justify-center py-24 transition-all duration-300 ease-out md:w-8/12 md:pl-[2rem] xl:pl-[8rem] 2xl:pl-[15rem]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex w-full flex-col items-start",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-accent-foreground mb-2 w-full text-left text-5xl font-normal",
                            children: "Selamat Datang Di SPA"
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth/signup/page.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-accent-foreground mb-10 text-sm",
                            children: "Tempat berbelanja kosmetik terbaik dan terjamin"
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth/signup/page.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/auth/signup/page.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    className: "mt-10 flex w-full flex-col justify-center space-y-6 md:max-w-md",
                    onSubmit: handleSubmit,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-accent-foreground mb-3 block text-sm",
                            htmlFor: "username",
                            children: "Silahkan masuk dengan data diri anda"
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth/signup/page.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            name: "name",
                            id: "name",
                            type: "text",
                            value: form.name,
                            onChange: (e)=>setForm({
                                    ...form,
                                    name: e.target.value
                                }),
                            placeholder: "Nama Lengkap",
                            className: "focus:text-accent-foreground text-accent-foreground placeholder-accent-foreground w-full rounded-lg border border-zinc-300 px-6 py-3 text-base focus:border-transparent focus:placeholder-black focus:ring-2 focus:ring-[#2e2acb] focus:outline-none",
                            required: true
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth/signup/page.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            name: "email",
                            id: "email",
                            type: "text",
                            value: form.email,
                            onChange: (e)=>setForm({
                                    ...form,
                                    email: e.target.value
                                }),
                            placeholder: "Email",
                            className: "focus:text-accent-foreground text-accent-foreground placeholder-accent-foreground w-full rounded-lg border border-zinc-300 px-6 py-3 text-base focus:border-transparent focus:placeholder-black focus:ring-2 focus:ring-[#2e2acb] focus:outline-none",
                            required: true
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth/signup/page.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: "password",
                            name: "password",
                            type: "password",
                            autoComplete: "current-password",
                            value: form.password,
                            onChange: (e)=>setForm({
                                    ...form,
                                    password: e.target.value
                                }),
                            placeholder: "Password",
                            className: "focus:text-accent-foreground text-accent-foreground placeholder-accent-foreground w-full rounded-lg border border-zinc-300 px-6 py-3 text-base focus:border-transparent focus:placeholder-black focus:ring-2 focus:ring-[#2e2acb] focus:outline-none",
                            required: true
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth/signup/page.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: "phonenumber",
                            name: "phonenumber",
                            type: "tel",
                            value: form.phonenumber,
                            onChange: (e)=>setForm({
                                    ...form,
                                    phonenumber: e.target.value
                                }),
                            placeholder: "Nomor HP",
                            className: "focus:text-accent-foreground text-accent-foreground placeholder-accent-foreground w-full rounded-lg border border-zinc-300 px-6 py-3 text-base focus:border-transparent focus:placeholder-black focus:ring-2 focus:ring-[#2e2acb] focus:outline-none",
                            required: true
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth/signup/page.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-accent-foreground w-full text-right text-sm",
                            children: [
                                "Belum punya akun ?",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/auth/signin",
                                    className: "ml-3 cursor-pointer text-[#2e2acb]",
                                    children: "Log-in"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/auth/signup/page.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/auth/signup/page.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "text-accent-foreground mt-6 w-full rounded-lg bg-[#3729E0] py-3 text-center",
                            children: "Sign-in"
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth/signup/page.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/auth/signup/page.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/auth/signup/page.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/auth/signup/page.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(SigninPage, "8vdrR5A0HbdyKaVSvSvGJCdkLl0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SigninPage;
var _c;
__turbopack_context__.k.register(_c, "SigninPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_4a3e37df._.js.map