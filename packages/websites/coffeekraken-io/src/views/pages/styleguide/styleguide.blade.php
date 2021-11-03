@extends('layouts.main')
@section('title', $title)

@section('content')
    
    @php $firstBlock = $docblocks[0]; @endphp

    @php
        $statusColor = 'info';
        if ($firstBlock->status == 'alpha') $statusColor = 'error';
        if ($firstBlock->status == 'stable') $statusColor = 'success';
        if ($firstBlock->status == 'wip') $statusColor = 'error';
    @endphp

    <div id="styleguide">

        <section class="s-container styleguide">

            <div class="s-layout:12222:gutter-between:gutter-50">

                <nav class="__nav s-pb:50">

                    <h5 class="s-typo:h5 s-mbe:30">
                        Styleguide
                    </h5>

                    @php $menu = get_object_vars($docmap->menu->custom->styleguide->tree->styleguide); @endphp
                    @include('pages.markdown.menu', ['menu' => $menu, 'id' => 'main', 'icon' => 'display-preview'])
                    
                </nav>

                <div class="__content s-pb:50">

                    @include('pages.styleguide.partials.block', ['block' => $firstBlock, 'isFirst' => true])

                </div>

            </div>
        </section>

    </div>

@endsection
