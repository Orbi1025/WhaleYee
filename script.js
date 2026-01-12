function createFloatingElements() {
  const container = document.querySelector(".floating-elements");
  const elements = ["🍃", "🌿", "🍂", "✨", "🫧", "🌸"];

  setInterval(() => {
    const element = document.createElement("div");
    element.className = "floating-item";
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.cssText = `
            position: absolute;
            font-size: ${20 + Math.random() * 20}px;
            left: ${Math.random() * 100}%;
            top: -50px;
            animation: floatDown ${10 + Math.random() * 10}s linear;
            opacity: ${0.4 + Math.random() * 0.4};
            z-index: 1;
        `;

    container.appendChild(element);

    setTimeout(() => {
      element.remove();
    }, 20000);
  }, 2000);
}

const floatStyle = document.createElement("style");
floatStyle.textContent = `
    @keyframes floatDown {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        100% {
            transform: translateY(calc(100vh + 100px)) rotate(360deg);
        }
    }
`;
document.head.appendChild(floatStyle);

createFloatingElements();

gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-text > *", {
  y: 30,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "bounce.out",
});

gsap.from(".hero-ducky", {
  scale: 0,
  rotation: 720,
  duration: 1.5,
  ease: "back.out(1.7)",
  delay: 0.5,
});

gsap.utils.toArray(".story-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    x: i % 2 === 0 ? -100 : 100,
    opacity: 0,
    rotation: i % 2 === 0 ? -5 : 5,
    duration: 1,
    ease: "elastic.out(1, 0.5)",
  });
});

gsap.utils.toArray(".egg-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    y: 100,
    scale: 0,
    rotation: 360,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.1,
    ease: "bounce.out",
  });

  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      rotation: 5 + Math.random() * 10,
      duration: 0.3,
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotation: 0,
      duration: 0.3,
    });
  });
});

function copyContract() {
  const contractText = document.getElementById("contract").innerText;

  navigator.clipboard
    .writeText(contractText)
    .then(() => {
      showNotification("✅ Copied! WhaleYee WhaleYee WhaleYee!", "success");

      const copyBtn = document.querySelector(".copy-btn");
      copyBtn.innerHTML = '<i class="fas fa-check"></i>';

      gsap.to(copyBtn, {
        scale: 1.3,
        rotation: 360,
        duration: 0.5,
        ease: "back.out(1.7)",
      });

      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        gsap.to(copyBtn, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
        });
      }, 2000);
    })
    .catch((err) => {
      showNotification("❌ Oopsie! Try again!", "error");
    });
}

function copyContractBottom() {
  const contractText = document.getElementById("contract-bottom").innerText;

  navigator.clipboard
    .writeText(contractText)
    .then(() => {
      showNotification("✅ Copied! WhaleYee WhaleYee WhaleYee!", "success");

      const copyBtn = document.querySelector(".ca-copy-btn");
      copyBtn.innerHTML = '<i class="fas fa-check"></i>';

      gsap.to(copyBtn, {
        scale: 1.3,
        rotation: 360,
        duration: 0.5,
        ease: "back.out(1.7)",
      });

      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        gsap.to(copyBtn, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
        });
      }, 2000);
    })
    .catch((err) => {
      showNotification("❌ Oopsie! Try again!", "error");
    });
}

function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  const colors = {
    success: "linear-gradient(135deg, #95C93D, #6BAB4C)",
    warning: "linear-gradient(135deg, #FFD93D, #FFB366)",
    error: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
  };

  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 15px 25px;
        background: ${colors[type]};
        color: white;
        border-radius: 25px;
        font-weight: 700;
        font-family: 'Comic Neue', cursive;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        border: 3px solid white;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  gsap.from(notification, {
    x: 100,
    opacity: 0,
    scale: 0,
    duration: 0.5,
    ease: "back.out(1.7)",
  });

  setTimeout(() => {
    gsap.to(notification, {
      x: 100,
      opacity: 0,
      scale: 0,
      duration: 0.3,
      onComplete: () => {
        document.body.removeChild(notification);
      },
    });
  }, 3000);
}

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;

  gsap.to(".hero-ducky", {
    x: mouseX * 20,
    y: mouseY * 20,
    duration: 1,
    ease: "power2.out",
  });

  gsap.to(".cloud", {
    x: mouseX * -10,
    duration: 2,
    ease: "power2.out",
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".story-card, .egg-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  fadeInObserver.observe(el);
});

