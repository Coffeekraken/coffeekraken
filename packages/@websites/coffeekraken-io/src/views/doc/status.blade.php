@if (isset($block->status))

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

    <div class="s-bg:main-surface s-p:30 s-radius s-border:10 s-flex:align-center s-mbs:50 @mobile s-display:block">
        <div class="s-flex-item:grow">
            @if (isset($block->platform))
                <span class="@mobile s-mie:20">
                    Platform
                    &nbsp;
                    @include('generic.platforms.icons', ['platforms' => $block->platform])
                </span>
            @endif
            @if (isset($block->support))
                <span class="s-tc:base s-opacity:20 @mobile s-display:none">&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;</span>
                Support
                &nbsp;
                @include('generic.support.icons', ['supports' => $block->support])
            @endif
        </div>
        <div class="@mobile s-mbs:10">
            Since&nbsp;&nbsp;<span class="s-typo:bold s-tc:accent">{{ @$block->since }}</span>
        </div>
        <div class="@mobile s-display:none">
            <span class="s-tc:base s-opacity:20">&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;</span>
        </div>
        <div class="@mobile s-mbs:20 s-float:right">
            <div class="s-tooltip-container">
                @php
                    $user = $block->author;
                    if (isset($block->contributor) && count($block->contributor)) {
                        $user = \Sugar\ar\pickRandom($block->contributor);
                    }
                @endphp

                @if (!isset($block->contributor))
                    <span class="s-avatar s-scale:20">
                        <a href="{{ $user->url }}" target="_blank">
                            <img src="{{ \Sugar\gravatar\url($user->email) }}" alt="{{ $user->name }}" />
                        </a>
                    </span>
                    <div class="s-tooltip s-white-space:nowrap s-color:accent">
                        {{ $user->name }}
                    </div>
                @else
                    <span class="s-avatar s-scale:20">
                        <a href="{{ $user->url }}" target="_blank">
                            <img src="{{ \Sugar\gravatar\url($user->email) }}" alt="{{ $user->name }}" />
                        </a>
                    </span>
                @endif
                @if (isset($block->contributor))
                    <div class="s-tooltip:interactive s-color:base">
                        <div class="s-flex s-gap:column:10">
                            @foreach ($block->contributor as $contributor)
                                <div class="s-tooltip-container">
                                    <div class="s-tooltip s-white-space:nowrap s-color:accent">
                                        {{ $contributor->name }}
                                    </div>
                                    <span class="s-avatar s-scale:20">
                                        <a href="{{ $contributor->url }}" target="_blank">
                                            <img src="{{ \Sugar\gravatar\url($contributor->email) }}"
                                                alt="{{ $contributor->name }}" />
                                        </a>
                                    </span>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endif

            </div>
        </div>
        <div class="@mobile s-display:none">
            &nbsp;&nbsp;&nbsp;<span class="s-tc:base s-opacity:20">│</span>&nbsp;&nbsp;&nbsp;
        </div>
        <div class="@mobile s-mbs:20">
            <span
                class="s-badge:pill s-font:30 s-color:{{ $statusColor }}">{{ isset($block->status) ? $block->status : 'beta' }}</span>
        </div>
    </div>
@endif
