document.addEventListener('DOMContentLoaded', function() {
    // Initialize TON Connect with correct options
    const tonConnect = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://hasan199191.github.io/floxcommunity/tonconnect-manifest.json',
        buttonRootId: 'connect-container',
        buttonCssClass: 'connect-button'
    });

    // Update handleClaim function
    async function handleClaim() {
        try {
            if (!tonConnect.connected) {
                alert("Please connect your wallet first");
                return;
            }
            // Claim işlemleri buraya gelecek
            console.log("Claiming with connected wallet:", tonConnect.account);
        } catch (error) {
            console.error("Claim error:", error);
            alert("Error during claim process");
        }
    }

    // Claim butonuna click event listener ekle
    const claimBtn = document.getElementById('claimBtn');
    if (claimBtn) {
        claimBtn.addEventListener('click', handleClaim);
    }

    // Wallet connection status listener
    tonConnect.onStatusChange(async (wallet) => {
        if (wallet) {
            console.log('Wallet connected:', wallet.account.address);
            // Wallet bağlandığında yapılacak işlemler
        } else {
            console.log('Wallet disconnected');
            // Wallet bağlantısı kesildiğinde yapılacak işlemler
        }
    });

    // Page switching function
    const navItems = document.querySelectorAll('.nav-item');
    const pageSections = document.querySelectorAll('.page-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            pageSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to the new nav item
            item.classList.add('active');
            const targetId = item.getAttribute('href');
            document.querySelector(targetId).classList.add('active');
        });
    });

    // Task system
    const taskButtons = document.querySelectorAll('.task-btn');
    let completedTasks = 0;
    const totalTasks = taskButtons.length;
    const taskProgress = document.querySelector('.task-progress');

    // Task button click function
    taskButtons.forEach(btn => {
        if (!btn.classList.contains('completed')) {
            btn.addEventListener('click', () => {
                const taskItem = btn.closest('.task-item');
                const progressBar = taskItem.querySelector('.progress');
                const taskIcon = taskItem.querySelector('.task-icon i');
                const originalIcon = taskIcon.className;

                // Social media sharing or joining actions
                if (btn.textContent.includes('Share')) {
                    const text = 'Join FLOX and let\'s earn points together! 🐼'; // Proje adı değiştirildi
                    const url = 'https://floxtoken.com'; // Proje URL'si güncellendi
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
                } else if (btn.textContent.includes('Join')) {
                    if (taskItem.querySelector('.telegram')) {
                        window.open('https://t.me/floxcommunity'); // Telegram linki güncellendi
                    } else if (taskItem.querySelector('.discord')) {
                        window.open('https://discord.gg/floxcommunity'); // Discord linki güncellendi
                    }
                }

                // Complete the task
                progressBar.style.width = '100%';
                btn.innerHTML = '<i class="fas fa-check"></i> Completed';
                btn.classList.add('completed');
                btn.disabled = true;

                // Update statistics
                completedTasks++;
                taskProgress.textContent = `${completedTasks}/${totalTasks} Completed`;

                // Animation
                taskIcon.className = 'fas fa-check';
                setTimeout(() => {
                    taskIcon.className = originalIcon;
                }, 1000);
            });
        }
    });

    // Action buttons function
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('This feature will be added soon!');
        });
    });

    // Friend buttons function
    document.querySelectorAll('.friend-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Messaging feature will be added soon!');
        });
    });

    // Farming system
    const actionButton = document.getElementById('actionButton');
    const farmingTimer = document.getElementById('farmingTimer');
    const totalPointsElement = document.getElementById('totalPoints');
    const earnedPointsElement = document.getElementById('earnedPoints');
    
    let isFarming = false;
    let farmingInterval;
    let remainingTime = 86400; // 24 saat
    let earnedPoints = 0;
    const progressFill = document.getElementById('progressFill');
    const currentPoints = document.getElementById('currentPoints');

    // Timer'ı güncelle
    const updateFarming = () => {
        const progressPercent = 100 - (remainingTime / 86400 * 100);
        progressFill.style.width = `${progressPercent}%`;
        
        // Puan hesaplama (0.6/saat)
        earnedPoints = (86400 - remainingTime) * 0.6 / 3600;
        currentPoints.textContent = earnedPoints.toFixed(1);

        if(remainingTime <= 0) {
            claimBtn.disabled = false;
        } else {
            remainingTime--;
        }
    };

    // Buton click handler
    actionButton.addEventListener('click', () => {
        if (actionButton.textContent.includes('Start')) {
            isFarming = true;
            actionButton.disabled = true;
            actionButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Farming...`;
            farmingInterval = setInterval(updateFarming, 1000);
        } else {
            // Claim işlemi
            totalPointsElement.textContent = 
                parseInt(totalPointsElement.textContent) + earnedPoints;
            earnedPoints = 0;
            earnedPointsElement.textContent = '0';
            remainingTime = 86400;
            farmingTimer.textContent = '24:00:00';
            actionButton.innerHTML = `<i class="fas fa-play"></i> Start Farming`;
            claimBtn.disabled = true;
            isFarming = true;
            farmingInterval = setInterval(updateFarming, 1000);
        }
    });

    // Boost butonu (sonradan implemente edilecek)
    document.querySelector('.boost-btn').addEventListener('click', () => {
        alert('Boost feature coming soon!');
    });

    // Otomatik farming başlatma
    if (!isFarming) {
        isFarming = true;
        setInterval(updateFarming, 1000);
    }

    // Claim butonu
    claimBtn.addEventListener('click', () => {
        remainingTime = 86400;
        earnedPoints = 0;
        currentPoints.textContent = '0.0';
        claimBtn.disabled = true;
        progressFill.style.width = '0%';
    });

    // Task tıklama işlevleri
    document.querySelectorAll('.task-item').forEach(task => {
        const arrow = task.querySelector('.task-arrow');
        const actionBtn = task.querySelector('.task-action');
        
        if (arrow) {
            task.addEventListener('click', () => {
                const url = arrow.dataset.url;
                if (url) {
                    window.open(url, '_blank');
                }
            });
        }
        
        if (actionBtn) {
            actionBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const url = actionBtn.dataset.url;
                if (url) {
                    window.open(url, '_blank');
                    // Task tamamlandıktan sonra
                    setTimeout(() => {
                        actionBtn.innerHTML = '<i class="fas fa-check"></i> Completed';
                        actionBtn.disabled = true;
                        actionBtn.classList.add('completed');
                        // Puanları güncelle
                        updatePoints(20000);
                    }, 1000);
                }
            });
        }
    });

    // Share link için referral linkini güncelle
    document.querySelector('.share-link input').value = 'https://t.me/floxcommunityc?start=ref_' + getUserId();
});

// Puan sistemi sabitleri
const POINTS = {
    FARMING: {
        PER_SECOND: 0.001,  // Saniyede 0.001 FLOX
        BOOST_MULTIPLIER: 20 // Boost aktifken 20x hızlı farming
    },
    TASKS: {
        SOCIAL_TASK: 20000,  // Her sosyal görev için 20.000 FLOX
    },
    REFERRAL: {
        DIRECT: 0.10,        // Arkadaşlardan %10
        INDIRECT: 0.025      // Referanslardan %2.5
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Kullanıcı verileri
    let userData = {
        totalBalance: 20261.24,    // Toplam bakiye
        farmingPoints: 0.040,      // Anlık farming puanı
        farmingSpeed: 12,          // Saatlik farming hızı
        timeToFill: "5h 59m",      // Dolmaya kalan süre
        isBoostActive: true,       // Boost durumu
        boostMultiplier: 2000,     // Boost çarpanı (%)
        boostTimeLeft: "01:48",    // Boost kalan süre
        lastUpdate: Date.now()
    };

    // Farming sistemini güncelle
    function updateFarming() {
        const now = Date.now();
        const timePassed = (now - userData.lastUpdate) / 1000;
        
        // Normal farming hızı: saatte 12 point
        const baseRate = 12 / 3600; // Saniyedeki normal hız
        
        // Boost aktifse 2000% hızlı farming
        const multiplier = userData.isBoostActive ? (userData.boostMultiplier / 100) : 1;
        const earnedPoints = timePassed * baseRate * multiplier;
        
        userData.farmingPoints += earnedPoints;
        userData.lastUpdate = now;

        updateUI();
    }

    // UI'ı güncelle
    function updateUI() {
        // Ana bakiye
        const balanceEl = document.querySelector('.balance-amount');
        balanceEl.innerHTML = `${Math.floor(userData.totalBalance)}<span class="decimal">.${(userData.totalBalance % 1).toFixed(2).substring(2)}</span>`;

        // Farming hızı
        const speedEl = document.querySelector('.speed-value');
        speedEl.textContent = `${userData.farmingSpeed} points`;

        // Boost durumu
        const boostEl = document.querySelector('.boost-status');
        if (userData.isBoostActive) {
            boostEl.innerHTML = `⚡ Boosted ×${userData.boostMultiplier}% for ${userData.boostTimeLeft}`;
            boostEl.style.display = 'block';
        } else {
            boostEl.style.display = 'none';
        }

        // Progress bar ve farming bilgisi
        const progressEl = document.querySelector('.progress-fill');
        progressEl.style.width = `${(userData.farmingPoints / 0.060) * 100}%`;

        const farmingEl = document.querySelector('.farming-amount');
        farmingEl.textContent = userData.farmingPoints.toFixed(3);

        const timeEl = document.querySelector('.time-to-fill');
        timeEl.textContent = userData.timeToFill;
    }

    // Boost butonu işlevi
    document.querySelector('.boost-btn').addEventListener('click', function() {
        if (!userData.isBoostActive) {
            userData.isBoostActive = true;
            userData.boostMultiplier = 2000;
            userData.boostTimeLeft = "02:00";
            
            // 2 dakika sonra boost'u kapat
            setTimeout(() => {
                userData.isBoostActive = false;
                updateUI();
            }, 120000); // 2 dakika
        }
    });

    // Claim butonu işlevi
    document.getElementById('claimBtn').addEventListener('click', function() {
        if (userData.farmingPoints > 0) {
            userData.totalBalance += userData.farmingPoints;
            userData.farmingPoints = 0;
            updateUI();
        }
    });

    // Her saniye farming güncelleme
    setInterval(updateFarming, 1000);

    // İlk UI güncellemesi
    updateUI();
});