module.exports = (__SGoogleCustomSearch) => {

  test('Make a simple google search', async done => {
    const google = new __SGoogleCustomSearch('AIzaSyDzFfEzhmYXRTlONUCtMWQ88uHJhsbtXY4', '000247055370126278051:xqxglvx8w5x');
    const response = await google.search('sugar');
    expect(response.status).toBe(200);
    expect(response.data.kind).toBe('customsearch#search');
    done();
  });

}