document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.createElement("div");
  loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #87CEEB 0%, #98D8E8 50%, #F5DEB3 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
        gap: 20px;
    `;

  const logoLoader = document.createElement("img");
  logoLoader.src = "images/ducky-logo-text.png";
  logoLoader.style.cssText = `
        max-width: 400px;
        width: 80%;
        height: auto;
        filter: drop-shadow(5px 5px 15px rgba(0, 0, 0, 0.3));
        animation: logoWobble 2s ease-in-out infinite;
    `;

  const duckyLoader = document.createElement("img");
  duckyLoader.src = "images/ducky.png";
  duckyLoader.style.cssText = `
        width: 150px;
        height: auto;
        filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3));
        animation: duckyBounce 1s ease-in-out infinite;
    `;

  const loadingText = document.createElement("h1");
  loadingText.textContent = "Loading... WhaleYee WhaleYee WhaleYee!";
  loadingText.style.cssText = `
        font-family: 'Bubblegum Sans', cursive;
        font-size: 2.5rem;
        color: #6BAB4C;
        margin-top: 10px;
        text-shadow: 3px 3px 0 #FFD93D;
        animation: textPulse 1.5s ease-in-out infinite;
    `;

  loadingScreen.appendChild(logoLoader);
  loadingScreen.appendChild(duckyLoader);
  loadingScreen.appendChild(loadingText);
  document.body.appendChild(loadingScreen);

  const loadingStyles = document.createElement("style");
  loadingStyles.textContent = `
        @keyframes duckyBounce {
            0%, 100% { 
                transform: translateY(0) rotate(-5deg) scale(1); 
            }
            50% { 
                transform: translateY(-30px) rotate(5deg) scale(1.1); 
            }
        }
        
        @keyframes logoWobble {
            0%, 100% { 
                transform: rotate(-2deg) scale(1);
            }
            25% {
                transform: rotate(2deg) scale(1.05);
            }
            75% {
                transform: rotate(-2deg) scale(1.05);
            }
        }
        
        @keyframes textPulse {
            0%, 100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.8;
                transform: scale(1.05);
            }
        }
    `;
  document.head.appendChild(loadingStyles);

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(loadingScreen);
        document.head.removeChild(loadingStyles);
      }, 500);
    }, 1500);
  });
});

function createBubbles() {
  const bubbleCount = 5;
  for (let i = 0; i < bubbleCount; i++) {
    setTimeout(() => {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.style.cssText = `
                position: fixed;
                bottom: -50px;
                left: ${Math.random() * 100}%;
                width: ${20 + Math.random() * 30}px;
                height: ${20 + Math.random() * 30}px;
                background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(108, 180, 238, 0.4));
                border-radius: 50%;
                animation: bubbleFloat ${5 + Math.random() * 5}s ease-in-out;
                z-index: 1;
            `;

      document.body.appendChild(bubble);

      setTimeout(() => {
        bubble.remove();
      }, 10000);
    }, i * 500);
  }
}

const bubbleStyle = document.createElement("style");
bubbleStyle.textContent = `
    @keyframes bubbleFloat {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0.8;
        }
        25% {
            transform: translateY(-200px) translateX(20px);
        }
        50% {
            transform: translateY(-400px) translateX(-20px);
        }
        75% {
            transform: translateY(-600px) translateX(10px);
        }
        100% {
            transform: translateY(-100vh) translateX(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(bubbleStyle);

setInterval(createBubbles, 8000);
createBubbles();

let eggClickCount = 0;
document.querySelectorAll(".egg-card").forEach((egg) => {
  egg.addEventListener("click", () => {
    eggClickCount++;

    gsap.to(egg, {
      rotation: 360 * eggClickCount,
      scale: 1.1,
      duration: 0.5,
      ease: "back.out(1.7)",
      onComplete: () => {
        gsap.to(egg, {
          scale: 1,
          duration: 0.3,
        });
      },
    });

    if (eggClickCount === 10) {
      showNotification("🥚 You found the Easter Egg! 🦕", "success");
      eggClickCount = 0;
    }
  });
});

console.log(
  `
%c🦕 Welcome to Ducky's Prehistoric Paradise! 🦕
%c✨ WhaleYee WhaleYee WhaleYee! ✨
%cThe adventure begins here!
`,
  "color: #6BAB4C; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);",
  "color: #FFB366; font-size: 18px; font-weight: bold;",
  "color: #4A5568; font-size: 14px;"
);

const yepYepYep = () => {
  const yeps = document.querySelectorAll(".yep");
  yeps.forEach((yep, i) => {
    setTimeout(() => {
      gsap.to(yep, {
        y: -30,
        scale: 1.2,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(yep, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "bounce.out",
          });
        },
      });
    }, i * 200);
  });
};

