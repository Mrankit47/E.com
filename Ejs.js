document.addEventListener('DOMContentLoaded', function() {
    // Function to set the active link color
    function setActiveLinkColor(element) {
        const links = document.querySelectorAll('#mens, #womens, #blogs, #reviews, #contacts');
        links.forEach(link => link.style.color = 'black'); // Reset all to black
        element.style.color = 'blueviolet'; // Set active one to blueviolet
    }

    // Event listeners for navigation links
    document.getElementById("mens").addEventListener("click", function() {
        setActiveLinkColor(this);
    });

    /* ----------------- Cart & Payment logic ----------------- */
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('close-cart');
    const cartCountEl = document.getElementById('cart-count');
    const cartItemsEl = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const paymentModal = document.getElementById('paymentModal');
    const payCancel = document.getElementById('payCancel');
    const payNow = document.getElementById('payNow');

    let cart = [];

    function formatPrice(v){ return Number(v).toFixed(2); }

    function updateCartCount(){
        if(cartCountEl) cartCountEl.textContent = cart.length;
    }

    function renderCart(){
        if(!cartItemsEl || !cartTotalEl) return;
        cartItemsEl.innerHTML = '';
        let total = 0;
        cart.forEach((item, idx) =>{
            total += item.price;
            const wrap = document.createElement('div');
            wrap.className = 'cart-item';
            wrap.innerHTML = `\n                <img src="${item.img}" alt="">\n                <div class="meta">\n                  <h4>${item.name}</h4>\n                  <p>$${formatPrice(item.price)}</p>\n                </div>\n                <button class="remove" data-i="${idx}">Remove</button>\n            `;
            cartItemsEl.appendChild(wrap);
        });
        cartTotalEl.textContent = formatPrice(total);
        updateCartCount();
    }

    // remove item handler
    if(cartItemsEl){
        cartItemsEl.addEventListener('click', function(e){
            if(e.target.classList.contains('remove')){
                const i = Number(e.target.getAttribute('data-i'));
                if(!isNaN(i)){
                    cart.splice(i,1);
                    renderCart();
                }
            }
        });
    }

    // Open/Close cart
    if(cartBtn && cartSidebar){
        cartBtn.addEventListener('click', function(){
            cartSidebar.classList.add('open');
            cartSidebar.setAttribute('aria-hidden','false');
        });
    }
    if(closeCart && cartSidebar){
        closeCart.addEventListener('click', function(){
            cartSidebar.classList.remove('open');
            cartSidebar.setAttribute('aria-hidden','true');
        });
    }

    // Hook add-to-cart buttons
    const addBtns = document.querySelectorAll('.trend button');
    addBtns.forEach(btn => {
        btn.addEventListener('click', function(){
            const trend = this.closest('.trend');
            if(!trend) return;
            const name = trend.querySelector('.cardText p')?.textContent?.trim() || 'Product';
            let priceText = trend.querySelector('.cardText h2')?.textContent || '$0';
            const priceNum = Number((priceText.replace(/[^0-9.]/g,'')) || 0);
            const img = trend.querySelector('img')?.getAttribute('src') || '';
            cart.push({ name, price: priceNum, img });
            renderCart();
            cartSidebar.classList.add('open');
            cartSidebar.setAttribute('aria-hidden','false');
        });
    });

    // Checkout -> open payment modal
    if(checkoutBtn){
        checkoutBtn.addEventListener('click', function(){
            if(cart.length === 0){ alert('Cart is empty'); return; }
            paymentModal.classList.add('open');
            paymentModal.setAttribute('aria-hidden','false');
            document.querySelectorAll('input[name="pay"]').forEach(r => r.addEventListener('change', toggleCardInputs));
            toggleCardInputs();
        });
    }

    function toggleCardInputs(){
        const v = document.querySelector('input[name="pay"]:checked')?.value;
        const cardDetails = document.getElementById('cardDetails');
        if(cardDetails) cardDetails.style.display = (v === 'card') ? 'block' : 'none';
    }

    if(payCancel){
        payCancel.addEventListener('click', function(){
            paymentModal.classList.remove('open');
            paymentModal.setAttribute('aria-hidden','true');
        });
    }

    if(payNow){
        payNow.addEventListener('click', function(){
            const method = document.querySelector('input[name="pay"]:checked')?.value || 'cod';
            if(method === 'card'){
                const cardNumber = document.getElementById('cardNumber').value.trim();
                const cardName = document.getElementById('cardName').value.trim();
                if(!cardNumber || !cardName){ alert('Please enter card details'); return; }
                alert('Payment successful (demo). Thank you!');
            } else {
                alert('Order placed. Pay on delivery. Thank you!');
            }
            cart = [];
            renderCart();
            if(paymentModal){ paymentModal.classList.remove('open'); paymentModal.setAttribute('aria-hidden','true'); }
            if(cartSidebar){ cartSidebar.classList.remove('open'); cartSidebar.setAttribute('aria-hidden','true'); }
        });
    }

    document.getElementById("womens").addEventListener("click", function() {
        setActiveLinkColor(this);
    });

    document.getElementById("blogs").addEventListener("click", function() {
        setActiveLinkColor(this);
    });

    document.getElementById("reviews").addEventListener("click", function() {
        setActiveLinkColor(this);
    });

    document.getElementById("contacts").addEventListener("click", function() {
        setActiveLinkColor(this);
    });

    // Login functionality
    document.getElementById("login").addEventListener("click", function() {
        document.querySelector(".loginpage").style.display = "block";
    });

    document.getElementById("loged").addEventListener("click", function() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (email === "" || password === "") {
            alert("Please Enter your Email or Password");
        } else {
            alert("You are logged In");
            document.querySelector(".loginpage").style.display = "none";
        }
    });

    // Submit form functionality
    document.getElementById("submit").addEventListener("click", function() {
        let name = document.getElementById("name").value;
        let pass = document.getElementById("pass").value; // Corrected ID

        if (name === "" || pass === "") {
            alert("Please Enter Your Name and Password");
        } else {
            alert(name + " Thanks for Connecting Us");
        }
    });
});
