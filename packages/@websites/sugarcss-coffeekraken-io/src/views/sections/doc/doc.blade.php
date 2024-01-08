<section class="section" id="doc" viewport-aware>

    <div class="s-container">

    {{-- <pre>
    {{ var_dump($docblocks) }} --}}

        <div class="doc">
            <div>
                <ul role="tree" class="doc_categories">
                    @foreach ($categories as $key => $category)
                        <li role="treeitem" id="{{ $key }}" class="_category" tabindex="0">
                            <a href="#{{ $key }}" class="_category-link" s-activate id="doc-category-{{ $key }}" toggle save-state>
                                <span>{{ $category->title }}</span>
                            </a>
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

                <h1 class="s-typo:h1">{{ $currentItem->as ?? $currentItem->name }}</h1>

            </div>
        </div>

    </div>

</section>