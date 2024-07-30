let form = document.querySelector('.new-form');
let names = document.getElementById('name');
let table = document.getElementById('table_names');


form.addEventListener('submit', (evt) => {
    // Отменяем действие по умолчанию
    evt.preventDefault();
    // Получаем значения поля формы
    let new_names = names.value;
    
    // Проверяем, что поля заполнены 
    // if (!new_names) {
    //     alert('Пожалуйста, заполните поле');
    //     return;
    // }

    if(new_names.trim() == ""){
        names.value = '';
        alert('Пожалуйста, заполните поле');
        return;
    }

    const pattern = /^[,А-Яа-яЁё\s]+$/;
    if(!pattern.test(new_names)) {
    // if(!new_names.match('^[,А-Яа-яЁё\s]+$')) {
        alert('Поле может содержать только кириллические буквы и запятую');
        return;
    }

    let list_names = new_names.trim().split(",");
    alert(list_names);
    let counter = 0;
    if(list_names.length > 0){
        for (let i = 0; i < list_names.length; i++){
            let name_person = list_names[i];
            if (name_person.length > 0){
                // console.log(name_person.length)
                let new_id = counter+1;
                counter++;

                $.get('/randomPhp.php',{text:'Text'}, function(data){

                    alert(data);

                    var newRow = $('<tr><td>' + new_id + '</td><td>' + name_person + '</td><td>' + data + '</td></tr>');
                    $('#table_names').append(newRow);
                    table.style.visibility = "visible";
        
                })

                // $.ajax({
                //     url:'/randomPhp.php',
                //     method: 'get',
                //     // type: 'GET',
                //     dataType: 'html',
                // })
                // success: function(response){

                // }
            }
            // else{
            //     alert(name_person.length)
            //     console.log(name_person.length)
            // }
        }
        alert("Не введено ни одно имя. Заполните поле корректно");
        return
    
    }
    // else{
    //     alert(list_names.length)
    //     console.log(list_names.length)
    // }

    // Если всё в порядке, отправляем форму
    form.submit();
    });


// document.getElementById('addButton').addEventListener('click', function() {
//     const input = document.getElementById('name');
//     const names = input.value.split(',').map(name => name.trim());
  
//     if (names.length === 0 || names.some(name => !/[,А-Яа-яЁё]+$/.test(name))) {
//       alert('Некорректные данные участников. Пожалуйста, укажите имена на кириллице и разделите их запятыми.');
//     } else {
//     //   input.value = '';
//       names.forEach((name, index) => addParticipant(index + 1, name));
//       // Добавить AJAX запрос для получения очков участников и их обновления в таблице
//     }
//   });
  
//   function addParticipant(id, name) {
//     $.get('/randomPhp.php',{text:'Text'}, function(data){
//     // const points = Math.floor(Math.random() * 101); // Генерация случайных очков
//     const table = document.getElementById('table_names');
//     const row = table.insertRow();
//     row.innerHTML = `
//       <td>${id}</td>
//       <td>${name}</td>
//       <td>${data}</td>
//     `;
//     })
//   }
  


