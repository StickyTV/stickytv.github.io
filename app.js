// ============================================
// FunZone - Entertainment Platform JavaScript
// ============================================

class FunZoneApp {
    constructor() {
        // Configuration
        this.config = {
            adDuration: 10, // seconds
            pointsPerGame: 10,
            maxDailyPlays: 50
        };

        // State
        this.state = {
            points: 0,
            totalEarned: 0,
            totalGamesPlayed: 0,
            gamesPlayedToday: 0,
            streakDays: 1,
            lastPlayDate: null,
            isPlaying: false
        };

        // DOM Elements
        this.elements = {};

        // Initialize
        this.init();
    }

    init() {
        this.loadState();
        this.cacheElements();
        this.bindEvents();
        this.updateUI();
        this.checkDailyReset();
        this.initBannerRotation();
    }

    cacheElements() {
        this.elements = {
            coinAmount: document.getElementById('coinAmount'),
            adsWatchedToday: document.getElementById('adsWatchedToday'),
            totalEarned: document.getElementById('totalEarned'),
            totalAdsWatched: document.getElementById('totalAdsWatched'),
            streakDays: document.getElementById('streakDays'),
            watchAdBtn: document.getElementById('watchAdBtn'),
            adPlayer: document.getElementById('adPlayer'),
            adVideoPlaceholder: document.getElementById('adVideoPlaceholder'),
            adPlaying: document.getElementById('adPlaying'),
            adCompleted: document.getElementById('adCompleted'),
            timerBar: document.getElementById('timerBar'),
            countdown: document.getElementById('countdown'),
            toastContainer: document.getElementById('toastContainer')
        };
    }

