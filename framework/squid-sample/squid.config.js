module.exports = {
  server: {

  },
  routes: {
    'GET /home': {
      controller: 'HomeController'
    },
    'POST /home/coco': 'HomeController.start'
  }

};
