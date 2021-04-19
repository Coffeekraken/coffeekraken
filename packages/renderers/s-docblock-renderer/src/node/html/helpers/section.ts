export default {
  id: 'section',
  args: {
    title: null,
    description: null
  },
  helper: function classname({ title, description, settings, render }) {
    const lines = [];
    if (title) {
      // @ts-ignore
      lines.push(`<h2 class="{{ classname 'db-h2' }}">${title}</h2>`);
    }

    return render(lines.join('\n'));
  }
};
