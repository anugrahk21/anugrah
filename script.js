// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Particles.js
particlesJS('particles-js',
    {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#00ff9d"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5,
                "random": true
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00ff9d",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    }
);

// Scroll Progress Bar
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

// Enhanced Animated Text
const roles = ["Programmer", "Entrepreneur", "NCC Cadet", "Former Scout"];
let currentRole = 0;
const rolesElement = document.querySelector('.roles');

function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        rolesElement.innerHTML = text.substring(0, i+1) + '<span class="blink">|</span>';
        setTimeout(() => {
            typeWriter(text, i + 1, fnCallback)
        }, 100);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 1000);
    }
}

function startTextAnimation(i) {
    if (i < roles.length) {
        typeWriter(roles[i], 0, function() {
            setTimeout(() => {
                rolesElement.innerHTML = roles[i] + '<span class="blink">|</span>';
                setTimeout(() => {
                    // Add fade out effect
                    rolesElement.style.opacity = '0';
                    setTimeout(() => {
                        startTextAnimation((i + 1) % roles.length);
                        rolesElement.style.opacity = '1';
                    }, 500);
                }, 1000);
            }, 1000);
        });
    }
}

// Start the animation
startTextAnimation(0);

// Enhanced Dark Mode Toggle with Transition
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
setTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    let theme = document.body.getAttribute('data-theme');
    setTheme(theme === 'dark' ? 'light' : 'dark');
});

// Enhanced Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('show');
});

// Close mobile menu when clicking a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        navLinks.classList.remove('show');
    });
});

// Enhanced Project Cards with Dynamic Content
const projects = [
    {
        title: "Project 1",
        description: "Description of your first major project.",
        techStack: ["React", "Node.js", "MongoDB"],
        demoLink: "https://demo1.example.com",
        githubLink: "https://github.com/yourusername/project1",
        image: "project1.jpg"
    },
    {
        title: "Project 2",
        description: "Description of your second major project.",
        techStack: ["Python", "Django", "PostgreSQL"],
        demoLink: "https://demo2.example.com",
        githubLink: "https://github.com/yourusername/project2",
        image: "project2.jpg"
    }
];

const projectsGrid = document.querySelector('.projects-grid');

projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.setAttribute('data-aos', 'fade-up');
    
    projectCard.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-stack">
            ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
        </div>
        <div class="project-links">
            <a href="${project.demoLink}" target="_blank" class="demo-link">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
            <a href="${project.githubLink}" target="_blank" class="github-link">
                <i class="fab fa-github"></i> GitHub
            </a>
        </div>
    `;
    
    projectsGrid.appendChild(projectCard);
});

// Enhanced Form Submission with Validation and Animation
const contactForm = document.querySelector('.contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

async function submitToGoogleSheets(formData) {
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzu7VAxVRmuiqh5WjOBsycjyviaqnDht893_rCrbhqSUXfeysdZuULudi7wbzLrWscI/exec';
    
    // Create the data object from form data
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    // Log the data being sent (for debugging)
    console.log('Sending data:', data);

    try {
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        // Log the response (for debugging)
        console.log('Response:', response);
        
        // Since no-cors mode doesn't return response data,
        // we assume success if no error was thrown
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form data
    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const message = contactForm.querySelector('#message').value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Get form data
        const formData = new FormData(contactForm);
        
        // Log form data (for debugging)
        console.log('Form data:');
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        
        // Submit to Google Sheets
        const success = await submitToGoogleSheets(formData);
        
        if (success) {
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.backgroundColor = '#10B981';
            
            // Reset form
            contactForm.reset();
            formInputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
            
            alert('Message sent successfully!');
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
        submitBtn.style.backgroundColor = '#EF4444';
        alert('Failed to send message. Please try again.');
    } finally {
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
        }, 3000);
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing Animation for Code Elements
const codeElements = document.querySelectorAll('.skill-tags span');
codeElements.forEach(element => {
    const text = element.textContent;
    element.innerHTML = '';
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeText, 50);
        }
    }
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeText();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(element);
}); 