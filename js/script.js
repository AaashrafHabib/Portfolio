document.addEventListener('DOMContentLoaded', function () {

    // --- Discord Visitor Notification ---
    (function () {
        var WEBHOOK = 'https://portfolio-tracker.ashraflahbib365.workers.dev/';

        function getDeviceInfo() {
            var ua = navigator.userAgent;
            var mobile = /Mobile|Android|iPhone|iPad/i.test(ua);
            var os = 'Unknown OS';
            if (/Windows/i.test(ua)) os = 'Windows';
            else if (/Mac/i.test(ua)) os = 'macOS';
            else if (/Linux/i.test(ua)) os = 'Linux';
            else if (/Android/i.test(ua)) os = 'Android';
            else if (/iPhone|iPad/i.test(ua)) os = 'iOS';

            var browser = 'Unknown Browser';
            if (/Edg\//i.test(ua)) browser = 'Edge';
            else if (/Chrome/i.test(ua)) browser = 'Chrome';
            else if (/Firefox/i.test(ua)) browser = 'Firefox';
            else if (/Safari/i.test(ua)) browser = 'Safari';

            return { device: mobile ? 'Mobile' : 'Desktop', os: os, browser: browser };
        }

        fetch('https://ipapi.co/json/')
            .then(function (r) { return r.json(); })
            .then(function (geo) {
                var info = getDeviceInfo();
                var referrer = document.referrer || 'Direct';
                var now = new Date().toLocaleString('en-GB', { timeZone: 'Europe/Paris' });

                var embed = {
                    embeds: [{
                        title: '🔔 New Portfolio Visitor',
                        color: 2456831,
                        fields: [
                            { name: '🌍 Location', value: (geo.city || '?') + ', ' + (geo.region || '') + ', ' + (geo.country_name || '?'), inline: true },
                            { name: '🏢 IP', value: geo.ip || '?', inline: true },
                            { name: '🏷️ ISP / Org', value: geo.org || '?', inline: false },
                            { name: '💻 Device', value: info.device + ' — ' + info.os + ' / ' + info.browser, inline: true },
                            { name: '🔗 Referrer', value: referrer, inline: true },
                            { name: '🕐 Time (Paris)', value: now, inline: false }
                        ],
                        footer: { text: 'Portfolio Visitor Tracker' }
                    }]
                };

                fetch(WEBHOOK, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(embed)
                });
            })
            .catch(function () {});
    })();

    // --- AOS Initialization ---
    AOS.init({
        duration: 800,
        offset: 50,
        once: true,
    });

    // --- Typing Effect ---
    var titles = ['AI Engineer', 'Multi-Agent Systems', 'AWS & Cloud Architecture', 'MLOps & DevOps', 'LLM Specialist'];
    var titleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typedEl = document.getElementById('typed-text');

    function type() {
        var current = titles[titleIndex];
        if (isDeleting) {
            typedEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        var speed = isDeleting ? 30 : 80;

        if (!isDeleting && charIndex === current.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    if (typedEl) type();

    // --- Navbar Scroll Effect ---
    var navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Nav Toggle ---
    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            var icon = navToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'bi bi-x-lg';
            } else {
                icon.className = 'bi bi-list';
            }
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                var icon = navToggle.querySelector('i');
                icon.className = 'bi bi-list';
            });
        });
    }

    // --- Back to Top ---
    var backToTop = document.getElementById('btn-back-to-top');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Modal ---
    document.querySelectorAll('[data-modal]').forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            var modalId = this.getAttribute('data-modal');
            var modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    document.querySelectorAll('.modal-close').forEach(function (btn) {
        btn.addEventListener('click', function () {
            this.closest('.modal-overlay').classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
        overlay.addEventListener('click', function (e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // --- Active Nav Link on Scroll ---
    var sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        var scrollY = window.scrollY + 120;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = document.querySelector('.nav-links a[href="#' + id + '"]');
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // --- Close modal on Escape key ---
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(function (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
});
