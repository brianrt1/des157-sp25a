/* document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".rotation-container");

    const totalTrees = 30;
    const treeImgSrc = "images/tree-set01.png";

    for (let i = 0; i < totalTrees; i++) {
        const angle = (360 / totalTrees) * i;
        const tree = document.createElement("img");
        tree.src = treeImgSrc;
        tree.className = "tree";

        // Custom CSS property to rotate the tree outward from the circle
        tree.style.setProperty('--angle', `${angle}deg`);
        tree.style.animationDelay = `${i * 0.2}s`; // staggered growth

        container.appendChild(tree);
    }
});
 */

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".rotation-container");
    const totalTrees = 30;
    const treeImgSrc = "images/tree-set01.png";

    for (let i = 0; i < totalTrees; i++) {
        const angle = (360 / totalTrees) * i;
        const tree = document.createElement("img");
        tree.src = treeImgSrc;
        tree.className = "tree";

        tree.style.setProperty('--angle', `${angle}deg`);
        tree.style.animationDelay = `${i * 0.2}s`;

        container.appendChild(tree);
    }

    document.addEventListener("mousemove", (e) => {
        const screenWidth = window.innerWidth;
        const mouseX = e.clientX;

        const trees = document.querySelectorAll(".tree");

        if (mouseX < screenWidth / 3) {
            // LEFT: reverse world & shrink trees
            container.classList.add("reverse");
            trees.forEach(tree => {
                tree.classList.add("reverse-grow");
            });
        } else if (mouseX > 2 * screenWidth / 3) {
            // RIGHT: normal rotation and grow trees
            container.classList.remove("reverse");
            trees.forEach(tree => {
                tree.classList.remove("reverse-grow");
            });
        } else {
            // CENTER: rotation continues, no changes to animation
            container.classList.remove("reverse");
            // Do not touch tree animation classes
        }
    });
});
