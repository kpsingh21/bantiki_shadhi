/**
 * Krishna (Banti) & Ankita (Lalu) - Royal Rajput Wedding Invitation & Live Countdown
 * Single Default Language: English with Traditional Sanskrit / Hindi Auspicious Subtitles
 * Menus: The Wedding -> Events -> Countdown -> Location
 */

// 1. Wedding Configuration
const weddingConfig = {
  coupleNames: "Krishnapal & Ankita",
  nicknames: "Banti Weds Lalu",
  groomName: "Krishnapal Singh Chouhan (Banti)",
  groomParents: "Shri Komal Singh Chouhan",
  groomLocation: "Badiya Gyasur, Khandwa, M.P.",
  brideName: "Ankita Chouhan (Lalu)",
  brideParents: "Shri ShivPrashad Singh Chouhan",
  brideLocation: "Borani, Khandwa, M.P.",
  weddingDate: "2027-02-27T10:00:00",
  venue: "Badiya Gyasur",
  baarat: "Borani",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Badiya+Gyasur"
};

// 2. DOM Elements
const bgMedia = document.getElementById("bgMedia");
const couplePhotoImg = document.getElementById("couplePhotoImg");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const calMonthYear = document.getElementById("calMonthYear");
const calendarDaysGrid = document.getElementById("calendarDaysGrid");
const calendarWeekdaysGrid = document.getElementById("calendarWeekdaysGrid");

// Audio Speaker Elements (Default Playing)
const speakerBtn = document.getElementById("speakerBtn");
const speakerIcon = document.getElementById("speakerIcon");
const weddingBgMusicEl = document.getElementById("weddingBgMusic");
let audioCtx = null;
let isMusicPlaying = true; // Default music ON
let isAudioElementPlaying = false;
let musicInterval = null;
let userHasInteracted = false;

// Action Buttons
const mobShareBtn = document.getElementById("mobShareBtn");
const copyAddressBtn = document.getElementById("copyAddressBtn");
const toastBox = document.getElementById("toastBox");

// 3. Initialization on Page Load
document.addEventListener("DOMContentLoaded", () => {
  initBackgroundAndCouplePhoto();
  renderCalendar();
  startCountdown();
  initPetalsAnimation();
  setupEventListeners();
  initAutoMusicOnFirstInteraction();
  initScrollSpy();
});

// 4. Background and Couple Photo Setup
function initBackgroundAndCouplePhoto() {
  const savedBg = localStorage.getItem("wedding_bg_image");
  const savedCouplePhoto = localStorage.getItem("wedding_couple_photo");

  if (savedBg && savedBg !== "images/background.jpg" && bgMedia) {
    bgMedia.style.backgroundImage = `url('${savedBg}')`;
  } else if (bgMedia) {
    bgMedia.style.backgroundImage = "url('images/couple.jpg')";
  }

  if (savedCouplePhoto && savedCouplePhoto !== "images/background.jpg" && couplePhotoImg) {
    couplePhotoImg.src = savedCouplePhoto;
  } else if (couplePhotoImg) {
    couplePhotoImg.src = "images/couple.jpg";
  }
}

// 5. Render Interactive February 2027 Calendar
function renderCalendar() {
  if (!calendarWeekdaysGrid || !calendarDaysGrid) return;

  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  calendarWeekdaysGrid.innerHTML = "";
  weekdays.forEach((dayName) => {
    const span = document.createElement("span");
    span.textContent = dayName;
    calendarWeekdaysGrid.appendChild(span);
  });

  const targetDate = new Date(weddingConfig.weddingDate);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth(); // 1 = February
  const weddingDay = targetDate.getDate(); // 27

  calendarDaysGrid.innerHTML = "";

  const firstDayIndex = new Date(year, month, 1).getDay(); // Sunday=0, Monday=1
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 28

  for (let i = 0; i < firstDayIndex; i++) {
    const emptySlot = document.createElement("div");
    emptySlot.className = "cal-day empty";
    calendarDaysGrid.appendChild(emptySlot);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayEl = document.createElement("div");
    dayEl.className = "cal-day";
    dayEl.textContent = day;

    if (day === 25) {
      dayEl.classList.add("day-25");
      dayEl.title = "25 Feb: Haldi (Evening) & Sangeet (Night)";
    }

    if (day === 26) {
      dayEl.classList.add("day-26");
      dayEl.title = "26 Feb: Ganga Pujan (Morning) & Mandap (Afternoon)";
    }

    if (day === weddingDay) {
      dayEl.classList.add("wedding-day", "day-27");
      dayEl.title = "27 Feb: Baarat from Borani & Royal Wedding at Badiya Gyasur ❤️";
      dayEl.innerHTML = `
        <span>${day}</span>
        <span class="heart-icon"><i class="fa-solid fa-heart"></i></span>
      `;
    }

    calendarDaysGrid.appendChild(dayEl);
  }
}

