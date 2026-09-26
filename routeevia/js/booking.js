/**
 * Routevia Booking & Search Engine
 * Manages operator feeds, filtering, sorting, and seating launcher.
 */
const RouteviaBooking = {
    mockBuses: [
        {
            id: 'RV-101',
            operator: 'Routevia Luxury Express',
            type: 'AC Sleeper (2+1)',
            dept: '06:00 AM',
            arr: '09:30 AM',
            duration: '3h 30m',
            price: 599,
            rating: '4.8 ★',
            seatsLeft: 12
        },
        {
            id: 'RV-102',
            operator: 'Routevia AI Smart Coach',
            type: 'AC Luxury Seater',
            dept: '08:30 AM',
            arr: '11:45 AM',
            duration: '3h 15m',
            price: 349,
            rating: '4.9 ★',
            seatsLeft: 18
        },
        {
            id: 'RV-103',
            operator: 'Neeta Travels (Partner)',
            type: 'AC Sleeper (2+1)',
            dept: '02:00 PM',
            arr: '05:30 PM',
            duration: '3h 30m',
            price: 649,
            rating: '4.6 ★',
            seatsLeft: 5
        }
    ],

    init() {
        const form = document.getElementById('rvMainSearchForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.executeSearch();
            });
        }
    },

    executeSearch() {
        const from = document.getElementById('searchFrom').value;
        const to = document.getElementById('searchTo').value;
        const date = document.getElementById('searchDate').value;

        document.getElementById('resFrom').textContent = from;
        document.getElementById('resTo').textContent = to;
        document.getElementById('resDate').textContent = date || 'Today';

        const resultsContainer = document.getElementById('searchResultsContainer');
        resultsContainer.classList.remove('d-none');
        resultsContainer.scrollIntoView({ behavior: 'smooth' });

        this.renderCards(this.mockBuses);
    },

    renderCards(buses) {
        const feed = document.getElementById('busCardsList');
        feed.innerHTML = '';

        buses.forEach(bus => {
            const card = document.createElement('div');
            card.className = 'rv-card-dark p-3';
            card.innerHTML = `
                <div class="row align-items-center g-3">
                    <div class="col-md-4">
                        <span class="badge rv-badge-primary mb-1">${bus.id}</span>
                        <h5 class="fw-bold text-white mb-0">${bus.operator}</h5>
                        <span class="text-muted small">${bus.type}</span>
                    </div>
                    <div class="col-md-4">
                        <div class="d-flex align-items-center gap-2">
                            <div><strong>${bus.dept}</strong></div>
                            <div class="text-muted small">― ${bus.duration} ―</div>
                            <div><strong>${bus.arr}</strong></div>
                        </div>
                        <span class="text-teal x-small"><i class="bi bi-shield-check"></i> On-Time Guarantee</span>
                    </div>
                    <div class="col-md-2 text-md-end">
                        <strong class="fs-4 text-white">₹${bus.price}</strong>
                        <span class="d-block text-muted x-small">${bus.seatsLeft} seats left</span>
                    </div>
                    <div class="col-md-2 text-md-end">
                        <button class="btn btn-rv-cta btn-sm w-100" onclick="RouteviaSeats.openMatrix('${bus.id}',${bus.price})">
                            View Seats
                        </button>
                    </div>
                </div>
                <div id="seatMatrixBox_${bus.id}" class="d-none mt-3 pt-3 border-top border-secondary border-opacity-25"></div>
            `;
            feed.appendChild(card);
        });
    }
};