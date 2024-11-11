<?php

$_LANG = (isset($_GET["lang"]) && in_array($_GET["lang"],["en","ru","fr"])) ? $_GET["lang"] : "en";



$template = file_get_contents("templates/main.tpl");


$template = str_replace("{{ meta }}", implode("\n",[
    '<link rel="alternate" hreflang="en" href="https://'.$_SERVER["HTTP_HOST"].'/en/" />',
    '<link rel="alternate" hreflang="ru" href="https://'.$_SERVER["HTTP_HOST"].'/ru/" />',
    '<link rel="alternate" hreflang="fr" href="https://'.$_SERVER["HTTP_HOST"].'/fr/" />'
]);


print($template);

?>