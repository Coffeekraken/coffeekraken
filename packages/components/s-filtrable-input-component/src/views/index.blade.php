@extends('layouts.main')
@section('title', $title)

@section('body')
  <div class="s-container s-layout-123">
    <div>
      <div style="height: 3000px; background: red;"></div>
      <br>
      <br>
      <s-filtrable-input filtrable="title,body" value="title" default-style>
        <input type="text" class="s-form-input" value="Coco" />
        @php print('<template id="item">
            <h4 class="s-font-title s-color-primary-foreground">{{title}}</h4>
            <p>{{body}}</p> Paul
        </template>');
        @endphp
        @php print('<template id="no-item">
            <p>Sorry but their\'s no items that correspond to your research...</p>
        </template>');
        @endphp
      </s-filtrable-input>
      <br>
      <br>
      <div style="height: 3000px; background: green;"></div>
    </div>

    <div></div>

    <div>
      <div style="height: 3000px; background: red;"></div>
      <br>
      <br>
      <s-filtrable-input class="s-cs-accent-success" filtrable="title,body" value="title" default-style>
        <input type="text" class="s-form-input" value="Coco" id="hello" />
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
      <br>
      <br>
      <div style="height: 3000px; background: green;"></div>
    </div>

  </div>
@endsection
