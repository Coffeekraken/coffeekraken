export default function DocComponent({
    docmapId,
    docmapJson,
}: {
    docmapId: string;
    docmapJson: any;
}) {
    // if (item.type.raw?.toLowerCase?.() === 'markdown') {
    //     // render the markdown
    //     const builder = new __SMarkdownBuilder({});
    //     const mdResult = await builder.build({
    //         inPath: item.path,
    //         target: 'html',
    //         save: false,
    //         log: false,
    //     });
    //     item.docHtml = mdResult[0].code;
    // } else if (item) {
    //     const docblock = new __SDocblock(item.path);
    //     await docblock.parse();
    //     item.docblocks = docblock.toObject().filter((db) => {
    //         return db.id === docmapId;
    //     });
    // }

    console.log('ITEm', docmapJson);

    return <span className="s-tc-complementary">Hello</span>;
}
