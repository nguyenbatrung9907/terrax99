var danhSachGioHang = [];
document.addEventListener("DOMContentLoaded", function () {
  /* khởi tạo giỏ hàng */
  var thanhGioHang = document.getElementById("thanh_ben_gio_hang_id");

  if (thanhGioHang && !thanhGioHang.querySelector(".chan_gio_hang")) {
    var khungThanhToan = document.createElement("div");

    khungThanhToan.className = "chan_gio_hang";

    khungThanhToan.innerHTML =
      '<div class="tong_tien_thanh_toan">' +
      "<span>Tổng thanh toán:</span>" +
      '<span id="tong_tien_thanh_toan_id">0đ</span>' +
      "</div>" +
      '<button class="nut_bam nut_day" onclick="thanhToanDonHang()">' +
      "TIẾN HÀNH THANH TOÁN" +
      "</button>";

    thanhGioHang.appendChild(khungThanhToan);
  }

  /* đọc giỏ hàng từ local storage */

  var duLieuLuu = localStorage.getItem("gioHangTerrax");

  if (duLieuLuu) {
    try {
      var duLieuGioHang = JSON.parse(duLieuLuu);

      if (Array.isArray(duLieuGioHang)) {
        danhSachGioHang = duLieuGioHang;
      } else {
        danhSachGioHang = [];
      }
    } catch (error) {
      danhSachGioHang = [];
    }
  }

  /* cập nhật giỏ hàng */

  capNhatGiaoDienGioHang();

  /* khởi tạo tìm kiếm */

  khoiTaoTimKiem();
  khoiTaoDangNhap();
});

/* giỏ hàng */

/* + sản phẩm vào giỏ */

function themVaoGioHang(nutBam) {
  var theSanPham = nutBam.closest(".the_san_pham");

  if (!theSanPham) {
    return;
  }

  var oTen = theSanPham.querySelector(".ten_san_pham");
  var oGia = theSanPham.querySelector(".gia_san_pham");
  var oAnh = theSanPham.querySelector(".anh_san_pham");

  if (!oTen || !oGia || !oAnh) {
    return;
  }

  var tenSp = oTen.innerText.trim();

  var giaSpText = oGia.innerText.trim();

  var anhSp = oAnh.src;

  var giaSo = parseInt(giaSpText.replace(/\D/g, ""), 10);

  if (isNaN(giaSo)) {
    giaSo = 0;
  }

  var daCo = false;

  for (var i = 0; i < danhSachGioHang.length; i++) {
    if (danhSachGioHang[i].ten === tenSp) {
      danhSachGioHang[i].soLuong += 1;

      daCo = true;

      break;
    }
  }

  if (!daCo) {
    danhSachGioHang.push({
      ten: tenSp,
      giaText: giaSpText,
      giaSo: giaSo,
      hinhAnh: anhSp,
      soLuong: 1,
      chon: true,
    });
  }

  luuVaCapNhatGioHang();

  var chuCu = nutBam.innerHTML;

  nutBam.innerHTML = '<i class="fas fa-check"></i> ĐÃ THÊM';

  nutBam.classList.add("nut_da_them");

  setTimeout(function () {
    nutBam.innerHTML = chuCu;

    nutBam.classList.remove("nut_da_them");
  }, 1200);
}

/* thay đổi số lượng */

function thayDoiSoLuong(index, delta) {
  if (!danhSachGioHang[index]) {
    return;
  }

  danhSachGioHang[index].soLuong += delta;

  if (danhSachGioHang[index].soLuong <= 0) {
    danhSachGioHang[index].soLuong = 1;
  }

  luuVaCapNhatGioHang();
}

/* xóa sản phẩm */

function xoaSanPham(index) {
  if (!danhSachGioHang[index]) {
    return;
  }

  danhSachGioHang.splice(index, 1);

  luuVaCapNhatGioHang();
}

/* chọn / bỏ chọn sản phẩm */

function toggleChonSanPham(index) {
  if (!danhSachGioHang[index]) {
    return;
  }

  danhSachGioHang[index].chon = !danhSachGioHang[index].chon;

  luuVaCapNhatGioHang();
}

/* lưu giỏ hàng */

function luuVaCapNhatGioHang() {
  localStorage.setItem("gioHangTerrax", JSON.stringify(danhSachGioHang));

  capNhatGiaoDienGioHang();
}
function capNhatGiaoDienGioHang() {
  var khuVucGioHang = document.querySelector(".cac_mon_hang");

  var oDem = document.getElementById("dem_gio_hang");

  var oTongTien = document.getElementById("tong_tien_thanh_toan_id");

  if (!khuVucGioHang) {
    return;
  }
  if (danhSachGioHang.length === 0) {
    khuVucGioHang.innerHTML =
      '<div style="text-align:center; color:gray; padding:30px;">' +
      "Giỏ hàng của bạn đang trống." +
      "</div>";

    if (oDem) {
      oDem.innerText = "0";
    }

    if (oTongTien) {
      oTongTien.innerText = "0đ";
    }

    return;
  }

  var htmlMoi = "";

  var tongSoLuong = 0;

  var tongTienThanhToan = 0;

  for (var i = 0; i < danhSachGioHang.length; i++) {
    var sp = danhSachGioHang[i];

    if (typeof sp.chon !== "boolean") {
      sp.chon = true;
    }

    if (typeof sp.soLuong !== "number" || sp.soLuong < 1) {
      sp.soLuong = 1;
    }

    tongSoLuong += sp.soLuong;

    if (sp.chon) {
      tongTienThanhToan += Number(sp.giaSo || 0) * Number(sp.soLuong || 1);
    }

    var trangThaiCheck = sp.chon ? "checked" : "";

    htmlMoi +=
      '<div class="mon_hang_gio">' +
      '<input type="checkbox" ' +
      trangThaiCheck +
      ' onclick="toggleChonSanPham(' +
      i +
      ')">' +
      '<img src="' +
      sp.hinhAnh +
      '" alt="">' +
      '<div class="thong_tin_mon_hang">' +
      '<div class="ten_mon_hang">' +
      sp.ten +
      "</div>" +
      '<div class="gia_mon_hang">' +
      sp.giaText +
      "</div>" +
      '<div class="dieu_khiem_sl">' +
      '<button onclick="thayDoiSoLuong(' +
      i +
      ', -1)">-</button>' +
      "<span>" +
      sp.soLuong +
      "</span>" +
      '<button onclick="thayDoiSoLuong(' +
      i +
      ', 1)">+</button>' +
      "</div>" +
      "</div>" +
      '<button class="nut_xoa_sp" ' +
      'onclick="xoaSanPham(' +
      i +
      ')">' +
      '<i class="fas fa-trash-alt"></i>' +
      "</button>" +
      "</div>";
  }

  khuVucGioHang.innerHTML = htmlMoi;

  if (oDem) {
    oDem.innerText = tongSoLuong;
  }

  if (oTongTien) {
    oTongTien.innerText = tongTienThanhToan.toLocaleString("vi-VN") + "đ";
  }
}