    bindEvents() {
        // Watch Ad Button
        this.elements.watchAdBtn.addEventListener('click', () => this.startWatchingAd());

        // Ad Placeholder Click
        this.elements.adVideoPlaceholder.addEventListener('click', () => this.startWatchingAd());

        // Redeem Buttons
        document.querySelectorAll('.redeem-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.redeemReward(e));
        });
    }

    // ==========================================
    // State Management
    // ==========================================

    loadState() {
        const savedState = localStorage.getItem('funZoneState');
        if (savedState) {
            this.state = { ...this.state, ...JSON.parse(savedState) };
        }
    }

    saveState() {
        localStorage.setItem('funZoneState', JSON.stringify(this.state));
    }

    checkDailyReset() {
        const today = new Date().toDateString();
        const lastPlay = this.state.lastPlayDate;

        if (lastPlay && lastPlay !== today) {
            const lastDate = new Date(lastPlay);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Consecutive day - increase streak
                this.state.streakDays++;
            } else if (diffDays > 1) {
                // Streak broken
                this.state.streakDays = 1;
            }

            // Reset daily games
            this.state.gamesPlayedToday = 0;
            this.saveState();
        }
    }

    // ==========================================
    // Game Playing Flow
    // ==========================================

    startWatchingAd() {
        if (this.state.isPlaying) return;

        if (this.state.gamesPlayedToday >= this.config.maxDailyPlays) {
            this.showToast('⚠️', 'คุณเล่นครบจำนวนวันนี้แล้ว กลับมาใหม่พรุ่งนี้!');
            return;
        }

        this.state.isPlaying = true;
        this.elements.watchAdBtn.disabled = true;

        // Show game playing state
        this.elements.adVideoPlaceholder.classList.add('hidden');
        this.elements.adCompleted.classList.add('hidden');
        this.elements.adPlaying.classList.remove('hidden');

        // Start countdown
        this.runCountdown();
    }

    runCountdown() {
        let timeLeft = this.config.adDuration;
        this.elements.countdown.textContent = timeLeft;
        this.elements.timerBar.style.width = '0%';

        const interval = setInterval(() => {
            timeLeft--;
            this.elements.countdown.textContent = timeLeft;

            const progress = ((this.config.adDuration - timeLeft) / this.config.adDuration) * 100;
            this.elements.timerBar.style.width = `${progress}%`;

            if (timeLeft <= 0) {
                clearInterval(interval);
                this.completeAd();
            }
        }, 1000);
    }

    completeAd() {
        // Hide game playing, show completed
        this.elements.adPlaying.classList.add('hidden');
        this.elements.adCompleted.classList.remove('hidden');

        // Award points
        this.state.points += this.config.pointsPerGame;
        this.state.totalEarned += this.config.pointsPerGame;
        this.state.totalGamesPlayed++;
        this.state.gamesPlayedToday++;
        this.state.lastPlayDate = new Date().toDateString();
        this.state.isPlaying = false;

        // Save and update UI
        this.saveState();
        this.updateUI();
        this.animateCoinIncrease();

        // Show toast
        this.showToast('🎉', `ได้รับ ${this.config.pointsPerGame} Points!`);

        // Reset after 2 seconds
        setTimeout(() => {
            this.resetAdPlayer();
        }, 2500);
    }

    resetAdPlayer() {
        this.elements.adCompleted.classList.add('hidden');
        this.elements.adVideoPlaceholder.classList.remove('hidden');
        this.elements.watchAdBtn.disabled = false;
        this.elements.timerBar.style.width = '0%';
    }

    // ==========================================
    // Rewards System
    // ==========================================

    redeemReward(event) {
        const cost = parseInt(event.target.dataset.cost);
        const rewardName = event.target.parentElement.querySelector('h4').textContent;

        if (this.state.points >= cost) {
            this.state.points -= cost;
            this.saveState();
            this.updateUI();
            this.showToast('🎁', `แลกรางวัล "${rewardName}" สำเร็จ!`);
        } else {
            const needed = cost - this.state.points;
            this.showToast('⚠️', `Points ไม่พอ! ต้องการอีก ${needed} Points`);
        }
    }

    // ==========================================
    // UI Updates
    // ==========================================

    updateUI() {
        this.elements.coinAmount.textContent = this.formatNumber(this.state.points);
        this.elements.adsWatchedToday.textContent = this.state.gamesPlayedToday;
        this.elements.totalEarned.textContent = this.formatNumber(this.state.totalEarned);
        this.elements.totalAdsWatched.textContent = this.formatNumber(this.state.totalGamesPlayed);
        this.elements.streakDays.textContent = this.state.streakDays;
    }

    animateCoinIncrease() {
        const coinDisplay = document.querySelector('.coin-display');
        coinDisplay.style.transform = 'scale(1.2)';
        setTimeout(() => {
            coinDisplay.style.transform = 'scale(1)';
        }, 300);
    }

    formatNumber(num) {
        return num.toLocaleString('th-TH');
    }

    // ==========================================
    // Toast Notifications
    // ==========================================

    showToast(icon, message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
        `;

        this.elements.toastContainer.appendChild(toast);

        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ==========================================
    // Banner Ad Rotation
    // ==========================================

    initBannerRotation() {
        const bannerAds = [
            { brand: '🛒 ShopNow', text: 'ช้อปสินค้าราคาถูก ส่งฟรีทั่วไทย!' },
            { brand: '📚 LearnPro', text: 'คอร์สออนไลน์ เรียนได้ทุกที่!' },
            { brand: '🎮 GameZone', text: 'เกมใหม่มาแรง ดาวน์โหลดฟรี!' },
            { brand: '💳 PayEasy', text: 'ชำระเงินง่าย รับเงินคืน 5%!' },
            { brand: '🍕 FoodDelivery', text: 'สั่งอาหารออนไลน์ ส่งไว 30 นาที!' }
        ];

        // Rotate banners every 5 seconds
        setInterval(() => {
            const randomAd = bannerAds[Math.floor(Math.random() * bannerAds.length)];

            document.querySelectorAll('.banner-sidebar .ad-placeholder').forEach(placeholder => {
                const label = placeholder.querySelector('.ad-label');
                const text = placeholder.querySelector('.ad-text');
                const subtext = placeholder.querySelector('.ad-subtext');

                if (label && text) {
                    label.textContent = randomAd.brand;
                    text.textContent = randomAd.text;
                    if (subtext) subtext.textContent = 'คลิกเพื่อดูรายละเอียด';
                }
            });
        }, 5000);
    }
}

// ============================================
// Initialize App
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    window.app = new FunZoneApp();
});

// ============================================
// Simulated Ad Content Rotation
// ============================================

const adContents = [
    { brand: '🎮 GamePro X', slogan: 'เกมใหม่มาแรง! ดาวน์โหลดฟรีวันนี้' },
    { brand: '🛍️ MegaSale', slogan: 'ลดราคาสูงสุด 80%! เฉพาะสัปดาห์นี้' },
    { brand: '📱 TechPhone', slogan: 'สมาร์ทโฟนรุ่นใหม่ล่าสุด!' },
    { brand: '🎬 StreamTV', slogan: 'ดูหนังออนไลน์ไม่จำกัด!' },
    { brand: '🍔 FastFood', slogan: 'อร่อยทุกมื้อ ส่งถึงบ้าน!' }
];

// Rotate ad content when ad starts playing
function updateAdContent() {
    const randomAd = adContents[Math.floor(Math.random() * adContents.length)];
    const brandElement = document.querySelector('.ad-brand');
    const sloganElement = document.querySelector('.ad-slogan');

    if (brandElement && sloganElement) {
        brandElement.textContent = randomAd.brand;
        sloganElement.textContent = randomAd.slogan;
    }
}

// Call when ad starts
document.getElementById('watchAdBtn')?.addEventListener('click', updateAdContent);
document.getElementById('adVideoPlaceholder')?.addEventListener('click', updateAdContent);
