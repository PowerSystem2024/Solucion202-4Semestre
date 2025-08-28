// Elementos del modal
const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");

// Boton del carrito
const cartBtn = document.getElementById("cart-btn");

// Array del carrito
const displayCart = () => {

    modalContainer.innerHTML = ""; // Limpiar el contenido previo del modal

    // Mostrar el modal (por defecto esta oculto en el CSS)
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";

    // Modal header
    const modalHeader = document.createElement("div");

    // Modal close button
    const modalClose = document.createElement("div");
    modalClose.innerText = "❌";
    modalClose.className = "modal-close";
    modalHeader.append(modalClose);

    // Close modal event
    modalClose.addEventListener("click", () => {
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    });

    // Close modal event
    const modalTitle = document.createElement("div");
    modalTitle.innerText = "Carrito";
    modalTitle.className = "modal-title";
    modalHeader.append(modalTitle);

    // Append modal header to modal container
    modalContainer.append(modalHeader);

    // Modal body
    cart.forEach(product => {

        const modalBody = document.createElement("div");
        modalBody.className = "modal-body";
        modalBody.innerHTML =  `
            <div class="product">
                <img class="product-img" src="${product.img}"/>
                <div class="product-info">
                    <h4>${product.productName}</h4>
                </div>
                <div class="quantity">
                    <span class= "quantity-btn-decrease">-</span>
                    <span class= "quantity-input">${product.quantity}</span>
                    <span class= "quantity-btn-increase">+</span>
                </div>
                <div class="price">${product.price * product.quantity} $</div>
                <div class="delete-product">❌</div>
            </div >
            `;
        modalContainer.append(modalBody);

        // Delete product event
        const decreaseBtn = modalBody.querySelector(".quantity-btn-decrease");
        decreaseBtn.addEventListener("click", () => {
            if(product.quantity !== 1){ // Evitamos que la cantidad sea menor a 1
                product.quantity--;
                displayCart(); // Llamamos a displayCart para actualizar el carrito
            }
        });

        // Increase product event
        const increaseBtn = modalBody.querySelector(".quantity-btn-increase");
        increaseBtn.addEventListener("click", () => {
            product.quantity++;
            displayCart();
        });

        // Delete product event
        const deleteProduct = modalBody.querySelector(".delete-product");
        deleteProduct.addEventListener("click", () => {
            deleteCartProduct(product.id);
            displayCart();
        });
    });

    // Modal footer
    // Calculate total price
    const total = cart.reduce((acc, el) => acc + el.price * el.quantity, 0);

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `
        <div class="total-price">Total: ${total} $</div>
        `;
    modalContainer.append(modalFooter);
    
};

cartBtn.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
    const foundId = cart.findIndex((element) => element.id === id);
    cart.splice(foundId, 1);
}