/* mở giỏ hàng */

function moGioHang() {
  var thanhGioHang = document.getElementById("thanh_ben_gio_hang_id");

  var lopPhu = document.getElementById("lop_phu_gio_hang_id");

  if (thanhGioHang) {
    thanhGioHang.classList.add("mo_ra");
  }

  if (lopPhu) {
    lopPhu.style.display = "block";
  }
}

/* đóng giỏ hàng */

function dongGioHang() {
  var thanhGioHang = document.getElementById("thanh_ben_gio_hang_id");

  var lopPhu = document.getElementById("lop_phu_gio_hang_id");

  if (thanhGioHang) {
    thanhGioHang.classList.remove("mo_ra");
  }

  if (lopPhu) {
    lopPhu.style.display = "none";
  }
}

/* thanh toán */

function thanhToanDonHang() {
  var oTongTien = document.getElementById("tong_tien_thanh_toan_id");

  if (!oTongTien) {
    return;
  }

  var tongTien = oTongTien.innerText.trim();

  if (tongTien === "0đ") {
    alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
    return;
  }

  // hiển thị thông báo chức năng đang phát triển
  alert("Chức năng thanh toán sẽ sớm phát triển!");
}

/* danh sách sản phẩm tìm kiếm */

var danhSachSanPham = [
  // laptop
  {
    ten: 'Laptop gaming Acer Aspire 7 A715-59G-59RD (Core 5-210H/ RTX 3050 4GB/ 16GB/ 512GB/ 15.6" FHD/ Win 11)',
    trang: "laptop.html",
    gia: 24490000,
  },
  {
    ten: 'Laptop gaming ASUS V16 V3607VJ-TK189W (Core 5-210H/ RTX 3050 6GB/ 16GB/ 512GB/ 16" WUXGA 144Hz/ Win 11)',
    trang: "laptop.html",
    gia: 26390000,
  },
  {
    ten: 'Laptop gaming Lenovo LOQ 15ARP10E 83S0006RVN (Ryzen 7-7735HS/ RTX 3050 6GB/ 16GB/ 1TB/ 15.6" FHD/ Win 11)',
    trang: "laptop.html",
    gia: 31010000,
  },
  {
    ten: "Laptop gaming Acer Nitro ProPanel ANV15-52-73Z8 (Core 7-240H/ RTX 4050/ 16GB/ 512GB/ Win 11)",
    trang: "laptop.html",
    gia: 28490000,
  },
  {
    ten: 'Laptop gaming Lenovo LOQ 15IRX9 83DV01ALVN (I7-13650HX/ RTX 4050 6GB/ 16GB/ 512GB/ 15.6" FHD/ Win 11)',
    trang: "laptop.html",
    gia: 29990000,
  },
  {
    ten: 'Laptop gaming GIGABYTE AORUS Master 16 6XJM4VNE64SH (Ryzen 9 9955HX3D/ RTX 5070 Ti 12GB/ 32GB/ 1TB/ 16" QHD+ OLED 240Hz/ Win 11)',
    trang: "laptop.html",
    gia: 79990000,
  },
  {
    ten: 'Laptop gaming ASUS ROG Strix G16 G614PM-TS147W (Ryzen 9-8940HX/ RTX 5060 8GB/ 16GB/ 512GB/ 16" WQXGA 300Hz/ Win 11)',
    trang: "laptop.html",
    gia: 42990000,
  },
  {
    ten: 'Laptop Acer Aspire Lite 14 AL14-53M-53E8 (Core 5-120U/ 16GB/ 512GB/ 14" FHD+ IPS/ Win 11)',
    trang: "laptop.html",
    gia: 14990000,
  },
  {
    ten: 'Laptop Acer Swift Air 14 SFA14-I31-52BV (Core 5-320/ 12GB/ 512GB/ 14" FHD+ IPS 120Hz/ Green/ Win 11)',
    trang: "laptop.html",
    gia: 17490000,
  },
  {
    ten: 'Laptop Asus ExpertBook P1403CVA-C5H16-50W (Core 5-210H/ 16GB/ 512GB/ 14" FHD/ Win 11)',
    trang: "laptop.html",
    gia: 15590000,
  },
  {
    ten: 'Laptop Acer Swift Go AI OLED SFG14-75-765M (Ultra 7-258V/ 32GB/ 512GB/ 14" FHD+ OLED/ Win11)',
    trang: "laptop.html",
    gia: 25990000,
  },
  {
    ten: 'Laptop Asus ExpertBook P3 P3406CCAP-U516W (Ultra 5-225H/ 16GB/ 512GB/ 14" WUXGA / Win 11)',
    trang: "laptop.html",
    gia: 19490000,
  },
  {
    ten: 'Laptop Dell 15 Pro Essential PV15250 VKVKD (I5-1334U/ 8GB/ 512GB/ 15.6" FHD/DOS) - Nhập Khẩu Chính Hãng',
    trang: "laptop.html",
    gia: 13990000,
  },

  // pc gaming
  {
    ten: "PC GVN Intel i5-12400F/ VGA RX 6500XT (H610)",
    trang: "pc.html",
    gia: 10490000,
  },
  {
    ten: "PC GVN Intel i3-12100F/ VGA RX 6500XT",
    trang: "pc.html",
    gia: 8990000,
  },
  {
    ten: "PC GVN AMD R5-5600X/ VGA RTX 3050",
    trang: "pc.html",
    gia: 13490000,
  },
  {
    ten: "PC GVN Intel i5-12400F/ VGA RTX 3050 (Main H)",
    trang: "pc.html",
    gia: 14290000,
  },
  {
    ten: "PC GVN Intel i5-12400F/ VGA RTX 5060 (Main H)",
    trang: "pc.html",
    gia: 25990000,
  },
  {
    ten: "PC GVN Intel i5-12400F/ VGA RTX 3060 (Main H)",
    trang: "pc.html",
    gia: 24660000,
  },
  {
    ten: "PC GVN Intel i5-12400F/VGA ARC B580",
    trang: "pc.html",
    gia: 23570000,
  },
  {
    ten: "PC GVN Intel i5-12400F/ VGA RTX 5060 Ti",
    trang: "pc.html",
    gia: 28990000,
  },
  {
    ten: "PC GVN AMD Ryzen 7 7800X3D / VGA RTX 5060",
    trang: "pc.html",
    gia: 45490000,
  },
  {
    ten: "PC GVN Intel i7-14700F/ VGA RTX 5060",
    trang: "pc.html",
    gia: 41790000,
  },
  {
    ten: "PC GVN Intel i7-14700F/ VGA RTX 5070Ti (DDR5)",
    trang: "pc.html",
    gia: 54990000,
  },
  {
    ten: "PC GVN AMD Ryzen 7 7800X3D / VGA RTX 5080",
    trang: "pc.html",
    gia: 84990000,
  },
  {
    ten: "PC GVN Intel Core Ultra 7 265F/ VGA RTX 5070Ti",
    trang: "pc.html",
    gia: 59990000,
  },
  {
    ten: "PC GVN x MSI LIGHTNING (Intel Core Ultra 9 285K/ VGA RTX 5090)",
    trang: "pc.html",
    gia: 315990000,
  },
  {
    ten: "PC GVN x ASUS Blackwell (Intel Core Ultra 9 285K/ VGA RTX 5090)",
    trang: "pc.html",
    gia: 314990000,
  },
  {
    ten: "PC GVN x ASUS Extreme (AMD Ryzen 9 9950X3D/VGA RTX 5090)",
    trang: "pc.html",
    gia: 298990000,
  },
  {
    ten: "PC GVN AI XTREME 3xPRO 6000 MAX-Q 288GB / TR PRO",
    trang: "pc.html",
    gia: 559990000,
  },
  {
    ten: "PC GVN x Acer - Máy bộ Altos P130F7 (I5/RAM 8GB/SSD 512GB)",
    trang: "pc.html",
    gia: 12490000,
  },

  // bo mạch chủ
  {
    ten: "Bo mạch chủ ASUS H610M-F WIFI DDR4",
    trang: "bo-mach-chu.html",
    gia: 1950000,
  },
  {
    ten: "Bo mạch chủ ASUS ROG CROSSHAIR X870E EXTREME (DDR5)",
    trang: "bo-mach-chu.html",
    gia: 18990000,
  },
  {
    ten: "Bo mạch chủ ASUS ROG MAXIMUS Z890 APEX (DDR5)",
    trang: "bo-mach-chu.html",
    gia: 16500000,
  },
  {
    ten: "Bo mạch chủ ASUS ROG MAXIMUS Z890 EXTREME (DDR5)",
    trang: "bo-mach-chu.html",
    gia: 28990000,
  },
  {
    ten: "Bo mạch chủ ASUS PRIME B760M-K (DDR5)",
    trang: "bo-mach-chu.html",
    gia: 2950000,
  },
  {
    ten: "Bo Mạch Chủ Gigabyte A520M-K V2",
    trang: "bo-mach-chu.html",
    gia: 1450000,
  },
  {
    ten: "Bo mạch chủ GIGABYTE B760M GAMING WIFI PLUS DDR5",
    trang: "bo-mach-chu.html",
    gia: 3450000,
  },
  {
    ten: "Bo mạch chủ GIGABYTE H610M-H V3 (DDR4)",
    trang: "bo-mach-chu.html",
    gia: 1750000,
  },
  {
    ten: "Bo mạch chủ ASUS ProArt Z890-CREATOR WIFI (DDR5)",
    trang: "bo-mach-chu.html",
    gia: 11990000,
  },
  {
    ten: "Bo mạch chủ ASUS ROG MAXIMUS Z890 HERO (DDR5)",
    trang: "bo-mach-chu.html",
    gia: 17500000,
  },
  {
    ten: "Bo mạch chủ ASUS ROG Strix Z890-E GAMING WIFI (DDR5)",
    trang: "bo-mach-chu.html",
    gia: 12500000,
  },
  {
    ten: "Bo mạch chủ ASUS ROG Strix Z890-A GAMING WIFI (DDR5)",
    trang: "bo-mach-chu.html",
    gia: 10500000,
  },
  {
    ten: "Bo mạch chủ ASUS TUF Gaming Z890-PRO WIFI (DDR5)",
    trang: "bo-mach-chu.html",
    gia: 8500000,
  },
  {
    ten: "Bo mạch chủ ASUS TUF Gaming Z890-PLUS WIFI (DDR5)",
    trang: "bo-mach-chu.html",
    gia: 7500000,
  },
  {
    ten: "Bo mạch chủ MSI MPG Z890 CARBON WIFI (DDR5)",
    trang: "bo-mach-chu.html",
    gia: 12900000,
  },

  // màn hình
  {
    ten: "Màn hình LG 27U711B-B 27\\ IPS 4K HDR10",
    trang: "man-hinh.html",
    gia: 5240000,
  },
  {
    ten: "Màn hình VSP G2410QS 24\\ IPS 2K 100Hz USBC",
    trang: "man-hinh.html",
    gia: 2875000,
  },
  {
    ten: "Màn hình VSP G2410Q1 24\\ IPS 2K 100Hz",
    trang: "man-hinh.html",
    gia: 2540000,
  },
  {
    ten: 'Màn hình VSP IP25Q180 25\\" IPS 2K 180Hz chuyên game',
    trang: "man-hinh.html",
    gia: 3272000,
  },
  {
    ten: 'Màn hình ViewSonic VA24G1-H 24\\" IPS 144Hz',
    trang: "man-hinh.html",
    gia: 2990000,
  },
  {
    ten: 'Màn hình BenQ Zowie XL2586X+ 25\\" 600Hz DyAc 2 chuyên game',
    trang: "man-hinh.html",
    gia: 19990000,
  },
  {
    ten: 'Màn hình ASUS TUF GAMING VG27AQME5F 27\\" Fast IPS 2K 255Hz chuyên game',
    trang: "man-hinh.html",
    gia: 8990000,
  },
  {
    ten: 'Màn hình KOORUI E2212F 22\\" 100Hz',
    trang: "man-hinh.html",
    gia: 1690000,
  },
  {
    ten: 'Màn hình KOORUI E2711F 27\\" IPS 100Hz',
    trang: "man-hinh.html",
    gia: 2490000,
  },
  {
    ten: 'Màn hình KOORUI E2721F 27\\" IPS 2K 100Hz',
    trang: "man-hinh.html",
    gia: 3290000,
  },
  {
    ten: 'Màn hình KOORUI G2411P 24\\" IPS 200Hz chuyên game',
    trang: "man-hinh.html",
    gia: 2890000,
  },

  // bàn phím
  {
    ten: "Bàn phím cơ ASUS ROG Falchion Ace 75 HE V2X White",
    trang: "ban-phim.html",
    gia: 5890000,
  },
  {
    ten: "Bàn phím cơ ASUS ROG Falchion Ace 75 HE V2X Red",
    trang: "ban-phim.html",
    gia: 5890000,
  },
  {
    ten: "Bàn phím cơ ASUS ROG Falchion Ace 75 HE V2X Black",
    trang: "ban-phim.html",
    gia: 5890000,
  },
  {
    ten: "Bàn phím cơ gaming không dây DareU Flex 75 White Black 3 Mode Pegasus switch",
    trang: "ban-phim.html",
    gia: 690000,
  },
  {
    ten: "Bàn phím cơ gaming không dây DareU Flex 75 Black Grey 3 Mode Pegasus switch",
    trang: "ban-phim.html",
    gia: 690000,
  },
  {
    ten: "Bàn phím không dây AKKO 5087 V3 Prunus Lannesiana Akko Piano Pro",
    trang: "ban-phim.html",
    gia: 1190000,
  },
  {
    ten: "Bàn phím gaming ASUS ROG Azoth 96 HE White",
    trang: "ban-phim.html",
    gia: 6990000,
  },
  {
    ten: "Bàn phím gaming ASUS ROG Azoth 96 HE Black",
    trang: "ban-phim.html",
    gia: 6990000,
  },
  {
    ten: "Bàn phím Logitech G316 X 98 RGB Trắng Tactile",
    trang: "ban-phim.html",
    gia: 2490000,
  },
  {
    ten: "Bàn phím Logitech G316 X 98 RGB Đen Tactile",
    trang: "ban-phim.html",
    gia: 2490000,
  },
  {
    ten: "Bàn phím Rapoo V501-87",
    trang: "ban-phim.html",
    gia: 550000,
  },
  {
    ten: "Bàn phím không dây HyperWork Core Type CT01 Đen",
    trang: "ban-phim.html",
    gia: 1290000,
  },
  {
    ten: "Bàn phím không dây HyperWork SilentKey TS01 Trắng",
    trang: "ban-phim.html",
    gia: 890000,
  },
  {
    ten: "Bàn phím không dây HyperWork SilentKey Mini TS01M Trắng",
    trang: "ban-phim.html",
    gia: 790000,
  },
  {
    ten: "Bàn phím không dây HyperWork SilentKey TS01 Đen",
    trang: "ban-phim.html",
    gia: 890000,
  },
  {
    ten: "Bàn phím không dây HyperWork HyperOne Gen 3 Plus Đen",
    trang: "ban-phim.html",
    gia: 950000,
  },

  // chuột
  {
    ten: "Chuột Gaming Predator Cestus 3",
    trang: "chuot.html",
    gia: 1500000,
  },
  {
    ten: "Chuột Gaming AKKO AG ONE 8K Joy of Li",
    trang: "chuot.html",
    gia: 795000,
  },
  {
    ten: "Chuột gaming không dây Logitech G304 X Superlight Black",
    trang: "chuot.html",
    gia: 1790000,
  },
  {
    ten: "Chuột Razer Basilisk V3 Pro 35K Phantom Green Edition",
    trang: "chuot.html",
    gia: 3946000,
  },
  {
    ten: "Chuột không dây HyperWork Silentium MS01 Đen",
    trang: "chuot.html",
    gia: 489000,
  },
  {
    ten: "Chuột không dây HyperWork Silentium MS01 Trắng",
    trang: "chuot.html",
    gia: 489000,
  },
  {
    ten: "Chuột không dây HyperWork Silentium Gen 2 MS01 Đen",
    trang: "chuot.html",
    gia: 550000,
  },
  {
    ten: "Chuột không dây HyperWork Silentium Gen 2 MS01 Trắng",
    trang: "chuot.html",
    gia: 550000,
  },
  {
    ten: "Chuột không dây HyperWork Macro MS02 Đen",
    trang: "chuot.html",
    gia: 650000,
  },
  {
    ten: "Chuột MSI VERSA WIRELESS MLG EDITION",
    trang: "chuot.html",
    gia: 1450000,
  },
  {
    ten: "Chuột không dây Logitech Signature Comfort M840 L White",
    trang: "chuot.html",
    gia: 890000,
  },
  {
    ten: "Chuột không dây AKKO Nest Black",
    trang: "chuot.html",
    gia: 650000,
  },
  {
    ten: "Chuột không dây AKKO Nest White",
    trang: "chuot.html",
    gia: 650000,
  },
  {
    ten: "Chuột không dây AKKO Dash V9 Max Black",
    trang: "chuot.html",
    gia: 950000,
  },
  {
    ten: "Chuột không dây AKKO Dash V9 Max White",
    trang: "chuot.html",
    gia: 950000,
  },
  {
    ten: "Chuột Razer DeathAdder V4 Pro Black",
    trang: "chuot.html",
    gia: 4290000,
  },

  // tai nghe
  {
    ten: "Tai nghe Razer Hammerhead V3 X",
    trang: "tai-nghe.html",
    gia: 1290000,
  },
  {
    ten: "Tai nghe HP HyperX Cloud Earbuds",
    trang: "tai-nghe.html",
    gia: 990000,
  },
  {
    ten: "Tai nghe gaming không dây Logitech Astro A20 X",
    trang: "tai-nghe.html",
    gia: 2490000,
  },
  {
    ten: "Tai nghe Razer BlackShark V3 White",
    trang: "tai-nghe.html",
    gia: 1890000,
  },
  {
    ten: "Tai Nghe Gaming Không Dây Predator Galea 550 (PHR235)",
    trang: "tai-nghe.html",
    gia: 2190000,
  },
  {
    ten: "Tai nghe HyperX Cloud Stinger 3 Black",
    trang: "tai-nghe.html",
    gia: 1340000,
  },
  {
    ten: "Phụ kiện hộp đựng tai nghe Usams",
    trang: "tai-nghe.html",
    gia: 150000,
  },
  {
    ten: "Tai nghe HP HYPERX Cloud Earbuds III S Red",
    trang: "tai-nghe.html",
    gia: 1190000,
  },
  {
    ten: "Tai nghe HP HYPERX Cloud Earbuds III Red",
    trang: "tai-nghe.html",
    gia: 1090000,
  },
  {
    ten: "Tai nghe gaming không dây Akko Verge S9 Ultra White",
    trang: "tai-nghe.html",
    gia: 1590000,
  },
  {
    ten: "Tai nghe gaming không dây Akko Verge S9 Ultra Black Red",
    trang: "tai-nghe.html",
    gia: 1590000,
  },
  {
    ten: "Tai nghe gaming không dây Akko Verge S9 Ultra Black",
    trang: "tai-nghe.html",
    gia: 1590000,
  },
  {
    ten: "Tai nghe ASUS ROG Kithara Gaming",
    trang: "tai-nghe.html",
    gia: 3490000,
  },
  {
    ten: "Tai nghe Razer BlackShark V3 Pro - NiKo Edition",
    trang: "tai-nghe.html",
    gia: 5290000,
  },
  {
    ten: "Tai nghe không dây AKKO GH300 Black",
    trang: "tai-nghe.html",
    gia: 1450000,
  },
  {
    ten: "Tai nghe không dây Logitech G325 LIGHTSPEED White",
    trang: "tai-nghe.html",
    gia: 1790000,
  },
];
function xemChiTietPC(maPC) {
  var maCanTim = String(maPC);

  if (typeof danhSachPC === "undefined" || !Array.isArray(danhSachPC)) {
    alert("Không tìm thấy dữ liệu sản phẩm PC!");
    return;
  }

  var pc = danhSachPC.find(function (sanPham) {
    return String(sanPham.id) === maCanTim;
  });

  if (!pc) {
    alert("Không tìm thấy sản phẩm!");
    return;
  }

  localStorage.setItem("pcDangXem", String(pc.id));
  window.location.href = "pc-chi-tiet.html?id=" + encodeURIComponent(pc.id);
}

