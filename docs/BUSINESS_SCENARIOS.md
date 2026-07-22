# Experience Cancun - Business Scenarios

---

## Scenario 001

### Service
Car Rental

### Title
Airport Delivery with Hotel Return

### Business Rule
Airport delivery is free.
Vehicle pickup outside Cancun has a configurable fee based on distance.

### Customer Request
Customer wants the vehicle delivered to Cancun Airport and returned in Playa del Carmen.

### Expected System Behavior

- Customer selects Cancun Airport as pickup.
- System applies $0 delivery fee.
- Customer selects Playa del Carmen as return location.
- System calculates the configured relocation fee.
- Total is updated automatically.
- Customer sees the fee before confirming the reservation.

### Future Notes
Relocation fees should be managed through Service Areas.

---

## Scenario 002

### Service
Car Rental

### Title
Fuel Policy

### Business Rule
Customer returns the vehicle with the same fuel level it was delivered with.

### Customer Request
Vehicle delivered with 1/2 tank.

### Expected System Behavior

- Pickup fuel level is recorded.
- Return fuel level is recorded.
- Staff can identify shortages.
- Refueling charge can be applied according to partner policy.

---

## Scenario 003

### Service
Tour

### Title
International Family Pricing

### Business Rule
Different prices for adults and children.
Children under the configured age receive free admission.

### Customer Request

2 Adults
1 Child (9)
1 Infant (3)

International Visitors

### Expected System Behavior

- 2 Adult International Tickets
- 1 Child International Ticket
- 1 Infant Free Admission
- Correct total displayed before payment.