<section class="section" id="doc" viewport-aware>

    <div class="s-container">

        {{-- <pre>
    {{ var_dump($docblocks) }} --}}

        <div class="doc">
            <div>
                <ul role="tree" class="doc_categories">
                    @foreach ($categories as $key => $category)
                        <li role="treeitem" id="{{ $key }}" class="_category" tabindex="0" s-activate
                            id="doc-category-{{ $key }}" toggle trigger="click,event:actual" save-state>
                            <div class="_category-link">
                                <span>{{ $category->title }}</span>
                            </div>
                            <div class="_expandable">
                                <div class="_expandable-inner">
                                    <ul role="group" class="_items">
                                        @foreach ($category->items as $item)
                                            <li role="treeitem" class="_item">
                                                <a href="/doc/{{ $item->id }}" class="_item-link">
                                                    <span>{{ $item->as ?? $item->name }}</span>
                                                </a>
                                            </li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                        </li>
                    @endforeach
                </ul>
            </div>
            <div>

                <header class="_metas">
                    <h1 class="{{ \SViews\html\cls('_title', 's-typo:h1', @$view) }}">
                        {{ $currentDocmapItem->as ?? $currentDocmapItem->name }}
                    </h1>
                </header>

            </div>
        </div>

    </div>

</section>
