import __formatDuration from "../formatDuration";
describe("sugar.shared.time.formatDuration", () => {
  it("Should format an estimation under 1s correctly", () => {
    const res = __formatDuration(600);
    expect(res).toBe("600ms");
  });
  it("Should format an estimation under 1m correctly", () => {
    const res = __formatDuration(1e3 * 25);
    expect(res).toBe("25s");
  });
  it("Should format an estimation under 1m with ms correctly", () => {
    const res = __formatDuration(1e3 * 25 + 345);
    expect(res).toBe("25.345s");
  });
  it("Should format an estimation under 1h correctly", () => {
    const res = __formatDuration(1e3 * 60 * 45);
    expect(res).toBe("45m");
  });
  it("Should format an estimation under 1h with some seconds correctly", () => {
    const res = __formatDuration(1e3 * 60 * 45 + 1e3 * 35);
    expect(res).toBe("45m35s");
  });
  it("Should format an estimation above 1h correctly", () => {
    const res = __formatDuration(1e3 * 60 * 60 * 3);
    expect(res).toBe("3h");
  });
  it("Should format an estimation above 1h with some minutes correctly", () => {
    const res = __formatDuration(1e3 * 60 * 60 * 3 + 1e3 * 60 * 32);
    expect(res).toBe("3h32m");
  });
});
