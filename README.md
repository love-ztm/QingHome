# QingHome2

> 动态个人主页 — 基于 React + Vite + Cloudflare Workers (D1 + Static Assets)  
> 从 [QingHome](https://github.com/yutian81/QingHome) 升级而来，所有配置由 D1 数据库驱动，提供可视化管理后台

---

## ✨ 特性

- 🎨 **大气简约 · 卡片式设计**：渐变 Hero、毛玻璃导航、悬浮卡片、微交互动画
- 🌗 **明暗双主题**：跟随系统偏好，一键切换，localStorage 持久化，零白屏闪烁
- 🖼 **Font Awesome 图标**：CDN 加载 1500+ 免费图标，数据里直接写 class 即可更换
- ⚡ **轻量产物**：JS ≈185 KB（gzip ≈59 KB），CSS ≈16 KB（gzip ≈3.9 KB）
- 📱 **完全响应式**：桌面 3 列 → 平板 2 列 → 手机 1 列，含汉堡菜单
- 🚀 **边缘部署**：Cloudflare Workers + Static Assets，全球 300+ 节点 CDN
- 🗄️ **D1 数据库驱动**：所有配置存储在 D1 中，而非硬编码
- 🔐 **管理后台**：`/admin` 路径进入，支持可视化编辑所有配置
- 👤 **管理员认证**：用户名 + 密码登录，Bearer Token 会话（7 天有效期）

---

## 📦 目录结构

```
qinghome2/
├── index.html               # HTML 入口（FA CDN + 防主题闪烁脚本）
├── package.json             # 脚本：dev / build / deploy / db:init
├── vite.config.js           # Vite 配置
├── wrangler.toml            # Cloudflare Workers + D1 配置
├── schema.sql               # D1 数据库表定义
├── worker/
│   └── index.js             # ★ Worker：API 路由 + 认证 + D1 操作
└── src/
    ├── main.jsx
    ├── App.jsx              # 路由：/ → 首页，/admin/* → 后台
    ├── api.js               # API 客户端
    ├── context/
    │   ├── AuthContext.jsx  # 认证状态管理
    │   └── SiteContext.jsx  # 站点配置数据
    ├── pages/
    │   ├── Home.jsx         # 公开首页
    │   ├── Setup.jsx        # 首次初始化（创建管理员）
    │   ├── Login.jsx        # 管理员登录
    │   └── Admin.jsx        # 管理后台仪表盘
    ├── components/          # Header / Hero / Blog / Projects / Resources / Social / Footer
    └── styles/
        ├── global.css       # 双主题设计系统
        └── admin.css        # 管理后台样式
```

---

## 🛠 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器（需要 D1 本地模拟）
npm run dev
# → http://localhost:5173
```

---

## 🚀 部署到 Cloudflare Workers

### 前置条件

你需要一个 [Cloudflare 账户](https://dash.cloudflare.com/)，且已安装 Node.js。

> ⚠️ 无需手动设置任何环境变量，首次访问 `/admin/login` 时会自动引导创建管理员账号。

---

### Step 1 — 登录 Cloudflare

```bash
npx wrangler login
```

### Step 2 — 创建 D1 数据库

```bash
npx wrangler d1 create qinghome2
```

创建成功后，将输出中的 `database_id` 填入 `wrangler.toml`：

```toml
[[d1_databases]]
binding = "DB"
database_name = "qinghome2"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # ← 替换为实际 ID
```

### Step 3 — 构建 + 部署

```bash
npm run deploy
```

首次部署成功后，终端会输出访问地址：

```
✨ Successfully published your script to
https://qinghome2.<你的子域>.workers.dev
```

### Step 4 — 创建管理员

1. 浏览器打开 `https://qinghome2.<你的子域>.workers.dev/admin/login`
2. 首次访问会自动显示 **「创建管理员」** 注册表单
3. 输入用户名和密码，点击「创建管理员并登录」
4. 创建成功后**自动登录**，进入管理仪表盘
5. 所有配置均可在线编辑，修改后首页实时生效

---

## 🎮 使用指南

### 公开首页

访问 `/` 查看你的个人主页，包含：

- **Hero 首屏**：头像、名称、简介、统计胶囊
- **博客区**：文章列表
- **项目区**：开源项目卡片
- **资源区**：分类资源分享
- **社交链接**：GitHub / Telegram / 邮箱等

### 管理后台

访问 `/admin` 进入后台，有七个设置面板：

| 面板 | 可编辑内容 |
|------|-----------|
| 📋 个人资料 | 名称、品牌、头像 URL、标题、副标题、简介、邮箱、状态 |
| 📊 统计 | Hero 区域的统计胶囊（增删改） |
| 🧭 导航 | 顶部导航菜单项 |
| 📝 博客 | 博客文章（增删改） |
| 💻 项目 | 开源项目卡片（增删改） |
| 🔗 资源 | 分类资源链接（增删改） |
| 🌐 社交 | 社交媒体链接（增删改） |

> 💡 **提示**：图标使用 Font Awesome 的完整 class（如 `fa-brands fa-github`），从 [fontawesome.com/search?ic=free-collection](https://fontawesome.com/search?ic=free-collection) 搜索复制即可。

---

## 🔧 常用命令速查

| 命令 | 作用 |
|------|------|
| `npm run dev` | 本地开发服务器 `localhost:5173`（热更新） |
| `npm run build` | 生产构建到 `dist/` |
| `npm run deploy` | 构建 + 部署到 Cloudflare Workers |
| `npm run cf:dev` | 用 wrangler 本地预览生产产物 |
| `npm run db:init` | 远程 D1 数据库建表 |
| `npm run db:init:local` | 本地 D1 数据库建表 |
| `npx wrangler tail` | 实时查看 Worker 访问日志 |
| `npx wrangler whoami` | 检查当前登录账号 |
| `npx wrangler d1 execute qinghome2 --command="SELECT * FROM profile" --remote` | 直接查询远程 D1 数据 |

---

## 📝 定制配色

打开 `src/styles/global.css`，修改顶部两个变量块：

```css
/* 亮色主题 */
:root, [data-theme='light'] {
  --brand: #6366f1;     /* 主品牌色（紫蓝） */
  --brand-2: #8b5cf6;   /* 渐变副色 */
  --accent: #06b6d4;    /* 强调色（青色） */
}

/* 暗色主题 */
[data-theme='dark'] {
  --brand: #818cf8;
  --brand-2: #a78bfa;
  --accent: #22d3ee;
}
```

---

## 📋 部署检查清单

- [ ] `npx wrangler d1 create qinghome2` 已执行
- [ ] `wrangler.toml` 中的 `database_id` 已填入正确的 UUID
- [ ] `npm run deploy` 部署成功
- [ ] 访问首页 `/` 显示正常（默认种子数据）
- [ ] 访问 `/admin/login` 显示创建管理员表单
- [ ] 创建管理员后自动登录正常
- [ ] 主题切换正常（亮/暗模式 + localStorage 持久化）
- [ ] Font Awesome 图标正常加载（需联网）
- [ ] 移动端布局正常（汉堡菜单、单列卡片）
- [ ] 自定义域名已绑定（如需）

---

## 📄 License

MIT

---

## 🔗 相关项目

- [QingHome](https://github.com/yutian81/QingHome) — QingHome2 的前身（数据硬编码版）
