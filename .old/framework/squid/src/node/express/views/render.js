/**
 * @name                                  renderView
 * @namespace                             squid.node.express.views
 * @type                                  Function
 *
 * Render a view by passing his view path and a view id if exists
 *
 * @param               {String}                  viewPath                    The view path to render
 * @param               {String}                  [viewId=null]               The view id to render
 * @return              {String}                                              The rendered view html
 *
 * @example             js
 * Squid.express.views.render('home.header');
 *
 */
module.exports = (viewPath, viewId = null) => {
  return new Promise(async (resolve, reject) => {
    if ( ! Squid.express.views.exists(viewPath)) {
      __log(`The view "${viewPath + (viewId ? '#' + viewId : '')}" has been called but seems to not exist on the filesystem...`, 'error');
      res.send('The wanted content seems to not exist or another issue has occured... Please try again later...');
      return;
    }

    // get the view metas
    const viewMetas = await Squid.express.views.meta(viewPath, viewId);

    // call the dataAdapter the receive the data back and wait until the dataAdapter promise is resolved
    const viewData = await require((await Squid.config('views.dataAdapters'))[viewMetas.config.dataAdapter])(viewPath, viewId, viewMetas.config);

    // render the view and send it back
    Squid._express.render(viewMetas.renderPath, viewData, (error, html) => {
      resolve(html);
    });
  });
}
