/* =========================================================
   ROUTEVIA SMART SEAT SELECTION SYSTEM
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const seatMap = document.getElementById("seatMap");

    if (!seatMap) {
        console.warn("Routevia: Seat map not found.");
        return;
    }

    const seats = document.querySelectorAll(".rv-seat:not(.sold)");

    const selectedSeatsContainer =
        document.getElementById("selectedSeatsContainer");

    const seatFareElement =
        document.getElementById("seatFare");

    const taxAmountElement =
        document.getElementById("taxAmount");

    const totalAmountElement =
        document.getElementById("totalAmount");

    const selectedSeatCountElement =
        document.getElementById("selectedSeatCount");

    const checkoutButton =
        document.getElementById("proceedCheckoutBtn");


    /* =====================================================
       DATA
       ===================================================== */

    let selectedSeats = [];

    // Tax percentage
    const TAX_PERCENTAGE = 0.05;


    /* =====================================================
       SEAT CLICK
       ===================================================== */

    seats.forEach(function (seat) {

        seat.addEventListener("click", function () {

            const seatNumber = seat.dataset.seat;
            const price = Number(seat.dataset.price);

            if (!seatNumber || !price) {
                return;
            }


            /* ---------------------------------------------
               IF ALREADY SELECTED
               --------------------------------------------- */

            const existingIndex = selectedSeats.findIndex(
                function (item) {
                    return item.seat === seatNumber;
                }
            );


            if (existingIndex !== -1) {

                // Remove from selected seats
                selectedSeats.splice(existingIndex, 1);

                seat.classList.remove("selected");
                seat.classList.add("available");

            }

            /* ---------------------------------------------
               SELECT NEW SEAT
               --------------------------------------------- */

            else {

                selectedSeats.push({
                    seat: seatNumber,
                    price: price
                });

                seat.classList.remove("available");
                seat.classList.add("selected");

            }


            updateBookingSummary();

        });

    });


    /* =====================================================
       UPDATE BOOKING SUMMARY
       ===================================================== */

    function updateBookingSummary() {

        /* ---------------------------------------------
           NO SEATS
           --------------------------------------------- */

        if (selectedSeats.length === 0) {

            selectedSeatsContainer.innerHTML = `
                <span class="text-light opacity-50 small">
                    No seat selected
                </span>
            `;

            seatFareElement.textContent = "₹0";
            taxAmountElement.textContent = "₹0";
            totalAmountElement.textContent = "₹0";

            selectedSeatCountElement.textContent =
                "0 seats selected";

            checkoutButton.disabled = true;

            checkoutButton.innerHTML = `
                <i class="bi bi-lock-fill me-2"></i>
                Select a Seat to Continue
            `;

            return;
        }


        /* ---------------------------------------------
           SELECTED SEAT TAGS
           --------------------------------------------- */

        selectedSeatsContainer.innerHTML = "";

        selectedSeats.forEach(function (item) {

            const tag = document.createElement("span");

            tag.className = "rv-selected-seat-tag";

            tag.innerHTML = `
                <i class="bi bi-check-circle-fill"></i>
                ${item.seat}
            `;

            selectedSeatsContainer.appendChild(tag);

        });


        /* ---------------------------------------------
           CALCULATE FARE
           --------------------------------------------- */

        let seatFare = 0;

        selectedSeats.forEach(function (item) {
            seatFare += item.price;
        });


        const tax = Math.round(
            seatFare * TAX_PERCENTAGE
        );

        const total = seatFare + tax;


        /* ---------------------------------------------
           UPDATE UI
           --------------------------------------------- */

        seatFareElement.textContent =
            "₹" + seatFare.toLocaleString("en-IN");

        taxAmountElement.textContent =
            "₹" + tax.toLocaleString("en-IN");

        totalAmountElement.textContent =
            "₹" + total.toLocaleString("en-IN");


        selectedSeatCountElement.textContent =
            selectedSeats.length +
            (selectedSeats.length === 1
                ? " seat selected"
                : " seats selected");


        /* ---------------------------------------------
           CHECKOUT BUTTON
           --------------------------------------------- */

        checkoutButton.disabled = false;

        checkoutButton.innerHTML = `
            <i class="bi bi-arrow-right-circle-fill me-2"></i>
            Proceed to Checkout
        `;

    }


    /* =====================================================
       CHECKOUT
       ===================================================== */

    checkoutButton.addEventListener("click", function () {

        if (selectedSeats.length === 0) {
            return;
        }


        const seatNames = selectedSeats
            .map(function (item) {
                return item.seat;
            })
            .join(", ");


        const totalFare = selectedSeats.reduce(
            function (total, item) {
                return total + item.price;
            },
            0
        );


        const tax = Math.round(
            totalFare * TAX_PERCENTAGE
        );


        const finalAmount = totalFare + tax;


        /*
         * Temporary frontend confirmation.
         *
         * Later, when we create the backend,
         * this button will send the booking to:
         *
         * backend/create_booking.php
         */

        alert(
            "Seat(s) locked successfully!\n\n" +
            "Selected Seat(s): " + seatNames + "\n" +
            "Total Amount: ₹" +
            finalAmount.toLocaleString("en-IN") +
            "\n\nProceeding to payment..."
        );

    });


    /* =====================================================
       RESET WHEN MODAL CLOSES
       ===================================================== */

    const seatModal =
        document.getElementById("seatModal");


    if (seatModal) {

        seatModal.addEventListener(
            "hidden.bs.modal",
            function () {

                selectedSeats = [];


                document
                    .querySelectorAll(".rv-seat.selected")
                    .forEach(function (seat) {

                        seat.classList.remove("selected");
                        seat.classList.add("available");

                    });


                updateBookingSummary();

            }
        );

    }


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    updateBookingSummary();

});