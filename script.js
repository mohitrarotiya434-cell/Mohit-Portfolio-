
document.addEventListener("DOMContentLoaded", () => {
  // Automatic footer year
  document.querySelectorAll(".year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Mobile navigation
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.textContent = isOpen ? "✕" : "☰";
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
      });
    });
  }

  // Animated typing effect
  const typing = document.getElementById("typing");

  if (typing) {
    const words = [
      "Creative Learner",
      "Web Developer",
      "AI Creator",
      "Future Innovator"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
      const word = words[wordIndex];

      typing.textContent = word.substring(0, charIndex);

      let delay = deleting ? 45 : 90;

      if (!deleting && charIndex < word.length) {
        charIndex++;
      } else if (!deleting) {
        deleting = true;
        delay = 1200;
      } else if (charIndex > 0) {
        charIndex--;
      } else {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
      }

      setTimeout(typeEffect, delay);
    }

    typeEffect();
  }

  // Scroll reveal animation
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Animate skill bars when visible
          entry.target.querySelectorAll(".skill-fill").forEach((bar) => {
            const level = Math.min(
              100,
              Math.max(0, Number(bar.dataset.level) || 0)
            );
            bar.style.width = level + "%";
          });

          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
    document.querySelectorAll(".skill-fill").forEach((bar) => {
      bar.style.width = (Number(bar.dataset.level) || 0) + "%";
    });
  }

  // Contact form: prepare an email in the visitor's email app
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const name = document.getElementById("visitorName").value.trim();
      const email = document.getElementById("visitorEmail").value.trim();
      const message = document.getElementById("visitorMessage").value.trim();
      const status = document.getElementById("formStatus");

      // Replace this with your own public contact email
      const recipient = "your.email@example.com";

      if (recipient === "your.email@example.com") {
        status.textContent =
          "Please set your own email address in script.js first.";
        return;
      }

      const subject = encodeURIComponent("Portfolio message from " + name);
      const body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
      );

      status.textContent =
        "Opening your email application. Please send the message there.";

      window.location.href =
        `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }
});
