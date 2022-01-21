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

        <div>
            Since&nbsp;&nbsp;<span class="s-typo:bold s-tc:accent">{{ $block->since }}</span>
            &nbsp;&nbsp;&nbsp;<span class="s-tc:main-background">│</span>&nbsp;&nbsp;&nbsp;
            <span
                class="s-badge:pill s-font:30 s-color:{{ $statusColor }}">{{ $block->status ? $block->status : 'beta' }}</span>
        </div>

    </div>
@endif
