// NOTE TO ALL FRIENDS, REMEMBER DON'T FORGET TO PUT COMMENT ON EVERY FEATURE TO HELP OTHER KNOW THIS FOR WHAT FEATURE TY!

// ============================================
// DATA PRODUK
// ============================================
const products = [
    {
        id: 1,
        name: "KayuKita Gareng <br> Lemari Kabinet TV dengan Laci",
        price: 1_650_000,
        stock: 10,
        desc: "KayuKita Gareng - meja TV merupakan produk jati karya KayuKita untuk menambahkan nuansa warm dan modern pada ruangan anda.",
        img: "https://images.unsplash.com/photo-1771692826906-dd250a2502c3?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "KayuKita Yudistira <br> Lemari 3 Pintu",
        price: 4_500_000,
        stock: 10,
        desc: "KayuKita Yudistira - lemari ini merupakan produk jati karya KayuKita untuk menambahkan nuansa warm dan modern pada kamar anda.",
        img: "https://images.unsplash.com/photo-1722349674028-a148f4364e43?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "KayuKita Semar <br> Dipan Tempat Tidur kayu jati 180 x 200",
        price: 5_750_000,
        stock: 10,
        desc: "KayuKita Semar - Dipan kayu jati 180 x 200 dirancang untuk menampung berat 2-3 orang secara aman dan nyaman.",
        img: "https://images.unsplash.com/photo-1688384452844-8364c3e2fc28?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 4,
        name: "KayuKita Nakula <br> Kursi Multifungsi",
        price: 950_000,
        stock: 10,
        desc: "KayuKita Nakula - Kursi Multifungsi berbahan material kayu LVL. Kursi jati ini dapat menahan beban dan kokoh.",
        img: "https://images.unsplash.com/photo-1658211312038-4293c7bdd37e?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 5,
        name: "KayuKita Janaka <br> Meja Kasur 1 laci",
        price: 1_800_000,
        stock: 10,
        desc: "KayuKita Janaka - Meja Kecil Kasur 1 laci dengan aksen anyaman rotan yang memberikan sentuhan natural dan estetik.",
        img: "https://images.unsplash.com/photo-1652155205433-52179159a15e?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 6,
        name: "KayuKita Werkudara <br> Set Meja Makan 6 kursi",
        price: 8_500_000,
        stock: 10,
        desc: "KayuKita Werkudara - Set Meja Makan 6 kursi dengan desain klasik dan elegan cocok untuk keluarga besar.",
        img: "https://images.unsplash.com/photo-1758977245854-b0ea036e0ce2?q=80&w=600&auto=format&fit=crop",
    },
];


// ============================================
// LOCALSTORAGE CART
// Semua operasi cart disimpan ke localStorage
// ============================================

// Key penyimpanan cart di localStorage
const CART_KEY = "kayukita_cart";

// Ambil cart dari localStorage
function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// Simpan cart ke localStorage
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}


// ============================================
// FORMAT HARGA
// ============================================
function formatPrice(price) {
    return "Rp " + price.toLocaleString("id-ID");
}


// ============================================
// UPDATE BADGE CART DI NAVBAR
// Dipanggil setiap kali cart berubah
// ============================================
function updateCartBadge() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById("cartBadge");

    if (!badge) return;

    if (total > 0) {
        badge.style.display = "block";
        badge.textContent = total > 99 ? "99+" : total;
    } else {
        badge.style.display = "none";
    }
}


// ============================================
// ADD TO CART
// Tambah produk ke cart, simpan ke localStorage
// ============================================
function addToCart(id) {
    const product = products.find((p) => p.id === id);
    if (!product || product.stock <= 0) {
        alert("Stok habis!");
        return;
    }

    // Kurangi stok tampilan
    product.stock--;

    // Update cart di localStorage
    const cart = getCart();
    const item = cart.find((p) => p.id === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({ id, qty: 1 });
    }

    saveCart(cart);
    updateCartBadge();
    renderProducts(); // Re-render untuk update tombol & stok
}


