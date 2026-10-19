# 💍 Krishna & Ankita - Royal Rajput Wedding Invitation & Live Countdown

A royal, luxury, bilingual (**English & हिन्दी**) Rajput Wedding Invitation & Live Countdown website for **Krishna & Ankita**.

Designed **mobile-first** for smartphones with fluid typography, authentic Rajputana royal aesthetic, interactive ceremony timeline, live countdown, February 2027 calendar with event highlights, Google Maps directions, and one-tap WhatsApp sharing.

---

## 🏛️ Structured Menu & Navigation

The website is structured into 4 seamless royal sections accessible via the **Royal Toggle Bar** and the **Mobile Bottom Bar**:

1. **👑 The Wedding** (`#weddingSection`)
   - Auspicious Rajput Invocations (*॥ श्री गणेशाय नमः ॥* and *॥ जय माँ भवानी ॥ जय एकलिंग जी ॥*)
   - Royal Monogram Crest (**K & A**) & Swords Insignia
   - Couple Heading: **Krishna & Ankita** (*कृष्ण संग अंकिता*)
   - **Nicknames Area**: **Lalu Weds Banti** (*लालू संग बंटी*) with pulsating heart badge
   - **Parents & Lineage Cards**:
     - **Groom (वर पक्ष)**: Krishna Chouhan (Lalu) • Son of Smt. & Shri Chouhan • Native: Borani, M.P.
     - **Bride (वधू पक्ष)**: Ankita (Banti) • Daughter of Smt. & Shri ... • Native: Badiya Gyasur, M.P.
   - **Rajput Jharokha Couple Photo Frame** with 1-click photo replacement
   - Formal invitation quotes in English & Hindi

2. **📅 Events** (`#eventsSection`)
   - Authentic custom Hindu & Rajput royal wedding event icons (including custom ceremony imagery: Ganeshji, Mangal Kalash, Mandap Toran, and Gathbandhan Vivah)
   - **25 Feb 2027 • Evening**: Shree Ganesh Pujan & Haldi (*श्री गणेश पूजन एवं हल्दी*) — Golden Lord Ganesha Image Icon (`images/ganeshji.png`)
   - **25 Feb 2027 • Night**: Sangeet & Beats (*शाही संगीत एवं घूमर*) — Royal Rajput Dholak & Golden Shehnai SVG
   - **26 Feb 2027 • Morning**: Ganga Pujan (*पवित्र गंगा पूजन*) — Auspicious Mangal Kalash Image Icon (`images/kalash.png`)
   - **26 Feb 2027 • Afternoon**: Mandap (*मंडप प्रतिष्ठा*) — Traditional Indian Wedding Mandap Toran Image Icon (`images/manadap.png`)
   - **27 Feb 2027 • The Grand Day**: Baarat & Shubh Vivah (*शाही बारात प्रस्थान एवं शुभ विवाह*) — Sacred Vivah Gathbandhan Knot & Vedic Havan Image Icon (`images/theweeding.png`)
     - **Baarat Origin**: **Badiya Gyasur** (*बड़िया ग्यासुर*)
     - **Wedding Destination**: **Borani** (*बोरानी*)

3. **⏳ Countdown** (`#countdownSection`)
   - Live real-time ticking timer (Days, Hours, Minutes, Seconds) to **27 February 2027**
   - Auspicious **February 2027 Calendar Card** highlighting Days 25, 26, and 27 with an animated beating heart ❤️
   - **"Add to Calendar"** (.ics) & WhatsApp Share buttons

4. **📍 Location** (`#locationSection`)
   - **Main Wedding Venue**: Badiya Gyasur (*बड़िया ग्यासुर*)
   - **Baarat Gathering & Departure**: Borani (*बोरानी*)
   - Embedded interactive Google Map
   - **"Open in Google Maps"**, **"Get Directions"**, and **"Copy Address"** buttons

---

## ✨ Features & Highlights

1. **White, Blush Pink & Baby Pink Royal Theme**:
   - Major site background is a soft blend of Porcelain White, Soft Blush, and Baby Pink (`#fff5f8`, `#fce8ee`, `#f8bbd0`).
   - Deep Charcoal Black text (`#1f131c`, `#280a1c`) ensures sharp contrast and readability.
   - Kundan Gold and Rose Gold accents for royal Rajputana heritage.

2. **Couple Nicknames & Family Lineage Cards**:
   - Prominently showcases couple nicknames **Lalu & Banti** (`Lalu Weds Banti` / `लालू संग बंटी`).
   - Side-by-side family cards highlighting parents' names and native locations (Borani and Badiya Gyasur).

3. **Royal Toggle Bar & ScrollSpy**:
   - Sticky gold-bordered segmented control at the top: `[ 👑 The Wedding | 📅 Events | ⏳ Countdown | 📍 Location ]`
   - Automatically tracks scroll position and highlights the active section in real-time.
   - Fully synchronized with the mobile bottom navigation bar.

4. **Single Unified Royal Language Style**:
   - Clean, lightweight architecture with English as the primary language accompanied by authentic Sanskrit/Hindi auspicious shlokas and ceremony subtitles.
   - Eliminates translation overhead and ensures consistent styling and maximum performance on mobile devices.

5. **Royal Rajput Jharokha Couple Photo Frame**:
   - Multi-foil Rajasthani palace arch in Kundan gold with royal crown, kalash finials, and flourish details.
   - Floating camera button for 1-click couple photo replacement from your phone or computer.

6. **Universal Royal Speaker (Default Music ON)**:
   - Starts playing the royal Shehnai & Raga Bhupali melody on first touch/interaction (complying with modern browser policies).
   - Circular golden speaker icon toggles sound on/off (`🔊` / `🔇`) with animated soundwave ripple rings.

7. **Personalization & Settings (⚙️)**:
   - Customize couple names, nicknames, parents' names, native locations, monogram, wedding date, venue names, baarat locations, and Google Maps URL.
   - Upload any custom background or couple photo from your device.

---

## 🚀 How to Run & View the Website

### Option 1: Direct File Open
Simply double-click [`index.html`](file:///home/krishna_chouhan/projects/wedding-countdown/index.html) or open it in any web browser (Chrome, Edge, Safari, Firefox).

### Option 2: Run with Python Local Server
```bash
cd wedding-countdown
python3 -m http.server 8080
```
Then visit:
```
http://localhost:8080
```
or on your mobile phone on the same Wi-Fi:
```
http://<YOUR_LOCAL_IP>:8080
```

---

## 📸 Custom Couple Photo

1. Place your photo in the `images` folder and name it:
   ```
   wedding-countdown/images/couple.jpg
   ```
2. Or replace `images/couple.jpg` with any picture of your choice!
