<template>
  <div class="justify-content-center align-content-center">
    <form class="row g-3 needs-validation" novalidate>
      <div class="col-md-4">
        <label for="validationCustom01" class="form-label">First name</label>
        <input type="text" class="form-control" id="validationCustom01" value="" required />
        <div class="invalid-feedback">
          Please provide your first name.
        </div>
      </div>
      <div class="col-md-4">
        <label for="validationCustom02" class="form-label">Last name</label>
        <input type="text" class="form-control" id="validationCustom02" value="" required />
        <div class="invalid-feedback">
          Please provide your last name.
        </div>
      </div>
      <div class="col-md-4">
        <label for="validationCustomUsername" class="form-label">Email</label>
        <div class="input-group has-validation">
          <span class="input-group-text" id="inputGroupPrepend">@</span>
          <input
            type="email"
            class="form-control"
            id="validationCustomUsername"
            aria-describedby="inputGroupPrepend"
            required
          />
          <div class="invalid-feedback">
            Please provide a valid email.
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <label for="validationCustom03" class="form-label">City</label>
        <input type="text" class="form-control" id="validationCustom03" required />
        <div class="invalid-feedback">
          Please provide a valid city.
        </div>
      </div>
      <div class="col-md-3">
        <label for="validationCustom04" class="form-label">State</label>
        <select class="form-select" id="validationCustom04" required>
          <option selected disabled value="">Choose...</option>
          <option>...</option>
        </select>
        <div class="invalid-feedback">
          Please select a valid state.
        </div>
      </div>
      <div class="col-md-3">
        <label for="validationCustom05" class="form-label">Zip</label>
        <input type="text" class="form-control" id="validationCustom05" required />
        <div class="invalid-feedback">
          Please provide a valid zip.
        </div>
      </div>

      <div class="col-12">
        <button class="btn btn-primary" @click="validate" type="submit">Submit form</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    validate() {
      (function() {
        "use strict";

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll(".needs-validation");

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms).forEach(function(form) {
          form.addEventListener(
            "submit",
            function(event) {
              if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
              }

              form.classList.add("was-validated");
            },
            false
          );
        });
      })();
    },
  },
};
</script>
