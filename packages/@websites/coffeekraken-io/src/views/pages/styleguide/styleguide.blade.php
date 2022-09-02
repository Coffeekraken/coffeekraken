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

            <nav s-scope class="sidemenu @mobile s-display:none" >

                {{-- <div class="sidemenu-sub">
                    <ck-doc-sub-nav source=".__content"></ck-doc-sub-nav>
                    <div class="s-loader:square-dots s-color:accent s-until:sibling:active"></div>
                </div> --}}

                <div class="sidemenu-main" s-refocus offset-y="100" trigger="event:actual">

                    <h5 class="s-typo:h5 s-mbe:30">
                        Styleguide
                    </h5>

                    @php $menu = get_object_vars($docmap->menu->custom->styleguide->tree->styleguide); @endphp
                    @include('pages.markdown.menu', ['menu' => $menu, 'id' => 'main', 'icon' => 'display-preview'])

                </div>

            </nav>

            <div s-page-transition-container="styleguide">

                <div s-scope class="__content s-pb:50">

                    @if (!count((array) $docblocks))

                        <h1 class="s-typo:h1 s-mbe:30">
                            No styleguide selected
                        </h1>

                        <p class="s-typo:lead s-mbe:30">
                            Please select a styleguide from the sidemenu
                        </p>
                        
                    @else

                        @foreach ($docblocks as $docblock)
                            @if (!isset($docblock->private))
                                @include('generic.docblock.block', ['block' => $docblock, 'isStyleguide' => true, 'isFirst' =>
                                $loop->first])
                            @endif
                        @endforeach

                        <ck-doc-sub-nav></ck-doc-sub-nav>

                    @endif

                </div>

            </div>

        </div>
    </section>

</div>