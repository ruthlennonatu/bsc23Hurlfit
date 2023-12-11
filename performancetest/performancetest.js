import http from 'k6/http';
import { check, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 20 },  // Ramp-up to 20 users over 1 minute
        { duration: '3m', target: 20 },  // Stay at 20 users for 3 minutes

        // Spike Testing
        { duration: '30s', target: 100 }, // Spike to 100 users over 30 seconds
        { duration: '1m', target: 100 },  // Stay at 100 users for 1 minute
        { duration: '30s', target: 20 },  // Ramp-down to 20 users over 30 seconds

        { duration: '1m', target: 0 },   // Ramp-down to 0 users over 1 minute
    ],
    thresholds: {
        'http_req_duration': ['p(95)<500'],  // 95% of requests should be below 500ms
    },
};

export default function () {
    // Test 1: Booking endpoint
    let bookingResponse = http.get('http://localhost:3000/booking');
    if (!check(bookingResponse, { 'booking status was 200': (r) => r.status === 200 })) {
        fail('Booking endpoint failed');
    }
    sleep(1);

    // Test 2: Login endpoint
    let loginResponse = http.get('http://localhost:3000/index');
    if (!check(loginResponse, { 'login status was 200': (r) => r.status === 200 })) {
        console.error('Login endpoint returned an error');
    }
    sleep(1);

    // Test 3: Signup Endpoint
    let signupResponse = http.get('http://localhost:3000/signup');
    if (!check(signupResponse, { 'signup status was 200': (r) => r.status === 200 })) {
        console.error('Signup endpoint returned an error');
    }
    sleep(1);
}