setInterval(yepYepYep, 5000);

// Initialize GLightbox
const lightbox = GLightbox({
  touchNavigation: true,
  loop: true,
  autoplayVideos: true,
  zoomable: true,
  draggable: true,
  openEffect: "zoom",
  closeEffect: "fade",
  slideEffect: "slide",
  moreText: "See more",
  moreLength: 60,
  closeOnOutsideClick: true,
  startAt: 0,
  width: "90vw",
  height: "90vh",
  videosWidth: "960px",
  descPosition: "bottom",
  onOpen: () => {
    // Fun WhaleYee! animation when opening
    const yepBurst = document.createElement("div");
    yepBurst.textContent = "WhaleYee!";
    yepBurst.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Bubblegum Sans', cursive;
            font-size: 120px;
            color: #FFD93D;
            text-shadow: 5px 5px 0 #FFB366;
            z-index: 100000;
            pointer-events: none;
        `;
    document.body.appendChild(yepBurst);

    gsap.from(yepBurst, {
      scale: 5,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(yepBurst, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            yepBurst.remove();
          },
        });
      },
    });
  },
  onSlideChange: () => {
    // Small bounce animation on slide change
    const currentSlide = document.querySelector(
      ".gslide-current .gslide-media"
    );
    if (currentSlide) {
      gsap.from(currentSlide, {
        scale: 0.8,
        rotation: 10,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  },
});

// Animate gallery items on scroll
gsap.utils.toArray(".gallery-item").forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    scale: 0,
    rotation: Math.random() * 360,
    opacity: 0,
    duration: 0.6,
    delay: (i % 6) * 0.1,
    ease: "back.out(1.7)",
  });
});

document.querySelector(".main-logo").addEventListener("click", () => {
  gsap.to(".main-logo", {
    rotation: 360,
    scale: 1.2,
    duration: 0.5,
    ease: "back.out(1.7)",
    onComplete: () => {
      gsap.to(".main-logo", {
        scale: 1,
        rotation: 0,
        duration: 0.3,
      });
    },
  });

  const yepSound = document.createElement("div");
  yepSound.textContent = "WhaleYee!";
  yepSound.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Bubblegum Sans', cursive;
        font-size: 100px;
        color: #FFB366;
        text-shadow: 5px 5px 0 #FFD93D;
        z-index: 10000;
        pointer-events: none;
    `;
  document.body.appendChild(yepSound);

  gsap.from(yepSound, {
    scale: 0,
    rotation: 720,
    duration: 0.5,
    ease: "back.out(1.7)",
    onComplete: () => {
      gsap.to(yepSound, {
        scale: 2,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          yepSound.remove();
        },
      });
    },
  });
});
