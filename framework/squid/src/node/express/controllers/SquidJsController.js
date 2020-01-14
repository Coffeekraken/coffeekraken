module.exports = {

  index: (req, res) => {
    res.render('home', {
      coco: 'plop'
    });
  }

};
