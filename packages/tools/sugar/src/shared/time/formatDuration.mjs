import "../../../../../chunk-JETN4ZEY.mjs";
function formatDuration(duration) {
  if (duration === Infinity) {
    return "...";
  }
  if (duration < 1e3) {
    return `${duration}ms`;
  }
  if (duration < 1e3 * 60) {
    const s = (duration / 1e3).toFixed(0);
    const ms = (duration - s * 1e3).toFixed(0);
    if (ms <= 0)
      return `${s}s`;
    return `${s}.${ms}s`;
  }
  if (duration < 1e3 * 60 * 60) {
    const m2 = Math.floor(duration / 1e3 / 60);
    const s = ((duration - m2 * 1e3 * 60) / 1e3).toFixed(0);
    return `${m2}m${s > 0 ? `${s}s` : ""}`;
  }
  const h = Math.floor(duration / 1e3 / 60 / 60);
  const m = ((duration - h * 1e3 * 60 * 60) / 1e3 / 60).toFixed(0);
  return `${h}h${m > 0 ? `${m}m` : ""}`;
}
var formatDuration_default = formatDuration;
export {
  formatDuration_default as default
};
