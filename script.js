$().ready(() => {
    const stage = document.querySelector('.stage');
    stage.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            stage.scrollLeft += e.deltaY;
        }
    });
});