@if ($block->todo)
    <h4 id="todo-{{ $block->name }}" class="s-typo:h4 s-mbes:80 s-mb:50">
        <i class="s-icon:tasks s-tc:accent"></i>&nbsp;&nbsp;Todo
    </h4>

    <ul class="s-list:ul:accent">
        @foreach ($block->todo as $todo)
            @php
                $todoColor = 'warning';
                if ($todo->priority == 'low') {
                    $todoColor = 'success';
                }
                if ($todo->priority == 'high') {
                    $todoColor = 'error';
                }
            @endphp
            <li class="s-typo:p">
                <span class="s-tooltip-container">
                    <i class="s-icon:todo s-tc:{{ $todoColor }}"></i>
                    <div class="s-tooltip:nowrap">
                        {{ $todo->priority }} priority
                    </div>
                </span>&nbsp;&nbsp;<span class="s-format:text">{!! \Sugar\markdown\toHtml($todo->description) !!}</span>
            </li>
        @endforeach
    </ul>
@endif
