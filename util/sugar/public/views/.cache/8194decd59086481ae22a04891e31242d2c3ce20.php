<html>
    <head>
        <title>App Name - <?php echo $__env->yieldContent('title'); ?></title>
    </head>
    <body>
        <?php $__env->startSection('sidebar'); ?>
            This is the master sidebar. <?php echo e($name); ?>

        <?php echo $__env->yieldSection(); ?>

        <div class="container">
            <?php echo $__env->yieldContent('content'); ?>
        </div>
    </body>
</html>
<?php /**PATH /Users/olivierbossel/data/web/coffeekraken/coffeekraken/util/sugar/public/views/layouts/main.blade.php ENDPATH**/ ?>