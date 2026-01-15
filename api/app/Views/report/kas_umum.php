<div class="pt-5 pl-20 pr-20 font-11">
    <div class="line-1">
        <h3 class="text-center font-12"><?= strtoupper($title) ?></h3>
        <p class="text-center">Periode: <?= $period ?></p>
    </div>

    <table class="ml-20 mt-20 pl-10 line-1" style="width: 100%; border-collapse: collapse;">
        <tr>
            <th class="bordered text-center pt-10 pb-10" style="width: 5%;">NO</th>
            <th class="bordered text-center pt-10 pb-10" style="width: 15%;">TANGGAL</th>
            <th class="bordered text-center pt-10 pb-10" style="width: 40%;">URAIAN</th>
            <th class="bordered text-center pt-10 pb-10" style="width: 15%;">PENERIMAAN</th>
            <th class="bordered text-center pt-10 pb-10" style="width: 15%;">PENGELUARAN</th>
            <th class="bordered text-center pt-10 pb-10" style="width: 15%;">SALDO</th>
        </tr>
        <?php foreach ($rows as $row): ?>
            <tr>
                <td class="bordered pt-5 pb-5 text-center"><?= $row['no'] ?></td>
                <td class="bordered pt-5 pb-5 text-center"><?= os_date()->create($row['tanggal'], 'd-MM-y') ?></td>
                <td class="bordered pt-5 pb-5 pl-5"><?= $row['uraian'] ?></td>
                <td class="bordered pt-5 pb-5 text-right pr-5"><?= $row['pemasukan'] ?></td>
                <td class="bordered pt-5 pb-5 text-right pr-5"><?= $row['pengeluaran'] ?></td>
                <td class="bordered pt-5 pb-5 text-right pr-5"><?= $row['saldo'] ?></td>
            </tr>
        <?php endforeach; ?>
        <tr class="bordered">
            <td class="pl-5 pt-5 pb-5" colspan="3"><strong>Jumlah penerimaan dan pengeluaran periode ini</strong></td>
            <td class="pt-5 pb-5 text-right pr-5"><strong><?= $totalIncomeExpense['total_income'] ?></strong></td>
            <td class="pt-5 pb-5 text-right pr-5"><strong><?= $totalIncomeExpense['total_expense'] ?></strong></td>
            <td class="pt-5 pb-5 text-right pr-5"><strong></strong></td>
        </tr>
        <tr class="bordered">
            <td class="pl-5 pt-5 pb-5" colspan="5"><strong>Saldo Akhir</strong></td>
            <td class="pt-5 pb-5 text-right pr-5"><strong><?= $balance['end_balance'] ?></strong></td>
        </tr>
    </table>
</div>