// ============================================
// DECREASE CART
// Kurangi qty produk di cart
// ============================================
function decreaseCart(id) {
    const product = products.find((p) => p.id === id);
    const cart = getCart();
    const item = cart.find((p) => p.id === id);

    if (!item) return;

    // Kembalikan stok tampilan
    if (product) product.stock++;

    item.qty--;

    // Hapus dari cart kalau qty sudah 0
    const updatedCart = item.qty <= 0
        ? cart.filter((p) => p.id !== id)
        : cart;

    saveCart(updatedCart);
    updateCartBadge();
    renderProducts();
}


// ============================================
// GET QTY — Ambil qty produk di cart
// ============================================
function getQty(id) {
    const cart = getCart();
    const item = cart.find((p) => p.id === id);
    return item ? item.qty : 0;
}


// ============================================
// CREATE CARD — Buat HTML card produk
// ============================================
function createCard(product) {
    const qty = getQty(product.id);
    const noStock = product.stock <= 0;

    return `
    <div class="product-card">

        <!-- Gambar produk -->
        <div class="card-img">
            <img src="${product.img}" alt="${product.name}">
        </div>

        <!-- Isi card -->
        <div class="card-body">

            <!-- Nama produk -->
            <h2 class="card-name">${product.name}</h2>

            <!-- Deskripsi produk -->
            <p class="card-desc">${product.desc}</p>

            <!-- Harga dan stok -->
            <div class="card-footer">
                <span class="card-price">${formatPrice(product.price)}</span>
                <span class="card-stock">Stok: ${product.stock}</span>
            </div>

            <!-- Tombol cart — tampil berbeda tergantung qty -->
            <div class="cart-actions">
                ${qty > 0 ? `
                    <!-- Tombol +/- kalau sudah ada di cart -->
                    <button class="qty-btn" onclick="decreaseCart(${product.id})">−</button>
                    <span class="qty">${qty}</span>
                    <button class="qty-btn" onclick="addToCart(${product.id})" ${noStock ? "disabled" : ""}>+</button>
                ` : `
                    <!-- Tombol Add to Cart kalau belum ada di cart -->
                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${product.id})"
                        ${noStock ? "disabled" : ""}>
                        ${noStock ? "Stok Habis" : "Add to Cart"}
                    </button>
                `}
            </div>

        </div>
    </div>
    `;
}


// RENDER PRODUCTS — Tampilkan semua produk ke grid
function renderProducts() {
    const container = document.getElementById("products-grid");
    if (!container) return;

    container.innerHTML = products.map(createCard).join("");
}


