import React, { useState } from "react";

const App = () => {
  const WORKING_HOURS = { start: 9, end: 17 };
  const SLOT_DURATION = 30;

  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [bookedSlots, setBookedSlots] = useState({});
  const [confirmation, setConfirmation] = useState("");
  const [adminSlot, setAdminSlot] = useState("");

  function getTodayDate() {
    return new Date().toISOString().split("T")[0];
  }

  function generateSlots() {
    const slots = [];
    for (let hour = WORKING_HOURS.start; hour < WORKING_HOURS.end; hour++) {
      slots.push(${pad(hour)}:00);
      slots.push(${pad(hour)}:30);
    }
    return slots;
  }

  function pad(n) {
    return n.toString().padStart(2, "0");
  }

  function isSlotBooked(slot) {
    return bookedSlots[selectedDate]?.includes(slot);
  }

  function handleSlotClick(slot) {
    if (isSlotBooked(slot)) return;

    setBookedSlots((prev) => {
      const updated = { ...prev };
      updated[selectedDate] = [...(updated[selectedDate] || []), slot];
      return updated;
    });

    setConfirmation(✅ Appointment booked for ${slot});
    setTimeout(() => setConfirmation(""), 3000);
  }

  function handleDateChange(e) {
    setSelectedDate(e.target.value);
    setConfirmation("");
  }

  function handleAdminBook() {
    if (!adminSlot) return;
    handleSlotClick(adminSlot);
    setAdminSlot("");
  }

  const slots = generateSlots();

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h2>Appointment Booking</h2>

      {/* Milestone 1: Date Picker */}
      <label>
        Select Date:{" "}
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </label>

      <p>Available from {pad(WORKING_HOURS.start)}:00 to {pad(WORKING_HOURS.end)}:00</p>

      {/* Milestone 2: Confirmation Message */}
      {confirmation && <div style={{ color: "green", marginBottom: "10px" }}>{confirmation}</div>}

      {/* Slot Display */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => handleSlotClick(slot)}
            disabled={isSlotBooked(slot)}
            style={{
              padding: "10px",
              backgroundColor: isSlotBooked(slot) ? "#ccc" : "#4caf50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: isSlotBooked(slot) ? "not-allowed" : "pointer",
            }}
          >
            {slot}
          </button>
        ))}
      </div>

      {/* Milestone 3: Admin Input */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Admin: Book slot (e.g. 14:00)"
          value={adminSlot}
          onChange={(e) => setAdminSlot(e.target.value)}
        />
        <button onClick={handleAdminBook} style={{ marginLeft: "10px" }}>
          Mark as Booked
        </button>
      </div>
    </div>
  );
};

export default App;