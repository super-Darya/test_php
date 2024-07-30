/**
 * @charset UTF-8
 *
 * Задание 2. Работа с массивами и строками.
 *
 * Есть список временных интервалов (интервалы записаны в формате чч:мм-чч:мм).
 *
 * Необходимо написать две функции:
 *
 *
 * Первая функция должна проверять временной интервал на валидность
 * 	принимать она будет один параметр: временной интервал (строка в формате чч:мм-чч:мм)
 * 	возвращать boolean
 *
 *
 * Вторая функция должна проверять "наложение интервалов" при попытке добавить новый интервал в список существующих
 * 	принимать она будет один параметр: временной интервал (строка в формате чч:мм-чч:мм). Учесть переход времени на следующий день
 *  возвращать boolean
 *
 *  "наложение интервалов" - это когда в промежутке между началом и окончанием одного интервала,
 *   встречается начало, окончание или то и другое одновременно, другого интервала
 *
 *
 *
 *  пример:
 *
 *  есть интервалы
 *  	"10:00-14:00"
 *  	"16:00-20:00"
 *
 *  пытаемся добавить еще один интервал
 *  	"09:00-11:00" => произошло наложение
 *  	"11:00-13:00" => произошло наложение
 *  	"14:00-16:00" => наложения нет
 *  	"14:00-17:00" => произошло наложение
 */

<?php

// Проверка на валидность
function isValidTimeRange($timeRange) {
    if (preg_match("/^(?:[0-1]\d|2[0-3]):[0-5]\d-(?:[0-1]\d|2[0-3]):[0-5]\d$/", $timeRange)) {
        return true;
    } else {
        return false;
    }
}

// Проверка наложения интервалов
function isTimeRangeOverlap($newTimeRange, $existingTimeRanges) {
    list($newStart, $newEnd) = explode('-', $newTimeRange);
    $newStart = strtotime($newStart);
    $newEnd = strtotime($newEnd);

    foreach ($existingTimeRanges as $existingTimeRange) {
        list($start, $end) = explode('-', $existingTimeRange);

        $start = strtotime($start);
        $end = strtotime($end);

        if (($newStart >= $start && $newStart < $end) || ($newEnd > $start && $newEnd <= $end) || ($newStart <= $start && $newEnd >= $end) 
        || (($newStart > $start && $newEnd <= $end && $newStart < $end))) {
            return true; // Наложение интервалов
        }
    }

    return false; // Наложения нет
}

// Пример использования
$list = array (
    '09:00-11:00',
    '11:00-13:00',
    '15:00-16:00',
    '17:00-20:00',
    '20:30-21:30',
    '21:30-22:30',
);

$newTimeRange = "15:20-01:00";

// Функция со всеми проверками
function check_time($newTimeRange, $list){
    if (isValidTimeRange($newTimeRange)) {
    
        if (isTimeRangeOverlap($newTimeRange, $list)) {
            echo "Наложение интервалов";
            return true;
        } else {
            echo "Без наложения интервалов";
            return false;
        }
    } else {
        echo "Некорректный формат временного интервала!";
    }
}

var_dump(isValidTimeRange($newTimeRange));
var_dump(isTimeRangeOverlap($newTimeRange, $list));
// var_dump(check_time($newTimeRange, $list));
?>