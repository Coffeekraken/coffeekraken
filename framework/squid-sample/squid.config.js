module.exports = {

  server: {
    port: 3000
  },

  routes: {
    'GET /home': {
      controller: 'HomeController'
    },
    'POST /home/coco': 'HomeController.start'
  }

};
