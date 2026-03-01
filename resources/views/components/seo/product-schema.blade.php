@props(['product'])

@php
    // images — это JSON-массив, не Eloquent-коллекция, безопасное получение
    $images = $product->images ?? [];
    if (is_string($images)) {
        $images = json_decode($images, true) ?? [];
    }
    $firstImage = !empty($images) ? (is_array($images[0]) ? ($images[0]['url'] ?? $images[0]) : $images[0]) : null;
    $imageUrl = $firstImage ?? $product->main_image ?? null;

    // Цены: наша = 80% от розницы
    $ourPrice = round($product->price_retail * 0.80, 2);
    $retailPrice = $product->price_retail;

    // Наличие
    $totalStock = ($product->stock_yanino ?? 0) + ($product->stock_factory ?? 0);
    $availability = $totalStock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock';

    // Описание
    $description = $product->seo_description
        ?? strip_tags($product->description ?? '')
        ?: 'Купить ' . $product->name . ' по выгодной цене. Официальный дилер Cersanit в Санкт-Петербурге.';

    // additionalProperty — все технические характеристики
    $additionalProps = [];
    $specMap = [
        'format'        => 'Формат плитки',
        'surface'       => 'Тип поверхности',
        'color'         => 'Цвет',
        'material_type' => 'Материал',
        'application'   => 'Назначение',
        'design'        => 'Дизайн',
        'thickness'     => 'Толщина, мм',
        'collection'    => 'Коллекция',
        'country'       => 'Страна производства',
    ];
    foreach ($specMap as $field => $label) {
        $value = $product->$field ?? null;
        if (!empty($value)) {
            if (is_array($value)) $value = implode(', ', $value);
            $additionalProps[] = ['@type' => 'PropertyValue', 'name' => $label, 'value' => (string)$value];
        }
    }

    // technical_specs если заполнены
    $techSpecs = $product->technical_specs ?? [];
    if (is_string($techSpecs)) $techSpecs = json_decode($techSpecs, true) ?? [];
    foreach ((array)$techSpecs as $specName => $specValue) {
        if (!empty($specValue)) {
            if (is_array($specValue)) $specValue = implode(', ', $specValue);
            $additionalProps[] = ['@type' => 'PropertyValue', 'name' => (string)$specName, 'value' => (string)$specValue];
        }
    }
    if ($product->pieces_per_box) {
        $additionalProps[] = ['@type' => 'PropertyValue', 'name' => 'Кол-во плиток в упаковке', 'value' => (string)$product->pieces_per_box];
    }
    if ($product->sqm_per_box) {
        $additionalProps[] = ['@type' => 'PropertyValue', 'name' => 'м² в упаковке', 'value' => (string)$product->sqm_per_box];
    }

    // Сборка схемы
    $schema = [
        '@context'     => 'https://schema.org',
        '@type'        => 'Product',
        'name'         => $product->name,
        'description'  => $description,
        'sku'          => $product->sku,
        'mpn'          => $product->sku,
        'brand'        => ['@type' => 'Brand', 'name' => $product->brand ?? 'Cersanit'],
        'manufacturer' => 'Cersanit',
        'category'     => $product->product_type ?? 'Керамическая плитка',
        'url'          => route('product.show', $product->sku),
    ];
    if ($imageUrl) {
        // str_starts_with защищает от двойного url() если картинка уже абсолютная
        $schema['image'] = str_starts_with($imageUrl, 'http') ? $imageUrl : url($imageUrl);
    }
    if (!empty($additionalProps)) {
        $schema['additionalProperty'] = $additionalProps;
    }
    $schema['offers'] = [
        '@type'           => 'AggregateOffer',
        'priceCurrency'   => 'RUB',
        'lowPrice'        => $ourPrice,
        'highPrice'       => $retailPrice,
        'availability'    => $availability,
        'url'             => route('product.show', $product->sku),
        'priceValidUntil' => now()->addYear()->format('Y-m-d'),
    ];
@endphp

<script type="application/ld+json">
{!! json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}
</script>
