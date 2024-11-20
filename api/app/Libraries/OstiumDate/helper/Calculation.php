<?php

/**
 * OstiumDate
 * Pustaka format dan perhitungan tanggal untuk Bahasa Indonesia
 * Pustaka ini awalnya diambil dari project OstiumCMS milih Adnan Zaki, web developer Wolestech
 *
 * @package		Application
 * @subpackage	Libraries
 * @category	Libraries
 * @author		Adnan Zaki
 * @link		https://wolestech.com
 */


require_once 'helper.php';

class Calculation
{
	/**
	 * Checks if the given date is between the start and end dates.
	 *
	 * @param string $checkDate The date to check.
	 * @param string $startDate The start date.
	 * @param string $endDate The end date.
	 *
	 * @return bool Returns true if the date is between the start and end dates, false otherwise.
	 */
	public function between(string $checkDate, string $startDate, string $endDate): bool
	{
		return strtotime($startDate) <= strtotime($checkDate) && strtotime($checkDate) <= strtotime($endDate);
	}

	/**
	 * Check if the given date is the same as the check date.
	 *
	 * @param string $date The date to check.
	 * @param string $checkDate The date to compare against.
	 *
	 * @return bool Returns true if the dates are the same, false otherwise.
	 */
	public function is(string $date, string $checkDate): bool
	{
		return strtotime($checkDate) === strtotime($date);
	}

    /**
     * Fungsi untuk menambah jumlah hari pada tanggal
     *
     * @param string $date now | dd-mm-yyyy
     * @param string|int|array $nums
     *
     * @return string
     */
    public function add(string $date = 'now', $nums = ''): string
    {
        return $this->calculate('add', $date, $nums);
    }

    /**
     * Fungsi untuk mengurangi jumlah hari pada tanggal
     *
     * @param string $date now | dd-mm-yyyy
     * @param string|array $nums
     *
     * @return string
     */
    public function sub(string $date = 'now', $nums = ''): string
    {
        return $this->calculate('sub', $date, $nums);
    }

    /**
     * Pemroses perhitungan tambah dan kurangi tanggal
     *
     * @param string $type
     * @param string $date
     * @param string|array $nums
     *
     * @return string
     */
    private function calculate(string $type, string $date = 'now', $nums = ''): string
    {
        if(empty($nums)) {
            return $this->error('empty');
        } else {
            if($date === 'now') {
                $date = date('Y-m-d');
            } else {
                $date = reverse($date, '-', '-');
            }

            // cek tipe data $nums untuk membuat interval
            if(gettype($nums) === 'integer') {
                $interval = new DateInterval('P'.(string)$nums.'D');
            } elseif(gettype($nums) === 'array') {
                if(! array_key_exists('d', $nums)) {
                    $nums['d'] = 0;
                }

                if(! array_key_exists('m', $nums)) {
                    $nums['m'] = 0;
                }

                if(! array_key_exists('y', $nums)) {
                    $nums['y'] = 0;
                }

                $days = (string)$nums['d'];
                $months = (string)$nums['m'];
                $year = (string)$nums['y'];

                // 'P[year]Y[months]M[days]D'
                $interval = new DateInterval('P'.$year.'Y'.$months.'M'.$days.'D');
            }

            $dt = new DateTime($date);
            if($type === 'add') {
                $dt->add($interval);
            } else {
                $dt->sub($interval);
            }

            return $dt->format('d-m-Y');
        }
    }

    /**
     * Fungsi untuk menghitung selisih hari/bulan/tahun
     *
     * @param string $date1
     * @param string $date2
     * @param string $printIn Opsi tersedia: [pn-days, total-days, num-only, month, year, y-m-d, m-d, y-d, y-m]
     * @param string $countFrom Opsi tersedia: [a-b, b-a], hanya untuk $printIn = 'pn-days
     *
     * @return string
     */
    public function diff(string $date1, string $date2, string $printIn, $countFrom = 'a-b'): string
    {
        $dateString1 = reverse($date1, '-', '-');
        $dateString2 = reverse($date2, '-', '-');

        $date1 = new DateTime(reverse($date1, '-', '-'));
        $date2 = new DateTime(reverse($date2, '-', '-'));

        switch ($printIn) {
            case 'pn-days': $outputText = '%R%a hari'; break;
            case 'total-days': $outputText = '%a hari'; break;
            case 'num-only': $outputText = '%a'; break;
            case 'month': $outputText = '%m bulan'; break;
            case 'year': $outputText = '%y tahun'; break;
            case 'y-m-d': $outputText = '%y tahun, %m bulan, %d hari'; break;
            case 'm-d': $outputText = '%m bulan, %d hari'; break;
            case 'y-d': $outputText = '%y tahun, %d hari'; break;
            case 'y-m': $outputText = '%y tahun, %m bulan'; break;
            default: $outputText = 'Format tidak tersedia'; break;
        }

        if($printIn === 'pn-days') {
            ($countFrom === 'a-b') ? $interval = $date1->diff($date2) : $interval = $date2->diff($date1);
        } else {
            $toTime1 = strtotime($dateString1);
            $toTime2 = strtotime($dateString2);
            ($toTime1 > $toTime2) ? $interval = $date1->diff($date2) : $interval = $date2->diff($date1);
        }

        return $interval->format($outputText);
    }

    protected function error($option, $hint = '')
    {
        $error = [
            'date' => "Invalid date input: <b>" . $hint . "</b>",
            'format' => "Invalid date format: <b>" . $hint . "</b",
            'empty' => 'No value inserted.',
            'failed' => 'Unable to read format.',
        ];

        return $error[$option];
    }
}
