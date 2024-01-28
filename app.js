function applyRotation(elementId) {
    var rotation = `rotate(${window.scrollY / 2}deg)`;
    document.getElementById(elementId).style.transform = rotation;
}

window.addEventListener('scroll', function() {
    applyRotation('shape1');
    applyRotation('shape2');
    applyRotation('shape3');
    applyRotation('shape4');
});

window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loadingScreen').style.display = 'none';
    }, 8000); // 5000 milliseconds = 5 seconds
});