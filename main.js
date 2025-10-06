// DOM elementlarni tanlash
const nameInput = document.getElementById('nameInput');
const phoneInput = document.getElementById('phoneInput');
const addBtn = document.getElementById('addBtn');
const contactList = document.getElementById('contactList');

let editingIndex = null; // Tahrirlanayotgan kontakt indeksi

// Qo'shish tugmasi
addBtn.addEventListener('click', handleAddOrSave);

// Enter tugmasi
nameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleAddOrSave();
});
phoneInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleAddOrSave();
});

// Asosiy funksiya: qo'shish yoki saqlash
function handleAddOrSave() {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !phone) {
    alert('Iltimos, ism va telefon raqamini to‘ldiring!');
    return;
  }

  if (editingIndex === null) {
    // Yangi kontakt qo'shish
    addContactToList(name, phone);
  } else {
    // Mavjud kontaktni yangilash
    updateContact(editingIndex, name, phone);
    editingIndex = null;
    addBtn.textContent = 'Qo\'shish';
  }

  // Tozalash
  nameInput.value = '';
  phoneInput.value = '';
  nameInput.focus();
}

// Kontakt qo'shish
function addContactToList(name, phone) {
  const li = document.createElement('li');
  li.className = 'contact-item';

  const info = document.createElement('div');
  info.className = 'contact-info';
  info.textContent = `${name} — ${phone}`;

  const actions = document.createElement('div');
  actions.className = 'contact-actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'edit-btn';
  editBtn.textContent = '✏️';
  editBtn.title = 'Tahrirlash';
  editBtn.addEventListener('click', () => startEditing(li, name, phone));

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '🗑️';
  deleteBtn.title = 'O\'chirish';
  deleteBtn.addEventListener('click', () => li.remove());

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(info);
  li.appendChild(actions);
  contactList.appendChild(li);
}

// Tahrirlashni boshlash
function startEditing(li, name, phone) {
  nameInput.value = name;
  phoneInput.value = phone;
  editingIndex = Array.from(contactList.children).indexOf(li);
  addBtn.textContent = 'Saqlash';
  nameInput.focus();
}

// Kontakt yangilash
function updateContact(index, name, phone) {
  const li = contactList.children[index];
  if (li) {
    li.querySelector('.contact-info').textContent = `${name} — ${phone}`;
  }
}