/* khởi tạo tìm kiếm */

function khoiTaoTimKiem() {
  var oTimKiem = document.getElementById("o_tim_kiem");
  var nutTimKiem = document.getElementById("nut_tim_kiem");
  var ketQuaTimKiem = document.getElementById("ket_qua_tim_kiem");
  if (!oTimKiem) {
    console.warn("TERRAX: Không tìm thấy #o_tim_kiem");
    return;
  }
  if (!ketQuaTimKiem) {
    console.warn("TERRAX: Không tìm thấy #ket_qua_tim_kiem");
    return;
  }
  oTimKiem.addEventListener("input", function () {
    hienThiKetQuaTimKiem(oTimKiem, ketQuaTimKiem);
  });
  if (nutTimKiem) {
    nutTimKiem.addEventListener("click", function (event) {
      event.preventDefault();

      hienThiKetQuaTimKiem(oTimKiem, ketQuaTimKiem);
    });
  }

  /* enter */
  oTimKiem.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      hienThiKetQuaTimKiem(oTimKiem, ketQuaTimKiem);
    }
  });

  /* click ra ngoài đóng kết quả */

  document.addEventListener("click", function (event) {
    /* nếu click bên trong ô tìm kiếm thì không đóng. */

    if (event.target.closest(".hop_tim_kiem_lon")) {
      return;
    }

    ketQuaTimKiem.style.display = "none";
  });

  console.log(
    "TERRAX Search đã hoạt động.",
    "Số sản phẩm:",
    danhSachSanPham.length,
  );
}

