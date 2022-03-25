function isValidUnitValue(value) {
  if (typeof value === "number")
    return true;
  if (typeof value !== "string")
    return false;
  const unit = value.replace(/[0-9,.]+/, "").trim().toLowerCase();
  if ([
    "cm",
    "mm",
    "in",
    "px",
    "pt",
    "pc",
    "em",
    "ex",
    "ch",
    "rem",
    "vw",
    "vh",
    "vmin",
    "vmax",
    "%"
  ].indexOf(unit) === -1)
    return false;
  return true;
}
export {
  isValidUnitValue as default
};
