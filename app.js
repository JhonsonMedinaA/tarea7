const inventory = [
    { name: "Laptop", category: "electrónica", price: 1000, stock: 3, discount: 10 },
    { name: "Televisor", category: "electrónica", price: 600, stock: 7, discount: 0 },
    { name: "Silla", category: "hogar", price: 50, stock: 2, discount: 5 },
    { name: "Mesa", category: "hogar", price: 120, stock: 10, discount: 0 },
    { name: "Manzanas", category: "alimentos", price: 2, stock: 50, discount: 1 },
  ];
  
  // Filtrar y renderizar productos
  function renderInventory(filteredInventory = inventory) {
    const tableBody = document.getElementById("inventory-table");
    tableBody.innerHTML = filteredInventory
      .map(
        product => `
          <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>${product.discount}%</td>
            <td>
              <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product.name}')">Eliminar</button>
            </td>
          </tr>
        `
      )
      .join("");
  }
  
  // Buscar productos por nombre
  document.getElementById("buscar").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = inventory.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    renderInventory(filtered);
  });
  
  // Filtrar productos con descuento
  document.getElementById("descuento").addEventListener("click", () => {
    const discounted = inventory.filter(product => product.discount > 0);
    renderInventory(discounted);
  });
  
  // Restablecer filtros
  document.getElementById("restablecer").addEventListener("click", () => {
    renderInventory();
  });
  
  // Eliminar producto (opcional, ejemplo de interacción)
  function deleteProduct(productName) {
    const index = inventory.findIndex(product => product.name === productName);
    if (index !== -1) {
      inventory.splice(index, 1);
      renderInventory();
    }
  }
  
  // Actualizar stock
  document.getElementById("update-stock-form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const productName = document.getElementById("product-name").value.trim();
    const quantity = parseInt(document.getElementById("quantity").value);
  
    const messageDiv = document.getElementById("update-message");
  
    try {
      const product = inventory.find(item => item.name.toLowerCase() === productName.toLowerCase());
      if (!product) {
        throw new Error(`El producto "${productName}" no se encontró.`);
      }
  
      if (isNaN(quantity) || quantity <= 0) {
        throw new Error("Ingrese una cantidad válida.");
      }
  
      product.stock += quantity;
  
      messageDiv.textContent = `El stock de "${product.name}" se actualizó a ${product.stock}.`;
      messageDiv.className = "alert alert-success";
      renderInventory();
    } catch (error) {
      messageDiv.textContent = error.message;
      messageDiv.className = "alert alert-danger";
    } finally {
      messageDiv.classList.remove("d-none");
      setTimeout(() => messageDiv.classList.add("d-none"), 3000);
    }
  });
  
  // Inicializar renderizado
  renderInventory();

  