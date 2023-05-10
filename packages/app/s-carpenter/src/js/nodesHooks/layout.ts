export default {
    add({ node }) {
        Array.from(
            node.$elm.querySelectorAll('[class*="s-layout_area-"]'),
        ).forEach(($area, i) => {
            $area.setAttribute('s-container', `area-${i + 1}`);
        });
    },
};
