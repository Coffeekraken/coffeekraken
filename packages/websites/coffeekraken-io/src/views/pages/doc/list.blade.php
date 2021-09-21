@extends('layouts.main')
@section('title', $title)

@section('content')
    
   <div id="doc-list">

      {{-- <section class="__header s-pb:50 s-bg:complementary">
         <div class="s-container">

            <h1 class="s-typo:h1 s-mbe:30">
               Documentation
            </h1>
            <p class="s-typo:p">
               Coffeekraken gives you access to all it's documentation right from here. JS, Node, CSS, PHP, all is available at your fingertips.
            </p>
         </div>

      </section> --}}

      <div class="s-container">
         <doc-nav></doc-nav>
      </div>

   </div>

@endsection
