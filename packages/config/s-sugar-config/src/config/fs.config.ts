export default function ({ env }) {
    if (env.platform !== 'node') return;

    return {};
}
