module.exports = {
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '学海无涯',
      description: '前端技术学习与总结'
    }
  },
  theme: 'thindark',
  themeConfig: {
    repo: 'fengxinming/summaries',
    editLinks: true,
    docsDir: 'docs',
    smoothScroll: true,
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        ariaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: require('./nav/zh-CN'),
        sidebar: {
          '/basic/': require('./sidebar/basic')
        }
      }
    }
  },
  extraWatchFiles: ['.vuepress/nav/*.js', '.vuepress/sidebar/*.js'],
  dest: 'gh-pages',
  base: '/summaries/'
};
