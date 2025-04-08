document.addEventListener('DOMContentLoaded', function () {
    const lampActive = document.querySelector('#ministudio');
    const lampOverlay = document.querySelector('.container-ministudio');

    // Function to hide all containers
    function hideAllContainers() {
        const containers = [
            '.container',
            '.container-ministudio',
            '.container-development',
            '.container-research',
            '.container-capstone',
            '.container-toolkit'
        ];

        // Loop through each container and set display to none
        for (let i = 0; i < containers.length; i++) {
            const container = document.querySelector(containers[i]);
            if (container) {
                container.style.display = 'none';
            }
        }
    }

    // Function to check window width
    function isWindowSmall() {
        return window.innerWidth < 1200;
    }

    // Event listener for when the lamp (ministudio) is clicked
    lampActive.addEventListener('click', function () {
        if (isWindowSmall()) {  // Check window width before executing
            console.log('Ministudio clicked'); // Debugging log

            // First, hide all containers
            hideAllContainers();

            // Then, show the .container-ministudio
            lampOverlay.style.display = 'block';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const lampActive = document.querySelector('#development');
    const lampOverlay = document.querySelector('.container-development');

    // Function to hide all containers
    function hideAllContainers() {
        const containers = [
            '.container',
            '.container-ministudio',
            '.container-development',
            '.container-research',
            '.container-capstone',
            '.container-toolkit'
        ];

        // Loop through each container and set display to none
        for (let i = 0; i < containers.length; i++) {
            const container = document.querySelector(containers[i]);
            if (container) {
                container.style.display = 'none';
            }
        }
    }

    // Function to check window width
    function isWindowSmall() {
        return window.innerWidth < 1200;
    }

    // Event listener for when the lamp (ministudio) is clicked
    lampActive.addEventListener('click', function () {
        if (isWindowSmall()) {  // Check window width before executing
            console.log('development clicked'); // Debugging log

            // First, hide all containers
            hideAllContainers();

            // Then, show the .container-ministudio
            lampOverlay.style.display = 'block';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const lampActive = document.querySelector('#toolkit');
    const lampOverlay = document.querySelector('.container-toolkit');

    // Function to hide all containers
    function hideAllContainers() {
        const containers = [
            '.container',
            '.container-ministudio',
            '.container-development',
            '.container-research',
            '.container-capstone',
            '.container-toolkit'
        ];

        // Loop through each container and set display to none
        for (let i = 0; i < containers.length; i++) {
            const container = document.querySelector(containers[i]);
            if (container) {
                container.style.display = 'none';
            }
        }
    }

    // Function to check window width
    function isWindowSmall() {
        return window.innerWidth < 1200;
    }

    // Event listener for when the lamp (ministudio) is clicked
    lampActive.addEventListener('click', function () {
        if (isWindowSmall()) {  // Check window width before executing
            console.log('toolkit clicked'); // Debugging log

            // First, hide all containers
            hideAllContainers();

            // Then, show the .container-ministudio
            lampOverlay.style.display = 'block';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const lampActive = document.querySelector('#research');
    const lampOverlay = document.querySelector('.container');

    // Function to hide all containers
    function hideAllContainers() {
        const containers = [
            '.container',
            '.container-ministudio',
            '.container-development',
            '.container-research',
            '.container-capstone',
            '.container-toolkit'
        ];

        // Loop through each container and set display to none
        for (let i = 0; i < containers.length; i++) {
            const container = document.querySelector(containers[i]);
            if (container) {
                container.style.display = 'none';
            }
        }
    }

    // Function to check window width
    function isWindowSmall() {
        return window.innerWidth < 1200;
    }

    // Event listener for when the lamp (ministudio) is clicked
    lampActive.addEventListener('click', function () {
        if (isWindowSmall()) {  // Check window width before executing
            console.log('Research clicked'); // Debugging log

            // First, hide all containers
            hideAllContainers();

            // Then, show the .container-ministudio
            lampOverlay.style.display = 'block';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const lampActive = document.querySelector('#capstone');
    const lampOverlay = document.querySelector('.container-capstone');

    // Function to hide all containers
    function hideAllContainers() {
        const containers = [
            '.container',
            '.container-ministudio',
            '.container-development',
            '.container-research',
            '.container-capstone',
            '.container-toolkit'
        ];

        // Loop through each container and set display to none
        for (let i = 0; i < containers.length; i++) {
            const container = document.querySelector(containers[i]);
            if (container) {
                container.style.display = 'none';
            }
        }
    }

    // Function to check window width
    function isWindowSmall() {
        return window.innerWidth < 1200;
    }

    // Event listener for when the lamp (ministudio) is clicked
    lampActive.addEventListener('click', function () {
        if (isWindowSmall()) {  // Check window width before executing
            console.log('Capstone clicked'); // Debugging log

            // First, hide all containers
            hideAllContainers();

            // Then, show the .container-ministudio
            lampOverlay.style.display = 'block';
        }
    });
});


/* -- is bigger than 1200 -- */

document.addEventListener('DOMContentLoaded', function () {
    const lampActive = document.querySelector('#ministudio');
    const lampOverlay = document.querySelector('.container-ministudio');

    // Function to hide all containers
    function hideAllContainers() {
        const containers = [
            '.container',
            '.container-ministudio',
            '.container-development',
            '.container-research',
            '.container-capstone',
            '.container-toolkit'
        ];

        // Loop through each container and set display to none
        for (let i = 0; i < containers.length; i++) {
            const container = document.querySelector(containers[i]);
            if (container) {
                container.style.display = 'none';
            }
        }
    }

    // Function to check window width
    function isWindowBig() {
        return window.innerWidth > 1200;
    }

    // Event listener for when the lamp (ministudio) is clicked
    lampActive.addEventListener('click', function () {
        if (isWindowBig()) {  // Check window width before executing
            console.log('Ministudio clicked'); // Debugging log

            // First, hide all containers
            hideAllContainers();

            // Then, show the .container-ministudio
            lampOverlay.style.display = 'flex';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const lampActive = document.querySelector('#development');
    const lampOverlay = document.querySelector('.container-development');

    // Function to hide all containers
    function hideAllContainers() {
        const containers = [
            '.container',
            '.container-ministudio',
            '.container-development',
            '.container-research',
            '.container-capstone',
            '.container-toolkit'
        ];

        // Loop through each container and set display to none
        for (let i = 0; i < containers.length; i++) {
            const container = document.querySelector(containers[i]);
            if (container) {
                container.style.display = 'none';
            }
        }
    }

    // Function to check window width
    function isWindowBig() {
        return window.innerWidth > 1200;
    }

    // Event listener for when the lamp (ministudio) is clicked
    lampActive.addEventListener('click', function () {
        if (isWindowBig()) {  // Check window width before executing
            console.log('Development clicked'); // Debugging log

            // First, hide all containers
            hideAllContainers();

            // Then, show the .container-ministudio
            lampOverlay.style.display = 'flex';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const lampActive = document.querySelector('#toolkit');
    const lampOverlay = document.querySelector('.container-toolkit');

    // Function to hide all containers
    function hideAllContainers() {
        const containers = [
            '.container',
            '.container-ministudio',
            '.container-development',
            '.container-research',
            '.container-capstone',
            '.container-toolkit'
        ];

        // Loop through each container and set display to none
        for (let i = 0; i < containers.length; i++) {
            const container = document.querySelector(containers[i]);
            if (container) {
                container.style.display = 'none';
            }
        }
    }

    // Function to check window width
    function isWindowBig() {
        return window.innerWidth > 1200;
    }

    // Event listener for when the lamp (ministudio) is clicked
    lampActive.addEventListener('click', function () {
        if (isWindowBig()) {  // Check window width before executing
            console.log('Toolkit clicked'); // Debugging log

            // First, hide all containers
            hideAllContainers();

            // Then, show the .container-ministudio
            lampOverlay.style.display = 'flex';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const lampActive = document.querySelector('#research');
    const lampOverlay = document.querySelector('.container');

    // Function to hide all containers
    function hideAllContainers() {
        const containers = [
            '.container',
            '.container-ministudio',
            '.container-development',
            '.container-research',
            '.container-capstone',
            '.container-toolkit'
        ];

        // Loop through each container and set display to none
        for (let i = 0; i < containers.length; i++) {
            const container = document.querySelector(containers[i]);
            if (container) {
                container.style.display = 'none';
            }
        }
    }

    // Function to check window width
    function isWindowBig() {
        return window.innerWidth > 1200;
    }

    // Event listener for when the lamp (ministudio) is clicked
    lampActive.addEventListener('click', function () {
        if (isWindowBig()) {  // Check window width before executing
            console.log('Research clicked'); // Debugging log

            // First, hide all containers
            hideAllContainers();

            // Then, show the .container-ministudio
            lampOverlay.style.display = 'flex';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const lampActive = document.querySelector('#capstone');
    const lampOverlay = document.querySelector('.container-capstone');

    // Function to hide all containers
    function hideAllContainers() {
        const containers = [
            '.container',
            '.container-ministudio',
            '.container-development',
            '.container-research',
            '.container-capstone',
            '.container-toolkit'
        ];

        // Loop through each container and set display to none
        for (let i = 0; i < containers.length; i++) {
            const container = document.querySelector(containers[i]);
            if (container) {
                container.style.display = 'none';
            }
        }
    }

    // Function to check window width
    function isWindowBig() {
        return window.innerWidth > 1200;
    }

    // Event listener for when the lamp (ministudio) is clicked
    lampActive.addEventListener('click', function () {
        if (isWindowBig()) {  // Check window width before executing
            console.log('Capstone clicked'); // Debugging log

            // First, hide all containers
            hideAllContainers();

            // Then, show the .container-ministudio
            lampOverlay.style.display = 'flex';
        }
    });
});

(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section')
    let mode = 'dark';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'light';
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            mode = 'dark'
        }
    })
})()