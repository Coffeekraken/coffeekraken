<nav class="doc-sidenav">
    
    <div s-activate class="doc-sidenav__group s-mbe:30" id="doc-intro" toggle save-state>             
        <h3 class="s-typo:h4">
            <span class="doc-sidenav__group-toggle"></span>
            {{ $title ?? $block->type }}
        </h3>
    </div>
    <ul class="s-list:ul:icon:accent">
        @if ($block->description)
            <li class="s-font:40">
                <i class="s-icon:info"></i>
                <a href="#{{ $block->name }}" title="Description">
                    Description
                </a>
            </li>
        @endif
        @if ($block->install)
            <li class="s-font:40">
                <i class="s-icon:install"></i>
                <a href="#install-{{ $block->name }}" title="install">
                    Install
                </a>
            </li>
        @endif
        @if ($block->import)
            <li class="s-font:40">
                <i class="s-icon:import"></i>
                <a href="#import-{{ $block->name }}" title="Import">
                    Import
                </a>
            </li>
        @endif
        @if ($block->example)
            <li class="s-font:40">
                <i class="s-icon:example"></i>
                <a href="#example-{{ $block->name }}" title="Example">
                    Example
                </a>
            </li>
        @endif
        @if ($block->feature)
            <li class="s-font:40">
                <i class="s-icon:box"></i>
                <a href="#features-{{ $block->name }}" title="Features">
                    Features
                </a>
            </li>
        @endif
        @if ($block->cssClass)
            <li class="s-font:40">
                <i class="s-icon:css"></i>
                <a href="#cssClass-{{ $block->name }}" title="CSS Classes">
                    CSS Classes
                </a>
            </li>
        @endif
        @if ($block->param)
            <li class="s-font:40">
                <i class="s-icon:list-ul"></i>
                <a href="#parameters-{{ $block->name }}" title="Parameters">
                    Parameters
                </a>
            </li>
        @endif
        @if ($block->interface)
            <li class="s-font:40">
                <i class="s-icon:list-ul"></i>
                <a href="#interface-{{ $block->name }}" title="interface">
                    interface
                </a>
            </li>
        @endif
        @if ($block->return)
            <li class="s-font:40">
                <i class="s-icon:return"></i>
                <a href="#return-{{ $block->name }}" title="Return">
                    Return
                </a>
            </li>
        @endif
        @if ($block->setting)
            <li class="s-font:40">
                <i class="s-icon:setting"></i>
                <a href="#settings-{{ $block->name }}" title="Settings">
                    Settings
                </a>
            </li>
        @endif
        @if ($block->todo)
            <li class="s-font:40">
                <i class="s-icon:tasks"></i>
                <a href="#todo-{{ $block->name }}" title="Todo">
                    Todo
                </a>
            </li>
        @endif
        @if ($block->see)
            <li class="s-font:40">
                <i class="s-icon:box"></i>
                <a href="#related-{{ $block->name }}" title="Related resource(s)">
                    Related resource(s)
                </a>
            </li>
        @endif
    </ul>

    @if ($docblocks)
        @php
            $methods = array_filter($docblocks, function($block, $i) {
                if ($i <= 0) return false;
                if ($block->private) return false;
                if ($block->name == 'constructor') return false;
                if (strtolower($block->type) != 'function') return false;
                return true;
            }, ARRAY_FILTER_USE_BOTH);
        @endphp
        @if (count($methods))

            <div s-activate class="doc-sidenav__group s-mbe:30 s-mbs:50" id="doc-methods" toggle save-state>
                <h3 class="s-typo:h3">
                    <span class="doc-sidenav__group-toggle"></span>
                    Methods
                </h3>
            </div>
            <ul class="s-list:ul:accent">
                @foreach ($methods as $block)
                    <li class="s-font:40">
                        <a href="#{{ $block->name }}" title="{{ $block->name }} method">
                            {{ $block->name }} 
                        </a>
                    </li>
                @endforeach
            </ul>

        @endif

        @php
            $props = array_filter($docblocks, function($block, $i) {
                if ($i <= 0) return false;
                if ($block->private) return false;
                if (strtolower($block->type) == 'function') return false;
                return true;
            }, ARRAY_FILTER_USE_BOTH);
        @endphp
        @if (count($props))

            <div s-activate class="doc-sidenav__group s-mbe:30 s-mbs:50" id="doc-props" toggle save-state>
                <h3 class="s-typo:h3">
                    <span class="doc-sidenav__group-toggle"></span>
                    Properties
                </h3>
            </div>
            <ul class="s-list:ul:accent">
                @foreach ($props as $prop)                                
                    <li class="s-font:40">
                        <a href="#{{ $prop->name }}" title="{{ $prop->name }} property">
                            {!! $prop->get ? '<span class="s-color:accent">get</span>' : '' !!}{!! $prop->set ? '|<span class="s-color:accent">set</span>' : '' !!} {{ $prop->name }}
                        </a>
                    </li>
                @endforeach
            </ul>

        @endif
    @endif

</nav>