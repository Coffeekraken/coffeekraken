export default function implementsTag(implementsStack) {
  return `Implements **${implementsStack.join(", ")}**\n`;
}
