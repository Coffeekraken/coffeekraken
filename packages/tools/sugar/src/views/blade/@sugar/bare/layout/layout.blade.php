@php

    $finalId = $id;
    if (!isset($id)) {
        $finalId = 's-layout-' . uniqid();
    }

    $defaultCss = \Sugar\css\layoutCss($layout->default, [
        'selector' => '#' . $finalId,
    ]);

    $mediasCss = [];
    if (isset($medias)) {
        foreach ($layout as $media => $lay) {
            if ($media != 'default') {
                $css = \Sugar\css\layoutCss($lay, [
                    'selector' => '#' . $finalId,
                    'media' => $media,
                    'mediaSettings' => $frontspec->media
                ]);
                array_push($mediasCss, $css);
            }
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