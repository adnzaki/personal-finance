<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <title><?= $pageTitle ?></title>
    <?= view('layout/style') ?>
</head>

<body>
    <? //= view('layout/header') 
    ?>
    <div class="main-content">
        <?= $content ?>
        <?= view('layout/sign') ?>
    </div>
</body>

</html>