/**
 * ROUTEVIA AI — Zero Cost Smart Travel Assistant
 * Languages: English | Hindi | Marathi
 * No API / No Backend / No Ollama required
 */

const RouteviaAI = {

    init() {
        const form = document.getElementById("aiForm");
        const input = document.getElementById("aiUserQuery");

        if (!form || !input) {
            console.warn("Routevia AI: Chat elements not found.");
            return;
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const message = input.value.trim();

            if (!message) return;

            input.value = "";

            this.sendMessage(message);
        });

        // Suggested questions
        document.querySelectorAll(".rv-ai-suggestion").forEach(button => {
            button.addEventListener("click", () => {

                const question = button.dataset.question;

                if (!question) return;

                input.value = question;
                input.focus();
            });
        });
    },


    // ==========================================
    // SEND MESSAGE
    // ==========================================

    sendMessage(message) {

        const feed = document.getElementById("aiChatFeed");

        if (!feed) return;

        // User message
        this.addUserMessage(feed, message);

        this.scrollToBottom(feed);

        // Typing animation
        const typingMessage = this.addTypingMessage(feed);

        this.scrollToBottom(feed);

        // Small delay for realistic AI effect
        setTimeout(() => {

            typingMessage.remove();

            const response = this.generateResponse(message);

            this.addAIMessage(feed, response);

            this.scrollToBottom(feed);

        }, 700);
    },


    // ==========================================
    // SMART RESPONSE ENGINE
    // ==========================================

    generateResponse(message) {

        const text = message.toLowerCase().trim();


        // ======================================
        // ENGLISH
        // ======================================

        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey")
        ) {
            return "Hello! 👋 I'm Routevia AI. I can help you with buses, tickets, seats, GPS tracking, timings, fares and travel assistance.";
        }


        if (
            text.includes("where is my bus") ||
            text.includes("bus location") ||
            text.includes("track bus") ||
            text.includes("bus location")
        ) {
            return "📍 Your bus can be tracked from the Live GPS section. Routevia monitors the bus location and provides estimated arrival information.";
        }


        if (
            text.includes("bus timing") ||
            text.includes("bus time") ||
            text.includes("departure") ||
            text.includes("arrival")
        ) {
            return "🕐 Routevia shows departure and arrival timings for available buses. Select your preferred route to view the complete schedule.";
        }


        if (
            text.includes("seat") ||
            text.includes("available seat")
        ) {
            return "💺 You can select your preferred available seat from the seat-selection screen. Green seats are selected, red seats are already booked.";
        }


        if (
            text.includes("ticket") ||
            text.includes("booking")
        ) {
            return "🎫 You can search for a bus, select your seat, complete the payment process and receive your digital Routevia ticket.";
        }


        if (
            text.includes("price") ||
            text.includes("fare") ||
            text.includes("cost")
        ) {
            return "💰 Bus fares depend on the operator, bus type and selected seat. Routevia displays the fare before you proceed to checkout.";
        }


        if (
            text.includes("payment") ||
            text.includes("pay")
        ) {
            return "💳 Routevia can support UPI, Debit/Credit Cards and Net Banking for digital ticket payments.";
        }


        if (
            text.includes("delay") ||
            text.includes("late") ||
            text.includes("traffic")
        ) {
            return "🚦 Routevia AI can help estimate travel delays using traffic and trip information. Please check the Live GPS section for the latest journey status.";
        }


        if (
            text.includes("emergency") ||
            text.includes("help")
        ) {
            return "🚨 In an emergency, use the Routevia Emergency Assistant to quickly access emergency assistance and share your location with the appropriate contacts.";
        }


        if (
            text.includes("lost") ||
            text.includes("lost item") ||
            text.includes("luggage")
        ) {
            return "🧳 For a lost item, use Routevia Lost & Found to report the item with relevant details. The system can help match your report with registered lost items.";
        }


        if (
            text.includes("language") ||
            text.includes("marathi") ||
            text.includes("hindi")
        ) {
            return "🌐 Routevia supports multilingual travel assistance, including English, Hindi and Marathi.";
        }


        // ======================================
        // HINDI
        // ======================================

        if (
            text.includes("मेरी बस") ||
            text.includes("बस कहाँ") ||
            text.includes("बस कहां")
        ) {
            return "📍 आपकी बस को Routevia के Live GPS Tracking सेक्शन से ट्रैक किया जा सकता है।";
        }


        if (
            text.includes("बस का समय") ||
            text.includes("कितने बजे")
        ) {
            return "🕐 Routevia आपको बस का departure और arrival time दिखाता है।";
        }


        if (
            text.includes("टिकट") ||
            text.includes("बुकिंग")
        ) {
            return "🎫 आप बस खोजकर सीट चुन सकते हैं, payment कर सकते हैं और digital ticket प्राप्त कर सकते हैं।";
        }


        if (
            text.includes("सीट") ||
            text.includes("सीट उपलब्ध")
        ) {
            return "💺 उपलब्ध सीटों में से अपनी पसंदीदा सीट चुनें। लाल सीट पहले से booked है।";
        }


        if (
            text.includes("किराया") ||
            text.includes("पैसे")
        ) {
            return "💰 बस का किराया operator, bus type और seat के अनुसार अलग-अलग हो सकता है।";
        }


        // ======================================
        // MARATHI
        // ======================================

        if (
            text.includes("माझी बस") ||
            text.includes("बस कुठे") ||
            text.includes("बस कुठे आहे")
        ) {
            return "📍 तुमची बस Routevia च्या Live GPS Tracking विभागातून ट्रॅक करता येते.";
        }


        if (
            text.includes("बसची वेळ") ||
            text.includes("किती वाजता")
        ) {
            return "🕐 Routevia तुम्हाला बसची departure आणि arrival वेळ दाखवते.";
        }


        if (
            text.includes("तिकीट") ||
            text.includes("बुकिंग")
        ) {
            return "🎫 तुम्ही बस शोधू शकता, सीट निवडू शकता, payment करू शकता आणि digital ticket मिळवू शकता.";
        }


        if (
            text.includes("सीट") ||
            text.includes("जागा")
        ) {
            return "💺 उपलब्ध सीटमधून तुमची आवडती सीट निवडा. लाल रंगाची सीट आधीच booked आहे.";
        }


        if (
            text.includes("भाडे") ||
            text.includes("किंमत")
        ) {
            return "💰 बसचे भाडे operator, bus type आणि निवडलेल्या सीटवर अवलंबून असते.";
        }


        // ======================================
        // DEFAULT RESPONSE
        // ======================================

        return "🤖 I'm Routevia AI. I can help with bus booking, seats, tickets, fares, GPS tracking, timings, delays, emergency assistance and Lost & Found. Try asking one of these questions.";
    },


    // ==========================================
    // USER MESSAGE
    // ==========================================

    addUserMessage(feed, message) {

        const messageElement = document.createElement("div");

        messageElement.className =
            "rv-chat-msg justify-content-end";

        messageElement.innerHTML = `
            <div class="rv-chat-bubble bg-primary text-white">
                ${this.escapeHTML(message)}
            </div>
        `;

        feed.appendChild(messageElement);
    },


    // ==========================================
    // AI MESSAGE
    // ==========================================

    addAIMessage(feed, message) {

        const messageElement = document.createElement("div");

        messageElement.className =
            "rv-chat-msg msg-ai";

        messageElement.innerHTML = `
            <div class="rv-chat-avatar">
                <i class="bi bi-robot"></i>
            </div>

            <div class="rv-chat-bubble">
                ${this.formatResponse(message)}
            </div>
        `;

        feed.appendChild(messageElement);
    },


    // ==========================================
    // TYPING ANIMATION
    // ==========================================

    addTypingMessage(feed) {

        const typingElement = document.createElement("div");

        typingElement.className =
            "rv-chat-msg msg-ai";

        typingElement.innerHTML = `
            <div class="rv-chat-avatar">
                <i class="bi bi-robot"></i>
            </div>

            <div class="rv-chat-bubble">

                <span class="rv-ai-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>

            </div>
        `;

        feed.appendChild(typingElement);

        return typingElement;
    },


    // ==========================================
    // FORMAT RESPONSE
    // ==========================================

    formatResponse(text) {

        return this.escapeHTML(text)
            .replace(/\n/g, "<br>");
    },


    // ==========================================
    // SECURITY
    // ==========================================

    escapeHTML(text) {

        const div = document.createElement("div");

        div.textContent = text;

        return div.innerHTML;
    },


    // ==========================================
    // AUTO SCROLL
    // ==========================================

    scrollToBottom(feed) {

        feed.scrollTo({
            top: feed.scrollHeight,
            behavior: "smooth"
        });
    }
};


// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    RouteviaAI.init();

});