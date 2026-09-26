const translations = {
  en: {
    nav_tickets: "Bus Tickets",
    nav_track: "Track Bus GPS",
    nav_bookings: "My Bookings",
    nav_ai: "Routevia AI",
    nav_offers: "Offers",
    nav_support: "Support",
    hero_badge: "SMART BUS TRANSPORT ECOSYSTEM",
    hero_title_1: "Your Journey.",
    hero_title_2: "Smarter with Routevia.",
    hero_desc: "Book verified intercity buses, track live GPS locations, manage digital tickets, and rely on real-time predictive travel intelligence.",
    status_title: "ACTIVE PLATFORM STATUS",
    status_desc: "1,420+ Buses Live Tracked Today",
    label_from: "FROM",
    label_to: "TO",
    label_date: "DATE",
    label_passengers: "PASSENGERS",
    btn_search: "SEARCH AVAILABLE BUSES"
  },
  hi: {
    nav_tickets: "बस टिकट",
    nav_track: "बस जीपीएस ट्रैक करें",
    nav_bookings: "मेरी बुकिंग",
    nav_ai: "रूटविया एआई",
    nav_offers: "ऑफ़र",
    nav_support: "सहायता",
    hero_badge: "स्मार्ट बस परिवहन इकोसिस्टम",
    hero_title_1: "आपकी यात्रा।",
    hero_title_2: "रूटविया के साथ स्मार्ट।",
    hero_desc: "सत्यापित अंतरराज्यीय बसें बुक करें, लाइव जीपीएस लोकेशन ट्रैक करें, डिजिटल टिकट प्रबंधित करें और रीयल-टाइम यात्रा जानकारी का लाभ उठाएं।",
    status_title: "सक्रिय प्लेटफॉर्म स्थिति",
    status_desc: "आज 1,420+ बसें लाइव ट्रैक की गईं",
    label_from: "कहां से",
    label_to: "कहां तक",
    label_date: "तारीख",
    label_passengers: "यात्री",
    btn_search: "उपलब्ध बसें खोजें"
  },
  mr: {
    nav_tickets: "बस तिकिटे",
    nav_track: "बस GPS ट्रॅक करा",
    nav_bookings: "माझ्या बुकिंग्स",
    nav_ai: "रूटव्हिया AI",
    nav_offers: "ऑफर्स",
    nav_support: "मदत आणि सपोर्ट",
    hero_badge: "स्मार्ट बस वाहतूक प्रणाली",
    hero_title_1: "तुमचा प्रवास.",
    hero_title_2: "रूटव्हियासोबत अधिक स्मार्ट.",
    hero_desc: "खात्रीशीर बस बुकिंग करा, थेट GPS लोकेशन ट्रॅक करा, डिजिटल तिकिटे व्यवस्थापित करा आणि रीअल-टाइम माहिती मिळवा.",
    status_title: "सक्रिय प्लॅटफॉर्म स्थिती",
    status_desc: "आज १,४२०+ बस लाईव्ह ट्रॅक केल्या",
    label_from: "कुठून",
    label_to: "कुठे",
    label_date: "दिनांक",
    label_passengers: "प्रवासी",
    btn_search: "उपलब्ध बस शोधा"
  }
};

function changeLanguage(lang) {
  const dictionary = translations[lang] || translations.en;
  
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (dictionary[key]) {
      element.innerText = dictionary[key];
    }
  });

  localStorage.setItem("selectedLanguage", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector(".rv-lang-select");
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  
  if (select) {
    select.value = savedLang;
    changeLanguage(savedLang);

    select.addEventListener("change", (e) => {
      changeLanguage(e.target.value);
    });
  }
});