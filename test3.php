<?php
/**
 * @charset UTF-8
 *
 * Задание 3
 * В данный момент компания X работает с двумя перевозчиками
 * 1. Почта России
 * 2. DHL
 * У каждого перевозчика своя формула расчета стоимости доставки посылки
 * Почта России до 10 кг берет 100 руб, все что cвыше 10 кг берет 1000 руб
 * DHL за каждый 1 кг берет 100 руб
 * Задача:
 * Необходимо описать архитектуру на php из методов или классов для работы с
 * перевозчиками на предмет получения стоимости доставки по каждому из указанных
 * перевозчиков, согласно данным формулам.
 * При разработке нужно учесть, что количество перевозчиков со временем может
 * возрасти. И делать расчет для новых перевозчиков будут уже другие программисты.
 * Поэтому необходимо построить архитектуру так, чтобы максимально минимизировать
 * ошибки программиста, который будет в дальнейшем делать расчет для нового
 * перевозчика, а также того, кто будет пользоваться данным архитектурным решением.
 *
 */

# Использовать данные:
# любые

// Интерфейс стратегии расчета стоимости доставки
interface DeliveryCostStrategy
{
    public function calculateCost($weight);
}

// Реализация стратегии для Почты России
class RussianPostDelivery implements DeliveryCostStrategy
{
    public function calculateCost($weight)
    {
        if ($weight <= 10) {
            return 100;
        } else {
            return 1000;
        }
    }
}

// Реализация стратегии для DHL
class DHLDelivery implements DeliveryCostStrategy
{
    public function calculateCost($weight)
    {
        return $weight * 100;
    }
}

// Класс, который управляет стратегиями расчета стоимости доставки
class DeliveryCalculator
{
    private $strategy;

    public function setStrategy(DeliveryCostStrategy $strategy)
    {
        $this->strategy = $strategy;
    }

    public function calculateCost($weight)
    {
        if ($this->strategy === null) {
            throw new Exception("Стратегия не установлена.");
        }

        return $this->strategy->calculateCost($weight);
    }
}

// Пример использования
$calculator = new DeliveryCalculator();

// Для Почты России
$russianPost = new RussianPostDelivery();
$calculator->setStrategy($russianPost);
echo "Стоимость доставки Почтой России: " . $calculator->calculateCost(11) . " руб.\n";

// Для DHL
$dhl = new DHLDelivery();
$calculator->setStrategy($dhl);
echo "Стоимость доставки DHL: " . $calculator->calculateCost(8) . " руб.\n";
?>