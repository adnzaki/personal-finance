<div class="pt-5 pl-20 pr-20 font-11">
    <div class="line-1">
        <h3 class="text-center font-12"><?= strtoupper($title) ?></h3>
        <p class="text-center">Periode: <?= $period ?></p>
    </div>

    <table class="ml-20 mt-20 pl-10 line-1" style="width: 100%; border-collapse: collapse;">
        <tr>
            <th class="bordered text-center pt-5 pb-5" colspan="4">SALDO AWAL</th>
        </tr>
        <tr>
            <td class="left-bordered right-bordered pl-10 text-left pt-5 pb-5" colspan="4">Terdiri dari:</td>
        </tr>
        <?php $currency = '<td class="pt-5 pb-5 pl-5">Rp</td>'; ?>
        <?php $index = 1;
        foreach ($startBalance as $row): ?>
            <tr>
                <td class="left-bordered pt-5 pb-5 text-center" style="width: 10%;"><?= $index ?></td>
                <td class="pt-5 pb-5 pl-5" style="width: 50%;"><?= $row['owner'] ?></td>
                <?= $currency ?>
                <td class="right-bordered pt-5 pb-5 text-right pr-5" style="width: 25%;"><?= plain_number_format($row['balance']) ?></td>
            </tr>
        <?php $index++;
        endforeach; ?>
        <tr>
            <th class="bottom-bordered left-bordered text-left pl-10 pt-5 pb-5" colspan="2">Total Saldo Awal</th>
            <td class="pt-5 pb-5 pl-5 top-bordered border-top-2">Rp</td>
            <th class="bottom-bordered top-bordered right-bordered text-right pt-5 pb-5 pr-5 border-top-2"><?= $totalStartBalance ?></th>
        </tr>
        <tr>
            <th class="bordered text-center pt-5 pb-5" colspan="4">MUTASI</th>
        </tr>
        <tr>
            <th class="left-bordered right-bordered text-left pl-10 pt-5 pb-5" colspan="4">Pemasukan</th>
        </tr>
        <?php $index = 1;
        foreach ($mutationsIn as $key => $value): ?>
            <tr>
                <td class="left-bordered pt-5 pb-5 text-center" style="width: 10%;"><?= $index ?></td>
                <td class="right-bordered" colspan="3"><?= $key ?></td>
            </tr>
            <?php $number = 1;
            foreach ($value as $row): ?>
                <tr>
                    <td class="left-bordered"></td>
                    <td class="pt-5 pb-5"><?= alphabet_numbering($number) . '. ' . $row['name'] ?></td>
                    <?= $currency ?>
                    <td class="right-bordered pt-5 pb-5 text-right pr-5"><?= $row['amount'] ?></td>
                </tr>
            <?php $number++;
            endforeach; ?>
            <tr>
                <td class="left-bordered"></td>
                <td class="text-left pt-5 pb-5">Jumlah</td>
                <td class="pt-5 pb-5 pl-5 top-bordered">Rp</td>
                <td class="top-bordered right-bordered text-right pt-5 pb-5 pr-5"><?= plain_number_format($totalMutationsIn[$key]) ?></td>
            </tr>
        <?php $index++;
        endforeach; ?>
        <tr>
            <th class="bottom-bordered left-bordered text-left pl-10 pt-5 pb-5" colspan="2">Total Pemasukan</th>
            <th class="bottom-bordered top-bordered right-bordered text-right pt-5 pb-5 pr-5 border-top-2" colspan="2"><?= $sumMutationsIn ?></th>
        </tr>
        <tr class="mt-10">
            <th class="left-bordered right-bordered text-left pl-10 pt-5 pb-5" colspan="4">Pengeluaran</th>
        </tr>
        <?php $index = 1;
        foreach ($mutationsOut as $key => $value): ?>
            <tr>
                <td class="left-bordered pt-5 pb-5 text-center" style="width: 10%;"><?= $index ?></td>
                <td class="right-bordered" colspan="3"><?= $key ?></td>
            </tr>
            <?php $number = 1;
            foreach ($value as $row): ?>
                <tr>
                    <td class="left-bordered"></td>
                    <td class="pt-5 pb-5"><?= alphabet_numbering($number) . '. ' . $row['name'] ?></td>
                    <?= $currency ?>
                    <td class="right-bordered pt-5 pb-5 text-right pr-5"><?= $row['amount'] ?></td>
                </tr>
            <?php $number++;
            endforeach; ?>
            <tr>
                <td class="left-bordered"></td>
                <td class="text-left pt-5 pb-5">Jumlah</td>
                <td class="pt-5 pb-5 pl-5 top-bordered">Rp</td>
                <td class="top-bordered right-bordered text-right pt-5 pb-5 pr-5"><?= plain_number_format($totalMutationsOut[$key]) ?></td>
            </tr>
        <?php $index++;
        endforeach; ?>
        <tr>
            <th class="bottom-bordered left-bordered text-left pl-10 pt-5 pb-5" colspan="2">Total Pengeluaran</th>
            <th class="bottom-bordered top-bordered right-bordered text-right pt-5 pb-5 pr-5 border-top-2" colspan="2"><?= $sumMutationsOut ?></th>
        </tr>
        <tr>
            <th class="bordered text-center pt-5 pb-5" colspan="4">SALDO AKHIR</th>
        </tr>
        <?php $index = 1;
        foreach ($balance as $row): ?>
            <tr>
                <td class="left-bordered pt-5 pb-5 text-center" style="width: 10%;"><?= $index ?></td>
                <td class="pt-5 pb-5 right-bordered" style="width: 50%;" colspan="3"><?= $row['owner'] ?></td>
            </tr>
            <?php $number = 1;
            foreach ($row['details'] as $key): ?>
                <tr>
                    <td class="left-bordered"></td>
                    <td class="pt-5 pb-5"><?= alphabet_numbering($number) . '. ' . $key->nama_sumber_dana ?></td>
                    <?= $currency ?>
                    <td class="right-bordered pt-5 pb-5 text-right pr-5"><?= plain_number_format($key->jumlah_dana) ?></td>
                </tr>
            <?php $number++;
            endforeach; ?>
            <tr>
                <td class="left-bordered"></td>
                <td class="text-left pt-5 pb-5">Jumlah</td>
                <td class="pt-5 pb-5 pl-5 top-bordered">Rp</td>
                <td class="top-bordered right-bordered text-right pt-5 pb-5 pr-5"><?= $row['balance_f'] ?></td>
            </tr>
        <?php $index++;
        endforeach; ?>
        <tr>
            <th class="bottom-bordered top-bordered left-bordered text-left pl-10 pt-5 pb-5 border-top-2" colspan="2">Total Saldo Akhir</th>
            <th class="bottom-bordered top-bordered right-bordered text-right pt-5 pb-5 pr-5 border-top-2" colspan="2"><?= $totalAllBalance ?></th>
        </tr>
    </table>
</div>