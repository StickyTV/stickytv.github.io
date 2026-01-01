/**
 * ============================================
 * 📢 MONETAG CONFIG - ระบบโหลดโฆษณาอัตโนมัติ
 * ============================================
 * 
 * 🎯 วิธีใช้:
 * 1. เปิดไฟล์ "monetag-keys.js" 
 * 2. ใส่ KEY ที่ได้จาก Monetag
 * 3. เปลี่ยน enabled เป็น true
 * 4. บันทึกไฟล์ → เสร็จ!
 * 
 * ⚠️ สำคัญ: ต้อง host เว็บบน domain จริง โฆษณาถึงจะแสดง
 * 
 * 📂 ไฟล์ที่เกี่ยวข้อง:
 * - monetag-keys.js (ใส่ KEY ที่นี่ - ไม่อัป GitHub)
 * - monetag-keys.example.js (ตัวอย่าง - อัป GitHub ได้)
 */

// ============================================
// 🤖 ระบบอัตโนมัติ - ไม่ต้องแก้ไขส่วนนี้!
// ============================================

(function () {
    'use strict';

    // รอให้หน้าเว็บโหลดเสร็จ
    document.addEventListener('DOMContentLoaded', function () {
        // ตรวจสอบว่าโหลด MONETAG_KEYS แล้วหรือยัง
        if (typeof MONETAG_KEYS === 'undefined') {
            console.warn('⚠️ ไม่พบไฟล์ monetag-keys.js - โฆษณาจะไม่แสดง');
            console.log('📝 วิธีแก้: Copy monetag-keys.example.js เป็น monetag-keys.js แล้วใส่ KEY');
            return;
        }

        console.log('📢 Monetag Loader: กำลังโหลดโฆษณา...');

        const config = MONETAG_KEYS;

        // โหลดโฆษณาแต่ละประเภท
        loadPopunder(config);
        loadSocialBar(config);
        loadPushNotification(config);
        loadBanner728x90(config);
        loadBanner300x250(config);
        loadInterstitial(config);
        loadNativeBanner(config);

        console.log('✅ Monetag Loader: โหลดเสร็จสิ้น');
    });

    // 1. Popunder
    function loadPopunder(config) {
        if (!config.popunder || !config.popunder.enabled || !config.popunder.key) return;

        const script = document.createElement('script');
        script.src = '//pl.highperformanceformat.com/' + config.popunder.key + '.js';
        script.async = true;
        document.body.appendChild(script);
        console.log('✅ Popunder โหลดแล้ว');
    }

    // 2. Social Bar
    function loadSocialBar(config) {
        if (!config.socialBar || !config.socialBar.enabled || !config.socialBar.key) return;

        const script = document.createElement('script');
        script.src = '//pl.highperformanceformat.com/' + config.socialBar.key + '.js';
        script.async = true;
        document.body.appendChild(script);
        console.log('✅ Social Bar โหลดแล้ว');
    }

    // 3. Push Notification
    function loadPushNotification(config) {
        if (!config.pushNotification || !config.pushNotification.enabled || !config.pushNotification.key) return;

        const script = document.createElement('script');
        script.src = '//pushno.com/' + config.pushNotification.key + '.js';
        script.async = true;
        document.head.appendChild(script);
        console.log('✅ Push Notification โหลดแล้ว');
    }

    // 4. Banner 728x90 (Header + Footer)
    function loadBanner728x90(config) {
        if (!config.banner728x90 || !config.banner728x90.enabled || !config.banner728x90.key) return;

        const key = config.banner728x90.key;
        const positions = ['headerBanner', 'footerBanner'];

        positions.forEach(function (posId) {
            const container = document.getElementById(posId);
            if (container) {
                container.innerHTML = '';

                const script1 = document.createElement('script');
                script1.textContent = `atOptions = {'key': '${key}', 'format': 'iframe', 'height': 90, 'width': 728, 'params': {}};`;
                container.appendChild(script1);

                const script2 = document.createElement('script');
                script2.src = '//www.highperformanceformat.com/' + key + '/invoke.js';
                script2.async = true;
                container.appendChild(script2);
            }
        });
        console.log('✅ Banner 728x90 โหลดแล้ว');
    }

    // 5. Banner 300x250 (Sidebar)
    function loadBanner300x250(config) {
        if (!config.banner300x250 || !config.banner300x250.enabled || !config.banner300x250.key) return;

        const key = config.banner300x250.key;
        const positions = ['leftSidebarBanner', 'rightSidebarBanner', 'rightSidebarBanner2'];

        positions.forEach(function (posId) {
            const container = document.getElementById(posId);
            if (container) {
                container.innerHTML = '';

                const script1 = document.createElement('script');
                script1.textContent = `atOptions = {'key': '${key}', 'format': 'iframe', 'height': 250, 'width': 300, 'params': {}};`;
                container.appendChild(script1);

                const script2 = document.createElement('script');
                script2.src = '//www.highperformanceformat.com/' + key + '/invoke.js';
                script2.async = true;
                container.appendChild(script2);
            }
        });
        console.log('✅ Banner 300x250 โหลดแล้ว');
    }

    // 6. Interstitial
    function loadInterstitial(config) {
        if (!config.interstitial || !config.interstitial.enabled || !config.interstitial.key) return;

        const script = document.createElement('script');
        script.src = '//pl.highperformanceformat.com/' + config.interstitial.key + '.js';
        script.async = true;
        document.body.appendChild(script);

        window.showMonetaInterstitial = function () {
            const funcName = 'show_' + config.interstitial.key;
            if (typeof window[funcName] === 'function') {
                window[funcName]();
            }
        };
        console.log('✅ Interstitial โหลดแล้ว');
    }

    // 7. Native Banner
    function loadNativeBanner(config) {
        if (!config.nativeBanner || !config.nativeBanner.enabled || !config.nativeBanner.key) return;

        const container = document.getElementById('nativeAdContainer');
        if (container) {
            container.innerHTML = '';

            const script = document.createElement('script');
            script.src = '//pl.highperformanceformat.com/' + config.nativeBanner.key + '.js';
            script.async = true;
            container.appendChild(script);
        }
        console.log('✅ Native Banner โหลดแล้ว');
    }

})();
