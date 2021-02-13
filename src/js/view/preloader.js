class Preloader {
    constructor() {
    }

    showPreloader() {
        const preloader = `
            <div class="progress">
                <div class="indeterminate"></div>
            </div>
        `;
        document.querySelector('nav').insertAdjacentHTML('afterend', preloader);
    }

    hidePreloader() {
        const preloader = document.querySelector('.progress');
        if (preloader) {
            preloader.remove();
        }
    }

    checkPreloader() {
        const preloader = document.querySelector('.progress');
        return preloader ? true : false;
    }
}

const preloader = new Preloader();

export default preloader;