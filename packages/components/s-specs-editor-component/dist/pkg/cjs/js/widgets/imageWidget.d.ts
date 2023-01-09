export default function (component: any): {
    html(props: any, values: any): import("lit-html").TemplateResult<1>;
    events: {
        's-dropzone.clear': (e: any) => void;
        's-dropzone.file': (e: any) => void;
    };
};
