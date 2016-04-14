import { createWidget } from 'discourse/widgets/widget';
import { iconNode } from 'discourse/helpers/fa-icon';
import { h } from 'virtual-dom';

export default createWidget('link', {
  tagName: 'a',

  href(attrs) {
    const route = attrs.route;
    if (route) {
      const router = this.container.lookup('router:main');
      if (router && router.router) {
        return Discourse.getURL(router.router.generate.apply(router.router, [route]));
      }
    }
  },

  buildClasses(attrs) {
    return attrs.className;
  },

  buildAttributes(attrs) {
    return { href: this.href(attrs) };
  },

  html(attrs) {
    const result = [];
    if (attrs.icon) {
      result.push(iconNode(attrs.icon));
      result.push(' ');
    }
    result.push(I18n.t(attrs.label));

    const currentUser = this.currentUser;
    if (currentUser && attrs.badgeCount) {
      const val = parseInt(currentUser.get(attrs.badgeCount));
      if (val > 0) {
        const title = attrs.badgeTitle ? I18n.t(attrs.badgeTitle) : '';
        result.push(' ');
        result.push(h('span.badge-notification', { className: attrs.badgeClass,
                                                   attributes: { title } }, val));
      }
    }

    return result;
  }
});
