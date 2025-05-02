// EmailJS Configuration
emailjs.init("t7hrpW1QYfDiNh7iH");

// Email Template
const emailTemplate = {
  to_name: "DevDuo Team",
  from_name: "",
  from_email: "",
  subject: "",
  message: "",
};

// Form Validation
function validateForm(formData) {
  const errors = [];
  
  if (!formData.from_name.trim()) {
    errors.push("Name is required");
  }
  
  if (!formData.from_email.trim()) {
    errors.push("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email)) {
    errors.push("Please enter a valid email address");
  }
  
  if (!formData.message.trim()) {
    errors.push("Message is required");
  }
  
  return errors;
}

// Show/Hide Loading Spinner
function toggleLoading(show) {
  const submitButton = document.querySelector('#contactForm button[type="submit"]');
  const spinner = document.createElement('div');
  spinner.className = 'loading-spinner';
  
  if (show) {
    submitButton.disabled = true;
    submitButton.style.position = 'relative';
    submitButton.appendChild(spinner);
  } else {
    submitButton.disabled = false;
    const existingSpinner = submitButton.querySelector('.loading-spinner');
    if (existingSpinner) {
      existingSpinner.remove();
    }
  }
}

// Show Message
function showMessage(message, isError = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isError ? 'error' : 'success'}`;
  messageDiv.textContent = message;
  
  const form = document.getElementById('contactForm');
  form.insertBefore(messageDiv, form.firstChild);
  
  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
}

// Form Submission Handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const formData = {
    to_name: "DevDuo Team",
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };

  // Validate form
  const errors = validateForm(formData);
  if (errors.length > 0) {
    showMessage(errors.join('\n'), true);
    return;
  }

  // Show loading state
  toggleLoading(true);

  // Send email using EmailJS
  emailjs.send("Company emails", "template_zte2xbf", formData)
    .then(function(response) {
      console.log("Email sent successfully!", response);
      showMessage("Thank you for your message! We'll get back to you soon.");
      document.getElementById('contactForm').reset();
    })
    .catch(function(error) {
      console.error("Failed to send email:", error);
      showMessage("Sorry, there was an error sending your message. Please try again later.", true);
    })
    .finally(() => {
      toggleLoading(false);
    });
}); 