/* bỏ dấu tiếng việt */

function boDauTiengViet(text) {
  if (!text) {
    return "";
  }

  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

/* hiển thị kết quả tìm kiếm */

function hienThiKetQuaTimKiem(oTimKiem, ketQuaTimKiem) {
  if (!oTimKiem || !ketQuaTimKiem) {
    return;
  }

  /* lấy từ khóa */

  var tuKhoaGoc = oTimKiem.value.trim();

  /* không nhập gì */

  if (tuKhoaGoc === "") {
    ketQuaTimKiem.innerHTML = "";

    ketQuaTimKiem.style.display = "none";

    return;
  }

  /* bỏ dấu */

  var tuKhoa = boDauTiengViet(tuKhoaGoc);

  /* tìm sản phẩm */

  var ketQua = danhSachSanPham.filter(function (sanPham) {
    var tenSanPham = boDauTiengViet(sanPham.ten);

    return tenSanPham.includes(tuKhoa);
  });

  /* xóa kết quả cũ */

  ketQuaTimKiem.innerHTML = "";

  /* không tìm thấy */

  if (ketQua.length === 0) {
    var divKhongCo = document.createElement("div");

    divKhongCo.className = "khong_co_ket_qua";

    divKhongCo.innerHTML =
      "Không tìm thấy sản phẩm phù hợp với: " + "<strong></strong>";

    divKhongCo.querySelector("strong").textContent = tuKhoaGoc;

    ketQuaTimKiem.appendChild(divKhongCo);

    ketQuaTimKiem.style.display = "block";

    return;
  }

  /* hiển thị kết quả */

  ketQua.forEach(function (sanPham) {
    var item = document.createElement("div");

    item.className = "item_ket_qua_tim_kiem";

    /* icon */

    var icon = document.createElement("i");

    icon.className = "fas fa-search";

    /* tên sản phẩm */

    var span = document.createElement("span");

    span.textContent = sanPham.ten;

    item.appendChild(icon);

    item.appendChild(span);

    /* click vào kết quả */

    item.addEventListener("click", function () {
      window.location.href = sanPham.trang;
    });

    ketQuaTimKiem.appendChild(item);
  });
  ketQuaTimKiem.style.display = "block";
}

/* chatbot ai mô phỏng (rule-based) - hoàn chỉnh */

var soLanHoiNgoaiLe = 0; // Biến đếm số lần hỏi ngoài lề

function batTatChatbot() {
  var khung = document.getElementById("khung_chatbot_id");
  if (khung) {
    khung.classList.toggle("hien_thi_chatbot");
  }
}

function kiemTraEnter(event) {
  if (event.key === "Enter") {
    guiTinNhan();
  }
}

function guiTinNhan() {
  var oNhap = document.getElementById("o_nhap_chat_id");
  var thanChat = document.getElementById("than_chatbot_id");

  if (!oNhap || !thanChat) return;

  var noiDung = oNhap.value.trim();
  if (noiDung === "") return;

  // 1. hiển thị tin nhắn của khách hàng
  var tinNhanNguoi = document.createElement("div");
  tinNhanNguoi.className = "tin_nhan_chat nguoi";
  tinNhanNguoi.innerText = noiDung;
  thanChat.appendChild(tinNhanNguoi);

  // 2. xóa ô nhập và cuộn xuống cuối
  oNhap.value = "";
  thanChat.scrollTop = thanChat.scrollHeight;

  // 3. bot phản hồi sau 0.6 giây
  setTimeout(function () {
    var phanHoi = taoPhanHoiTuDong(noiDung);

    var tinNhanMay = document.createElement("div");
    tinNhanMay.className = "tin_nhan_chat may";
    tinNhanMay.innerHTML = phanHoi;
    thanChat.appendChild(tinNhanMay);

    thanChat.scrollTop = thanChat.scrollHeight;
  }, 600);
}

// logic rule-based: nhận diện từ khóa và trả lời
var soLanHoiNgoaiLe = 0;

function taoPhanHoiTuDong(tinNhan) {
  var tuKhoa = boDauTiengViet(tinNhan);

  // 1. nhận diện yêu cầu tìm theo ngân sách (vd: "16 triệu", "20tr")
  var batGia = tuKhoa.match(/(\d+)\s*(trieu|tr|cu)/);

  if (batGia) {
    soLanHoiNgoaiLe = 0;
    var nganSach = parseInt(batGia[1]) * 1000000;
    var ketQuaTimKiem = [];

    if (tuKhoa.includes("laptop") || tuKhoa.includes("may tinh")) {
      ketQuaTimKiem = danhSachSanPham.filter(
        (sp) => sp.trang === "laptop.html" && sp.gia && sp.gia <= nganSach,
      );
    } else if (tuKhoa.includes("pc") || tuKhoa.includes("may ban")) {
      ketQuaTimKiem = danhSachSanPham.filter(
        (sp) => sp.trang === "pc.html" && sp.gia && sp.gia <= nganSach,
      );
    } else {
      ketQuaTimKiem = danhSachSanPham.filter(
        (sp) => sp.gia && sp.gia <= nganSach,
      );
    }

    if (ketQuaTimKiem.length > 0) {
      ketQuaTimKiem.sort(function (a, b) {
        return b.gia - a.gia;
      });

      var cauTraLoi =
        "Với ngân sách khoảng " +
        batGia[1] +
        " triệu, TERRAX gợi ý các mẫu này nhé:<br><br>";
      var soLuongHienThi = Math.min(3, ketQuaTimKiem.length);

      for (var i = 0; i < soLuongHienThi; i++) {
        var sp = ketQuaTimKiem[i];

        // cắt ngắn tên: chỉ lấy phần chữ trước dấu "(" để khung chat gọn gàng
        var tenNganGon = sp.ten.split("(")[0].trim();

        // định dạng giá tiền (vd: 16.000.000đ)
        var giaHienThi = sp.gia.toLocaleString("vi-VN") + "đ";

        // tạo giao diện card mini siêu đẹp cho từng sản phẩm
        cauTraLoi +=
          "<div style='margin-bottom: 10px; padding: 10px; background: #fff; border-radius: 8px; border: 1px solid #ffcdd2; box-shadow: 0 2px 4px rgba(0,0,0,0.05);'>" +
          "<a href='" +
          sp.trang +
          "' style='color: #d32f2f; font-weight: 700; text-decoration: none; display: block; font-size: 13px; margin-bottom: 5px; line-height: 1.4;'>" +
          tenNganGon +
          "</a>" +
          "<span style='color: #444; font-size: 12px;'>Giá tham khảo: <b style='color: #d32f2f; font-size: 14px;'>" +
          giaHienThi +
          "</b></span>" +
          "</div>";
      }

      cauTraLoi +=
        "<i style='font-size: 12px; color: #666;'>(Click trực tiếp vào tên máy để xem nha!)</i>";
      return cauTraLoi;
    } else {
      return (
        "Dạ với mức giá khoảng " +
        batGia[1] +
        " triệu, hiện tại bên mình đang tạm hết hàng các mẫu phù hợp. Bạn tham khảo thêm các dòng khác trên Menu nhé!"
      );
    }
  }

  // 2. các câu hỏi thông thường
  if (
    tuKhoa.includes("xin chao") ||
    tuKhoa.includes("hello") ||
    tuKhoa.includes("hi")
  ) {
    soLanHoiNgoaiLe = 0;
    return "Chào bạn! Mình có thể giúp gì cho bạn hôm nay?";
  } else if (
    tuKhoa.includes("bao hanh") ||
    tuKhoa.includes("doi tra") ||
    tuKhoa.includes("hong")
  ) {
    soLanHoiNgoaiLe = 0;
    return "Tất cả sản phẩm tại TERRAX đều được bảo hành chính hãng 12-36 tháng. Lỗi 1 đổi 1 trong 7 ngày đầu tiên nếu do nhà sản xuất bạn nhé!";
  } else if (
    tuKhoa.includes("laptop") ||
    tuKhoa.includes("may tinh xach tay")
  ) {
    soLanHoiNgoaiLe = 0;
    return "Bên mình có sẵn rất nhiều Laptop Gaming. Bạn muốn tìm máy khoảng bao nhiêu tiền (ví dụ: 'laptop 16 triệu') để mình gợi ý cho chuẩn xác nha?";
  } else if (
    tuKhoa.includes("pc") ||
    tuKhoa.includes("may ban") ||
    tuKhoa.includes("build")
  ) {
    soLanHoiNgoaiLe = 0;
    return "TERRAX chuyên build PC. Bạn có ngân sách khoảng bao nhiêu (ví dụ: 'build pc 20 triệu') để mình gửi cấu hình tham khảo?";
  } else if (
    tuKhoa.includes("ban phim") ||
    tuKhoa.includes("chuot") ||
    tuKhoa.includes("tai nghe") ||
    tuKhoa.includes("gear")
  ) {
    soLanHoiNgoaiLe = 0;
    return "Phụ kiện Gaming bên mình đang có chương trình giảm giá lên đến 25%. Bạn có thể xem ngay ở danh mục tương ứng hoặc tìm bằng thanh tìm kiếm ở phía trên nhé.";
  } else if (
    tuKhoa.includes("gia") ||
    tuKhoa.includes("bao nhieu") ||
    tuKhoa.includes("khuyen mai")
  ) {
    soLanHoiNgoaiLe = 0;
    return "Mỗi sản phẩm đều có mức giá và ưu đãi khác nhau. Bạn hãy bấm xem trực tiếp vào mục 'Xem ưu đãi' trên từng sản phẩm nha!";
  } else if (
    tuKhoa.includes("mua") ||
    tuKhoa.includes("dat hang") ||
    tuKhoa.includes("thanh toan")
  ) {
    soLanHoiNgoaiLe = 0;
    return "Bạn chỉ cần bấm <b>THÊM VÀO GIỎ</b>, sau đó mở giỏ hàng ở góc phải màn hình, chọn sản phẩm và bấm <b>TIẾN HÀNH THANH TOÁN</b>. Rất đơn giản!";
  }

  // 3. xử lý khách hỏi ngoài lề
  soLanHoiNgoaiLe++;
  if (soLanHoiNgoaiLe === 1) {
    return "Xin lỗi bạn, trợ lý ảo TERRAX chỉ hỗ trợ giải đáp các thông tin về sản phẩm công nghệ trên website. Mình không hỗ trợ trả lời các câu hỏi ngoài lề ạ!";
  } else {
    return "Chúc bạn một ngày vui vẻ! Nếu có vấn đề gấp hoặc cần hỗ trợ thêm, bạn vui lòng liên hệ trực tiếp hotline <b>0389539590</b> nhé.";
  }
}

function khoiTaoDangNhap() {
  if (!document.getElementById("terraXLoginModal")) {
    var modal = document.createElement("div");
    modal.id = "terraXLoginModal";
    modal.className = "tx-modal-overlay";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "txLoginTitle");
    modal.innerHTML =
      '<div class="tx-modal-box">' +
      '<button type="button" class="tx-close-btn" onclick="closeTerraXModal()" aria-label="Đóng">&times;</button>' +
      '<div class="tx-logo-area">' +
      '<span class="tx-logo-text">terra<span class="tx-red">X</span></span>' +
      '<span class="tx-sub-logo">TECHNOLOGY STORE</span>' +
      '<h2 class="tx-title" id="txLoginTitle">Đăng nhập</h2>' +
      '<p class="tx-desc">Chào mừng trở lại! Đăng nhập để tiếp tục trải nghiệm TerraX.</p>' +
      "</div>" +
      '<div id="loginErrorMsg" role="alert" style="display:none"></div>' +
      '<form onsubmit="handleLoginSubmit(event)">' +
      '<div class="tx-input-group"><i class="far fa-envelope tx-input-icon"></i>' +
      '<input type="text" id="loginEmail" placeholder="Email hoặc tên đăng nhập" class="tx-input" autocomplete="username"></div>' +
      '<div class="tx-input-group"><i class="far fa-lock tx-input-icon"></i>' +
      '<input type="password" id="loginPassword" placeholder="Mật khẩu" class="tx-input" autocomplete="current-password">' +
      '<button type="button" class="tx-eye-btn" onclick="togglePassword()" aria-label="Hiện hoặc ẩn mật khẩu"><i id="togglePassIcon" class="far fa-eye-slash"></i></button></div>' +
      '<div class="tx-remember-row"><label class="tx-checkbox-label">' +
      '<input type="checkbox" class="tx-checkbox" id="txRememberLogin"><span>Ghi nhớ đăng nhập</span></label>' +
      '<a href="#" onclick="showInlineError(\'Tính năng quên mật khẩu đang phát triển\'); return false;" class="tx-forgot-link">Quên mật khẩu?</a></div>' +
      '<button type="submit" class="tx-submit-btn">Đăng nhập &rarr;</button></form>' +
      '<div class="tx-divider"><span>HOẶC ĐĂNG NHẬP VỚI</span></div>' +
      '<div class="tx-social-grid">' +
      '<button type="button" onclick="showInlineError(\'Đăng nhập Facebook đang phát triển\')" class="tx-social-btn"><i class="fab fa-facebook" aria-hidden="true"></i> Facebook</button>' +
      '<button type="button" onclick="showInlineError(\'Đăng nhập Google đang phát triển\')" class="tx-social-btn"><i class="fab fa-google" aria-hidden="true"></i> Google</button></div>' +
      '<div class="tx-footer-text">Chưa có tài khoản? <a href="#" onclick="showInlineError(\'Chức năng đăng ký đang phát triển\'); return false;" class="tx-red-link">Đăng ký ngay</a></div>' +
      "</div>";
    document.body.appendChild(modal);
  }

  var emailInput = document.getElementById("loginEmail");
  var rememberCheckbox = document.getElementById("txRememberLogin");
  var savedEmail = localStorage.getItem("terraXRememberedEmail");

  if (emailInput && savedEmail) {
    emailInput.value = savedEmail;
    if (rememberCheckbox) {
      rememberCheckbox.checked = true;
    }
  }
}

