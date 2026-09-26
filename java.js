/* ==============================================================
   1. DỮ LIỆU SẢN PHẨM
============================================================== */
const products = [
  {
    name: 'Laptop gaming Acer Aspire 7 A715-59G-59RD (Core 5-210H/ RTX 3050 4GB/ 16GB/ 512GB/ 15.6" FHD/ Win 11)',
    price: "24.490.000đ",
    oldPrice: "27.990.000đ",
    discount: "-13%",
    image:
      "https://cdn.hstatic.net/products/200000722513/aspire-7-a715-59g-non-fingerprint-with-backlit-on-wp-titanium-black-01_07be39d40c6c4c1c8022e1b52959befc.png",
    id: 1,
  },
  {
    name: 'Laptop Acer Aspire Lite 14 AL14-53M-53E8 (Core 5-120U/ 16GB/ 512GB/ 14" FHD+ IPS/ Win 11)',
    price: "22.890.000đ",
    oldPrice: "23.990.000đ",
    discount: "-5%",
    image:
      "https://cdn.hstatic.net/products/200000722513/acer-aspire-lite-14-al14-53m-53e8-core-5-120u-8gb-512gb-14-0-fhd-ips-1_acdaef2a122444c98f37b6c3108fdcc8.jpg",
    id: 2,
  },
  {
    name: 'Laptop gaming ASUS V16 V3607VJ-TK189W (Core 5-210H/ RTX 3050 6GB/ 16GB/ 512GB/ 16" WUXGA 144Hz/ Win 11)',
    price: "29.490.000đ",
    oldPrice: "29.990.000đ",
    discount: "-12%",
    image:
      "https://cdn.hstatic.net/products/200000722513/7vj-tk189w-core-5-210h-rtx-3050-6gb-16gb-512gb-16-wuxga-144hz-win-11-1_36b9dbe6e4634789bff08e7f71105335.jpg",
    id: 3,
  },
  {
    name: 'Laptop gaming Lenovo LOQ 15ARP10E 83S0006RVN (Ryzen 7-7735HS/ RTX 3050 6GB/ 16GB/ 1TB/ 15.6" FHD/ Win 11)',
    price: "31.990.000đ",
    oldPrice: "32.990.000đ",
    discount: "-6%",
    image:
      "https://cdn.hstatic.net/products/200000722513/lenovo_loq-15arp10e-83s0006rvn_08769f14b28a41d3928d6886a19ceedf.png",
    id: 4,
  },
  {
    name: 'Laptop Acer Swift Air 14 SFA14-I31-52BV (Core 5-320/ 12GB/ 512GB/ 14" FHD+ IPS 120Hz/ Green/ Win 11)',
    price: "23.490.000đ",
    oldPrice: "24.990.000đ",
    discount: "-6%",
    image:
      "https://cdn.hstatic.net/products/200000722513/fa14-i31-non-fingerprint-with-backlit-on-wp-strat-screen-sage-green-01_b15c59a3f11848e79e050110728e2fc0.png",
    id: 5,
  },
  {
    name: 'Laptop gaming Acer Nitro ProPanel ANV15-52-78MD (Core 7-240H/ RTX 5050 8GB/ 16GB/ 512GB/ 15.6" FHD/ Win 11)',
    price: "40.890.000đ",
    oldPrice: "40.990.000đ",
    discount: "-0%",
    image:
      "https://cdn.hstatic.net/products/200000722513/laptop-gaming-acer-nitro-propanel-anv15-52-78md-1_5322e4134ff94d0f82a9141c50b52e68.jpg",
    id: 6,
  },
  {
    name: 'Laptop gaming GIGABYTE AORUS Master 16 6XJM4VNE64SH (Ryzen 9 9955HX3D/ RTX 5070 Ti 12GB/ 32GB/ 1TB/ 16" QHD+ OLED 240Hz)',
    price: "86.990.000đ",
    oldPrice: null,
    discount: null,
    image:
      "https://cdn.hstatic.net/products/200000722513/-ryzen-9-9955hx3d-rtx-5070-ti-12gb-32gb-1tb-16-qhd-oled-240hz-win-11-2_9b49da576ce9401a9467680cdabd943f.jpg",
    id: 17,
  },
  {
    name: "Chuột Gaming Predator Cestus 330 (PMW920)",
    price: "1.500.000đ",
    oldPrice: null,
    discount: null,
    image:
      "https://cdn.hstatic.net/products/200000722513/chuot-gaming-predator-cestus-330-pmw920-1_3b82d586f56040c1be50fd4f63fe91d7.jpg",
    id: 21,
  },
  {
    name: "Chuột gaming không dây Logitech G304 X Superlight Black",
    price: "1.790.000đ",
    oldPrice: "2.390.000đ",
    discount: "-25%",
    image:
      "https://cdn.hstatic.net/products/200000722513/chuot-gaming-khong-day-logitech-g304-x-superlight-black-1_a1c1440eb6e943fab9352e738de57cd1.jpg",
    id: 23,
  },
  {
    name: "Chuột Razer Basilisk V3 Pro 35K Phantom Green Edition",
    price: "3.940.000đ",
    oldPrice: "4.290.000đ",
    discount: "-8%",
    image:
      "https://product.hstatic.net/200000722513/product/-razer-basilisk-v3-pro-35k-phantom-green-edition-rz01-05240300-r3a1-01_419134bc4045468b90390459f9b920e5.jpg",
    id: 24,
  },
  {
    name: "Bàn phím cơ ASUS ROG Falchion Ace 75 HE V2X White",
    price: "5.890.000đ",
    oldPrice: "5.990.000đ",
    discount: "-2%",
    image:
      "https://cdn.hstatic.net/products/200000722513/ban-phim-co-asus-rog-falchion-ace-75-he-v2x-white-1_30aca6e1d3dd417c8778fb6c92c3b4b7.jpg",
    id: 41,
  },
  {
    name: "Bàn phím gaming ASUS ROG Azoth 96 HE Black",
    price: "9.590.000đ",
    oldPrice: null,
    discount: null,
    image:
      "https://cdn.hstatic.net/products/200000722513/ban-phim-gaming-asus-rog-azoth-96-he-black-2_dd879173c9dd43caa2611bf50c9de0b9.jpg",
    id: 50,
  },
  {
    name: 'Màn hình LG 27U730B-B 27" IPS 4K HDR10 USBC chuyên đồ họa',
    price: "8.540.000đ",
    oldPrice: "8.790.000đ",
    discount: "-2%",
    image:
      "https://cdn.hstatic.net/products/200000722513/man-hinh-lg-27u730b-b-27-ips-4k-hdr10-usbc-chuyen-do-hoa-1_f299a33162ec40c6accf565c98818d28.jpg",
    id: 61,
  },
  {
    name: 'Màn hình ASUS TUF GAMING VG27AQM5F 27" Fast IPS 2K 320Hz chuyên game',
    price: "7.740.000đ",
    oldPrice: "7.990.000đ",
    discount: "-19%",
    image:
      "https://cdn.hstatic.net/products/200000722513/man-hinh-asus-tuf-gaming-vg27aqm5f-27-fast-ips-2k-320hz-chuyen-game-1_30cb9123396e446bb758ad388aad0359.jpg",
    id: 69,
  },
  {
    name: "PC GVN x MSI LIGHTNING (Intel Core Ultra 9 285K/ VGA RTX 5090)",
    price: "315.990.000đ",
    oldPrice: "317.330.000đ",
    discount: "-0%",
    image:
      "https://cdn.hstatic.net/products/200000722513/bo_pc_msi_lighning_z_13_e59e2afcb53a4a1f93b1265364f47f3c.png",
    id: 83,
  },
  {
    name: "PC GVN AMD Ryzen 7 7800X3D / VGA RTX 5080",
    price: "84.990.000đ",
    oldPrice: "86.310.000đ",
    discount: "-2%",
    image:
      "https://cdn.hstatic.net/products/200000722513/pc_msi_gerforce_4500rs__7_of_107__-_copy_10d4e5d61c724345bdcd1acf490a9523.jpg",
    id: 85,
  },
  {
    name: "PC GVN Intel i5-12400F/ VGA RTX 5060 (Main H)",
    price: "26.270.000đ",
    oldPrice: "28.520.000đ",
    discount: "-7%",
    image:
      "https://cdn.hstatic.net/products/200000722513/post-09_ffd7b9184cc24b9081a7efae6a146900.jpg",
    id: 86,
  },
  {
    name: "Tai nghe gaming không dây Logitech Astro A20 X",
    price: "3.590.000đ",
    oldPrice: "4.190.000đ",
    discount: "-14%",
    image:
      "https://cdn.hstatic.net/products/200000722513/tai-nghe-gaming-khong-day-logitech-astro-a20-x-1_d664b2ce170540ca91a9507035c4b175.jpg",
    id: 117,
  },
  {
    name: "Tai nghe Razer BlackShark V3 White",
    price: "4.420.000đ",
    oldPrice: "5.190.000đ",
    discount: "-15%",
    image:
      "https://cdn.hstatic.net/products/200000722513/tai-nghe-razer-blackshark-v3-white-1_645e8067718b41d3acc4f6e7bae49396.jpg",
    id: 120,
  },
  {
    name: "Bo mạch chủ ASUS ROG CROSSHAIR X870E EXTREME (DDR5)",
    price: "31.990.000đ",
    oldPrice: "32.990.000đ",
    discount: "-3%",
    image:
      "https://product.hstatic.net/200000722513/product/x870e_extreme_.main_logo__1c0af41365c04e03bcafbe7afc0463c8.jpg",
    id: 133,
  },
];

