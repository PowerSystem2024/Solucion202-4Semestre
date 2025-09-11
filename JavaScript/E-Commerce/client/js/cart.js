const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

const displayCart = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";

  // Header
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";

    const modalClose = document.createElement("span");
        modalClose.innerText = "❌";
        modalClose.className = "modal-close";
        modalClose.onclick = () => {
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    };
    modalHeader.appendChild(modalClose);

    const modalTitle = document.createElement("h2");
    modalTitle.innerText = "Carrito";
    modalHeader.appendChild(modalTitle);
    modalContainer.appendChild(modalHeader);

  // Body
    if (cart.length === 0) {
        const empty = document.createElement("p");
        empty.innerText = "Tu carrito está vacío";
        empty.className = "modal-body";
        modalContainer.appendChild(empty);
    } else {
    cart.forEach((prod) => {
        const row = document.createElement("div");
        row.className = "modal-body";
        row.innerHTML = `
        <div class="product">
            <img class="product-img" src="${prod.img}" />
            <div class="product-info">
                <h4>${prod.productName}</h4>
            </div>
            <div class="quantity">
                <span class="quantity-btn-decrease">-</span>
                <span class="quantity-input">${prod.quantity}</span>
                <span class="quantity-btn-increase">+</span>
            </div>
          <div class="price">${(prod.price * prod.quantity).toFixed(2)} $</div>
            <div class="delete-product">❌</div>
        </div>`;

        modalContainer.appendChild(row);

      // +/- y borrar
        row.querySelector(".quantity-btn-decrease").onclick = () => {
            if (prod.quantity > 1) {
                prod.quantity--;
                displayCart();
                displayCartCounter();
            }
            };
            row.querySelector(".quantity-btn-increase").onclick = () => {
            prod.quantity++;
            displayCart();
            displayCartCounter();
            };
            row.querySelector(".delete-product").onclick = () => {
            deleteCartProduct(prod.id);
            displayCart();
            displayCartCounter();
            };
    });

    // Footer
    const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `<div class="total-price">Total: ${total.toFixed(2)} $</div>`;

    // BOTÓN ÚNICO DE CHECKOUT
    const checkoutBtn = document.createElement("button");
    checkoutBtn.innerText = "Proceed to checkout";
    checkoutBtn.className = "btn-checkout";
    checkoutBtn.onclick = async () => {
        if (cart.length === 0) return alert("Tu carrito está vacío");
            try {
            const res = await fetch("/create_preference", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cart }),
            });
            const data = await res.json();
            if (data.init_point) {
                window.location.href = data.init_point;
            } else {
                alert("Error al crear preferencia");
            }
            }catch (err) {
                console.error(err);
                alert("No se pudo conectar con el servidor");
            }
    };

    modalFooter.appendChild(checkoutBtn);
    modalContainer.appendChild(modalFooter);
    }
};

const deleteCartProduct = (id) => {
    const idx = cart.findIndex((el) => el.id === id);
    cart.splice(idx, 1);
};

const displayCartCounter = () => {
    const len = cart.reduce((acc, el) => acc + el.quantity, 0);
    cartCounter.style.display = len ? "block" : "none";
    cartCounter.innerText = len;
};

cartBtn.addEventListener("click", displayCart);