function openTerraXModal() {
  var modal = document.getElementById("terraXLoginModal");
  if (!modal) {
    khoiTaoDangNhap();
    modal = document.getElementById("terraXLoginModal");
  }
  modal.style.display = "flex";
  hideInlineError();
  var emailInput = document.getElementById("loginEmail");
  if (emailInput) {
    emailInput.focus();
  }
}

function closeTerraXModal() {
  var modal = document.getElementById("terraXLoginModal");
  if (modal) {
    modal.style.display = "none";
  }
}

function showInlineError(message) {
  const errorBox = document.getElementById("loginErrorMsg");
  if (!errorBox) {
    return;
  }
  errorBox.innerText = message;
  errorBox.style.display = "block";
}

function hideInlineError() {
  const errorBox = document.getElementById("loginErrorMsg");
  if (errorBox) {
    errorBox.style.display = "none";
    errorBox.innerText = "";
  }
}

function togglePassword() {
  const passwordInput = document.getElementById("loginPassword");
  const icon = document.getElementById("togglePassIcon");
  if (!passwordInput || !icon) {
    return;
  }
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  } else {
    passwordInput.type = "password";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  }
}

// hàm validate sử dụng thông báo trực tiếp thay vì alert()
function validateLogin() {
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  if (!emailInput || !passwordInput) {
    return false;
  }
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email === "") {
    showInlineError("Vui lòng nhập email hoặc tên đăng nhập.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    (email.includes("@") && !emailRegex.test(email)) ||
    (!email.includes("@") && !/^\S{3,}$/.test(email))
  ) {
    showInlineError("Email hoặc tên đăng nhập không hợp lệ.");
    return false;
  }

  if (password === "") {
    showInlineError("Vui lòng nhập mật khẩu.");
    return false;
  }

  hideInlineError();
  return true;
}

function handleLoginSubmit(event) {
  event.preventDefault();
  if (validateLogin()) {
    const emailInput = document.getElementById("loginEmail");
    const rememberCheckbox = document.getElementById("txRememberLogin");
    if (rememberCheckbox && rememberCheckbox.checked) {
      localStorage.setItem("terraXRememberedEmail", emailInput.value.trim());
    } else {
      localStorage.removeItem("terraXRememberedEmail");
    }
    alert("Đăng nhập thành công (mô phỏng)!");
    closeTerraXModal();
  }
}

document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "terraXLoginModal") {
    closeTerraXModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeTerraXModal();
  }
});
