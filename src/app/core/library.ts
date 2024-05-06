export class Library {

    constructor(
    ) { }

    static showloading() {
        let html = '<div class="app-loading"></div>';
        document.getElementById("app-loading")!.innerHTML = html;
    }

    static hideloading() {
        let html = '';
        document.getElementById("app-loading")!.innerHTML = html;
    }
}