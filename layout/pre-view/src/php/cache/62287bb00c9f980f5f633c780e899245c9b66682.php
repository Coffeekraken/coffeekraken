<html>
  <head>
    <title>App Name - <?php echo $__env->yieldContent('title'); ?></title>
    <link rel="stylesheet" href="/dist/css/style.css" type="text/css">
  </head>
  <body>
    <section class="ck-preview__views-selector">
      <select is="ck-select">
        <?php $__currentLoopData = $views; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $view): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
          <option value="<?php echo e($view); ?>"><?php echo e($view); ?></option>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
      </select>
    </section>
    <div class="container">

    </div>
    <script src="/dist/js/app.bundle.js"></script>
  </body>
</html>
<?php /**PATH /Users/olivierbossel/data/web/coffeekraken/coffeekraken/layout/pre-view/src/php/views/index.blade.php ENDPATH**/ ?>