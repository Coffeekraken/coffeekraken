import _sugarConfig from '../../node/config/sugar'

export default function node(stringArgs = ''):void {
  console.log(__sugarConfig('typescript'));
}