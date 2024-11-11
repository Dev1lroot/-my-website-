<!DOCTYPE html>
<html lang="{{ lang }}">
<head>
    <meta charset="UTF-8">

    <meta http-equiv="Content-Language" content="{{ lang }}">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Здесь опиши содержание страницы. Это текст, который будет отображаться в результатах поиска.">
    <meta name="keywords" content="ключевое, слово, 1, ключевое, слово, 2">
    <meta name="author" content="Твое Имя">
    <meta name="robots" content="index, follow">
    
    <meta property="og:title" content="Заголовок для социальных сетей">
    <meta property="og:description" content="Описание для Open Graph, отображается в социальных сетях">
    <meta property="og:image" content="URL_к_изображению">
    <meta property="og:url" content="URL_страницы">
    
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Заголовок для Twitter">
    <meta name="twitter:description" content="Описание для Twitter">
    <meta name="twitter:image" content="URL_к_изображению_для_Twitter">
    {{ meta }}
    {{ links }}
    <title>{{ title }}</title>
    <script src="vue.global.js"></script>
    <script src="main.js" defer></script>
</head>
<body>
    <main>
        {{ body }}
    </main>
</body>
</html>