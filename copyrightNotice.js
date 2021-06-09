


(() => {

    const currentYear = new Date().getFullYear();
    const valid = /^[0-9]+$/.test(currentYear);

    if (typeof currentYear === 'number' && currentYear > 0 && valid) {

        const display = `&copy; 2020 &mdash; ${currentYear} Serica S. All Rights Reserved.`;
        document.getElementsByTagName('footer')[0].innerHTML = display;
    }
    

})();



