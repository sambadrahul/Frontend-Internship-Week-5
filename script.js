
const app = document.getElementById("app");

const pages = {
    "/": `
        <section class="hero">
            <p class="eyebrow">SINGLE PAGE APPLICATION</p>
            <h1>Welcome to My Portfolio</h1>
            <p>Hello! I am Rahul Sambad, a frontend web development learner.</p>
            <a href="/projects" data-link class="btn">Explore Projects</a>
        </section>
    `,

    "/about": `
        <section class="page-card">
            <h1>About Me</h1>
            <p>I am Rahul Sambad, an aspiring frontend web developer.</p>
            <p>I enjoy creating responsive and interactive websites using HTML, CSS and JavaScript.</p>
        </section>
    `,

    "/projects": `
        <section class="page-card">
            <h1>My Projects</h1>
            <p>Here are some projects from my frontend development journey.</p>

            <div class="project-grid">
                <div class="project-item">
                    <h2>Portfolio Website</h2>
                    <p>A responsive personal portfolio built with HTML and CSS.</p>
                </div>

                <div class="project-item">
                    <h2>Interactive Portfolio</h2>
                    <p>A portfolio enhanced with JavaScript features and form validation.</p>
                </div>

                <div class="project-item">
                    <h2>Accessible Website</h2>
                    <p>A website improved with semantic HTML and accessibility features.</p>
                </div>

                <div class="project-item">
                    <h2>SPA Simulation</h2>
                    <p>A single page application with client-side navigation.</p>
                </div>
            </div>
        </section>
    `,

    "/contact": `
        <section class="page-card">
            <h1>Contact Me</h1>
            <p>Have a question? Send me a message using this form.</p>

            <form class="contact-form" id="contactForm">
                <input type="text" name="name" placeholder="Your Name"
                    aria-label="Your Name" required>

                <input type="email" name="email" placeholder="Your Email"
                    aria-label="Your Email" required>

                <textarea name="message" placeholder="Your Message"
                    aria-label="Your Message" required></textarea>

                <button type="submit" class="btn">Send Message</button>
            </form>
        </section>
    `
};

function navigateTo(path) {
    const page = pages[path];

    if (!page) {
        history.pushState({}, "", "/");
        renderPage("/");
        return;
    }

    history.pushState({}, "", path);
    renderPage(path);
}

function renderPage(path) {
    app.innerHTML = pages[path] || `
        <section class="page-card">
            <h1>Page Not Found</h1>
            <p>The requested page could not be found.</p>
            <a href="/" data-link class="btn">Go Home</a>
        </section>
    `;

    document.querySelectorAll("[data-link]").forEach(link => {
        const linkPath = new URL(link.href).pathname;
        link.classList.toggle("active", linkPath === path);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", function(event) {
    const link = event.target.closest("a[data-link]");

    if (!link) return;

    event.preventDefault();
    const path = new URL(link.href).pathname;
    navigateTo(path);
});

window.addEventListener("popstate", function() {
    renderPage(window.location.pathname);
});

document.addEventListener("submit", function(event) {
    if (event.target.id === "contactForm") {
        event.preventDefault();
        alert("Thank you! Your message has been received.");
        event.target.reset();
    }
});

renderPage(window.location.pathname);
