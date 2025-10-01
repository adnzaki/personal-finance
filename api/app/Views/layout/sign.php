<?php if (isset($signs) && $signFormat): ?>

    <?php
    // make default format as '1' if the given format is not valid
    // move the HTML here so we can reuse it for 1, 2 and invalid format
    $validFormats = ['1_2', '1_3', '3_1_2', '2_1_3'];
    ?>

    <?php if (in_array($signFormat, $validFormats)): ?>
        <table style="width: 100%;" class="line-1">
            <tr>
                <?php $index = 0;
                foreach ($signs as $sign): ?>
                    <td style="width: <?= 100 / count($signs) ?>%; vertical-align: top;" class="font-11">
                        <?php if ($index === 1 && count($signs) === 3): ?>
                            <br><br><br><br><br><br><br>
                        <?php endif; ?>
                        <p class="text-center">
                            <?= $sign['title'] ?><br />
                            <?= $sign['position'] ?>
                        </p>
                        <p class="text-center" style="margin-top: 80px;">
                            <strong><?= strtoupper($sign['name']) ?></strong><br />
                        </p>
                    </td>
                <?php $index++;
                endforeach; ?>
            </tr>
        </table>
    <?php else: ?>
        <div style="margin-left: 50%;" class="font-11">
            <p class="text-center">
                <?= $signs[0]['title'] ?><br />
                <?= $signs[0]['position'] ?>
            </p>
            <p class="text-center" style="margin-top: 80px;">
                <strong><?= strtoupper($signs[0]['name']) ?></strong><br />
            </p>
        </div>
    <?php endif; ?>

<?php endif; ?>