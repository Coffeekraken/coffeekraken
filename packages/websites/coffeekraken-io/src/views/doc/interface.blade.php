    <h4 id="interface-{{ $interface->name }}" class="s-typo:h4 s-mb:50">
        <i class="s-icon:list-ul s-tc:accent"></i>&nbsp;&nbsp;Interface
    </h4>

    @include('.doc.propsDefinition', ['definition' => $interface->definition])