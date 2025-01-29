document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('change_panel_register').addEventListener('click', function() {
        document.querySelectorAll('.panel_login_register').forEach(element => {
            element.style.animation = 'move-right 0.3s linear forwards';
        });
        document.querySelector('.login').classList.toggle("active");
        document.querySelector('.register').classList.toggle("active");

    });
    document.getElementById('forgot_password').addEventListener('click', function() {
        document.querySelectorAll('.panel_login_register').forEach(element => {
            element.style.animation = 'move-right 0.3s linear forwards';
        });
        document.querySelector('.login').classList.toggle("active");
        document.querySelector('.forgot_password').classList.toggle("active");

    });
    document.getElementById('change_panel_register_back').addEventListener('click', function() {
        document.querySelectorAll('.panel_login_register').forEach(element => {
            element.style.animation = 'move-left 0.3s linear forwards';
        });
        document.querySelector('.login').classList.toggle("active");
        document.querySelector('.register').classList.remove("active");
        document.querySelector('.forgot_password').classList.remove("active");

    });
});
