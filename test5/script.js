let form = document.querySelector('.new-form');
let names = document.getElementById('name');
let table = document.getElementById('table_names');
let button = document.getElementById('addButton')

document.addEventListener( 'keyup', (event) => {
    
    if( event.code === 'Enter' ) {
        event.preventDefault();
        form.submit();
    }
  });

form.addEventListener('submit', (evt) => {
    // Отменяем действие по умолчанию
    evt.preventDefault();
    // Получаем значения поля формы
    let new_names = names.value;
    names.value = '';

    if(new_names.trim() == ""){
        alert('Пожалуйста, заполните поле');
        return;
    }

    const pattern = /^[,А-Яа-яЁё\s]+$/;
    if(!pattern.test(new_names)) {
    // if(!new_names.match('^[,А-Яа-яЁё\s]+$')) {
        alert('Поле может содержать только кириллические буквы и запятую');
        return;
    }

    let list_names = new_names.split(",");
    let counter = 0;
    let flag = false;
    if(list_names.length > 0){
        for (let i = 0; i < list_names.length; i++){
            let name_person = list_names[i].trim();
            if (name_person.length > 0){
                rowsCount = table.rows.length;
                flag = true;
                $.get('randomPhp.php',{text:'Text'}, function(data){
                    var newRow = $('<tr><td>' + (rowsCount + counter) + '</td><td>' + name_person + '</td><td>' + data + '</td></tr>');
                    $('#table_names').append(newRow);
                    counter++;
                    table.style.visibility = "visible";
                })
            }
            else{
                continue;
            }
        }
    }
    if (!flag){
        alert("Не введено ни одно имя. Заполните поле корректно");
    return
    }
    });

// Если нажат заголовок, то вызываем функцию сортировки sortTable
table.onclick = function (e) {
    if (e.target.tagName != 'TH') return
    let th = e.target
    sortTable(th.cellIndex, th.dataset.type)     
  }
  
// Функция сортировки 
  function sortTable(colNum, type) {                             
    let rowsArray = Array.from(table.rows)   
    rowsArray = rowsArray.slice(1);           
    let compare;                                       
    switch (type) {
      // сортировка для типа number
      case 'number':                                    
        compare = function (rowA, rowB) {
          return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML
        }
        break;
        // сортировка для типа string
      case 'string':                                 
        compare = function (rowA, rowB) {
          return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1
        }
        break;
    }
    rowsArray.sort(compare)                              
    table.append(...rowsArray)  
  } 