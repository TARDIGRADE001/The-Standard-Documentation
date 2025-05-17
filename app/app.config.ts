export default defineAppConfig({
  ui: {
    colors: {
      primary: 'sky',
      neutral: 'slate'
    }
  },
  uiPro: {
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  seo: {
    siteName: 'The Standard - Comprehensive Guide to Software Engineering Excellence'
  },
  header: {
    title: '',
    to: '/',
    logo: {
      alt: 'The Standard Logo',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/hassanhabib/The-Standard',
      'target': '_blank',
      'aria-label': 'The Standard on GitHub'
    }, {
      'icon': 'i-simple-icons-discord',
      'to': 'https://discord.gg/vdPZ7hS52X',
      'target': '_blank',
      'aria-label': 'The Standard Community on Discord'
    }]
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()} | The Standard`,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/hassanhabib/The-Standard',
      'target': '_blank',
      'aria-label': 'The Standard on GitHub'
    }, {
      'icon': 'i-simple-icons-discord',
      'to': 'https://discord.gg/vdPZ7hS52X',
      'target': '_blank',
      'aria-label': 'The Standard Community on Discord'
    }, {
      'icon': 'i-lucide-youtube',
      'to': 'https://www.youtube.com/watch?v=8PveoymxCok&list=PLan3SCnsISTQqmSTZHQbGxBmVDwQdrlub',
      'target': '_blank',
      'aria-label': 'The Standard YouTube Playlist'
    }]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community Resources',
      edit: 'https://github.com/hassanhabib/The-Standard/edit/master/content',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/hassanhabib/The-Standard',
        target: '_blank'
      }, {
        icon: 'i-lucide-globe',
        label: 'Translations',
        to: 'https://github.com/hassanhabib/The-Standard#translations',
        target: '_blank'
      }, {
        icon: 'i-lucide-code',
        label: 'Language Implementations',
        to: 'https://github.com/hassanhabib/The-Standard#the-standard-in-different-programming-languages',
        target: '_blank'
      }, {
        icon: 'i-lucide-book-open',
        label: 'Related Projects',
        to: 'https://github.com/hassanhabib/The-Standard#projects',
        target: '_blank'
      }]
    }
  }
})
