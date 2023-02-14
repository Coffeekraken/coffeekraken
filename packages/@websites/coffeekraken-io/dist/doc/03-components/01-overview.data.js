import __SDocmap from '@coffeekraken/s-docmap';

export default async () => {
  const docmap = await new __SDocmap().read();

  return {
    docmapJson: docmap,
  };
};
