# Haoxin Lyu

个人学术主页，版式来自 [Minimal Light](https://github.com/yaoyao-liu/minimal-light)（commit `3786d5d480d2cfb1e384ae83bf43752998d78f80`，CC0）。主题说明保留在页面底部。

已发布的身份是名字 Haoxin Lyu、GitHub [eternalld](https://github.com/eternalld)，以及侧边栏里的 Google Scholar 链接。没有核实过的单位、职位、学历或邮箱都不会写上。没有条目的栏目不会出现。

## 编辑内容

改这些文件，然后把 `main` 上的变更交给 GitHub Pages 构建：

- `_config.yml`：名字、单位、职位、简介、头像、GitHub 和 Scholar 链接。不需要的项删掉整行。`pageviews: false` 会关掉访问次数。
- `_data/interests.yml`：研究或个人兴趣。推断出的题目不要写进来，除非本人确认。
- `_data/news.yml`：近况。空着就不显示。
- `_data/publications.yml`：论文。没有核实过的 PDF、代码或图就不要加链接。
- `_data/projects.yml`：项目或工程探索。
- `_data/curriculum.yml`：标题必须是 `履历表`。这里留给以后的教育和工作经历。`items` 为空时，页面不显示这一栏，也不会出现示例职位。

带字段说明的写法在 `docs/examples/`。那些文件不会被发布。论文来源说明在 `docs/import/`，同样不会发布。

`bio` 可以用 Markdown。

头像目前没有设置，页面也不会显示破图。照片上传到 `assets/img/avatar.jpg`：

https://github.com/eternalld/eternalld.github.io/upload/main/assets/img

上传时把文件名保持为 `avatar.jpg`。然后在 `_config.yml` 增加一行：

```yaml
avatar: ./assets/img/avatar.jpg
```

配置文件的编辑地址是 https://github.com/eternalld/eternalld.github.io/edit/main/_config.yml 。没有这行时，侧边栏不显示头像。

## 每日一句

侧边栏标题仍是「每日一句」。句子只来自本地文件 `assets/data/quotes.json`，不请求外部名言接口。在 GitHub 上直接编辑：

https://github.com/eternalld/eternalld.github.io/edit/main/assets/data/quotes.json

文件是一个 JSON 数组。现在只有一句 `all design is redesign`，页面就固定显示这一句，不显示作者或出处。要换成随机出现，就在这个数组里按同样的写法再加你自己的句子，每句用引号包起来，中间加逗号。两句及以上时，每次打开页面随机选一句。数组写成 `[]` 时，这一栏整段隐藏，不会出现空白或 undefined。不需要作者和出处；只有当你自己写上 `author`、`sourceTitle` 和 `https` 的 `sourceUrl` 时，出处才会出现。

## 访问次数

数字是页面浏览次数，不是独立访客人数。服务是不蒜子，脚本固定为 `https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js`。2026-11-23 核对的文件是 1939 字节，SHA-384 为 `oaKlriFiEaHzTKw66TKlzwgjYHPT5tvx+uf4JRnAGvP7HCHj5NPqEoAkyyOAPxZN`。该主机不返回 CORS 头，浏览器会因此拒绝带 integrity 的脚本，所以页面记录这个哈希，但不把 integrity 写进标签。页面只显示正整数的全站 `site_pv`，句子是「本站累计访问 N 次」。服务没有返回、超时、返回 0 或非整数时，整栏隐藏，不显示转圈或 0。

计数按浏览器地址里的主机名分开。`eternalld.github.io` 从该服务第一次记录这个主机名开始，不代表更早的访问，也没有人为设定的初始值。在 `127.0.0.1` 上预览会看到很多人共用的本地计数，那不是这个网站的数字。请求发往 `busuanzi.ibruce.info`，对方可能收到 IP、页面地址和浏览器信息，并写入 `busuanziId` cookie。页面不再加载其他统计、字体托管或图标托管。

## 本地检查

依赖锁在 `Gemfile.lock` 的 `github-pages` 232，与 2026-11-23 的 GitHub Pages 版本一致。

```bash
bundle config set --local path vendor/bundle
bundle install
npm test
bundle exec jekyll build
npm run check:site
```

## 仍保留的地址

- `/blog.html` 和 `/resume.html` 仍是原来的占位页，侧边栏不放入口。
- `/404.html` 仍是原来的未找到页面。
- 更换前的封面页、`i.dmego.cn` 的 CNAME、旧图标和 Dmego 说明在 `legacy/dmego-homepage/`。这个目录不会发布。GitHub Pages 当前没有绑定自定义域名，CNAME 留在网站根目录会指向别人的域名，所以不放回去。

## 许可

- 本仓库原有代码仍见 `LICENSE`（MIT）。
- Minimal Light 的 CC0 全文在 `licenses/CC0-1.0.txt`。
- Crimson Pro 字体为 SIL Open Font License，文件在 `assets/fonts/`，版本 `@fontsource/crimson-pro` 5.3.0。
- GitHub 图标路径来自 [Octicons](https://github.com/primer/octicons)（MIT）。
