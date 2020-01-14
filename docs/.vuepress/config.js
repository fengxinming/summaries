module.exports = {
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '学海无涯',
      description: '前端技术学习与总结'
    }
  },
  theme: 'purple',
  themeConfig: {
	logo: 'https://react-redux.js.org/img/redux_white.svg',
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
        sidebar: require('./sidebar/zh-CN')
      }
    }
  },
  extraWatchFiles: ['.vuepress/nav/*.js', '.vuepress/sidebar/*.js'],
  dest: 'gh-pages',
  base: '/summaries/',
  port: 8000
};