// RENDER CART PAGE
// Tampilkan item cart dari localStorage ke halaman cart
function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return; // Guard: hanya jalan di halaman cart

    const cart = getCart();

    // Tampilkan empty state kalau cart kosong
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-5" style="color: #8A7D76;">
                <p style="font-size: 40px; opacity: 0.3;">🛒</p>
                <p>Keranjang kamu kosong.</p>
                <a href="/pages/collection.html" class="btn btn-dark mt-2">Lihat Koleksi</a>
            </div>`;
        updateCartTotal();
        updateCartTitle();
        return;
    }

    // Render setiap item di cart
    cartContainer.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return "";

        return `
        <div class="d-flex justify-content-between align-items-center p-4 border-bottom cart-item"
             data-id="${product.id}">

            <!-- Kiri: Gambar + Info -->
            <div class="d-flex align-items-center gap-3">
                <img src="${product.img}"
                     class="rounded-3 object-fit-cover"
                     width="70" height="70"
                     alt="${product.name}">
                <div>
                    <h5 class="fw-bold mb-1">${product.name.replace("<br>", "")}</h5>
                    <p class="text-secondary mb-0" style="font-size: 13px;">
                        Qty: ${item.qty}
                    </p>
                </div>
            </div>

            <!-- Kanan: Harga + Aksi -->
            <div class="d-flex align-items-center gap-4">
                <h5 class="mb-0 text-secondary">
                    ${formatPrice(product.price * item.qty)}
                </h5>
                <div class="d-flex gap-2">
                    <!-- Tombol hapus item dari cart -->
                    <button class="btn btn-danger btn-sm px-3"
                            onclick="confirmDelete('${product.name.replace(/<br>/g, "")}', ${product.id}, this)">
                        Hapus
                    </button>
                </div>
            </div>

        </div>`;
    }).join("");

    updateCartTotal();
    updateCartTitle();
}


// UPDATE CART TOTAL
// Hitung dan tampilkan total harga di cart
function updateCartTotal() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.qty : 0);
    }, 0);

    // Update total di footer cart
    const totalEl = document.getElementById("cart-total");
    if (totalEl) totalEl.textContent = formatPrice(total);

    // Update total di dalam modal checkout
    const modalTotalEl = document.getElementById("modal-total");
    if (modalTotalEl) modalTotalEl.textContent = formatPrice(total);
}


// UPDATE CART TITLE
// Update teks "Cart (n)" di heading halaman
function updateCartTitle() {
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const titleEl = document.getElementById("cart-title");
    if (titleEl) titleEl.textContent = `Cart (${totalQty})`;
}


// CONFIRM DELETE — SweetAlert hapus item cart
// Dipanggil saat user klik tombol Hapus di cart
function confirmDelete(productName, productId, btn) {
    // Pastikan Swal tersedia
    if (typeof Swal === "undefined") {
        console.error("SweetAlert2 belum di-load!");
        return;
    }

    Swal.fire({
        title: "Hapus item ini?",
        text: `"${productName}" akan dihapus dari keranjang.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
        confirmButtonColor: "#A32D2D",
        cancelButtonColor: "#8A7D76",
    }).then((result) => {
        if (result.isConfirmed) {
            // Hapus dari localStorage
            const cart = getCart();
            const updatedCart = cart.filter(p => p.id !== productId);
            saveCart(updatedCart);

            // Re-render cart
            renderCart();
            updateCartBadge();

            // Notifikasi sukses
            Swal.fire({
                title: "Dihapus!",
                text: `"${productName}" berhasil dihapus dari keranjang.`,
                icon: "success",
                confirmButtonColor: "#5C4033",
                timer: 2000,
                timerProgressBar: true,
            });
        }
    });
}


// HANDLE CHECKOUT — SweetAlert sukses bayar
// Dipanggil saat user klik "Konfirmasi Pembayaran"
function handleCheckout() {
    // Ambil nilai input pakai ID (lebih reliable dari placeholder)
    const namaEl = document.getElementById("inputNama");
    const alamatEl = document.getElementById("inputAlamat");

    if (!namaEl || !alamatEl) {
        console.error("Input nama/alamat tidak ditemukan!");
        return;
    }

    const nama = namaEl.value.trim();
    const alamat = alamatEl.value.trim();

    // Validasi field wajib
    if (!nama || !alamat) {
        Swal.fire({
            title: "Lengkapi Data!",
            text: "Nama dan alamat pengiriman wajib diisi.",
            icon: "warning",
            confirmButtonColor: "#5C4033",
        });
        return;
    }

    // Tutup modal Bootstrap — cek null biar tidak crash
    const modalEl = document.getElementById("checkoutModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    // Kosongkan cart setelah pembayaran
    saveCart([]);
    updateCartBadge();

    // Tampilkan popup sukses
    Swal.fire({
        title: "Pembayaran Berhasil! 🎉",
        html: `
            <p>Terima kasih, <strong>${nama}</strong>!</p>
            <p>Pesanan sedang diproses dan akan dikirim ke:</p>
            <p style="font-size: 14px; color: #8A7D76;">${alamat}</p>
        `,
        icon: "success",
        confirmButtonText: "Kembali ke Beranda",
        confirmButtonColor: "#5C4033",
        allowOutsideClick: false,
    }).then(() => {
        window.location.href = "/index.html";
    });
}


// 
// INISIALISASI — Jalankan saat halaman dimuat
// 
document.addEventListener("DOMContentLoaded", function () {
    updateCartBadge(); // Update badge cart di semua halaman
    renderProducts();  // Render produk (hanya aktif di collection.html)
    renderCart();      // Render cart (hanya aktif di cart.html)
});
