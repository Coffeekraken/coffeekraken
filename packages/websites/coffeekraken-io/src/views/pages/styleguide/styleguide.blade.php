@extends('layouts.main')
@section('title', $title)

@section('content')

    @php $firstBlock = $docblocks[0]; @endphp

    @php
    $statusColor = 'info';
    if ($firstBlock->status == 'alpha') {
        $statusColor = 'error';
    }
    if ($firstBlock->status == 'stable') {
        $statusColor = 'success';
    }
    if ($firstBlock->status == 'wip') {
        $statusColor = 'error';
    }
    @endphp

    <div id="styleguide">

        <section class="s-container styleguide">

            <div class="s-layout:12222 s-gap:column:50 @mobile s-layout:1_2 s-mi:30">

                <nav class="sidemenu s-pb:50 @mobile s-display:none" s-refocus trigger="event:actual">

                    <h5 class="s-typo:h5 s-mbe:30">
                        Styleguide
                    </h5>

                    @php $menu = get_object_vars($docmap->menu->custom->styleguide->tree->styleguide); @endphp
                    @include('pages.markdown.menu', ['menu' => $menu, 'id' => 'main', 'icon' => 'display-preview'])

                </nav>

                <div class="__content s-pb:50">

                    @foreach ($docblocks as $docblock)
                        @if (!$docblock->private)
                            @include('generic.docblock.block', ['block' => $docblock, 'isStyleguide' => true, 'isFirst' =>
                            $loop->first])
                        @endif
                    @endforeach

                </div>

            </div>
        </section>

    </div>

@endsection
