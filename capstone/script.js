document.addEventListener("DOMContentLoaded", () => {
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
