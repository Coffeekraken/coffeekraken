window.addEventListener('DOMContentLoaded', function(event) {
    function requestFormSubjectField() {
        setTimeout(function() {
            var $field = document.querySelector('#nf-field-315:not(.modal-body #nf-field-315)');
            if (!$field) return;
            var $option = $field.querySelector('option[value="admissions"]');
            if (!$option) return;
            var value = $option.value;
            $field.value = value;
        }, 1000);
    }
    requestFormSubjectField();
});