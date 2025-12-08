

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

       
        if (nom === '' || email === '' || message === '') {
            alert('Veuillez remplir tous les champs.');
            return;
        }

    
        const emailData = {
            nom: nom,
            email: email,
            message: message
        };

        fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': window.location.origin
            },
            body: JSON.stringify({
                service_id: 'YOUR_SERVICE_ID',
                template_id: 'YOUR_TEMPLATE_ID',
                user_id: 'YOUR_USER_ID',
                template_params: emailData
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Votre message a été envoyé avec succès !');
                form.reset(); 
            } else {
                alert('Une erreur est survenue, veuillez réessayer.');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Une erreur est survenue, veuillez réessayer.');
        });
    });
});