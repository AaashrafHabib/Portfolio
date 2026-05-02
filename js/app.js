particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 60,
            "density": {
                "enable": true,
                "value_area": 900
            }
        },
        "color": {
            "value": "#2563eb"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#2563eb"
            }
        },
        "opacity": {
            "value": 0.35,
            "random": true,
            "anim": {
                "enable": false
            }
        },
        "size": {
            "value": 4,
            "random": true,
            "anim": {
                "enable": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 160,
            "color": "#2563eb",
            "opacity": 0.2,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
                "enable": false
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 200,
                "line_linked": {
                    "opacity": 0.4
                }
            },
            "push": {
                "particles_nb": 3
            }
        }
    },
    "retina_detect": true
});