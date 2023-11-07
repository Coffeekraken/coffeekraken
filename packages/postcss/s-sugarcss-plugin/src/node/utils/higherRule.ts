export interface IHigherRuleSettings {
    includeAtRule: boolean;
}

export default function (fromNode) {
    let higherRule = fromNode.parent;
    while (true) {
        if (!higherRule.parent) {
            break;
        }
        if (higherRule.parent?.type === 'root') {
            break;
        }
        higherRule = higherRule.parent;
    }
    return higherRule;
}
