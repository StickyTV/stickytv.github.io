# 📢 วิธีใส่โฆษณา Monetag (ง่ายมาก!)

## 🎯 Copy-Paste โค้ดจาก Monetag โดยตรง!

---

## ขั้นตอนที่ 1: สมัคร Monetag

1. ไปที่ **https://monetag.com**
2. กด **Sign Up** สมัครสมาชิก
3. เพิ่มเว็บไซต์ของคุณ
4. รอ Monetag approve (1-2 วัน)

---

## ขั้นตอนที่ 2: สร้าง Zone และ copy โค้ด

ใน Monetag Dashboard:

1. เลือกประเภทโฆษณา (เช่น Popunder, Banner, Social Bar)
2. กด **Create Zone**
3. กด **Get Code**
4. **Copy โค้ดทั้งหมด**ที่ Monetag ให้มา

---

## ขั้นตอนที่ 3: วางโค้ดใน index.html

เปิดไฟล์ `index.html` แล้วหาตำแหน่งที่มี comment **🔧 MONETAG:** แล้ววางโค้ดลงไป

### ตัวอย่าง: Popunder

**Monetag ให้โค้ดแบบนี้:**
```html
<script type="text/javascript" src="//pl.example.com/abc123.js"></script>
```

**หาตำแหน่งนี้ใน index.html (ใกล้ท้ายไฟล์):**
```html
<!-- 🔧 MONETAG: POPUNDER / ONCLICK ADS -->
```

**วางโค้ดลงไปใต้ comment:**
```html
<!-- 🔧 MONETAG: POPUNDER / ONCLICK ADS -->
<script type="text/javascript" src="//pl.example.com/abc123.js"></script>
```

---

### ตัวอย่าง: Banner 728x90

**Monetag ให้โค้ดแบบนี้:**
```html
<script type="text/javascript">
    atOptions = {
        'key' : 'xxxxxxxxxxxxx',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
    };
</script>
<script type="text/javascript" src="//www.topcreativeformat.com/xxxxxxxxxxxxx/invoke.js"></script>
```

**หาตำแหน่ง Banner 728x90 ใน index.html:**
```html
<div class="banner-ad banner-header" id="headerBanner">
    <!-- 🔧 MONETAG: BANNER 728x90 -->
    <div class="ad-placeholder">...</div>  <!-- ลบบรรทัดนี้ -->
</div>
```

**ลบ `<div class="ad-placeholder">...</div>` แล้ววางโค้ด Monetag แทน:**
```html
<div class="banner-ad banner-header" id="headerBanner">
    <script type="text/javascript">
        atOptions = {
            'key' : 'xxxxxxxxxxxxx',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
        };
    </script>
    <script type="text/javascript" src="//www.topcreativeformat.com/xxxxxxxxxxxxx/invoke.js"></script>
</div>
```

---

## 📍 ตำแหน่งวางโค้ดแต่ละประเภท

| ประเภท | ตำแหน่งใน index.html |
|--------|----------------------|
| **Popunder** | ก่อน `</body>` (หา comment **POPUNDER**) |
| **Social Bar** | ก่อน `</body>` (หา comment **SOCIAL BAR**) |
| **Push Notification** | หลัง `<body>` (หา comment **PUSH NOTIFICATION**) |
| **Banner 728x90** | ใน `id="headerBanner"` หรือ `id="footerBanner"` |
| **Banner 300x250** | ใน `id="leftSidebarBanner"` หรือ `id="rightSidebarBanner"` |
| **Native Banner** | ใน `id="nativeAdContainer"` |

---

## ⚠️ ข้อควรระวัง

1. **ต้อง host บน domain จริง** - โฆษณาจะไม่แสดงถ้าเปิด file:// ในเครื่อง
2. **ห้ามคลิกโฆษณาของตัวเอง** - จะถูกแบนบัญชี!
3. **รอ 24-48 ชั่วโมง** - หลังเพิ่มเว็บใหม่ โฆษณาจะเริ่มแสดง

---

## ✅ เสร็จแล้ว!

แค่ copy-paste โค้ดจาก Monetag ลงในตำแหน่งที่ถูกต้อง → บันทึกไฟล์ → เสร็จ!
