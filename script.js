document.getElementById('calculateBtn').addEventListener('click', calculateDistance);

function calculateDistance() {
    const pointAInput = document.getElementById('pointA');
    const pointBInput = document.getElementById('pointB');
    const resultElement = document.getElementById('result');

    const pointA = pointAInput.value.trim();
    const pointB = pointBInput.value.trim();

    if (!pointA || !pointB) {
        resultElement.textContent = 'Please enter both coordinates.';
        return;
    }

    const coordinatesA = pointA.split(',').map(coord => parseFloat(coord));
    const coordinatesB = pointB.split(',').map(coord => parseFloat(coord));

    if (isNaN(coordinatesA[0]) || isNaN(coordinatesA[1]) || isNaN(coordinatesB[0]) || isNaN(coordinatesB[1])) {
        resultElement.textContent = 'Invalid coordinates. Please enter valid latitude and longitude values.';
        return;
    }

    const distance = calculateAirDistance(coordinatesA[0], coordinatesA[1], coordinatesB[0], coordinatesB[1]);
    resultElement.textContent = `Distance: ${distance.toFixed(2)}km`;
}

function calculateAirDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
}

function toRadians(degrees) {
    // alert("Sucessful")
    return degrees * (Math.PI / 180);
}
