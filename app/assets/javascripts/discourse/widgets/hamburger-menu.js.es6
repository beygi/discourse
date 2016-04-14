import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';

createWidget('menu-links', {
  tagName: 'ul.menu-links.columned',

  html(attrs) {
    const links = [].concat(attrs.contents());

    const liOpts = {};
    if (attrs.heading) {
      liOpts.className = 'heading';
    }

    const result = links.map(l => h('li', liOpts, l));
    if (!attrs.omitRule) {
      result.push(h('hr'));
    }
    return result;
    return h('div.clearfix');
  }
});

createWidget('menu-panel', {
  tagName: 'div.menu-panel',

  html(attrs) {
    return h('div.panel-body', h('div.panel-body-contents.clearfix', attrs.contents()));
  }
});

export default createWidget('hamburger-menu', {
  tagName: 'div.hamburger-panel',

  faqLink(href) {
    return h('a.faq-priority', { attributes: { href } }, [
             I18n.t('faq'),
             ' ',
             h('span.badge.badge-notification', I18n.t('new_item'))
           ]);
  },

  adminLinks() {
    const { currentUser } = this;

    const links = [{ route: 'admin', className: 'admin-link', icon: 'wrench', label: 'admin_title' },
                   { route: 'adminFlags',
                     className: 'flagged-posts-link',
                     icon: 'flag',
                     label: 'flags_title',
                     badgeClass: 'flagged-posts',
                     badgeTitle: 'notifications.total_flagged',
                     badgeCount: 'site_flagged_posts_count' }];

    if (currentUser.show_queued_posts) {
      links.push({ route: 'queued-posts',
                   className: 'queued-posts-link',
                   label: 'queue.title',
                   badgeCount: 'post_queue_new_count',
                   badgeClass: 'queued-posts' });
    }

    if (currentUser.admin) {
      links.push({ route: 'adminSiteSettings',
                   icon: 'gear',
                   label: 'admin.site_settings.title',
                   className: 'settings-link' });
    }

    return links.map(l => this.attach('link', l));
  },

  panelContents() {
    const { currentUser } = this;
    const results = [];

    const faqUrl = this.siteSettings.faq_url || '';

    if (faqUrl.length) {
      const prioritizeFaq = currentUser && !currentUser.read_faq;
      if (prioritizeFaq) {
        results.push(this.attach('menu-links', { heading: true, contents: () => this.faqLink(faqUrl) }));
      }
    }

    if (currentUser && currentUser.staff) {
      results.push(this.attach('menu-links', { contents: () => this.adminLinks() }));
    }

    return results;
  },

  html() {
    return this.attach('menu-panel', { contents: () => this.panelContents() });
  },

  clickOutside() {
    this.sendWidgetAction('toggleHamburger');
  }
});
