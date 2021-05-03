@extends('layouts.main')
@section('title', $title)

@section('body')
  <div class="s-space-children">

    <s-filtrable-input value="Hello world" filtrable="title,body">
      @php print('<template id="item">
          <h4>{{title}}</h4>
          <p>{{body}}</p>
      </template>');
      @endphp
      @php print('<template id="no-item">
          <p>Sorry but their\'s no items that correspond to your research...</p>
      </template>');
      @endphp
    </s-filtrable-input>

  </div>
@endsection