// 6. Live Countdown Engine
function startCountdown() {
  function updateTimer() {
    const target = new Date(weddingConfig.weddingDate).getTime();
    const now = new Date().getTime();
    const distance = target - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      const countdownHeading = document.getElementById("countdownHeading");
      if (countdownHeading) {
        countdownHeading.textContent = "Today is our Auspicious Wedding Day! Celebrations & Blessings! ❤️🎉";
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (num) => String(num).padStart(2, "0");

    if (daysEl) daysEl.textContent = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// 7. Rose Petals & Golden Sparkle Particle System
function initPetalsAnimation() {
  const canvas = document.getElementById("petalsCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const numParticles = window.innerWidth < 768 ? 24 : 45;
  const particles = [];

  const petalColors = [
    "rgba(244, 143, 177, 0.75)", // Blush Pink
    "rgba(248, 187, 208, 0.8)",  // Soft Baby Pink
    "rgba(240, 98, 146, 0.65)",  // Deep Rose
    "rgba(255, 224, 130, 0.75)", // Kundan Gold Sparkle
    "rgba(255, 240, 245, 0.85)"  // Pearlescent White
  ];

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 1.0 - 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 1.5 - 0.75,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      sway: Math.random() * 2 + 1,
      swayCounter: Math.random() * 100,
      isSparkle: Math.random() > 0.6
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.swayCounter += 0.02;
      p.x += Math.sin(p.swayCounter) * p.sway + p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.isSparkle) {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
}

// 8. Royal Shehnai & Sitar Melody (Web Audio API Synthesizer)
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Raag Yaman / Bhupali Auspicious Notes
const weddingScale = [
  293.66, // D4
  329.63, // E4
  369.99, // F#4
  440.00, // A4
  493.88, // B4
  587.33, // D5
  659.25, // E5
  739.99  // F#5
];

// Traditional Indian Wedding Swara Progression
const melodicProgression = [
  { note: 0, dur: 0.75 },
  { note: 1, dur: 0.55 },
  { note: 2, dur: 0.95 },
  { note: 3, dur: 0.75 },
  { note: 4, dur: 1.15 },
  { note: 3, dur: 0.55 },
  { note: 5, dur: 1.35 },
  { note: 4, dur: 0.75 },
  { note: 2, dur: 0.95 },
  { note: 1, dur: 0.75 },
  { note: 0, dur: 1.45 }
];

let melodyIndex = 0;

function playIndianWeddingNote(freq, duration) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Shehnai/Sitar multi-harmonic tone
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const subOsc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc1.type = "sine";
  osc2.type = "triangle";
  subOsc.type = "sine";

  osc1.frequency.setValueAtTime(freq, now);
  // Gentle Indian gamak (meend / vibrato)
  osc1.frequency.exponentialRampToValueAtTime(freq * 1.015, now + duration * 0.4);
  osc1.frequency.exponentialRampToValueAtTime(freq, now + duration * 0.9);

  osc2.frequency.setValueAtTime(freq * 2, now);
  subOsc.frequency.setValueAtTime(freq * 0.5, now);

  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.linearRampToValueAtTime(0.045, now + 0.12);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc1.connect(gainNode);
  osc2.connect(gainNode);
  subOsc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  subOsc.start(now);

  osc1.stop(now + duration);
  osc2.stop(now + duration);
  subOsc.stop(now + duration);
}

function startRoyalMusic() {
  isMusicPlaying = true;
  updateSpeakerButtonUI(true);

  // Stop any running synthesizer melody immediately
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }

  // 1. If an actual MP3 audio element is available, attempt playback
  if (weddingBgMusicEl) {
    weddingBgMusicEl.volume = 0.75;
    const playPromise = weddingBgMusicEl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isAudioElementPlaying = true;
        })
        .catch((err) => {
          console.warn("Audio element play error:", err);
          // Fallback to soothing Indian wedding synthesizer melody only if MP3 fails
          if (isMusicPlaying && !isAudioElementPlaying) {
            startSynthesizerMelody();
          }
        });
      return;
    }
  }

  // 2. Synthesizer fallback
  startSynthesizerMelody();
}

