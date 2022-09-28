@php

    $finalId = $id;
    if (!isset($id)) {
        $finalId = 's-layout-' . uniqid();
    }

    $defaultCss = \Sugar\css\layoutCss($layout, [
        'selector' => '#' . $finalId,
    ]);

    $mediasCss = [];
    if (isset($medias)) {
        foreach ($medias as $key => $mediaObj) {
            $mediaObj = (object) $mediaObj;
            $css = \Sugar\css\layoutCss($mediaObj->layout, [
                'selector' => '#' . $finalId,
                'media' => $mediaObj->media,
                'mediaSettings' => $frontspec->media
            ]);
            array_push($mediasCss, $css);
        }
    }

@endphp

<style>
    {!! $defaultCss !!}
    {!! implode('\n', $mediasCss) !!}
</style>
<div id="{{ $finalId }}" @foreach ($attributes as $prop => $value) {{ $prop }}="{{ $value }}" @endforeach>
    {!! $content !!}
</div>