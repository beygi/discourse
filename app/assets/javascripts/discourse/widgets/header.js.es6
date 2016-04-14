import { createWidget } from 'discourse/widgets/widget';
import { iconNode } from 'discourse/helpers/fa-icon';
import { avatarImg } from 'discourse/widgets/post';

import { h } from 'virtual-dom';

createWidget('user-dropdown', {
  tagName: 'li.header-dropdown-toggle.current-user',

  buildId() {
    return 'current-user';
  },

  html() {
    const { currentUser } = this;

    const avatar = avatarImg('medium', { template: currentUser.get('avatar_template'),
                                         username: currentUser.get('username') });

    return h('a.icon', { attributes: { href: currentUser.get('path'),
                                       'data-auto-route': true } }, avatar);
  },

  click(e) {
    e.preventDefault();
    console.log('user');
  }
});

createWidget('header-dropdown', {
  tagName: 'li.header-dropdown-toggle',

  buildClasses(attrs) {
    if (attrs.active) { return "active"; }
  },

  html(attrs) {
    const title = I18n.t(attrs.title);

    return h('a.icon', { attributes: { href: '',
                                       'data-auto-route': true,
                                       title,
                                       'aria-label': title,
                                       id: attrs.iconId } }, iconNode(attrs.icon));
  },

  click(e) {
    e.preventDefault();
    this.sendWidgetAction(this.attrs.action);
  }

});

createWidget('header-icons', {
  tagName: 'ul.icons.clearfix',

  buildAttributes() {
    return { role: 'navigation' };
  },

  html(attrs) {
    const icons = [ this.attach('header-dropdown', { title: 'search.title',
                                                     icon: 'search',
                                                     iconId: 'search-title',
                                                     href: '/search' }),
                    this.attach('header-dropdown', { title: 'hamburger_menu',
                                                     icon: 'bars',
                                                     iconId: 'toggle-hamburger-menu',
                                                     active: attrs.hamburgerVisible,
                                                     action: 'toggleHamburger' }) ];
    if (this.currentUser) {
      icons.push(this.attach('user-dropdown'));
    }

    return icons;
  },
});

createWidget('header-buttons', {
  html() {
    if (this.currentUser) { return; }

    return [ this.attach('button', { label: "sign_up",
                                     className: 'btn-primary btn-small sign-up-button',
                                     action: "showCreateAccount" }),
             this.attach('button', { label: 'log_in',
                                     className: 'btn-primary btn-small login-button',
                                     action: 'showLogin',
                                     icon: 'user' }) ];

  }
});

export default createWidget('header', {
  tagName: 'header.d-header.clearfix',

  defaultState() {
    return { minimized: false,
             hamburgerVisible: false };
  },

  html(attrs, state) {
    const panels = [this.attach('header-buttons'),
                    this.attach('header-icons', { hamburgerVisible: state.hamburgerVisible })];
    if (state.hamburgerVisible) {
      panels.push(this.attach('hamburger-menu'));
    }
    const panel = h('div.panel.clearfix', panels);

    return h('div.wrap',
             h('div.contents.clearfix', [
                this.attach('home-logo', { minimized: state.minimized }),
                panel
              ])
           );
  },

  toggleHamburger() {
    this.state.hamburgerVisible = !this.state.hamburgerVisible;
  }
});