function startSynthesizerMelody() {
  if (musicInterval) clearInterval(musicInterval);
  musicInterval = setInterval(() => {
    if (!isMusicPlaying || isAudioElementPlaying) return;
    const step = melodicProgression[melodyIndex];
    const freq = weddingScale[step.note];
    playIndianWeddingNote(freq, step.dur);

    melodyIndex = (melodyIndex + 1) % melodicProgression.length;
  }, 1050);
}

function stopRoyalMusic() {
  isMusicPlaying = false;
  if (weddingBgMusicEl) {
    try {
      weddingBgMusicEl.pause();
    } catch (e) {}
  }
  isAudioElementPlaying = false;
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
  updateSpeakerButtonUI(false);
}

function toggleRoyalSpeaker() {
  if (isMusicPlaying) {
    stopRoyalMusic();
    showToast("Music muted");
  } else {
    startRoyalMusic();
    showToast("Royal wedding music playing");
  }
}

function updateSpeakerButtonUI(playing) {
  if (!speakerBtn || !speakerIcon) return;
  if (playing) {
    speakerBtn.classList.add("playing");
    speakerIcon.className = "fa-solid fa-volume-high";
    speakerBtn.title = "Mute Music";
  } else {
    speakerBtn.classList.remove("playing");
    speakerIcon.className = "fa-solid fa-volume-xmark";
    speakerBtn.title = "Play Music";
  }
}

// 9. Auto-play on First User Interaction (Browsers block unconditional autoplay)
function initAutoMusicOnFirstInteraction() {
  const triggerAudio = () => {
    if (userHasInteracted) return;
    userHasInteracted = true;
    startRoyalMusic();

    ["click", "touchstart", "scroll", "keydown"].forEach((evt) => {
      document.removeEventListener(evt, triggerAudio);
    });
  };

  ["click", "touchstart", "scroll", "keydown"].forEach((evt) => {
    document.addEventListener(evt, triggerAudio, { passive: true });
  });
}

// 10. WhatsApp Share Invitation Helper
function shareInvitationWhatsApp() {
  const url = window.location.href;
  const messageText = 
`॥ जय माँ भवानी ॥ 🙏
You are cordially invited to celebrate the royal Rajput wedding of Krishnapal (Banti) & Ankita (Lalu)! 💖

🤵 Groom: Krishnapal Singh Chouhan (Banti)
   Son of Shri Komal Singh Chouhan (Badiya Gyasur, M.P.)
👰 Bride: Ankita Chouhan (Lalu)
   Daughter of Shri ShivPrashad Singh Chouhan (Borani, M.P.)

🗓️ 25 Feb 2027: Haldi (Evening), Sangeet (Night)
🗓️ 26 Feb 2027: Ganga Pujan (Morning), Mandap (Afternoon)
🗓️ 27 Feb 2027: Baarat from Borani & Shubh Vivah at Badiya Gyasur

📍 Wedding Venue: Badiya Gyasur, Madhya Pradesh

Click the link below to view the royal invitation, couple portrait, countdown, and directions:
${url}`;

  const message = encodeURIComponent(messageText);
  window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
}

