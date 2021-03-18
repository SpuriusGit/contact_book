
document.addEventListener('DOMContentLoaded',()=>{
// Элементы DOM ,необходимы для работы
const create_form = document.querySelector('.create_form'),
    addButton = document.querySelector('.add'),
    contactBook = document.querySelector('.contact_book'),
    contactList = document.querySelector('.contact_list'),
    contactInfo = document.querySelector('.contact_info'),
    addNewInfo = document.querySelector('.add_new_info'),
    addNewInfo_btn = document.querySelector('.contact_info__add'),
    contactListItem = document.querySelector('.contact_list__item');

const contactsDB = {}; //сюда закидаем все контакты

function addContact(){ // добавляем в обьект контакты
    addButton.addEventListener('click',()=>{
        let nameArea = document.querySelector('.name');
        let numArea = document.querySelector('.number');
        
        contactsDB[nameArea.value] = numArea.value;
        contactList.innerHTML += `<li class="contact_list__item" id='${nameArea.value}'>${contactList.children.length +1 }. ${nameArea.value}<button class="delete">-</button></li>`;
        console.log(contactsDB);
        delContact();
        showContactInfo();
        hideContactInfo();
    });
};    
function delContact(){ // удаляем выбраный контакт
    document.querySelectorAll('.delete').forEach((btn)=>{
        btn.addEventListener('click',()=>{
            btn.parentElement.remove();
            delete contactsDB[btn.parentElement.id];
        });
    });
}
function showContactInfo(){ //Открываем информацию о контакте
    document.querySelectorAll('.contact_list__item').forEach((item)=>{
        item.addEventListener('click',(e)=>{
            if((e.target == item)&&(e.target !== document.querySelectorAll('.contact_list__item'))){
            contactInfo.style.display = 'flex';
            contactInfo.innerHTML = `
            <label for="contact_info__name">Имя <input type="text" class="contact_info__name" value="${item.id}"></label>
            <label for="contact_info__number">Номер <input type="text" class="contact_info__number" value="${contactsDB[item.id]}"></label>
            <button class="contact_info__add">Добавить</button>
            <button class="contact_info__close">X</button>
            `;
            function showAddInfo(){
                addNewInfo_btn.addEventListener('click',function(){
                    addNewInfo.style.display = 'flex';
                })
            }
            showAddInfo();
            }
        });
    });
}
function hideContactInfo(){ // Закрываем информацию о контакте
    contactInfo.addEventListener('click',(e)=>{
        if(e.target == document.querySelector('.contact_info__close')){
            contactInfo.style.display = 'none';
        }
    });
}
addContact();
});