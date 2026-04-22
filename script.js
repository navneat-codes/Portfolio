// Custom Cyber Cursor
const cursor = document.getElementById("custom-cursor");

// Functionality to track mouse and interact with elements
if (cursor && window.innerWidth > 900) {
    window.addEventListener("mousemove", (e) => {
        // Position the cursor at the mouse pointer
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Add interactivity hover rules
    const interactiveElements = document.querySelectorAll("a, button, .hover-glow, .pill");
    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hover-active"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hover-active"));
    });
}

// Scroll Reveal Animation with Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15 // Trigger when 15% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            // Optional: observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));
