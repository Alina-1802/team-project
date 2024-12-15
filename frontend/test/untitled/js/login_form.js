document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('change_panel_register').addEventListener('click', function() {
        document.querySelectorAll('.login').forEach(element => {
            element.style.animation = 'move-right 0.3s linear forwards';
        });
    });
});
