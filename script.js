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

// True Anagram Jumble Reveal (Exact Characters over 3 Seconds)
document.addEventListener('DOMContentLoaded', () => {
    const scramblers = document.querySelectorAll('.scramble');
    
    scramblers.forEach((el) => {
        const target = el.dataset.value;
        const chars = target.split("");
        let current = chars.slice();
        
        // Initial shuffle (keeping spaces intact)
        for (let i = current.length - 1; i > 0; i--) {
            if(chars[i] === " " || chars[i-1] === " ") continue;
            let j = Math.floor(Math.random() * (i + 1));
            while (chars[j] === " ") j = Math.floor(Math.random() * (i + 1));
            const temp = current[i]; current[i] = current[j]; current[j] = temp;
        }
        
        // Force spaces back just in case
        for (let i=0; i<chars.length; i++) {
            if(chars[i] === " ") current[i] = " ";
        }
        
        el.innerText = current.join("");
        
        const duration = 3000; // Exact 3 seconds length
        const fps = 50; 
        const totalFrames = duration / fps;
        let frame = 0;
        
        let unfixed = [];
        for(let i=0; i<chars.length; i++){
            if(chars[i] !== " " && current[i] !== chars[i]) unfixed.push(i);
        }
        
        const fixInterval = Math.max(1, Math.floor(totalFrames / unfixed.length));
        
        let interval = setInterval(() => {
            // Jumble remaining unfixed letters dynamically
            if (unfixed.length > 1) {
                const idx1 = Math.floor(Math.random() * unfixed.length);
                const idx2 = Math.floor(Math.random() * unfixed.length);
                const temp = current[unfixed[idx1]]; 
                current[unfixed[idx1]] = current[unfixed[idx2]]; 
                current[unfixed[idx2]] = temp;
            }
            
            // Over time, lock correct letters into place
            if (frame % fixInterval === 0 && unfixed.length > 0) {
                const randomIndex = Math.floor(Math.random() * unfixed.length);
                const fixIdx = unfixed[randomIndex];
                
                let foundIdx = -1;
                for(let i=0; i<unfixed.length; i++){
                    if(current[unfixed[i]] === chars[fixIdx]){
                        foundIdx = unfixed[i]; break;
                    }
                }
                
                if(foundIdx !== -1) {
                    const temp = current[fixIdx];
                    current[fixIdx] = current[foundIdx];
                    current[foundIdx] = temp;
                } else {
                    current[fixIdx] = chars[fixIdx]; // strict fallback
                }
                
                unfixed.splice(randomIndex, 1);
            }
            
            el.innerText = current.join("");
            frame++;
            
            if(unfixed.length === 0 || frame > totalFrames * 1.5) {
                clearInterval(interval);
                el.innerText = target; // Ensure perfect match at the end
            }
        }, fps);
    });
});
