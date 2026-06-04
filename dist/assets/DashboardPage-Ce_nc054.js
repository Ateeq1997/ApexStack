const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/RevenueLineChart-DzI7t9Re.js","assets/index-mQWxaBJM.js","assets/index-CjOxp8nX.css","assets/generateCategoricalChart-DyKoevus.js","assets/UserGrowthBarChart-DcMHilnV.js","assets/BarChart-B0d9qg32.js"])))=>i.map(i=>d[i]);
import{c as a,j as e,k as d,C as s,r as l,b as i,s as o,_ as c}from"./index-mQWxaBJM.js";import{D as n}from"./DeferredRender-CaygP5ah.js";import{S as h}from"./SectionHeader-CUb4NQUU.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=a("ArrowDownRight",[["path",{d:"m7 7 10 10",key:"1fmybs"}],["path",{d:"M17 7v10H7",key:"6fjiku"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=a("ArrowUpRight",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=a("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=a("Server",[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=a("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),y=l.lazy(()=>c(()=>import("./RevenueLineChart-DzI7t9Re.js"),__vite__mapDeps([0,1,2,3])).then(t=>({default:t.RevenueLineChart}))),g=l.lazy(()=>c(()=>import("./UserGrowthBarChart-DcMHilnV.js"),__vite__mapDeps([4,1,2,3,5])).then(t=>({default:t.UserGrowthBarChart})));function r({height:t}){return e.jsx("div",{className:`${t} w-full animate-pulse rounded-xl bg-[hsl(var(--accent-soft))]`})}function w(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx(h,{title:"Overview Dashboard",description:"Realtime KPIs, revenue movement, and platform system health.",metrics:"Refreshed 2m ago"}),e.jsx("section",{className:"grid gap-4 sm:grid-cols-2 xl:grid-cols-4",children:d.map(t=>e.jsxs(s,{children:[e.jsx("p",{className:"text-sm text-[hsl(var(--text))]/80",children:t.label}),e.jsx("p",{className:"mt-3 text-2xl font-extrabold tracking-tight",children:t.value}),e.jsxs("p",{className:"mt-3 inline-flex items-center gap-1 text-xs font-semibold",children:[t.trend==="up"?e.jsx(m,{className:"h-4 w-4 text-emerald-500"}):e.jsx(x,{className:"h-4 w-4 text-rose-500"}),t.change]})]},t.label))}),e.jsxs("section",{className:"grid gap-4 xl:grid-cols-3",children:[e.jsx(s,{title:"Revenue Trend",subtitle:"Last 6 months",className:"xl:col-span-2",children:e.jsx(n,{placeholder:e.jsx(r,{height:"h-80"}),rootMargin:"250px",children:e.jsx(l.Suspense,{fallback:e.jsx(r,{height:"h-80"}),children:e.jsx(y,{data:i})})})}),e.jsx(s,{title:"System Health",subtitle:"Realtime services",children:e.jsx("div",{className:"space-y-3",children:o.map(t=>e.jsxs("div",{className:"rounded-xl border p-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("p",{className:"text-sm font-semibold",children:t.name}),t.status==="healthy"&&e.jsx(p,{className:"h-4 w-4 text-emerald-500"}),t.status==="warning"&&e.jsx(j,{className:"h-4 w-4 text-amber-500"}),t.status==="critical"&&e.jsx(u,{className:"h-4 w-4 text-rose-500"})]}),e.jsxs("p",{className:"mt-2 text-xs text-[hsl(var(--text))]/75",children:["Uptime: ",t.uptime]})]},t.name))})})]}),e.jsxs("section",{className:"grid gap-4 xl:grid-cols-3",children:[e.jsx(s,{title:"User Growth",subtitle:"Monthly active users",className:"xl:col-span-2",children:e.jsx(n,{placeholder:e.jsx(r,{height:"h-72"}),rootMargin:"250px",children:e.jsx(l.Suspense,{fallback:e.jsx(r,{height:"h-72"}),children:e.jsx(g,{data:i})})})}),e.jsx(s,{title:"Quick Actions",subtitle:"Operational shortcuts",children:e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsx("button",{className:"w-full rounded-xl border px-3 py-2 text-left font-semibold",children:"Provision API Key"}),e.jsx("button",{className:"w-full rounded-xl border px-3 py-2 text-left font-semibold",children:"Create Enterprise Invoice"}),e.jsx("button",{className:"w-full rounded-xl border px-3 py-2 text-left font-semibold",children:"Export Weekly Report"}),e.jsx("button",{className:"w-full rounded-xl border px-3 py-2 text-left font-semibold",children:"Open Incident Timeline"})]})})]})]})}export{w as DashboardPage};
