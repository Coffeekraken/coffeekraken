import __getDocmap from '@/app/_utils/getDocmap';
import DocComponent from '@/app/components/docComponent';

export async function generateStaticParams() {
    const docmap = await __getDocmap();

    // const docmap = new __SDocmap();
    // const docmapJson = await docmap.read();

    // console.log('ITEM', docmapJson);

    // return {
    //     docmapJson,
    // };

    return [{}];
}

export default function Home() {
    return <DocComponent />;
}
