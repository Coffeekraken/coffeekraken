
@php $firstBlock = $docblocks[0]; @endphp

@php
$statusColor = 'info';
if (isset($firstBlock->status)) {
    if ($firstBlock->status == 'alpha') {
        $statusColor = 'error';
    }
    if ($firstBlock->status == 'stable') {
        $statusColor = 'success';
    }
    if ($firstBlock->status == 'wip') {
        $statusColor = 'error';
    }
}
@endphp

<div id="api">

    <section class="s-container markdown">

        <div class="s-layout:12222 s-gap:column:50 @mobile s-layout:1_2 s-mi:30">

            <nav s-scope class="sidemenu @mobile s-display:none" s-refocus>

                <div class="sidemenu-sub">
                    <ck-doc-sub-nav source="._content"></ck-doc-sub-nav>
                </div>

                <div class="sidemenu-main">

                    <h5 class="s-typo:h5 s-mbe:30">
                        API
                    </h5>

                    <api-nav></api-nav>

                </div>

            </nav>

            <div s-page-transition-container="api">

                <div s-scope class="_content s-pb:50 s-pis:50 @mobile s-pis:0">

                    @if (!count((array) $docblocks))

                        <div class="s-typo:h1 s-mbs:50 s-mbe:30 s-tc:primary">
                            No API documentation found
                        </div>

                    @else
                        @foreach ($docblocks as $docblock)
                            @if (!isset($docblock->private))
                                @include('generic.docblock.block', ['block' => $docblock, 'isFirst' => $loop->first, 'index' => $loop->index])
                            @endif
                        @endforeach

                        <ck-doc-sub-nav></ck-doc-sub-nav>

                    @endif
                </div>

            </div>

        </div>
    </section>

</div>
