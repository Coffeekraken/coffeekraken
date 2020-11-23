module.exports = (__SNav, __SNavItem) => {
    describe('sugar.js.nav.SNav', () => {
        it('Should create and update a nav correctly', (done) => {
            const navItem = new __SNavItem('myCoolItem', 'My Cool Item', 'scroll:#something', {
                target: '_blank'
            });
            const navItem2 = new __SNavItem('myCoolItem2', 'My Cool Item #2', 'mailto:#something', {
                target: '_self'
            });
            const navItem3 = new __SNavItem('myCoolItem3', 'My Cool Item #3', 'mailto:#something', {
                target: '_self'
            });
            const navItem4 = new __SNavItem('myCoolItem4', 'My Cool Item #4', 'mailto:#something', {
                target: '_self'
            });
            const otherNav = new __SNav('myOtherNav', 'My Other Nav', [navItem3, navItem4], {
                markdown: {
                    ordered: true
                }
            });
            const nav = new __SNav('myCoolNav', 'My Cool Nav', [navItem, otherNav, navItem2], {});
            expect(nav.items.length).toEqual(3);
            nav.addItem(navItem);
            expect(nav.items.length).toEqual(4);
            expect(nav.toMarkdown()).toBe(`
- [scroll:#something](My Cool Item)
\t1 [mailto:#something](My Cool Item #3)
\t2 [mailto:#something](My Cool Item #4)
- [mailto:#something](My Cool Item #2)
- [scroll:#something](My Cool Item)
`.trim());
            expect(nav.toHtml()).toBe(`
  <ul id="myCoolNav" class="s-nav s-nav--unordered">
  <li id="myCoolItem" class="s-nav__item"><a href="scroll:#something" class="s-nav__item-link" target="_blank">My Cool Item</a></li>
  <li class="s-nav__child">
    <a href="#myOtherNav" class="s-nav__child-link">My Other Nav</a>
    <ul id="myOtherNav" class="s-nav s-nav--unordered">
      <li id="myCoolItem3" class="s-nav__item"><a href="mailto:#something" class="s-nav__item-link" target="_self">My Cool Item #3</a></li>
      <li id="myCoolItem4" class="s-nav__item"><a href="mailto:#something" class="s-nav__item-link" target="_self">My Cool Item #4</a></li>
    </ul>
  </li>
  <li id="myCoolItem2" class="s-nav__item"><a href="mailto:#something" class="s-nav__item-link" target="_self">My Cool Item #2</a></li>
  <li id="myCoolItem" class="s-nav__item"><a href="scroll:#something" class="s-nav__item-link" target="_blank">My Cool Item</a></li>
</ul>
`.trim());
            done();
        });
    });
};
