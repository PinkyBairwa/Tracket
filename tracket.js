const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const category = document.getElementById('category');
const type = document.getElementById('type');
const totalExpenses = document.getElementById('total-expenses');
const transactionIdInput = document.getElementById('transactionId');
const dateInput = document.getElementById('date');

let transactions = [];

function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const incomeTotal = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expenseTotal = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
income.innerText = `$${incomeTotal}`;
expense.innerText = `$${expenseTotal}`;
totalExpenses.innerText = `$${expenseTotal}`;
}

function addTransactionToList(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const li = document.createElement('li');

  li.classList.add(transaction.amount < 0 ? 'expense' : 'income');

  li.innerHTML =`
    ${transaction.description} (${transaction.category}, ${transaction.date}) 
    <span>${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
    <button class="edit-btn" onclick="editTransaction(${transaction.id})">Edit</button>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(li);
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addTransaction(e) {
  e.preventDefault();

  if (description.value.trim() === '' || amount.value.trim() === '' || !dateInput.value) {
    alert('Please fill all fields correctly');
  } else {
    const transaction = {
      id: transactionIdInput.value ? parseInt(transactionIdInput.value) : generateID(),
      description: description.value,
      amount: +amount.value * (type.value === 'expense' ? -1 : 1),
      category: category.value,
      date: dateInput.value
    };

    if (transactionIdInput.value) {
      
      transactions = transactions.map(t => (t.id === transaction.id ? transaction : t));
      transactionIdInput.value = '';
    } else {
     
      transactions.push(transaction);
    }

    init();
    form.reset();
  }
}

function editTransaction(id) {
  const transaction = transactions.find(t => t.id === id);

  if (transaction) {
    description.value = transaction.description;
    amount.value = Math.abs(transaction.amount);
    category.value = transaction.category;
    type.value = transaction.amount < 0 ? 'expense' : 'income';
    dateInput.value = transaction.date;
    transactionIdInput.value = transaction.id;
  }
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  init();
}

function init() {
  list.innerHTML = ''; 
  transactions.forEach(addTransactionToList); 
  updateValues(); 
}

form.addEventListener('submit', addTransaction);

init();