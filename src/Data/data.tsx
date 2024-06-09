function importAll(r) {
    return r.keys().map(r);
}
const CreatePairs = (images: [], words: string[]) => {
    return words.map((item, index) => { return { image: images[index], word: item } })
}

const words = {};

const berriesImages = importAll(require.context('./images/berries', false, /\.(png|jpe?g|svg)$/));
const berriesWords = ["Ягоды", "Ежевика", "Черника", "Вишня", "Крыжовник", "Виноград", "Облепиха", "Жимолость", "Малина", "Клубника", "Черешня", "Арбуз"]
words['berries'] = CreatePairs(berriesImages, berriesWords);

const colorsImages = importAll(require.context('./images/colors', false, /\.(png|jpe?g|svg)$/));
const colorsWords = ["Чёрный", "Синий", "Коричневый", "Голубой", "Серый", "Зелёный", "Оранжевый", "Розовый", "Фиолетовый", "Красный", "Белый", "Жёлтый"]
words['colors'] = CreatePairs(colorsImages, colorsWords);

const dishesImages = importAll(require.context('./images/dishes', false, /\.(png|jpe?g|svg)$/));
const dishesWords = ["Чашка", "Посуда", "Вилка", "Стакан", "Терка", "Нож", "Кружка", "Сковорода", "Тарелка", "Кастрюля", "Ложка", "Чайник"]
words['dishes'] = CreatePairs(dishesImages, dishesWords);

const domesticImages = importAll(require.context('./images/domestic', false, /\.(png|jpe?g|svg)$/));
const domesticWords = ["Кошка", "Курица", "Петух", "Корова", "Собака", "Осел", "Утка", "Коза", "Гусь", "Лошадь", "Кролик", "Овца"]
words['domestic'] = CreatePairs(domesticImages, domesticWords);

const forestImages = importAll(require.context('./images/forest', false, /\.(png|jpe?g|svg)$/));
const forestWords = ["Медведь", "Бобр", "Олень", "Лиса", "Заяц", "Ёж", "Рысь", "Лось", "Сова", "Енот", "Белка", "Волк"]
words['forest'] = CreatePairs(forestImages, forestWords);

const fruitsImages = importAll(require.context('./images/fruits', false, /\.(png|jpe?g|svg)$/));
const fruitsWords = ["Яблоко", "Абрикос", "Банан", "Фрукты", "Киви", "Лимон", "Апельсин", "Персик", "Груша", "Ананас", "Гранат", "Мандарин"]
words['fruits'] = CreatePairs(fruitsImages, fruitsWords);

const savannaImages = importAll(require.context('./images/savanna', false, /\.(png|jpe?g|svg)$/));
const savannaWords = ["Крокодил", "Слон", "Фламинго", "Жираф", "Бегемот", "Леопард", "Лев", "Обезьяна", "Страус", "Носорог", "Тигр", "Зебра"]
words['savanna'] = CreatePairs(savannaImages, savannaWords);

const seaImages = importAll(require.context('./images/sea', false, /\.(png|jpe?g|svg)$/));
const seaWords = ["Краб", "Дельфин", "Рыба", "Медуза", "Осьминог", "Скат", "Морской конёк", "Акула", "Креветка", "Морская звезда", "Черепаха", "Кит"]
words['sea'] = CreatePairs(seaImages, seaWords);

const shapesImages = importAll(require.context('./images/shapes', false, /\.(png|jpe?g|svg)$/));
const shapesWords = ["Круг", "Шестиугольник", "Овал", "Пятиугольник", "Прямоугольник", "Ромб", "Полукруг", "Фигуры", "Квадрат", "Звезда", "Трапеция", "Треугольник"]
words['shapes'] = CreatePairs(shapesImages, shapesWords);

const vegetablesImages = importAll(require.context('./images/vegetables', false, /\.(png|jpe?g|svg)$/));
const vegetablesWords = ["Свёкла", "Капуста", "Морковь", "Огурец", "Баклажан", "Чеснок", "Кабачок", "Лук", "Перец", "Картофель", "Помидор", "Овощи"]
words['vegetables'] = CreatePairs(vegetablesImages, vegetablesWords);
/*
const forestWords = [, , , , , , , , , , , ]
 */

export default words
