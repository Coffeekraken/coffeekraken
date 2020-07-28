{{-- <pre>{{ var_dump($blocks) }}</pre> --}}

{{-- <pre>{{$css}}</pre> --}}

@if($blocks)
  <section class="styleguide-blocks">

    @foreach($blocks as $block)

      <section class="styleguide-blocks__ s-p-medium">

        @if($block->type)
          <h4 class="s-h4">{{ $block->type }}</h4>
        @endif
        <h3 class="s-h3 s-mb">
          {{ $block->name }}
          @if($block->namespace) <span class="s-t-small">{{ $block->namespace }}</span> @endif
          @if($block->since) <span class="s-t-small">since {{ $block->since }}</span> @endif
        </h3>

        @if($block->description)
          <p class="s-p s-mb">{{ $block->description }}</p>
        @endif

        @if($block->param)
          <h4 class="s-h4 s-mb">Parameters</h4>

          <table class="s-table s-mb">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
            @foreach($block->param as $name => $param)
              <tr>
                <td>{{$name}}</td>
                <td>{{$param->type}}</td>
                <td>{{$param->default}}</td>
                <td>{{$param->description}}</td>
              </tr>
            </tbody>
            @endforeach
          </table>
        @endif

        @if($block->example)
          <h4 class="s-h4 s-mb">Example</h4>

          @foreach($block->example as $example)
            <pre language="{{ $example->language }}">
              {{ $example->code }}
            </pre>
          @endforeach
        @endif

        @if($block->author)
          <div class="s-user-avatar s-mb">
            @if($block->author->url)
              <a href="{{ $block->author->url }}" target="_blank" title="{{ $block->author->name }}">
            @endif
              <img class="s-user-avatar__img" src="https://www.gravatar.com/avatar/{{ md5($block->author->email) }}?s=300" title="{{ $block->author->name }}" />
              <span class="s-user-avatar__name">
                {{ $block->author->name }}
              </span>
            @if($block->author->url)
              </a>
            @endif
          </div>
        @endif

      </section>

    @endforeach

  </section>
@endif
