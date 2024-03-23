// Setting HTML content of the modal
document.getElementById('privacyPolicyModal').innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Privacy Policy for Jasper Kimball's Personal Website</h2>
        <h3>Introduction</h3>
        <p>Welcome to Jasper Kimball's Personal Website. Your privacy is important to us, and we are committed to protecting it. In this policy, "we," "us," and "our" refer to Jasper Kimball and any authorized personnel managing this website.</p>        <h3>Data Collection</h3>
        <p>The only data we collect is the total number of visitors to our site. This information is purely numerical and does not include any personal details.</p>
        <h3>Use of Data</h3>
        <p>We use this aggregate data to monitor site traffic and improve the user experience. No individual user can be identified from this data.</p>
        <h3>Data Sharing</h3>
        <p>We do not share any data with third parties, as the information we collect is limited to the number of visitors and contains no personal details.</p>
        <h3>Cookies</h3>
        <p>Our website does not use cookies, as we do not track individual users or their behavior.</p>
        <h3>Changes to This Policy</h3>
        <p>We reserve the right to update this privacy policy at any time. Any changes will be posted on this page.</p>
        <h3>Contact Us</h3>
        <p>If you have any questions about our privacy policy, please reach out to us at jasper-kimball3@gmail.com.</p>
        <p>This policy is effective as of March 23, 2024.</p>
    </div>
`;

var modal = document.getElementById("privacyPolicyModal");
var btn = document.getElementById("privacyPolicyButton");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}