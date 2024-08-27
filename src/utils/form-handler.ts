document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('email-form') as HTMLFormElement;
    const emailContainer = document.getElementById('email-container');
    const successMessage = document.getElementById('success-message');

    if (!form || !emailContainer || !successMessage) {
        console.error('Required elements not found');
        return;
    }

    form.addEventListener('submit', async (e: Event) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            console.log('before await...');
            const response = await fetch('actions/send-email', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                emailContainer.classList.add('hidden');
                successMessage.classList.remove('hidden');
            } else {
                console.error('Form submission failed');
                console.log(response);
                // Handle error (e.g., show an error message to the user)
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show an error message to the user)
        }
    });
});