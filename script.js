document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const burger = document.querySelector('.burger');
    const navList = document.querySelector('.nav-links');
    
    // Set home as active initially
    document.querySelector('#home').classList.add('active');
    
    // Navigation click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Update active section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    setTimeout(() => {
                        section.classList.add('active');
                    }, 100);
                }
            });
            
            // Close mobile menu if open
            if (navList.classList.contains('open')) {
                navList.classList.remove('open');
                burger.classList.remove('toggle');
            }
            
            // Scroll to top of the section
            document.getElementById(targetSection).scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Burger menu toggle
    burger.addEventListener('click', function() {
        navList.classList.toggle('open');
        this.classList.toggle('toggle');
    });
    
    // Scroll header effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
        
        // Show/hide scroll to top button
        const scrollTopBtn = document.querySelector('.scroll-top');
        scrollTopBtn.classList.toggle('active', window.scrollY > 300);
    });
    
    // Scroll to top button
    document.querySelector('.scroll-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Explore button
    document.querySelector('.explore-btn').addEventListener('click', function() {
        document.querySelector('.nav-link[data-section="planets"]').click();
    });
    
    // Parallax effect for fact cards
    const factCards = document.querySelectorAll('.fact-card');
    
    window.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        factCards.forEach(card => {
            const speed = parseFloat(card.getAttribute('data-speed'));
            const xPos = (x * speed * 20) - (10 * speed);
            const yPos = (y * speed * 20) - (10 * speed);
            
            card.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
    
    // Planets Section
    const planets = [
        {
            name: "Mercury",
            color: "#B5B5B5",
            distance: "57.9 million km",
            diameter: "4,880 km",
            period: "88 days",
            facts: "The smallest planet in our solar system and closest to the Sun."
        },
        {
            name: "Venus",
            color: "#E6C229",
            distance: "108.2 million km",
            diameter: "12,104 km",
            period: "225 days",
            facts: "Similar in size to Earth but with a toxic atmosphere of carbon dioxide."
        },
        {
            name: "Earth",
            color: "#6B93D6",
            distance: "149.6 million km",
            diameter: "12,742 km",
            period: "365.25 days",
            facts: "Our home planet, the only known place in the universe confirmed to host life."
        },
        {
            name: "Mars",
            color: "#E27B58",
            distance: "227.9 million km",
            diameter: "6,779 km",
            period: "687 days",
            facts: "Known as the Red Planet due to iron oxide on its surface."
        },
        {
            name: "Jupiter",
            color: "#C88B3A",
            distance: "778.3 million km",
            diameter: "139,820 km",
            period: "12 years",
            facts: "The largest planet in our solar system, a gas giant with a Great Red Spot."
        },
        {
            name: "Saturn",
            color: "#E4D191",
            distance: "1.427 billion km",
            diameter: "116,460 km",
            period: "29 years",
            facts: "Famous for its beautiful ring system made of ice and rock."
        },
        {
            name: "Uranus",
            color: "#D1E7E7",
            distance: "2.871 billion km",
            diameter: "50,724 km",
            period: "84 years",
            facts: "An ice giant that rotates on its side, with rings and 27 moons."
        },
        {
            name: "Neptune",
            color: "#5B5DDF",
            distance: "4.498 billion km",
            diameter: "49,244 km",
            period: "165 years",
            facts: "The windiest planet with the strongest winds in the solar system."
        }
    ];
    
    const planetContainer = document.querySelector('.planet-container');
    const planetName = document.querySelector('.planet-name');
    const planetDesc = document.querySelector('.planet-desc');
    const planetStats = document.querySelectorAll('.stat-value');
    
    planets.forEach((planet, index) => {
        const planetEl = document.createElement('div');
        planetEl.className = 'planet floating';
        planetEl.style.background = `radial-gradient(circle at 30% 30%, ${lightenColor(planet.color, 20)}, ${planet.color})`;
        planetEl.style.boxShadow = `0 0 20px ${planet.color}`;
        planetEl.style.animationDelay = `${index * 0.2}s`;
        
        // Add rings to Saturn
        if (planet.name === "Saturn") {
            planetEl.innerHTML = `<div class="planet-ring" style="border-color: ${planet.color}"></div>`;
        }
        
        planetEl.addEventListener('click', () => {
            // Update planet info
            planetName.textContent = planet.name;
            planetDesc.textContent = planet.facts;
            planetStats[0].textContent = planet.distance;
            planetStats[1].textContent = planet.diameter;
            planetStats[2].textContent = planet.period;
            
            // Highlight selected planet
            document.querySelectorAll('.planet').forEach(p => {
                p.style.transform = 'scale(1)';
                p.style.boxShadow = `0 0 20px ${planet.color}`;
            });
            planetEl.style.transform = 'scale(1.2)';
            planetEl.style.boxShadow = `0 0 40px ${planet.color}`;
        });
        
        planetContainer.appendChild(planetEl);
        
        // Auto-select Earth
        if (planet.name === "Earth") {
            setTimeout(() => {
                planetEl.click();
            }, 500);
        }
    });
    
    // Stars Section
    const stars = [
        {
            name: "Sun",
            type: "G-type Main Sequence",
            distance: "1 AU",
            image: "https://science.nasa.gov/wp-content/uploads/2023/09/sun-blasting-a-m66-flare-web.jpg?w=1024"
        },
        {
            name: "Sirius",
            type: "A-type Main Sequence",
            distance: "8.6 light-years",
            image: "https://science.nasa.gov/wp-content/uploads/2023/10/sirius-hubble-1.jpg?w=1024"
        },
        {
            name: "Betelgeuse",
            type: "Red Supergiant",
            distance: "642.5 light-years",
            image: "https://science.nasa.gov/wp-content/uploads/2023/10/betelgeuse-hubble-1.jpg?w=1024"
        },
        {
            name: "Vega",
            type: "A-type Main Sequence",
            distance: "25 light-years",
            image: "https://science.nasa.gov/wp-content/uploads/2023/10/vega-hubble-1.jpg?w=1024"
        },
        {
            name: "Polaris",
            type: "F-type Supergiant",
            distance: "433 light-years",
            image: "https://science.nasa.gov/wp-content/uploads/2023/10/polaris-hubble-1.jpg?w=1024"
        },
        {
            name: "Proxima Centauri",
            type: "M-type Main Sequence",
            distance: "4.24 light-years",
            image: "https://science.nasa.gov/wp-content/uploads/2023/10/proxima-centauri-hubble-1.jpg?w=1024"
        }
    ];
    
    const starGallery = document.querySelector('.star-gallery');
    
    stars.forEach(star => {
        const starCard = document.createElement('div');
        starCard.className = 'star-card';
        starCard.innerHTML = `
            <div class="star-image" style="background-image: url('${star.image}')"></div>
            <div class="star-details">
                <h3 class="star-name">${star.name}</h3>
                <p class="star-type">${star.type}</p>
                <p class="star-distance">${star.distance}</p>
            </div>
        `;
        starGallery.appendChild(starCard);
    });
    
    // Constellation Canvas
    const constellationCanvas = document.getElementById('constellation');
    constellationCanvas.width = 800;
    constellationCanvas.height = 400;
    const ctx = constellationCanvas.getContext('2d');
    
    let starsPoints = [];
    let lines = [];
    let isDrawing = false;
    
    function initConstellation() {
        starsPoints = [];
        lines = [];
        ctx.clearRect(0, 0, constellationCanvas.width, constellationCanvas.height);
        
        // Create random stars
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * (constellationCanvas.width - 40) + 20;
            const y = Math.random() * (constellationCanvas.height - 40) + 20;
            starsPoints.push({ x, y });
            
            // Draw star
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
            
            // Add glow
            const gradient = ctx.createRadialGradient(x, y, 2, x, y, 8);
            gradient.addColorStop(0, 'white');
            gradient.addColorStop(1, 'transparent');
            
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }
    
    function connectStars() {
        ctx.strokeStyle = 'rgba(106, 0, 244, 0.5)';
        ctx.lineWidth = 1;
        
        // Clear previous lines
        ctx.clearRect(0, 0, constellationCanvas.width, constellationCanvas.height);
        
        // Redraw stars
        starsPoints.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
            
            const gradient = ctx.createRadialGradient(star.x, star.y, 2, star.x, star.y, 8);
            gradient.addColorStop(0, 'white');
            gradient.addColorStop(1, 'transparent');
            
            ctx.beginPath();
            ctx.arc(star.x, star.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        });
        
        // Draw lines
        lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(line.start.x, line.start.y);
            ctx.lineTo(line.end.x, line.end.y);
            ctx.stroke();
        });
    }
    
    constellationCanvas.addEventListener('mousedown', (e) => {
        const rect = constellationCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if clicked on a star
        const clickedStar = starsPoints.find(star => {
            return Math.sqrt((star.x - x) ** 2 + (star.y - y) ** 2) < 10;
        });
        
        if (clickedStar) {
            isDrawing = true;
            lines.push({
                start: clickedStar,
                end: { x: clickedStar.x, y: clickedStar.y }
            });
        }
    });
    
    constellationCanvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        
        const rect = constellationCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        lines[lines.length - 1].end = { x, y };
        connectStars();
    });
    
    constellationCanvas.addEventListener('mouseup', (e) => {
        if (!isDrawing) return;
        
        const rect = constellationCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if released on a star
        const releasedStar = starsPoints.find(star => {
            return Math.sqrt((star.x - x) ** 2 + (star.y - y) ** 2) < 10;
        });
        
        if (releasedStar && releasedStar !== lines[lines.length - 1].start) {
            lines[lines.length - 1].end = releasedStar;
            connectStars();
        } else {
            lines.pop(); // Remove incomplete line
            connectStars();
        }
        
        isDrawing = false;
    });
    
    document.getElementById('connect-stars').addEventListener('click', connectStars);
    document.getElementById('new-constellation').addEventListener('click', initConstellation);
    
    // Initialize constellation
    initConstellation();
    
    // Galaxies Section
    const galaxies = [
        {
            name: "Milky Way",
            description: "Our home galaxy, a barred spiral galaxy containing 100-400 billion stars.",
            image: "https://science.nasa.gov/wp-content/uploads/2023/09/milky-way-1.jpg?w=1024"
        },
        {
            name: "Andromeda",
            description: "The nearest spiral galaxy to the Milky Way, on a collision course with our galaxy.",
            image: "https://science.nasa.gov/wp-content/uploads/2023/09/andromeda-1.jpg?w=1024"
        },
        {
            name: "Sombrero",
            description: "Unusual galaxy resembling a wide-brimmed hat, with a large central bulge.",
            image: "https://science.nasa.gov/wp-content/uploads/2023/09/sombrero-1.jpg?w=1024"
        },
        {
            name: "Whirlpool",
            description: "Classic spiral galaxy interacting with a smaller companion galaxy.",
            image: "https://science.nasa.gov/wp-content/uploads/2023/09/whirlpool-1.jpg?w=1024"
        },
        {
            name: "Pinwheel",
            description: "Face-on spiral galaxy with prominent arms and star-forming regions.",
            image: "https://science.nasa.gov/wp-content/uploads/2023/09/pinwheel-1.jpg?w=1024"
        }
    ];
    
    const sliderContainer = document.querySelector('.slider-container');
    let currentSlide = 0;
    
    galaxies.forEach((galaxy, index) => {
        const slide = document.createElement('div');
        slide.className = 'galaxy-slide';
        slide.innerHTML = `
            <div class="galaxy-image" style="background-image: url('${galaxy.image}')"></div>
            <div class="galaxy-info">
                <h3 class="galaxy-name">${galaxy.name}</h3>
                <p class="galaxy-desc">${galaxy.description}</p>
            </div>
        `;
        sliderContainer.appendChild(slide);
    });
    
    function showSlide(index) {
        const slides = document.querySelectorAll('.galaxy-slide');
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    document.querySelector('.next').addEventListener('click', () => {
        currentSlide++;
        showSlide(currentSlide);
    });
    
    document.querySelector('.prev').addEventListener('click', () => {
        currentSlide--;
        showSlide(currentSlide);
    });
    
    // Auto-advance slides
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
    
    // Explore Section - Gravity Simulator
    const gravityCanvas = document.getElementById('gravity-canvas');
    gravityCanvas.width = 800;
    gravityCanvas.height = 400;
    const gCtx = gravityCanvas.getContext('2d');
    
    let particles = [];
    let gravity = 1;
    let animationId;
    
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 10 + 5;
            this.mass = this.size;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
        }
        
        draw() {
            gCtx.beginPath();
            gCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            gCtx.fillStyle = this.color;
            gCtx.fill();
            
            // Add glow
            const gradient = gCtx.createRadialGradient(
                this.x, this.y, this.size,
                this.x, this.y, this.size * 2
            );
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'transparent');
            
            gCtx.beginPath();
            gCtx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            gCtx.fillStyle = gradient;
            gCtx.fill();
        }
        
        update() {
            // Apply gravity to velocity
            this.vy += 0.1 * gravity;
            
            // Update position
            this.x += this.vx;
            this.y += this.vy;
            
            // Boundary collision
            if (this.x + this.size > gravityCanvas.width || this.x - this.size < 0) {
                this.vx = -this.vx * 0.8;
            }
            
            if (this.y + this.size > gravityCanvas.height || this.y - this.size < 0) {
                this.vy = -this.vy * 0.8;
            }
            
            // Keep particles within bounds
            this.x = Math.max(this.size, Math.min(gravityCanvas.width - this.size, this.x));
            this.y = Math.max(this.size, Math.min(gravityCanvas.height - this.size, this.y));
            
            // Apply inter-particle gravity
            particles.forEach(particle => {
                if (particle !== this) {
                    const dx = particle.x - this.x;
                    const dy = particle.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100 && distance > 0) {
                        const force = (gravity * this.mass * particle.mass) / (distance * distance);
                        const fx = (dx / distance) * force * 0.01;
                        const fy = (dy / distance) * force * 0.01;
                        
                        this.vx += fx;
                        this.vy += fy;
                    }
                }
            });
        }
    }
    
    function animate() {
        gCtx.clearRect(0, 0, gravityCanvas.width, gravityCanvas.height);
        
        // Draw starry background
        gCtx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * gravityCanvas.width;
            const y = Math.random() * gravityCanvas.height;
            const size = Math.random() * 1.5;
            gCtx.beginPath();
            gCtx.arc(x, y, size, 0, Math.PI * 2);
            gCtx.fill();
        }
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    gravityCanvas.addEventListener('click', (e) => {
        const rect = gravityCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        particles.push(new Particle(x, y));
        
        if (particles.length === 1) {
            animate();
        }
    });
    
    document.getElementById('add-particle').addEventListener('click', () => {
        const x = Math.random() * gravityCanvas.width;
        const y = Math.random() * gravityCanvas.height / 2;
        particles.push(new Particle(x, y));
        
        if (particles.length === 1) {
            animate();
        }
    });
    
    document.getElementById('reset-simulator').addEventListener('click', () => {
        cancelAnimationFrame(animationId);
        particles = [];
        gCtx.clearRect(0, 0, gravityCanvas.width, gravityCanvas.height);
    });
    
    document.getElementById('gravity').addEventListener('input', (e) => {
        gravity = parseFloat(e.target.value);
    });
    
    // Cosmic Quiz
    const quizQuestions = [
        {
            question: "What is the largest planet in our solar system?",
            options: ["Earth", "Saturn", "Jupiter", "Neptune"],
            answer: 2
        },
        {
            question: "Which galaxy is closest to the Milky Way?",
            options: ["Andromeda", "Triangulum", "Pinwheel", "Sombrero"],
            answer: 0
        },
        {
            question: "What is the main element that stars fuse in their cores?",
            options: ["Helium", "Carbon", "Hydrogen", "Oxygen"],
            answer: 2
        },
        {
            question: "What phenomenon occurs when a massive star collapses?",
            options: ["Black hole", "Supernova", "Neutron star", "All of the above"],
            answer: 3
        },
        {
            question: "How long does it take light from the Sun to reach Earth?",
            options: ["1 second", "8 minutes", "1 hour", "1 day"],
            answer: 1
        }
    ];
    
    const quizContainer = document.querySelector('.quiz-container');
    const quizResult = document.querySelector('.quiz-result');
    let currentQuestion = 0;
    let score = 0;
    
    function displayQuestion() {
        const question = quizQuestions[currentQuestion];
        quizContainer.innerHTML = `
            <div class="quiz-question">
                <h4>${question.question}</h4>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <div class="quiz-option" data-index="${index}">${option}</div>
                    `).join('')}
                </div>
            </div>
        `;
        
        quizResult.style.display = 'none';
        
        // Add event listeners to options
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                const selectedIndex = parseInt(this.getAttribute('data-index'));
                
                // Highlight selected option
                document.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                
                // Check answer
                if (selectedIndex === question.answer) {
                    quizResult.textContent = "Correct!";
                    quizResult.className = "quiz-result correct";
                    score++;
                } else {
                    quizResult.textContent = `Incorrect! The correct answer is: ${question.options[question.answer]}`;
                    quizResult.className = "quiz-result incorrect";
                }
                
                quizResult.style.display = 'block';
                
                // Move to next question or show final score
                setTimeout(() => {
                    currentQuestion++;
                    if (currentQuestion < quizQuestions.length) {
                        displayQuestion();
                    } else {
                        quizContainer.innerHTML = `
                            <div class="quiz-question">
                                <h4>Quiz Completed!</h4>
                                <p>Your score: ${score} out of ${quizQuestions.length}</p>
                                <button id="retry-quiz">Try Again</button>
                            </div>
                        `;
                        
                        document.getElementById('retry-quiz').addEventListener('click', () => {
                            currentQuestion = 0;
                            score = 0;
                            displayQuestion();
                        });
                    }
                }, 1500);
            });
        });
    }
    
    // Start the quiz
    displayQuestion();
    
    // Helper function to lighten colors
    function lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        
        return `#${(
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 1 ? 0 : B) : 255)
        ).toString(16).slice(1)}`;
    }
});