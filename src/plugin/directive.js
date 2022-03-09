export default {
    limit: (el, data) => {
        const str = el.innerText;
        if (str.length > data.value) {
            el.innerText = str.substring(0, data.value) + '...';
        }
    }
};