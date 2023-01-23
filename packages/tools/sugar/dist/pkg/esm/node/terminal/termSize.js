import __termSize from 'term-size';
export default function termSize() {
    const sizes = __termSize();
    return Object.assign(Object.assign({}, sizes), { width: sizes.columns, height: sizes.rows });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLFdBQVcsQ0FBQztBQStCbkMsTUFBTSxDQUFDLE9BQU8sVUFBVSxRQUFRO0lBQzVCLE1BQU0sS0FBSyxHQUFHLFVBQVUsRUFBRSxDQUFDO0lBQzNCLHVDQUNPLEtBQUssS0FDUixLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFDcEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLElBQ3BCO0FBQ04sQ0FBQyJ9