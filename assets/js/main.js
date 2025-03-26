// Project Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize skill bars
    initSkillBars();
    
    // Set up project filtering
    setupProjectFilters();
    
    // Set first filter button as active by default
    const firstFilter = document.querySelector('.project-filter');
    if (firstFilter) {
        firstFilter.classList.remove('bg-black', 'text-green-500');
        firstFilter.classList.add('bg-green-500', 'text-black');
    }
});

function initSkillBars() {
    const skills = [
        { name: 'Penetration Testing', level: 90 },
        { name: 'Digital Forensics', level: 85 },
        { name: 'OSINT', level: 80 },
        { name: 'Python', level: 75 },
        { name: 'Network Security', level: 70 },
        { name: 'Malware Analysis', level: 65 }
    ];

    const container = document.querySelector('#skills-container');
    
    if (!container) return;
    
    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'mb-4';
        skillElement.innerHTML = `
            <div class="flex justify-between mb-1">
                <span class="text-gray-300">${skill.name}</span>
                <span class="text-green-500">${skill.level}%</span>
            </div>
            <div class="skill-bar rounded-full overflow-hidden">
                <div class="skill-progress rounded-full" style="width: 0"></div>
            </div>
        `;
        
        container.appendChild(skillElement);
        
        // Animate after append
        setTimeout(() => {
            skillElement.querySelector('.skill-progress').style.width = `${skill.level}%`;
        }, 100);
    });
}

function setupProjectFilters() {
    document.querySelectorAll('.project-filter').forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.project-filter').forEach(btn => {
                btn.classList.remove('bg-green-500', 'text-black');
                btn.classList.add('bg-black', 'text-green-500');
            });
            
            // Add active class to clicked button
            button.classList.remove('bg-black', 'text-green-500');
            button.classList.add('bg-green-500', 'text-black');
            
            const filter = button.textContent.trim();
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        const categories = project.dataset.categories.split(' ');
        
        if (filter === 'All' || categories.includes(filter.toLowerCase().replace(' ', ''))) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
            }, 50);
        } else {
            project.style.opacity = '0';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
