@if ($block->todo)
    <h4 id="todo-{{ $block->name }}" class="s-typo:h4 s-mbes:80 s-mbe:50">
        <i class="s-icon:tasks s-color:accent"></i>&nbsp;&nbsp;Todo
    </h4>

    <ul class="s-list:ul:accent s-mbe:50">
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
                    <i class="s-icon:todo s-color:{{ $todoColor }}"></i>
                    <div class="s-tooltip:nowrap">
                        {{ $todo->priority }} priority
                    </div>
                </span>&nbsp;&nbsp;{{ $todo->description }}
            </li>
        @endforeach
    </ul>
@endif