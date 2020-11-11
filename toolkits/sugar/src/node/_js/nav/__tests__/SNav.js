"use strict";

module.exports = (__SNav, __SNavItem) => {
  describe('sugar.js.nav.SNav', () => {
    it('Should create and update a nav correctly', done => {
      var navItem = new __SNavItem('myCoolItem', 'My Cool Item', 'scroll:#something', {
        target: '_blank'
      });
      var navItem2 = new __SNavItem('myCoolItem2', 'My Cool Item #2', 'mailto:#something', {
        target: '_self'
      });
      var navItem3 = new __SNavItem('myCoolItem3', 'My Cool Item #3', 'mailto:#something', {
        target: '_self'
      });
      var navItem4 = new __SNavItem('myCoolItem4', 'My Cool Item #4', 'mailto:#something', {
        target: '_self'
      });
      var otherNav = new __SNav('myOtherNav', 'My Other Nav', [navItem3, navItem4], {
        markdown: {
          ordered: true
        }
      });
      var nav = new __SNav('myCoolNav', 'My Cool Nav', [navItem, otherNav, navItem2], {});
      expect(nav.items.length).toEqual(3);
      nav.addItem(navItem);
      expect(nav.items.length).toEqual(4);
      expect(nav.toMarkdown()).toBe("\n- [scroll:#something](My Cool Item)\n\t1 [mailto:#something](My Cool Item #3)\n\t2 [mailto:#something](My Cool Item #4)\n- [mailto:#something](My Cool Item #2)\n- [scroll:#something](My Cool Item)\n".trim());
      expect(nav.toHtml()).toBe("\n  <ul id=\"myCoolNav\" class=\"s-nav s-nav--unordered\">\n  <li id=\"myCoolItem\" class=\"s-nav__item\"><a href=\"scroll:#something\" class=\"s-nav__item-link\" target=\"_blank\">My Cool Item</a></li>\n  <li class=\"s-nav__child\">\n    <a href=\"#myOtherNav\" class=\"s-nav__child-link\">My Other Nav</a>\n    <ul id=\"myOtherNav\" class=\"s-nav s-nav--unordered\">\n      <li id=\"myCoolItem3\" class=\"s-nav__item\"><a href=\"mailto:#something\" class=\"s-nav__item-link\" target=\"_self\">My Cool Item #3</a></li>\n      <li id=\"myCoolItem4\" class=\"s-nav__item\"><a href=\"mailto:#something\" class=\"s-nav__item-link\" target=\"_self\">My Cool Item #4</a></li>\n    </ul>\n  </li>\n  <li id=\"myCoolItem2\" class=\"s-nav__item\"><a href=\"mailto:#something\" class=\"s-nav__item-link\" target=\"_self\">My Cool Item #2</a></li>\n  <li id=\"myCoolItem\" class=\"s-nav__item\"><a href=\"scroll:#something\" class=\"s-nav__item-link\" target=\"_blank\">My Cool Item</a></li>\n</ul>\n".trim());
      done();
    });
  });
};