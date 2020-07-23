@if($currentPackageJson)

  <section class="sugar-package-header">

    @if($currentPackageJson->author)
      <div class="s-user-avatar s-m-b">
        @if($currentPackageJson->author->url)
          <a href="{{ $currentPackageJson->author->url }}" target="_blank" title="{{ $currentPackageJson->author->name }}">
        @endif
          <img class="s-user-avatar__img" src="https://www.gravatar.com/avatar/{{ md5($currentPackageJson->author->email) }}?s=300" title="{{ $currentPackageJson->author->name }}" />
          <span class="s-user-avatar__name">
            {{ $currentPackageJson->author->name }}
          </span>
        @if($currentPackageJson->author->url)
          </a>
        @endif
      </div>
    @endif

    <h1 class="s-h1 s-m-b">{{ $currentPackageJson->name }}</h1>

    <p class="s-p s-m-b">{{ $currentPackageJson->description }}</p>

    <ul class="sugar-package-header__shields s-inline-bar s-m-b">
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

    @if($currentPackageJson->contributors)
      <ul class="sugar-package-header__contributors">

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
      <a class="s-btn" target="_blank" href="{{ $currentPackageJson->homepage }}">
        Go to package homepage
      </a>
    @endif

  </section>

@endif