let cart = [];

const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  let cleanStr = priceStr.replace(/[đ.,\s]/g, "");
  let num = parseInt(cleanStr);
  return isNaN(num) ? 0 : num;
};

const formatMoney = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const getCategory = (name) => {
  let lowerName = name.toLowerCase();
  if (lowerName.includes("laptop")) return "Laptop";
  if (lowerName.includes("pc") || lowerName.includes("máy bộ")) return "PC";
  if (lowerName.includes("chuột")) return "Chuột";
  if (lowerName.includes("bàn phím")) return "Bàn phím";
  if (lowerName.includes("màn hình")) return "Màn hình";
  if (lowerName.includes("tai nghe")) return "Tai nghe";
  if (lowerName.includes("bo mạch chủ")) return "Bo mạch chủ";
  return "Phụ kiện";
};

/* ==============================================================
   2. HIỂN THỊ VÀ LỌC SẢN PHẨM
============================================================== */
const productGrid = document.getElementById("productGrid");

function renderProducts(productList) {
  if (!productGrid) return;
  productGrid.innerHTML = "";
  if (productList.length === 0) {
    productGrid.innerHTML =
      '<p style="grid-column: 1/-1; text-align:center; padding:20px;">Không tìm thấy sản phẩm nào.</p>';
    return;
  }

  productList.forEach((product) => {
    let badgeHtml =
      product.discount && product.discount !== "null"
        ? `<div class="discount-badge">${product.discount}</div>`
        : "";
    let oldPriceHtml =
      product.oldPrice && product.oldPrice !== "null"
        ? `<p class="product-price-old">${product.oldPrice}</p>`
        : `<p class="product-price-old">&nbsp;</p>`;

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            ${badgeHtml}
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <h3 class="product-title" title="${product.name}">${product.name}</h3>
            <div class="product-rating">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
            </div>
            ${oldPriceHtml}
            <p class="product-price">${product.price}</p>
            <button class="btn btn-full" onclick="addToCart(${product.id})">THÊM VÀO GIỎ</button>
        `;
    productGrid.appendChild(card);
  });
}

renderProducts(products);

const filterButtons = document.querySelectorAll("[data-filter]");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (btn.classList.contains("menu-link")) {
      document
        .querySelectorAll(".menu-link")
        .forEach((l) => l.classList.remove("active"));
      btn.classList.add("active");
    }

    const filterVal = btn.getAttribute("data-filter");
    if (filterVal === "all") {
      renderProducts(products);
    } else {
      const filtered = products.filter(
        (p) => getCategory(p.name) === filterVal,
      );
      renderProducts(filtered);
    }
    const prodSec = document.getElementById("products-section");
    if (prodSec) prodSec.scrollIntoView({ behavior: "smooth" });
  });
});

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function executeSearch() {
  if (!searchInput) return;
  const keyword = searchInput.value.toLowerCase().trim();
  const result = products.filter((p) => p.name.toLowerCase().includes(keyword));
  renderProducts(result);
  const prodSec = document.getElementById("products-section");
  if (prodSec) prodSec.scrollIntoView({ behavior: "smooth" });
}

if (searchBtn) searchBtn.addEventListener("click", executeSearch);
if (searchInput) {
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") executeSearch();
  });
}

/* ==============================================================
   3. GIỎ HÀNG (CART)
============================================================== */
const cartToggle = document.getElementById("cartToggle");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartBtn = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal = document.getElementById("cartTotal");

function toggleCart() {
  if (cartSidebar) cartSidebar.classList.toggle("open");
  if (cartOverlay) {
    cartOverlay.style.display =
      cartSidebar && cartSidebar.classList.contains("open") ? "block" : "none";
  }
}
if (cartToggle) cartToggle.addEventListener("click", toggleCart);
if (closeCartBtn) closeCartBtn.addEventListener("click", toggleCart);
if (cartOverlay) cartOverlay.addEventListener("click", toggleCart);

window.addToCart = function (productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    let numericPrice = parsePrice(product.price);
    cart.push({ ...product, numericPrice: numericPrice, quantity: 1 });
  }
  updateCartUI();
  toggleCart();
};

window.changeQty = function (productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.id !== productId);
    }
  }
  updateCartUI();
};

function updateCartUI() {
  if (!cartItemsContainer) return;
  cartItemsContainer.innerHTML = "";
  let subtotal = 0;
  let count = 0;

  cart.forEach((item) => {
    subtotal += item.numericPrice * item.quantity;
    count += item.quantity;

    const cartDiv = document.createElement("div");
    cartDiv.className = "cart-item";
    cartDiv.innerHTML = `
            <img src="${item.image}" alt="">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${formatMoney(item.numericPrice)}</div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="changeQty(${item.id}, -${item.quantity})"><i class="fas fa-trash"></i> Xóa</button>
            </div>
        `;
    cartItemsContainer.appendChild(cartDiv);
  });

  if (cartCount) cartCount.innerText = count;
  if (cartSubtotal) cartSubtotal.innerText = formatMoney(subtotal);

  if (cartTotal) {
    if (count === 0) {
      cartTotal.innerText = "0 đ";
    } else {
      cartTotal.innerText = formatMoney(subtotal + 30000);
    }
  }
}

/* ==============================================================
   4. SLIDER & COUNTDOWN
============================================================== */
const slides = document.getElementById("slides");
const slideElements = document.querySelectorAll(".slide");
const slideCount = slideElements.length;
let currentIndex = 0;

function showSlide(index) {
  if (!slides || slideCount === 0) return;
  if (index >= slideCount) currentIndex = 0;
  else if (index < 0) currentIndex = slideCount - 1;
  else currentIndex = index;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

const nextSlideBtn = document.getElementById("nextSlide");
const prevSlideBtn = document.getElementById("prevSlide");
if (nextSlideBtn)
  nextSlideBtn.addEventListener("click", () => showSlide(currentIndex + 1));
if (prevSlideBtn)
  prevSlideBtn.addEventListener("click", () => showSlide(currentIndex - 1));
if (slideCount > 0) {
  setInterval(() => showSlide(currentIndex + 1), 4000);
}

let time = 2 * 3600 + 15 * 60 + 36;
setInterval(() => {
  if (time <= 0) return;
  time--;
  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const s = time % 60;
  const hoursElem = document.getElementById("hours");
  const minutesElem = document.getElementById("minutes");
  const secondsElem = document.getElementById("seconds");
  if (hoursElem) hoursElem.innerText = h < 10 ? "0" + h : h;
  if (minutesElem) minutesElem.innerText = m < 10 ? "0" + m : m;
  if (secondsElem) secondsElem.innerText = s < 10 ? "0" + s : s;
}, 1000);

/* ==============================================================
   5. CHATBOT AI MÔ PHỎNG (AN TOÀN - KHÔNG GÂY LỖI NULL)
============================================================== */
const chatbotBtn = document.getElementById("chatbotBtn");
const chatbotWindow = document.getElementById("chatbotWindow");
const closeChatBtn = document.getElementById("closeChatBtn");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendChatBtn = document.getElementById("sendChatBtn");

if (chatbotBtn && chatbotWindow) {
  chatbotBtn.addEventListener("click", () => {
    chatbotWindow.classList.toggle("active");
  });
}

if (closeChatBtn && chatbotWindow) {
  closeChatBtn.addEventListener("click", () => {
    chatbotWindow.classList.remove("active");
  });
}

function addMessage(text, sender) {
  if (!chatBody) return;
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender === "bot" ? "bot-msg" : "user-msg");
  msgDiv.textContent = text;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotResponse(input) {
  const text = input.toLowerCase();

  if (
    text.includes("xin chào") ||
    text.includes("hi") ||
    text.includes("hello")
  ) {
    return "Chào bạn! Mình có thể giúp gì cho bạn hôm nay?";
  }
  if (text.includes("giá") || text.includes("bao nhiêu")) {
    return "Dạ, giá sản phẩm đã được niêm yết công khai trên website. Bạn đang quan tâm đến mã sản phẩm nào ạ?";
  }
  if (text.includes("laptop")) {
    return 'TERRAX hiện đang có rất nhiều dòng Laptop Gaming và Văn phòng. Bạn có thể chọn danh mục "LAPTOP" trên menu để xem nhé!';
  }
  if (text.includes("bảo hành") || text.includes("sửa chữa")) {
    return "Các sản phẩm tại TERRAX đều được bảo hành chính hãng từ 12-36 tháng. Đổi mới 1:1 trong 7 ngày đầu nếu có lỗi phần cứng ạ.";
  }
  if (
    text.includes("địa chỉ") ||
    text.includes("cửa hàng") ||
    text.includes("ở đâu")
  ) {
    return "TERRAX có trụ sở chính tại Hà Nội, Việt Nam. Bạn có thể đặt hàng online để sử dụng mã Freeship TERRAX2026 nhé!";
  }
  if (text.includes("build pc") || text.includes("máy tính bàn")) {
    return "TERRAX chuyên nhận Build PC theo yêu cầu. Bạn cần cấu hình khoảng bao nhiêu tiền để mình tư vấn?";
  }

  return "Xin lỗi, trợ lý AI vẫn đang trong quá trình học hỏi nên chưa hiểu ý bạn. Vui lòng liên hệ Hotline 1900 8888 để gặp trực tiếp nhân viên tư vấn nhé!";
}

function handleChat() {
  if (!chatInput) return;
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  setTimeout(() => {
    const reply = getBotResponse(text);
    addMessage(reply, "bot");
  }, 600);
}

if (sendChatBtn && chatInput) {
  sendChatBtn.addEventListener("click", handleChat);
  chatInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") handleChat();
  });
}
