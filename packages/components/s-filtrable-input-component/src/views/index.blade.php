@extends('layouts.main')
@section('title', $title)

@section('body')
  <div class="s-space-children">

    <div style="height: 3000px; background: red;"></div>

    <s-filtrable-input filtrable="title,body" value="title" default-style>
      <input type="text" class="s-form-input" value="Coco" />
      @php print('<template id="item">
          <h4 class="s-font-title">{{title}}</h4>
          <p>{{body}}</p>
      </template>');
      @endphp
      @php print('<template id="no-item">
          <p>Sorry but their\'s no items that correspond to your research...</p>
      </template>');
      @endphp
    </s-filtrable-input>

    <div style="height: 3000px; background: green;"></div>

  </div>
@endsection
