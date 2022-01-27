@if ($block->status)

    @php
        $statusColor = 'complementary';
        if ($block->status == 'alpha') {
            $statusColor = 'error';
        }
        if ($block->status == 'stable') {
            $statusColor = 'success';
        }
        if ($block->status == 'wip') {
            $statusColor = 'error';
        }
    @endphp

    <div class="s-bg:main-surface s-p:30 s-radius s-depth:100 s-flex:align-center s-mbs:50">
        <div class="s-flex-item:grow">
            @if ($block->platform)
                Platform
                &nbsp;
                @include('generic.platforms.icons', ['platforms' => $block->platform])
            @endif
            @if ($block->support)
                &nbsp;&nbsp;&nbsp;<span class="s-tc:main-background">│</span>&nbsp;&nbsp;&nbsp;
                Support
                &nbsp;
                @include('generic.support.icons', ['supports' => $block->support])
            @endif
        </div>

        <div class="">
            @php
                $user = $block->author;
            @endphp

            <div class="s-tooltip-container">
                <span class="s-avatar s-scale:20">
                    <a href="{{ $user->url }}" target="_blank">
                        <img src="{{ \Sugar\gravatar\url($user->email) }}" alt="{{ $user->name }}" />
                    </a>
                </span>
                @if ($block->contributor)
                    <div class="s-tooltip:interactive s-color:main">
                        <div class="s-flex s-gap:10">
                            @foreach ($block->contributor as $contributor)
                                <div class="s-tooltip:interactive s-color:main">
                                    <span class="s-avatar s-scale:20">
                                        <a href="{{ $contributor->url }}" target="_blank">
                                            <img src="{{ \Sugar\gravatar\url($contributor->email) }}"
                                                alt="{{ $contributor->name }}" />
                                        </a>
                                    </span>
                                    <div class="s-tooltip:interactive s-color:main">
                                        {{ $contributor->name }}
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endif
            </div>

        </div>

        <div>
            Since&nbsp;&nbsp;<span class="s-typo:bold s-tc:accent">{{ $block->since }}</span>
            &nbsp;&nbsp;&nbsp;<span class="s-tc:main-background">│</span>&nbsp;&nbsp;&nbsp;
            <span
                class="s-badge:pill s-font:30 s-color:{{ $statusColor }}">{{ $block->status ? $block->status : 'beta' }}</span>
        </div>

    </div>
@endif
