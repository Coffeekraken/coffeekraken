@if($currentPackageJson)

  <section class="sugar-package-header s-p-medium">

    <div class="s-card">

      @if($currentPackageJson->author)
        <div class="s-card__media">
          @if($currentPackageJson->author->url)
            <a href="{{ $currentPackageJson->author->url }}" target="_blank" title="{{ $currentPackageJson->author->name }}">
          @endif
            <img class="s-card__img" src="https://www.gravatar.com/avatar/{{ md5($currentPackageJson->author->email) }}?s=300" title="{{ $currentPackageJson->author->name }}" />
            {{-- <span class="s-user-avatar__name">
              {{ $currentPackageJson->author->name }}
            </span> --}}
          @if($currentPackageJson->author->url)
            </a>
          @endif
        </div>
      @endif

      <div class="s-card__body">
        <h1 class="s-h1 s-mb">{{ $currentPackageJson->name }}</h1>
      </div>

    </div>

    <p class="s-p s-mb">{{ $currentPackageJson->description }}</p>

    <ul class="sugar-package-header__shields s-inline-bar s-mb">
      <li class="sugar-package-header__shields__item s-inline-bar__item">
        <img alt="npm" src="https://img.shields.io/npm/dw/{{ $currentPackageJson->name }}?style=for-the-badge">
      </li>
      <li class="sugar-package-header__shields__item s-inline-bar__item">
        <img alt="NPM" src="https://img.shields.io/npm/l/{{ $currentPackageJson->name }}?style=for-the-badge">
      </li>
      <li class="sugar-package-header__shields__item s-inline-bar__item">
        <img alt="npm" src="https://img.shields.io/npm/v/{{ $currentPackageJson->name }}?style=for-the-badge">
      </li>
      <li class="sugar-package-header__shields__item s-inline-bar__item">
        <img alt="node-current" src="https://img.shields.io/node/v/{{ $currentPackageJson->name }}?style=for-the-badge">
      </li>
    </ul>

    @if($currentPackageJson->scripts)
      <h3 class="s-h3 s-mb">NPM Scripts</h3>

      <ol class="s-ul s-ul--primary s-mb">
        @foreach($currentPackageJson->scripts as $key => $script)
        <li class="s-mb-small">
          <strong>{{ $key }}</strong>: {{ $script }}
        </li>
        @endforeach
      </ol>
    @endif

    @if($currentPackageJson->contributors)
      <ul class="sugar-package-header__contributors s-mb">

        @foreach($currentPackageJson->contributors as $user)
          <li class="s-user-avatar s-user-avatar--small">
            @if($user->url)
              <a href="{{ $user->url }}" target="_blank" title="{{ $user->name }}">
            @endif
              <img class="s-user-avatar__img" src="https://www.gravatar.com/avatar/{{ md5($user->email) }}?s=300" title="{{ $user->name }}" />
              <span class="s-user-avatar__name">
                {{ $user->name }}
              </span>
            @if($user->url)
              </a>
            @endif
          </li>
        @endforeach
      </ul>
    @endif

    @if($currentPackageJson->homepage)
      <a class="s-btn s-btn--primary" target="_blank" href="{{ $currentPackageJson->homepage }}">
        Go to package homepage
      </a>
    @endif

  </section>

@endif