// 11. Add to Calendar (.ics Generator)
function downloadCalendarFile() {
  const title = "Krishnapal & Ankita - Royal Rajput Wedding Celebrations";
  const description = "25 Feb: Haldi & Sangeet\\n26 Feb: Ganga Pujan & Mandap\\n27 Feb: Baarat from Borani & Wedding at Badiya Gyasur";
  const location = "Badiya Gyasur, Madhya Pradesh, India";

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Krishna & Ankita Rajput Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:wedding-krishnapal-ankita-20270225@rajput-invitation",
    "DTSTAMP:20261016T000000Z",
    "DTSTART:20270225T090000Z",
    "DTEND:20270227T190000Z",
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-P2D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Royal Wedding of Krishnapal (Banti) & Ankita (Lalu)",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Krishnapal_Ankita_Wedding_2027.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("Wedding event added to your calendar!");
}

// 12. Toast Notification Helper
function showToast(message) {
  if (!toastBox) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  toastBox.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 3000);
}

// 13. ScrollSpy & Active Tab Indicator
function updateActiveNavigation(activeId) {
  const tabs = document.querySelectorAll(".toggle-tab");
  const mobTabs = document.querySelectorAll(".mobile-bottom-bar .mob-bar-item[data-target]");
  const royalBar = document.getElementById("royalToggleBar");

  tabs.forEach((tab) => {
    const isActive = tab.getAttribute("data-target") === activeId;
    tab.classList.toggle("active", isActive);
    if (isActive && royalBar) {
      const barRect = royalBar.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();
      if (tabRect.left < barRect.left || tabRect.right > barRect.right) {
        const scrollTarget = tab.offsetLeft - (royalBar.clientWidth / 2) + (tab.clientWidth / 2);
        royalBar.scrollTo({
          left: Math.max(0, scrollTarget),
          behavior: "smooth"
        });
      }
    }
  });

  mobTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.getAttribute("data-target") === activeId);
  });
}

function initScrollSpy() {
  const sections = ["weddingSection", "eventsSection", "countdownSection", "locationSection"];

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 200;
    for (let i = sections.length - 1; i >= 0; i--) {
      const sectionEl = document.getElementById(sections[i]);
      if (sectionEl && sectionEl.offsetTop <= scrollPos) {
        updateActiveNavigation(sections[i]);
        break;
      }
    }
  }, { passive: true });
}

// 14. Event Listeners Setup
function setupEventListeners() {
  // Speaker Music Toggle
  if (speakerBtn) {
    speakerBtn.addEventListener("click", toggleRoyalSpeaker);
  }

  // WhatsApp Shares
  if (mobShareBtn) mobShareBtn.addEventListener("click", shareInvitationWhatsApp);
  const welcomeShareBtn = document.getElementById("welcomeShareBtn");
  if (welcomeShareBtn) welcomeShareBtn.addEventListener("click", shareInvitationWhatsApp);

  // Copy Venue Address
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener("click", () => {
      const fullAddress = `${weddingConfig.venue}, Madhya Pradesh, India`;
      navigator.clipboard.writeText(fullAddress).then(() => {
        showToast("Venue address copied to clipboard!");
      }).catch(() => {
        showToast(fullAddress);
      });
    });
  }

  // Royal Toggle Bar & Mobile Menu Click Navigation
  document.querySelectorAll(".toggle-tab, .mobile-bottom-bar .mob-bar-item[data-target]").forEach((item) => {
    item.addEventListener("click", (e) => {
      const targetId = item.getAttribute("data-target");
      if (targetId) {
        e.preventDefault();
        const section = document.getElementById(targetId);
        if (section) {
          const headerOffset = 25;
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: "smooth"
          });
        }
      }
    });
  });

  // IntersectionObserver for Royal Toggle Bar & Mobile Bottom Bar
  const sectionIds = ["weddingSection", "eventsSection", "countdownSection", "locationSection"];
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        updateActiveNavigation(entry.target.id);
      }
    });
  }, observerOptions);

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });
}

