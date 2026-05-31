document.addEventListener('DOMContentLoaded', function() {
    const forms = ['imsffForm', 'beecForm'];
    const exampleEmail = 'info.intl.neurosc@gmail.com';

    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            console.log('Form data:', data);
            
            const competition = data.competition;
            const subject = encodeURIComponent(`Competition Entry: ${competition} from ${data.name}`);
            
            let details = '';
            if (competition === 'IMSFF') {
                details = `Movie Title: ${data.movieTitle}\nCategory: ${data.category}\nLink: ${data.link}`;
            } else {
                details = `Essay Title: ${data.essayTitle}\nLink: ${data.link}`;
            }

            const body = encodeURIComponent(`Dear Brain Talks Team,

I would like to submit my entry for the ${competition}.

Full Name: ${data.name}
Email: ${data.email}
Country: ${data.country}
${details}

Best regards,
${data.name}`);
            
            const mailtoLink = `mailto:${exampleEmail}?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
            
            const submitButton = form.querySelector('.submit-button');
            submitButton.innerText = 'Submitted!';
            submitButton.disabled = true;
            submitButton.style.background = '#4CAF50';
        });
    });

    // Add input focus effects
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateZ(10px)';
        });
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateZ(0px)';
        });
    });
});

// Mouse parallax effect for forms
document.addEventListener('mousemove', function(e) {
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    
    const formWrapper = document.querySelector('.email-form-wrapper');
    if (formWrapper) {
        const rotateY = mouseX * 5;
        const rotateX = -mouseY * 3;
        formWrapper.style.transform = `translateZ(20px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    }
});
