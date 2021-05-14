import { sveltePreprocess } from './autoProcess';
// default auto processor
// crazy es6/cjs export mix for backward compatibility
// eslint-disable-next-line no-multi-assign
export default exports = module.exports = sveltePreprocess;
// stand-alone processors to be included manually */
export { default as typescript } from './processors/typescript';
export { default as scss, default as sass } from './processors/scss';
export { default as postcss } from './processors/postcss';
export { default as globalStyle } from './processors/globalStyle';
export { default as babel } from './processors/babel';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQseUJBQXlCO0FBQ3pCLHNEQUFzRDtBQUV0RCwyQ0FBMkM7QUFDM0MsZUFBZSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztBQUUzRCxvREFBb0Q7QUFDcEQsT0FBTyxFQUFFLE9BQU8sSUFBSSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsT0FBTyxJQUFJLElBQUksRUFBRSxPQUFPLElBQUksSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckUsT0FBTyxFQUFFLE9BQU8sSUFBSSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxJQUFJLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxPQUFPLElBQUksS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUMifQ==