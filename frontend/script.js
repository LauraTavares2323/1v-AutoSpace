// logiin
// TA FUNCIONANDO
const form = document.getElementById('Login');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const response = await fetch('http://localhost:2000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (result.success) {
        alert("Login bem-sucedido!");
        window.location.href = "index2.html";
      } else {
        alert("Usuário ou senha incorretos!");
      }
});

// cadastro de pessoa
// NÃO FUNCIONA (AINDA)
const form1 = document.getElementById('cadastro').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    await fetch('http://localhost:2000/cadastro', {  
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (result.success) {
      alert("Você foi cadastrado");
      window.location.href = "index2.html";
    } else {
      alert("Não foi possível realizar seu cadastro");
    }
  });


  
// cadastro de carro
// Nem o de pessoa deu certo (ainda)

// editar o carro
// TA FUNCIONNADO
async function editCar(id) {
    const brand = prompt("Nova marca do seu carro");
    const color = prompt("Nova cor do seu carro");
    const placa = prompt("Novo placa do seu carro");
  
    await fetch(`http://localhost:2000/editar/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({brand, color, placa })
    });
    loadProducts();

// apagar o carro
// FUNCIONANDO
async function deleteCar(id) {
    await fetch(`http://localhost:2000/apagar/${id}`, {
      method: 'DELETE'
    });
    loadProducts();
  }}
  
// listar os carros
// ACHO QUE FUNCIONA

async function loadProducts() {
  const response = await fetch('http://localhost:2000/car');
  const data = await response.json();
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = ''; 

  data.car.forEach(car => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${car.id}</td>
      <td>${car.brand}</td>
      <td>${car.color}</td>
      <td>R$ ${car.placa}</td>
     
    `;
    tbody.appendChild(row);
  });
}
