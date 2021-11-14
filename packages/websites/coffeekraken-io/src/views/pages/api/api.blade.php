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

    <div id="api">

        <section class="s-container markdown">

            <div class="s-layout:1222:gutter-between:gutter-50">

                <nav class="sidemenu s-pb:50">

                    <h5 class="s-typo:h5 s-mbe:30">
                        API
                    </h5>

                    <api-nav></api-nav>
                    
                </nav>

                <div class="__content s-pb:50">

                    @include('generic.docblock.block', ['block' => $firstBlock, 'isFirst' => true])

                </div>

            </div>
        </section>

    </div>

@endsection
