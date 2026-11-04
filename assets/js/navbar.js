/* ==========================================================================
   DYNAMIC ISLAND ENGINE: LOCALSTORAGE LOCK PERSISTENCE & SAFE MOBILE TAP
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector(".island-outer-wrapper");
    const island = document.querySelector(".dynamic-island-nav");
    const lockBtn = document.getElementById("btnNavLock");
    const brandLink = document.querySelector(".island-brand");

    if (!wrapper || !island) return;

    // 1. Inisialisasi Mobile Backdrop
    let backdrop = document.querySelector(".island-mobile-backdrop");
    if (!backdrop) {
        backdrop = document.createElement("div");
        backdrop.className = "island-mobile-backdrop";
        document.body.appendChild(backdrop);
    }

    const isMobile = () => window.innerWidth < 992;
    let collapseTimer = null;

    // 2. SISTEM LOCK PERSISTEN DENGAN LOCALSTORAGE (ANTI-RESET SAAT PINDAH HALAMAN)
    let isLocked = localStorage.getItem("pharmasentinel_nav_locked") === "true";

    function applyLockState(animate = false) {
        const lockIcon = lockBtn ? lockBtn.querySelector(".lock-icon") : null;
        if (isLocked && !isMobile()) {
            if (lockBtn) lockBtn.classList.add("locked");
            wrapper.classList.add("is-locked");
            if (lockBtn) lockBtn.title = "Navbar Terkunci Permanen (Klik untuk Melepas Pin)";
            if (lockIcon) {
                lockIcon.className = "bi bi-lock-fill lock-icon";
                if (animate) lockIcon.classList.add("lock-morph-spring");
            }
        } else {
            if (lockBtn) lockBtn.classList.remove("locked");
            wrapper.classList.remove("is-locked");
            if (lockBtn) lockBtn.title = "Kunci Tampilan Navbar";
            if (lockIcon) {
                lockIcon.className = "bi bi-unlock-fill lock-icon";
                if (animate) lockIcon.classList.add("lock-morph-spring");
            }
        }
    }

    // Terapkan langsung saat halaman selesai dimuat
    applyLockState(false);

    // 3. DESKTOP HOVER & DEBOUNCE DELAY (400ms)
    wrapper.addEventListener("mouseenter", function () {
        if (isMobile()) return;
        clearTimeout(collapseTimer);
        wrapper.classList.add("is-expanded");
    });

    wrapper.addEventListener("mouseleave", function () {
        if (isMobile() || isLocked) return;
        collapseTimer = setTimeout(() => {
            wrapper.classList.remove("is-expanded");
        }, 400);
    });

    // 4. TOGGLE TOMBOL GEMBOK & SIMPAN KE LOCALSTORAGE
    if (lockBtn) {
        lockBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            isLocked = !isLocked;
            localStorage.setItem("pharmasentinel_nav_locked", isLocked ? "true" : "false");
            applyLockState(true);
        });
    }

    // 5. MOBILE BEHAVIOR: BLOKIR SEMUA LINK SEBELUM NAVBAR DI-TAP EXPAND
    island.addEventListener("click", function (e) {
        if (!isMobile()) return;

        const isExpanded = wrapper.classList.contains("is-expanded");

        // Jika BELUM expand, cegah semua klik tombol/link agar TIDAK pindah halaman
        if (!isExpanded) {
            e.preventDefault();
            e.stopPropagation();
            wrapper.classList.add("is-expanded");
            backdrop.classList.add("active");
            return;
        }
    });

    // Perlindungan ekstra khusus logo brand di mobile
    if (brandLink) {
        brandLink.addEventListener("click", function (e) {
            if (isMobile() && !wrapper.classList.contains("is-expanded")) {
                e.preventDefault();
                e.stopPropagation();
                wrapper.classList.add("is-expanded");
                backdrop.classList.add("active");
            }
        });
    }

    // Tap outside untuk menutup (Mobile)
    backdrop.addEventListener("click", function () {
        wrapper.classList.remove("is-expanded");
        backdrop.classList.remove("active");
    });

    // Penyesuaian saat resize
    window.addEventListener("resize", function () {
        if (!isMobile()) {
            backdrop.classList.remove("active");
            applyLockState(false);
        } else {
            wrapper.classList.remove("is-locked");
        }
    });
});