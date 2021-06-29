@extends('layouts.main')
@section('title', $title)

@section('content')
    
   <div id="doc-list">

      <div class="s-container">

         <section class="__header">
            <h1 class="s-typo:h1 s-mb:30">
               Documentation
            </h1>
            <p class="s-typo:p">
               Coffeekraken gives you access to all it's documentation right from here. JS, Node, CSS, PHP, all is available at your fingertips.
            </p>
         </section>

         <s-request id="doc-nav-request" cache="1h" url="/api/docmap">
            <script type="module">
               export default {
                  response: function(res) {
                     const platforms = [], items = [];
                     
                     Object.keys(res.data).forEach(function(namespace) {
                        const item = res.data[namespace];
                        if (item.platform) {
                           item.platform.forEach(function(platform) {
                              if (platforms.indexOf(platform.name) === -1) platforms.push(platform.name);
                           });
                        }
                        items.push(item);
                     });

                     return {
                        platforms,
                        items
                     };
                  }
               }
            </script>
         </s-request>

         <div class="s-grid:122">
            <nav class="__nav">
               
               <doc-nav></doc-nav>

            </nav>
            <section class="__list">

            </section>
         </div>

      </div>

   </div>

@endsection
