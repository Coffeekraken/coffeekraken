@if ($block->description)

    @php 
    $titleStr = $block->name;
    if ($block->get) {
        $titleStr = '<span class="s-tc:accent">get</span> ' . $titleStr;
    } 
    @endphp

    @php
        $statusColor = 'complementary';
        if ($block->status == 'alpha') $statusColor = 'error';
        if ($block->status == 'stable') $statusColor = 'success';
        if ($block->status == 'wip') $statusColor = 'error';
    @endphp

    <{{ $isFirst ? 'h1' : 'h3'}} id="{{ $block->name }}" class="s-typo:{{ $isFirst ? 'h1' : 'h3'}} s-mbe:30 {{ $isFirst ? 's-tc:accent' : '' }}">
        {!! $titleStr !!}
    </{{ $isFirst ? 'h1' : 'h3'}}>
    
    <p class="s-typo:lead s-mbe:50">{!! $block->description !!}</p>

    <div class="s-bg:main-surface s-p:30 s-mbe:50 s-radius s-depth:100 s-flex">
        <div class="s-flex-item:grow">
            @if ($block->platform)
                Platform
                &nbsp;
                @foreach ($block->platform as $platform)
                    <span class="s-tooltip-container">
                        <i class="s-platform:{{ $platform->name }}"></i>
                        <div class="s-tooltip s-color:complementary s-white-space:nowrap">
                            {{ $platform->name }}
                        </div>
                    </span>
                @endforeach
            @endif
            &nbsp;&nbsp;&nbsp;<span class="s-tc:main-background">│</span>&nbsp;&nbsp;&nbsp;
            Support 
            &nbsp;
            <span class="">
            @include('generic.support.icons', ['supports' => $block->support])
            </span>
        </div>

        <div>
            Since&nbsp;&nbsp;<span class="s-typo:bold s-tc:accent">{{ $block->since }}</span>
            &nbsp;&nbsp;&nbsp;<span class="s-tc:main-background">│</span>&nbsp;&nbsp;&nbsp;
            <span class="s-badge:pill s-font:30 s-color:{{ $statusColor }}">{{ $block->status ? $block->status : 'beta' }}</span>
        </div>

    </div>
@endif