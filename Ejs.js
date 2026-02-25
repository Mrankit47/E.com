document.addEventListener('DOMContentLoaded', function () {

    /* ---- Active Nav Link ---- */
    function setActiveLinkColor(element) {
        const links = document.querySelectorAll('#mens, #womens, #blogs, #reviews, #contacts');
        links.forEach(function (link) { link.style.color = 'black'; });
        element.style.color = 'blueviolet';
    }

    var mensLink = document.getElementById("mens");
    var womensLink = document.getElementById("womens");
    var blogsLink = document.getElementById("blogs");
    var reviewsLink = document.getElementById("reviews");
    var contactsLink = document.getElementById("contacts");

    if (mensLink) mensLink.addEventListener("click", function () { setActiveLinkColor(this); });
    if (womensLink) womensLink.addEventListener("click", function () { setActiveLinkColor(this); });
    if (blogsLink) blogsLink.addEventListener("click", function () { setActiveLinkColor(this); });
    if (reviewsLink) reviewsLink.addEventListener("click", function () { setActiveLinkColor(this); });
    if (contactsLink) contactsLink.addEventListener("click", function () { setActiveLinkColor(this); });

    /* ---- Login ---- */
    var loginBtn = document.getElementById("login");
    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            document.querySelector(".loginpage").style.display = "block";
        });
    }

    var logedBtn = document.getElementById("loged");
    if (logedBtn) {
        logedBtn.addEventListener("click", function () {
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;
            if (email === "" || password === "") {
                alert("Please Enter your Email or Password");
            } else {
                alert("You are Logged In!");
                document.querySelector(".loginpage").style.display = "none";
            }
        });
    }

    /* ---- Contact Submit ---- */
    var submitBtn = document.getElementById("submit");
    if (submitBtn) {
        submitBtn.addEventListener("click", function () {
            var name = document.getElementById("name").value;
            var email = document.getElementById("pass").value;
            if (name === "" || email === "") {
                alert("Please Enter Your Name and Email");
            } else {
                alert(name + " - Thanks for Connecting Us!");
            }
        });
    }

    /* ---- Cart & Payment ---- */
    var cartBtn = document.getElementById('cart-btn');
    var cartSidebar = document.getElementById('cartSidebar');
    var closeCart = document.getElementById('close-cart');
    var cartCountEl = document.getElementById('cart-count');
    var cartItemsEl = document.getElementById('cartItems');
    var cartTotalEl = document.getElementById('cartTotal');
    var checkoutBtn = document.getElementById('checkoutBtn');
    var paymentModal = document.getElementById('paymentModal');
    var payCancel = document.getElementById('payCancel');
    var payNow = document.getElementById('payNow');

    var cart = [];

    function formatPrice(v) { return Number(v).toFixed(2); }

    function updateCartCount() {
        if (cartCountEl) cartCountEl.textContent = cart.length;
    }

    function renderCart() {
        if (!cartItemsEl || !cartTotalEl) return;
        cartItemsEl.innerHTML = '';
        var total = 0;
        cart.forEach(function (item, idx) {
            total += item.price;
            var wrap = document.createElement('div');
            wrap.className = 'cart-item';
            wrap.innerHTML =
                '<img src="' + item.img + '" alt="">' +
                '<div class="meta">' +
                '<h4>' + item.name + '</h4>' +
                '<p>$' + formatPrice(item.price) + '</p>' +
                '</div>' +
                '<button class="remove" data-i="' + idx + '">Remove</button>';
            cartItemsEl.appendChild(wrap);
        });
        cartTotalEl.textContent = formatPrice(total);
        updateCartCount();
    }

    // Remove item from cart
    if (cartItemsEl) {
        cartItemsEl.addEventListener('click', function (e) {
            if (e.target.classList.contains('remove')) {
                var i = Number(e.target.getAttribute('data-i'));
                if (!isNaN(i)) {
                    cart.splice(i, 1);
                    renderCart();
                }
            }
        });
    }

    // Open cart
    if (cartBtn && cartSidebar) {
        cartBtn.addEventListener('click', function () {
            cartSidebar.classList.add('open');
            cartSidebar.setAttribute('aria-hidden', 'false');
        });
    }

    // Close cart
    if (closeCart && cartSidebar) {
        closeCart.addEventListener('click', function () {
            cartSidebar.classList.remove('open');
            cartSidebar.setAttribute('aria-hidden', 'true');
        });
    }

    // Add to cart buttons
    var addBtns = document.querySelectorAll('.trend button');
    addBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var trend = this.closest('.trend');
            if (!trend) return;
            var nameEl = trend.querySelector('.cardText p');
            var name = nameEl ? nameEl.textContent.trim() : 'Product';
            var priceEl = trend.querySelector('.cardText h2');
            var priceText = priceEl ? priceEl.textContent : '$0';
            var priceNum = Number(priceText.replace(/[^0-9.]/g, '')) || 0;
            var imgEl = trend.querySelector('img');
            var img = imgEl ? imgEl.getAttribute('src') : '';
            cart.push({ name: name, price: priceNum, img: img });
            renderCart();
            if (cartSidebar) {
                cartSidebar.classList.add('open');
                cartSidebar.setAttribute('aria-hidden', 'false');
            }
        });
    });

    // Checkout -> payment modal
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            if (cart.length === 0) { alert('Cart is empty!'); return; }
            if (paymentModal) {
                paymentModal.classList.add('open');
                paymentModal.setAttribute('aria-hidden', 'false');
            }
            document.querySelectorAll('input[name="pay"]').forEach(function (r) {
                r.addEventListener('change', toggleCardInputs);
            });
            toggleCardInputs();
        });
    }

    function toggleCardInputs() {
        var checked = document.querySelector('input[name="pay"]:checked');
        var v = checked ? checked.value : 'cod';
        var cardDetails = document.getElementById('cardDetails');
        if (cardDetails) cardDetails.style.display = (v === 'card') ? 'block' : 'none';
    }

    // Cancel payment
    if (payCancel) {
        payCancel.addEventListener('click', function () {
            if (paymentModal) {
                paymentModal.classList.remove('open');
                paymentModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Pay now
    if (payNow) {
        payNow.addEventListener('click', function () {
            var checkedPay = document.querySelector('input[name="pay"]:checked');
            var method = checkedPay ? checkedPay.value : 'cod';
            if (method === 'card') {
                var cardNumber = document.getElementById('cardNumber').value.trim();
                var cardName = document.getElementById('cardName').value.trim();
                if (!cardNumber || !cardName) {
                    alert('Please enter card details');
                    return;
                }
                alert('Payment successful (demo). Thank you!');
            } else {
                alert('Order placed! Pay on delivery. Thank you!');
            }
            cart = [];
            renderCart();
            if (paymentModal) {
                paymentModal.classList.remove('open');
                paymentModal.setAttribute('aria-hidden', 'true');
            }
            if (cartSidebar) {
                cartSidebar.classList.remove('open');
                cartSidebar.setAttribute('aria-hidden', 'true');
            }
        });
    }

});
